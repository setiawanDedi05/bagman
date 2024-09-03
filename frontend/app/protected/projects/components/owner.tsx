import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/services/dto/user";

interface OwnerProps {
  data: User;
}
export function Owner({ data }: OwnerProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{data.username.slice(0,2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs font-medium leading-none">{data.username}</p>
          <p className="text-xs text-muted-foreground">{data.email}</p>
        </div>
      </div>
      <span className="text-xs font-medium leading-none">Owner</span>
    </div>
  );
}
