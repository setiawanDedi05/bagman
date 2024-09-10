import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function Comment() {
  return (
    <Card className="py-5 px-2">
      <CardContent>
        <div className="flex gap-5 items-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>Setiawan Dedi</span>
            <span className="text-xs text-mute">
              {formatDistanceToNow(new Date(new Date().toLocaleString()), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <p className="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          facere dicta minus, quas ullam molestias. Doloremque quae minus
          quaerat nostrum eum, maxime ea illo neque officia accusamus magni rem
          nisi!
        </p>
      </CardContent>
    </Card>
  );
}
