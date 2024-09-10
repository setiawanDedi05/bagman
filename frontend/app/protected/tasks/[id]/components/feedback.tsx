import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import Comment from "./comments";
import InputComment from "./input-comment";
import Activity from "./activity";

export default function Feedback() {
  return (
    <Tabs defaultValue="comments" className="w-full">
      <TabsList className="grid w-[30%] grid-cols-2">
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
