"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import parse from "html-react-parser";
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
import { tasksService } from "@/services/tasks/tasks-service";
import { Badge } from "@/components/ui/badge";
import { MapperLabel, MapperPriority, MapperStatus } from "@/lib/utils";
import Feedback from "./components/feedback";
import EditTaskForm from "../components/edit-task-form";
import { Task } from "../columns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StatusTaskEnum } from "@/services/dto/task-dto";
import { useLoadingStore } from "@/store/loading-store";
import { useAuthStore } from "@/store/auth-store";

interface DetailTaskProps {
  params: {
    id: string;
  };
}
export default function DetailTask({ params }: DetailTaskProps) {
  const { id } = params;
  const { showLoading, hideLoading } = useLoadingStore();
  const { user } = useAuthStore();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [isAssignee, setIsAssignee] = useState<boolean>(false);
  const [task, setTask] = useState<Task>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    showLoading();
    try {
      const response = await tasksService.detailTask(id);
      setTask(response.data);
      setIsAssignee(
        response.data.assignees && response.data.assignees.id === user?.id
      );
      setIsAuthor(response.data.project.owner.id === user?.id);
    } catch (error) {
      throw error;
    }
    hideLoading();
  }, [id, showLoading, hideLoading, user?.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDelete = useCallback(async () => {
    showLoading();
    try {
      const response = await tasksService.deleteTask(id);
      if (response.status === 200) {
        toast({
          title: "Taslk Deleted",
          description: "Realize your idea again",
        });
        router.push("/protected/tasks");
      } else {
        toast({
          variant: "destructive",
          title: "Delete Task Failed",
          description: "You can try later",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delete Task Failed",
        description: error.message,
      });
    }
    hideLoading();
  }, [id, router, hideLoading, showLoading]);

  const handleChangeStatus = useCallback(
    async (status: string) => {
      showLoading();
      try {
        await tasksService.changeStatus({ status }, id);
        fetchData();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Change Status Failed",
          description: error.message,
        });
      }
      hideLoading();
    },
    [id, showLoading, hideLoading, fetchData]
  );

  return (
    <>
      {!task ? (
        <>Ups!, Unknow Id</>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">
                    {task?.project?.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{task?.id}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <CardTitle className="flex flex-col gap-5 md:flex-row justify-between md:items-center">
              <div className="flex flex-col">
                <span className="uppercase mb-2">{task?.title}</span>
                <div className="flex gap-2">
                  <Badge variant={MapperStatus(task.status)}>
                    <span className="capitalize">{task?.status}</span>
                  </Badge>
                </div>
              </div>
              <div className="flex gap-5">
                {task.status === StatusTaskEnum.BACKLOG && isAssignee && (
                  <Button
                    variant="neutral"
                    onClick={() =>
                      handleChangeStatus(StatusTaskEnum.ONPROGRESS)
                    }
                  >
                    On Progress
                  </Button>
                )}
                {task.status === StatusTaskEnum.ONPROGRESS && isAssignee && (
                  <Button
                    variant="neutral"
                    onClick={() => handleChangeStatus(StatusTaskEnum.DONE)}
                  >
                    Done
                  </Button>
                )}
                {isAuthor && (
                  <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger className="self-end">
                      <Button variant="neutral">Edit</Button>
                    </SheetTrigger>
                    <SheetContent
                      side="bottom"
                      className="h-[70%] overflow-scroll"
                    >
                      <SheetHeader>
                        <SheetTitle>Edit Task {task?.title}</SheetTitle>
                        <SheetDescription>
                          Bring Your Ideas to Life: Start Your Task Today!
                        </SheetDescription>
                      </SheetHeader>
                      <EditTaskForm
                        setTask={setTask}
                        setOpen={setOpen}
                        task={task}
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
                          Task
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
                new Date(task?.createdAt! || new Date().toLocaleString()),
                {
                  addSuffix: true,
                }
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Details</AccordionTrigger>
                <AccordionContent>
                  <div className="w-[20%] flex flex-col gap-5">
                    <div className="flex justify-between">
                      <span>Type</span>
                      <Badge variant={MapperLabel(task?.label)}>
                        <span className="capitalize">{task?.label}</span>
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority</span>
                      <Badge variant={MapperPriority(task?.priority)}>
                        <span className="capitalize">{task?.priority}</span>
                      </Badge>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Peoples</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full lg:w-[20%] flex flex-col gap-5">
                    <div className="flex justify-between">
                      <span>Reporter</span>
                      <span>{task?.project?.owner.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assignee</span>
                      <span>{task?.assignees?.username}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Descriptions</AccordionTrigger>
                <AccordionContent>
                  <h3 className="mb-10 text-sm">
                    {parse(task?.description || "")}
                  </h3>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Dates</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full lg:w-[30%] flex flex-col gap-5">
                    <div className="flex justify-between">
                      <span>Created</span>
                      <span>{task?.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Updated</span>
                      <span>{task?.updatedAt}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Activity</AccordionTrigger>
                <AccordionContent>
                  <Feedback comments={task.comments} taskId={task.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export const dynamicParams = true;
