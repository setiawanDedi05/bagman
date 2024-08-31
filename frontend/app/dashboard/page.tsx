"use client";
import { Nav } from "@/components/nav";
import { HeaderNav } from "@/components/ui/header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { UserNav } from "@/components/ui/user-nav";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { LayoutDashboard, LucidePaperclip, ProjectorIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultLayout = [20, 32, 48];

export default function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, []);

  if(!user){
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />
  }

  return (
    <section className="w-full">
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <HeaderNav />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full min-h-[88vh] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={4}
            collapsible
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true
              )}`;
            }}
            onResize={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <div
              className={cn(
                "flex h-[52px] items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2"
              )}
            >
              <ModeToggle />
            </div>
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Dashboard",
                  label: "",
                  icon: LayoutDashboard,
                  variant: "ghost",
                },
                {
                  title: "Project",
                  label: "",
                  icon: ProjectorIcon,
                  variant: "ghost",
                },
                {
                  title: "Task",
                  label: "",
                  icon: LucidePaperclip,
                  variant: "ghost",
                },
              ]}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="border-t flex justify-center text-slate">
          bagman@2024
        </div>
      </div>
    </section>
  );
}
