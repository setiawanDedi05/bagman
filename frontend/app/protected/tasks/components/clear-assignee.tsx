import { Button } from "@/components/ui/button";
import {
  LabelTaskEnum,
  PriorityTaskEnum,
  StatusTaskEnum,
} from "@/services/dto/task-dto";
import { Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface ClearAssigneeProps {
  form: UseFormReturn<{
    title: string;
    description: string;
    status: StatusTaskEnum;
    label: LabelTaskEnum;
    priority: PriorityTaskEnum;
    projectId: string;
    assignees: string;
  }>;
}

export default function ClearAssignee({ form }: ClearAssigneeProps) {
  const onClick = useCallback(() => {
    form.setValue("assignees", "");
  }, [form]);

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="hover:bg-red-400 hover:text-white"
    >
      <Trash2Icon />
    </Button>
  );
}
