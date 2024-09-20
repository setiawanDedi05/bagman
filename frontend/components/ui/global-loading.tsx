"use client"

import { useLoadingStore } from "@/store/loading-store";

export default function GlobalLoading() {
  const { loading } = useLoadingStore();
  
  if (!loading) {
    return <></>;
  }
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-slate-800 bg-opacity-50 z-10 flex justify-center items-center text-white">
      Loading...
    </div>
  );
}
