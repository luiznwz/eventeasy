import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, MapPin, Users } from "lucide-react";

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-md border border-gray-200">
      <div className="flex-1 h-[12rem] relative">
        <Skeleton className="w-full h-full rounded-t-md" />
        <Skeleton className="absolute top-2 right-2 w-16 h-5 rounded-full" />
      </div>
      <div className="p-4 flex w-full h-fit flex-col justify-between text-black space-y-1">
        <div className="space-y-3 text-sm h-[10rem]">
          <Skeleton className="h-7 w-3/4" />
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <div className="flex gap-4">
          <Skeleton className="w-full h-10 mt-3" />
          <Skeleton className="w-full h-10 mt-3" />
        </div>
      </div>
    </div>
  );
}
