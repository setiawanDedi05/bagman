"use client"

import { useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import { tasksService } from "@/services/tasks/tasks-service";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await tasksService.allTask();
      setTasks(response.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
