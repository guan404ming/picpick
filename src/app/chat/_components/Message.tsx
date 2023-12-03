"use client";

import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MessageProps = {
  chat: {
    text: string;
    from: "me" | "other";
    options?: string[];
  };
};

export default function Message({ chat }: MessageProps) {
  return (
    <div
      className={cn(
        "items-top flex space-x-1.5",
        chat.from === "me" ? "flex-row-reverse" : "flex-row",
        chat.from,
      )}
    >
      {chat.from === "other" && (
        <Avatar className="mr-2 mt-2 h-6 w-6 [.other:has(+.other)>&]:opacity-0">
          <AvatarImage src={picPick.src} alt={"pic-pick"} />
          <AvatarFallback />
        </Avatar>
      )}
      <div
        className={cn(
          "flex max-w-[60%] flex-col justify-center space-x-2 space-y-2 rounded-2xl p-4",
          chat.from === "me"
            ? "bg-black text-white"
            : "bg-[#88888840] text-black",
          "[.me+.me>&]:rounded-br-[0.2rem]",
          "[.me:has(+.me)>&]:rounded-tr-[0.2rem]",
          "[.other+.other>&]:rounded-bl-[0.2rem]",
          "[.other:has(+.other)>&]:rounded-tl-[0.2rem]",
        )}
      >
        <p className="text-sm">{chat.text}</p>
        {chat.options &&
          chat.options.map((option, idx) => (
            <Button className="block" size={"lg"} key={idx}>
              {option}
            </Button>
          ))}
      </div>
    </div>
  );
}
