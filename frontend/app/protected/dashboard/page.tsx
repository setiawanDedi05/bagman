import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectorIcon } from "lucide-react";
import { RecentTask } from "./components/recent-task";

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <ProjectorIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11</div>
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
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">
              tasks asigned to you
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backlog Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">
              Backlog tasks asigned to you
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Task</CardTitle>
            <CardDescription>You done 200 tasks this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTask />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
