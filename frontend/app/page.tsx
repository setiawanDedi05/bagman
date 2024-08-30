"use client";

import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ModeToggle } from "@/components/ui/toggle-theme";

export default function Home() {

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[100vh] max-w-md rounded-lg border min-w-[100%]"
    >
      <ResizablePanel defaultSize={25}>
        <ModeToggle />
        <div className="flex flex-col gap-2 h-full items-center justify-center p-6">
          <Button variant="outline" className="w-full">Dashboard</Button>
          <Button variant="outline" className="w-full">Task</Button>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
