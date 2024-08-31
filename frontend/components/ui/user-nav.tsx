import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { authService } from "@/services/auth/authService";
import { toast } from "./use-toast";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export function UserNav() {
  const { user, removeSeason } = useAuthStore();
  const router = useRouter();

  async function onClick() {
    try {
      const response = await authService.logout();
      if (response.status === 200) {
        toast({
          title: "Logout Success",
          description: "see you on the bag",
        });
        removeSeason();
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Logout Failed",
          description: "Something wrong",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
    }
  }
  if(user === null) {
    return <></>
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/avatars/01.png"
              alt={`avatar-${user!.username}`}
            />
            <AvatarFallback>{user!.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user!.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user!.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClick}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
