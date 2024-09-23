"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import { tasksService } from "@/services/tasks/tasks-service";
import { useSearchParams } from "next/navigation";
import LoaderTask from "./components/loader-task";
import { useAuthStore } from "@/store/auth-store";
import { useLoadingStore } from "@/store/loading-store";

export default function TasksPage() {
  const { user } = useAuthStore();
  const { showLoading, hideLoading } = useLoadingStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const queryParams = useSearchParams();
  const page = queryParams.get("page");

  const fetchData = useCallback(async (page: string) => {
    showLoading();
    try {
      const response = await tasksService.allTask(page);
      setTasks(response.data.content);
      setTotalTasks(response.data.total_data);
    } catch (error) {
      throw error;
    }
    hideLoading();
  }, [hideLoading, showLoading]);

  useEffect(() => {
    fetchData(page || "1");
  }, [page, fetchData]);

  return (
    <Suspense fallback={<LoaderTask />}>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns(user)}
          data={tasks}
          total={totalTasks}
          setTasks={setTasks}
          setTotal={setTotalTasks}
        />
      </div>
    </Suspense>
  );
}
