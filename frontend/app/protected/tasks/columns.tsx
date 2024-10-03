"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LabelTaskEnum,
  PriorityTaskEnum,
  StatusTaskEnum,
} from "@/services/dto/task-dto";
import { ProjectDTO } from "@/services/dto/project-dto";
import Link from "next/link";
import { User } from "@/services/dto/user";
import { CommentDTO } from "@/services/dto/comment-dto";
import { MapperLabel, MapperPriority, MapperStatus } from "@/lib/utils";

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
  comments: Array<CommentDTO>;
};

export function columns(assignToMe: (task: Task) => void): ColumnDef<Task>[] {
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
              <span className="max-w-[500px] truncate font-medium underline hover:no-underline hover:text-black">
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
      cell: ({ row }) => {
        return (
          <Badge variant={MapperLabel(row.getValue("label"))}>{row.getValue("label")}</Badge>
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
            <span className="max-w-[500px] truncate font-medium underline hover:no-underline hover:text-black">
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
      cell: ({ row }) => {
        return (
          <Badge variant={MapperPriority(row.getValue("priority"))}>{row.getValue("priority")}</Badge>
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
      cell: ({ row }) => {
        return (
          <Badge variant={MapperStatus(row.getValue("status"))}>{row.getValue("status")}</Badge>
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

        return (
          <div className="flex gap-5">
            {!task.assignees && (
              <Button onClick={() => assignToMe(task)}>Assign To Me</Button>
            )}
          </div>
        );
      },
    },
  ];
}
