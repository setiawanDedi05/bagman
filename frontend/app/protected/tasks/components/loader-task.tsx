import { Skeleton } from "@/components/ui/skeleton";

export default function LoaderTask() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between">
        <Skeleton className="h-[50px] w-[80%] rounded-xl" />
        <Skeleton className="h-[50px] w-[10%] rounded-xl" />
      </div>
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  );
}
