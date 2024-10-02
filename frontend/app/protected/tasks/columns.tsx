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
import { useLoadingStore } from "@/store/loading-store";
import { useWebsocket } from "@/store/ws-store";
import { Socket } from "socket.io-client";

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

export function columns(
  user: User | null,
  socket: Socket | null
): ColumnDef<Task>[] {
  console.log({ socket });
  const { showLoading, hideLoading } = useLoadingStore();
  return [
    {
      accessorKey: "project.title",
      header: ({ column }) => {
        return (
          <Button
            className="border-none"
            variant="noShadow"
            showLoading={false}
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
      accessorKey: "label",
      header: ({ column }) => {
        return (
          <Button
            className="border-none"
            variant="noShadow"
            showLoading={false}
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Label
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            className="border-none"
            variant="noShadow"
            showLoading={false}
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
        return (
          <Link href={`/protected/tasks/${row.original.id}`}>
            <span className="max-w-[500px] truncate font-medium underline text-blue-500 hover:no-underline hover:text-black">
              {row.getValue("title")}
            </span>
          </Link>
        );
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            className="border-none"
            variant="noShadow"
            showLoading={false}
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            className="border-none"
            variant="noShadow"
            showLoading={false}
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc", true)
            }
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "assignees.name",
      header: ({ column }) => {
        return (
          <Button
            className="border-none"
            variant="noShadow"
            showLoading={false}
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
          showLoading();
          try {
            const request = {
              id: task.id,
              ...requestData,
            };
            console.log({ socket, request });
            await socket?.emit("assignTask", request);
            // const response = await tasksService.assignToMe(
            //   requestData,
            //   task.id
            // );
            // console.log({ res, response });
            // if (response.status === 200) {
            //   toast({
            //     title: "The Task Assign To You",
            //     description: "Keep on track",
            //   });
            // } else {
            //   toast({
            //     variant: "destructive",
            //     title: "The Task Not Assign To You",
            //     description: "You can try later",
            //   });
            // }
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: "The Task Not Assign To You",
              description: error.message,
            });
          }
          hideLoading();
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
