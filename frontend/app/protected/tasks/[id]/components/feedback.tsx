import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Comment from "./comments";
import InputComment from "./input-comment";
import Activity from "./activity";

export default function Feedback() {
  return (
    <Tabs defaultValue="comments" className="w-full">
      <TabsList className="grid w-full lg:w-[30%] grid-cols-2">
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="comments">
        <div className="border-2 border-slate p-5 rounded-sm">
          <Comment />
          <Separator className="my-5" />
          <InputComment />
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
