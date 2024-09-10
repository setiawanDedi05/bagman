"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddTaskForm from "./components/add-task-form";
import { Task } from "./columns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  total: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setTasks,
  total,
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const queryParams = useSearchParams();
  const page = queryParams.get("page");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="w-[10em]">
            <Button>Create</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70%] overflow-scroll">
            <SheetHeader>
              <SheetTitle>Create Task</SheetTitle>
              <SheetDescription>
                Keep the Momentum: Add a Task and Stay on Track!
              </SheetDescription>
            </SheetHeader>
            <AddTaskForm setOpen={setOpen} setTasks={setTasks} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {Math.ceil(total / 10) > 1 && (
        <Pagination className="mt-5 flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  page ? `/protected/tasks?page=${parseInt(page) - 1}` : "#"
                }
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(total / 10) }, (_, index) => (
              <PaginationItem>
                <PaginationLink href={`/protected/tasks?page=${index + 1}`}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={
                  !page && parseInt(page || "1") < Math.ceil(total / 10)
                    ? `/protected/tasks?page=${parseInt(page || "1") + 1}`
                    : "#"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
