"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { projectsService } from "@/services/projects/projects-service";
import { ProjectDTO } from "@/services/dto/project-dto";
import {
  CreateTaskRequest,
  LabelTaskEnum,
  PriorityTaskEnum,
  StatusTaskEnum,
} from "@/services/dto/task-dto";
import { tasksService } from "@/services/tasks/tasks-service";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "@/components/ui/use-toast";
import CustomEditor from "@/components/ui/editor";
import { Task } from "../columns";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  description: z.string().min(6, {
    message: "password must be at least 6 charachters.",
  }),
  status: z.nativeEnum(StatusTaskEnum),
  label: z.nativeEnum(LabelTaskEnum),
  priority: z.nativeEnum(PriorityTaskEnum),
  projectId: z.string(),
});

interface AddTaskFormProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTotal: Dispatch<SetStateAction<number>>;
}

export default function AddTaskForm({
  setTasks,
  setOpen,
  setTotal,
}: AddTaskFormProps) {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<ProjectDTO[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await projectsService.allProject();
      setProjects(response.data);
      setTotal((prevState: number) => {
        return prevState++;
      });
    } catch (error) {
      throw error;
    }
  }, [setProjects, setTotal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: StatusTaskEnum.BACKLOG,
      label: LabelTaskEnum.FEATURE,
      priority: PriorityTaskEnum.MEDIUM,
      projectId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData: CreateTaskRequest = {
      ...values,
      createdBy: user?.id!,
    };

    try {
      const response = await tasksService.createTask(requestData);
      if (response.status === 201) {
        toast({
          title: "Creating Task Success",
          description: "Realize your idea",
        });
        setOpen(false);
        setTasks((prevState: Task[]) => {
          return [response.data, ...prevState];
        });
      } else {
        toast({
          variant: "destructive",
          title: "Creating Task Failed",
          description: "You can try later",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Creating Task Failed",
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-start mt-10"
      >
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project: ProjectDTO) => {
                    return (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Input placeholder="bagman" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={StatusTaskEnum.BACKLOG}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onprogress">In Progress</SelectItem>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={LabelTaskEnum.FEATURE}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={PriorityTaskEnum.MEDIUM}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <CustomEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full lg:w-[200px]">
          Submit
        </Button>
      </form>
    </Form>
  );
}
