"use client";

import type { Chat } from "../../../../types/db";

import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MessageProps = {
  chat: Chat;
};

export default function Message({ chat }: MessageProps) {
  return (
    <div
      className={cn(
        "items-top flex space-x-1.5",
        chat.sender === "user" ? "flex-row-reverse" : "flex-row",
        chat.sender,
      )}
    >
      {chat.sender === "system" && (
        <Avatar className="mr-2 mt-2 h-6 w-6 [.other:has(+.other)>&]:opacity-0">
          <AvatarImage src={picPick.src} alt={"pic-pick"} />
          <AvatarFallback />
        </Avatar>
      )}
      <div
        className={cn(
          "flex max-w-[60%] flex-col justify-center space-x-2 space-y-2 rounded-2xl p-4",
          chat.sender === "user"
            ? "bg-black text-white"
            : "bg-[#88888840] text-black",
          "[.me+.me>&]:rounded-br-[0.2rem]",
          "[.me:has(+.me)>&]:rounded-tr-[0.2rem]",
          "[.other+.other>&]:rounded-bl-[0.2rem]",
          "[.other:has(+.other)>&]:rounded-tl-[0.2rem]",
        )}
      >
        <p className="text-sm">{chat.content}</p>
        {/* {chat.options &&
          chat.options.map((option, idx) => (
            <Button className="block" size={"lg"} key={idx}>
              {option}
            </Button>
          ))} */}
      </div>
    </div>
  );
}
