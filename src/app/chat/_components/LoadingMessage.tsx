"use client";

import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMessage() {
  return (
    <div className={"items-top flex flex-row space-x-1.5"}>
      <Avatar className="mr-2 mt-2 h-6 w-6 [.other:has(+.other)>&]:opacity-0">
        <AvatarImage src={picPick.src} alt="pic-pick" />
        <AvatarFallback />
      </Avatar>

      <div
        className={
          "my-2 flex flex-col justify-center space-y-2 rounded-xl bg-[#88888840] p-4 text-black dark:text-white"
        }
      >
        <div className="flex space-x-2">
          <Skeleton className="h-2 w-2 rounded-full bg-gray-600" />
          <Skeleton className="h-2 w-2 rounded-full bg-gray-600" />
          <Skeleton className="h-2 w-2 rounded-full bg-gray-600" />
        </div>
      </div>
    </div>
  );
}
