"use client";

import { useCallback, useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import { tasksService } from "@/services/tasks/tasks-service";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useLoadingStore } from "@/store/loading-store";
import { toast } from "@/components/ui/use-toast";
import { useWebsocket } from "@/store/ws-store";
import { AssignToMeRequest } from "@/services/dto/task-dto";

export default function TasksPage() {
  const { user } = useAuthStore();
  const { showLoading, hideLoading, loading } = useLoadingStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const { socket } = useWebsocket();
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

  async function assignToMe(task: Task) {
    const requestData: AssignToMeRequest = {
      assignees: user?.id!,
    };
    showLoading();
    try {
      const request = {
        id: task.id,
        ...requestData,
      };

      await socket?.emit("assignTask", request);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "The Task Not Assign To You",
        description: error.message,
      });
    }
    hideLoading();
  }

  useEffect(() => {
    fetchData();
    socket?.on("taskAssigned", (task) => {
      setTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          const updatedTasks = [...prevTasks];
          updatedTasks[taskIndex] = task;
          return updatedTasks;
        }
        return [...prevTasks, task];
      });
    });
  }, [fetchData, setTasks, socket]);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns(assignToMe)}
        data={tasks}
        total={totalTasks}
        setTasks={setTasks}
        setTotal={setTotalTasks}
      />
    </div>
  );
}
