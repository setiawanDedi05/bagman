"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { labels, priorities, statuses } from "./utils/mapper";
import { Badge } from "@/components/ui/badge";
import {
  AssignToMeRequest,
  LabelTaskEnum,
  PriorityTaskEnum,
  StatusTaskEnum,
} from "@/services/dto/task-dto";
import { ProjectDTO } from "@/services/dto/project-dto";
import Link from "next/link";
import { User } from "@/services/dto/user";
import { tasksService } from "@/services/tasks/tasks-service";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/auth-store";

export type Task = {
  id: string;
  title: string;
  description?: string;
  label: LabelTaskEnum;
  priority: PriorityTaskEnum;
  status: StatusTaskEnum;
  project?: ProjectDTO;
  assignees?: User;
  createdAt: string;
  updatedAt: string;
};

export function columns(user: User | null): ColumnDef<Task>[] {
  return [
    {
      accessorKey: "project.title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Project
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <Link href={`/protected/projects/${row.original.project?.id}`}>
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium underline text-blue-500 hover:no-underline hover:text-black">
                {row.original.project?.title}
              </span>
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Summary
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const label = labels.find(
          (label) => label.value === row.original.label
        );

        return (
          <Link href={`/protected/tasks/${row.original.id}`}>
            <div className="flex space-x-2">
              {label && <Badge variant="outline">{label.label}</Badge>}
              <span className="max-w-[500px] truncate font-medium underline text-blue-500 hover:no-underline hover:text-black">
                {row.getValue("title")}
              </span>
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const priority = priorities.find(
          (priority) => priority.value === row.getValue("priority")
        );

        if (!priority) {
          return null;
        }

        return (
          <div className="flex items-center">
            {priority.icon && (
              <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{priority.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status")
        );

        if (!status) {
          return null;
        }

        return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "assignees.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Assignee
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const task = row.original;
        return (
          <div className="flex gap-5">
            {!task.assignees ? "not been assigned" : task.assignees.name}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const task = row.original;
        async function assignToMe() {
          const requestData: AssignToMeRequest = {
            assignees: user?.id!,
          };

          try {
            const response = await tasksService.assignToMe(
              requestData,
              task.id
            );
            if (response.status === 200) {
              toast({
                title: "The Task Assign To You",
                description: "Keep on track",
              });
            } else {
              toast({
                variant: "destructive",
                title: "The Task Not Assign To You",
                description: "You can try later",
              });
            }
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "The Task Not Assign To You",
              description: error.message,
            });
          }
        }

        return (
          <div className="flex gap-5">
            {!task.assignees && (
              <Button onClick={assignToMe}>Assign To Me</Button>
            )}
          </div>
        );
      },
    },
  ];
}
