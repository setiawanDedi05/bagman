"use client";

import { useCallback, useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import { tasksService } from "@/services/tasks/tasks-service";
import { useSearchParams } from "next/navigation";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const queryParams = useSearchParams();
  const page = queryParams.get("page");

  const fetchData = useCallback(async (page: string) => {
    try {
      const response = await tasksService.allTask(page);
      setTasks(response.data.content);
      setTotalTasks(response.data.total_data);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchData(page || "1");
  }, [page, fetchData]);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={tasks}
        total={totalTasks}
        setTasks={setTasks}
        setTotal={setTotalTasks}
      />
    </div>
  );
}
