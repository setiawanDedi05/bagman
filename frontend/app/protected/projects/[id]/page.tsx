"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectDTO } from "@/services/dto/project-dto";
import { StatusTaskEnum } from "@/services/dto/task-dto";
import { projectsService } from "@/services/projects/projects-service";
import { useCallback, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TaskList from "./components/task-list";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EditProjectForm from "../components/edit-project-form";
import { useLoadingStore } from "@/store/loading-store";
import { useAuthStore } from "@/store/auth-store";

interface DetailProjectProps {
  params: {
    id: string;
  };
}
export default function DetailProject({ params }: DetailProjectProps) {
  const { id } = params;
  const [project, setProject] = useState<ProjectDTO>();
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();
  const { showLoading, hideLoading } = useLoadingStore();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    showLoading();
    try {
      const response = await projectsService.findProject(id);
      setProject(response.data);
      setIsAuthor(response.data.owner.id === user?.id);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Fetching Data",
        description: error.message,
      });
    }
    hideLoading();
  }, [id, showLoading, hideLoading, user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDelete = useCallback(async () => {
    showLoading();
    try {
      const response = await projectsService.deleteProject(id);
      if (response.status === 200) {
        toast({
          title: "Project Deleted",
          description: "Realize your idea again",
        });
        router.push("/protected/projects");
      } else {
        toast({
          variant: "destructive",
          title: "Delete Project Failed",
          description: "You can try later",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delete Project Failed",
        description: error.message,
      });
    }
    hideLoading();
  }, [id, router, hideLoading, showLoading]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="uppercase">{project?.title}</span>
          <div className="flex gap-5">
            {isAuthor && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="self-end">
                  <Button variant="neutral">Edit</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>Edit Project {project?.title}</SheetTitle>
                    <SheetDescription>
                      Bring Your Ideas to Life: Start Your Project Today!
                    </SheetDescription>
                  </SheetHeader>
                  <EditProjectForm
                    setOpen={setOpen}
                    idProject={project?.id || ""}
                    value={{
                      title: project?.title,
                      description: project?.description,
                      key: project?.key,
                    }}
                  />
                </SheetContent>
              </Sheet>
            )}
            {isAuthor && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="neutral">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will delete your
                      project
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          {formatDistanceToNow(
            new Date(project?.createdAt! || new Date().toLocaleString()),
            {
              addSuffix: true,
            }
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="mb-10 font-semibold">{project?.description}</h2>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Tasks</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                All Task
              </TabsTrigger>
              <TabsTrigger
                value="backlog"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Backlog
              </TabsTrigger>
              <TabsTrigger
                value="onprogress"
                className="text-zinc-600 dark:text-zinc-200"
              >
                On Progress
              </TabsTrigger>
              <TabsTrigger
                value="done"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Done
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          {project?.tasks && project?.tasks.length ? (
            <ScrollArea className="h-screen">
              <TabsContent value="all" className="m-0">
                <TaskList tasks={project?.tasks} />
              </TabsContent>
              <TabsContent value="backlog" className="m-0">
                <TaskList
                  tasks={project?.tasks.filter(
                    (it) => it.status === StatusTaskEnum.BACKLOG
                  )}
                />
              </TabsContent>
              <TabsContent value="onprogress" className="m-0">
                <TaskList
                  tasks={project?.tasks.filter(
                    (it) => it.status === StatusTaskEnum.ONPROGRESS
                  )}
                />
              </TabsContent>
              <TabsContent value="done" className="m-0">
                <TaskList
                  tasks={project?.tasks.filter(
                    (it) => it.status === StatusTaskEnum.DONE
                  )}
                />
              </TabsContent>
            </ScrollArea>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Empty Data</CardTitle>
              </CardHeader>
              <CardContent>Task data is empty</CardContent>
            </Card>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

export const dynamicParams = true;
