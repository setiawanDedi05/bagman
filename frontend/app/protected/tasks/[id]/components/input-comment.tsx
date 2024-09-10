import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function InputComment() {
  return (
    <Card className="mt-5 py-5 px-0 border-none">
      <CardContent className="flex gap-5">
        <Avatar>
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>
        <Textarea placeholder="Type your comments" />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Comment</Button>
      </CardFooter>
    </Card>
  );
}
