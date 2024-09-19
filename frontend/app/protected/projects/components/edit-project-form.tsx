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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { projectsService } from "@/services/projects/projects-service";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  description: z.string().optional(),
  key: z.string().max(3, {
    message: "key must be 3 or less",
  }),
});

interface EditProjectFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  idProject: string;
  value: {
    title?: string;
    description?: string;
    key?: string;
  };
}

export default function EditProjectForm({
  setOpen,
  value,
  idProject,
}: EditProjectFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: value?.title,
      description: value?.description,
      key: value?.key,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await projectsService.updateProject(values, idProject);
      setOpen(false);
      if (response.status === 200) {
        toast({
          title: "Updating Project Success",
          description: "Realize your idea",
        });
        router.push("/protected/projects");
      } else {
        toast({
          variant: "destructive",
          title: "Updating Project Failed",
          description: "You can try later",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Updating Project Failed",
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
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="bagman" {...field} />
              </FormControl>
              <FormMessage />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel>Key</FormLabel>
              <FormControl>
                <Input placeholder="BAG" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full lg:w-[200px]">Submit</Button>
      </form>
    </Form>
  );
}
