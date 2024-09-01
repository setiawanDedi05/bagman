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
import { UserNav } from "@/components/ui/user-nav";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LucidePaperclip, ProjectorIcon } from "lucide-react";
import { useState } from "react";

const defaultLayout = [20, 32, 48];

export default function ProtectedPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(true);

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
                  to: "/protected/dashboard",
                },
                {
                  title: "Project",
                  label: "",
                  icon: ProjectorIcon,
                  variant: "ghost",
                  to: "/protected/projects",
                },
                {
                  title: "Task",
                  label: "",
                  icon: LucidePaperclip,
                  variant: "ghost",
                  to: "/protected/tasks",
                },
              ]}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-start justify-start p-6">
              {children}
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
