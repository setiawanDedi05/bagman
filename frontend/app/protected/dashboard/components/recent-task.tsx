import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Task } from "@/services/dto/task-dto";

interface RecenTaskProps {
  tasks: Task[];
}

export function RecentTask({ tasks }: RecenTaskProps) {
  return (
    <div className="space-y-8">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {task.createdBy.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {task.createdBy.username}
              </p>
              <p className="text-sm text-muted-foreground">
                {task.createdBy.email}
              </p>
            </div>
            <div className="ml-auto font-medium">
              <p className="text-sm font-medium leading-none">{task.title}</p>
              <p className="text-sm text-muted-foreground text-end">
                {task.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
