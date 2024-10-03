import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Comment from "./comments";
import InputComment from "./input-comment";
import Activity from "./activity";
import { CommentDTO } from "@/services/dto/comment-dto";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommentType {
  comments: Array<CommentDTO>;
  taskId: string;
}

export default function Feedback({ comments, taskId }: CommentType) {
  return (
    <Tabs defaultValue="comments" className="w-full">
      <TabsList className="grid w-full lg:w-[30%] grid-cols-2">
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="comments">
        <div className="border-2 border-slate p-5 rounded-sm">
          <ScrollArea className="h-min-[600px]">
            <Comment comments={comments} />
          </ScrollArea>
          <Separator className="my-5" />
          <InputComment taskId={taskId} />
        </div>
      </TabsContent>
      <TabsContent value="activity">
        <div className="border-2 border-slate p-5 rounded-sm">
          <Activity />
        </div>
      </TabsContent>
    </Tabs>
  );
}
