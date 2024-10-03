import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PriorityTaskEnum, Task } from "@/services/dto/task-dto";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import parse from "html-react-parser";

interface TaskListProps {
  tasks?: Array<Task>;
}
export default function TaskList({ tasks = [] }: TaskListProps) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const onSearch = useCallback(
    (event: any) => {
      const { value } = event.target;
      console.log(value);
      if (value && value.length > 3) {
        setFilteredTasks(tasks.filter((task) => task.title.includes(value)));
      } else {
        setFilteredTasks(tasks);
      }
    },
    [tasks, setFilteredTasks]
  );

  return (
    <>
      <div className="p-4">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" onKeyUp={onSearch} />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {filteredTasks.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex justify-between align-center">
                <span>{item.title}</span>
                <span className="text-slate-500 text-sm">
                  {formatDistanceToNow(
                    new Date(item.createdAt! || new Date().toLocaleString()),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </CardTitle>
              <CardDescription>
                {item.label}
                {" - "}
                <Badge
                  className="uppercase"
                  variant={
                    item.priority === PriorityTaskEnum.HIGH
                      ? "default"
                      : "neutral"
                  }
                >
                  {item.priority}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {parse(item.description.substring(0, 300))}
            </CardContent>
            <CardFooter className="underline text-xs text-mute">
              {!item.assignees
                ? "has not been assigned to anyone yet"
                : `Assign to ${item.assignees.name}`}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
