"use client";

import { useCallback, useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import { tasksService } from "@/services/tasks/tasks-service";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useLoadingStore } from "@/store/loading-store";
import { toast } from "@/components/ui/use-toast";

export default function TasksPage() {
  const { user } = useAuthStore();
  const { showLoading, hideLoading } = useLoadingStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const queryParams = useSearchParams();
  const page = queryParams.get("page");

  const fetchData = useCallback(async () => {
    showLoading();
    try {
      const response = await tasksService.allTask(page || "1");
      setTasks(response.data.content);
      setTotalTasks(response.data.total_data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Fetching Data",
        description: error.message,
      });
    }
    hideLoading();
  }, [hideLoading, showLoading, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns(user)}
        data={tasks}
        total={totalTasks}
        setTasks={setTasks}
        setTotal={setTotalTasks}
      />
    </div>
  );
}
