import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Member() {
  return (
    <div className="flex flex-col gap-5 overflow-scroll">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-medium leading-none">Sofia Davis</p>
            <p className="text-xs text-muted-foreground">m@example.com</p>
          </div>
        </div>
        <span className="text-xs font-medium leading-none">Owner</span>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/02.png" />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-medium leading-none">Jackson Lee</p>
            <p className="text-xs text-muted-foreground">p@example.com</p>
          </div>
        </div>
        <span className="text-xs font-medium leading-none">Member</span>
      </div>
    </div>
  );
}
