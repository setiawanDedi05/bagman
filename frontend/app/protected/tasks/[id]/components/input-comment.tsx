import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CommentRequest } from "@/services/dto/comment-dto";
import { useAuthStore } from "@/store/auth-store";
import { useLoadingStore } from "@/store/loading-store";
import { useWebsocket } from "@/store/ws-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
});

export default function InputComment({ taskId }: { taskId: string }) {
  const { socket } = useWebsocket();
  const { showLoading, hideLoading } = useLoadingStore();
  const { user } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData: CommentRequest = {
      ...values,
      taskId: taskId,
      userId: user?.id!,
    };
    showLoading();
    try {
      await socket?.emit("createComment", requestData);
      form.reset()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Comment Task Failed",
        description: error.message,
      });
    }
    hideLoading();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mt-5 py-5 px-0 border-none">
          <CardContent className="flex w-full gap-5">
            <Avatar>
              <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full justify-start items-start">
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your comments"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Comment</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
