"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { mapperLabelBadge, mapperPriorityBadge } from "@/lib/utils";
import Feedback from "./components/feedback";
import EditTaskForm from "../components/edit-task-form";
import { Task } from "../columns";

interface DetailTaskProps {
  params: {
    id: string;
  };
}
export default function DetailTask({ params }: DetailTaskProps) {
  const { id } = params;
  const [task, setTask] = useState<Task>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const response = await tasksService.detailTask(id);
      setTask(response.data);
    } catch (error) {
      throw error;
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDelete = useCallback(async () => {
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
  }, [id, router]);

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="uppercase mb-2">{task?.title}</span>
            <div className="flex gap-2">
              <Badge variant={mapperLabelBadge(task?.label)}>
                <span className="capitalize">{task?.label}</span>
              </Badge>
              <Badge variant={mapperPriorityBadge(task?.priority)}>
                <span className="capitalize">{task?.priority}</span>
              </Badge>
            </div>
          </div>
          <div className="flex gap-5">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="self-end">
                <Button variant="outline">Edit</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Edit Task {task?.title}</SheetTitle>
                  <SheetDescription>
                    Bring Your Ideas to Life: Start Your Task Today!
                  </SheetDescription>
                </SheetHeader>
                <EditTaskForm setTask={setTask} setOpen={setOpen} task={task} />
              </SheetContent>
            </Sheet>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will delete your Task
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
        <h2>Description</h2>
        <h3 className="mb-10 text-sm">{parse(task?.description || "")}</h3>
      </CardContent>
      <CardFooter>
        <Feedback />
      </CardFooter>
    </Card>
  );
}
