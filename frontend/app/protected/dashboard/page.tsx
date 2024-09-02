"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectorIcon } from "lucide-react";
import { RecentTask } from "./components/recent-task";
import { dashboardService } from "@/services/dashboard/dashboard-service";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Task } from "@/services/dto/task-dto";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState([]);
  const [recenTask, setRecenTask] = useState([]);
  const [totalTaskThisMonth, setTotalTaskThisMonth] = useState(0);
  const [totalMyTask, setTotalMyTask] = useState({
    backlog: 0,
    onprogress: 0,
    done: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(): Promise<any> {
    try {
      const [backlog, onprogress, done, projects, recenTask, countThisMont] =
        await Promise.all([
          dashboardService.getTotalTask(user?.id!, "backlog"),
          dashboardService.getTotalTask(user?.id!, "onprogress"),
          dashboardService.getTotalTask(user?.id!, "done"),
          dashboardService.allProject(),
          dashboardService.getRecentTask(user?.id!),
          dashboardService.countThisMont(),
        ]);

      setTotalMyTask({
        backlog: backlog.data,
        onprogress: onprogress.data,
        done: done.data,
      });
      setProjects(projects.data);
      setRecenTask(recenTask.data);
      setTotalTaskThisMonth(countThisMont.data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">All Projects</CardTitle>
          <ProjectorIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projects.length}</div>
          <p className="text-xs text-muted-foreground">projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Onprogress Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMyTask.onprogress}</div>
          <p className="text-xs text-muted-foreground">tasks</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalMyTask.backlog + totalMyTask.done + totalMyTask.onprogress}
          </div>
          <p className="text-xs text-muted-foreground">tasks asigned to you</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Backlog Task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMyTask.backlog}</div>
          <p className="text-xs text-muted-foreground">
            Backlog tasks asigned to you
          </p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Task</CardTitle>
          <CardDescription>
            You done {totalTaskThisMonth} tasks this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentTask tasks={recenTask} />
        </CardContent>
      </Card>
    </div>
  );
}
