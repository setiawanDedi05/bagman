import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function Activity() {
  return (
    <Card className="py-5 px-2 my-2">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <Avatar>
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <span className="font-bold">Dedi Setiawan</span>
            <span>updated the task status</span>
          </div>
          <span className="text-xs text-mute">
            {formatDistanceToNow(new Date(new Date().toLocaleString()), {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
