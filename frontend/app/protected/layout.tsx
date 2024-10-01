"use client";

import { Nav } from "@/components/nav";
import { HeaderNav } from "@/components/ui/header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { toast } from "@/components/ui/use-toast";
import { UserNav } from "@/components/ui/user-nav";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LucidePaperclip, ProjectorIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ProgressLoader } from "nextjs-progressloader";
import { useWebsocket } from "@/store/ws-store";

const defaultLayout = [20, 32, 48];

export default function ProtectedPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { init } = useWebsocket();
  const pathname = usePathname().split("/")[2];
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data) {
            const { notification } = event.data;
            toast({
              title: notification.title,
              description: notification.body,
            });
          }
        });
      }
    }
    init();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="w-full">
        <ProgressLoader />
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
                    variant: pathname === "dashboard" ? "default" : "neutral",
                    to: "/protected/dashboard",
                  },
                  {
                    title: "Project",
                    label: "",
                    icon: ProjectorIcon,
                    variant: pathname === "projects" ? "default" : "neutral",
                    to: "/protected/projects",
                  },
                  {
                    title: "Task",
                    label: "",
                    icon: LucidePaperclip,
                    variant: pathname === "tasks" ? "default" : "neutral",
                    to: "/protected/tasks",
                  },
                ]}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex flex-col h-full items-start justify-start p-6">
                <h2 className="text-xl uppercase mb-10 font-bold">
                  {pathname}
                </h2>
                {children}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          <div className="border-t w-full bg-slate-900 text-white flex justify-center text-slate fixed bottom-0">
            bagman@2024
          </div>
        </div>
      </section>
    </Suspense>
  );
}
