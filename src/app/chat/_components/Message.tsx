"use client";

import type { Dispatch, SetStateAction } from "react";

import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useChat from "@/hooks/useChat";
import { cn } from "@/lib/utils";

type MessageProps = {
  chat: {
    id: number;
    userId: number;
    content: string;
    sender: "system" | "user";
    createdAt: Date;
    questionId: number | null;
    options: string[];
  };
  setCount: Dispatch<SetStateAction<number>>;
  setAnswerList: Dispatch<SetStateAction<string[]>>;
  count: number;
};

export default function Message({
  chat,
  setCount,
  count,
  setAnswerList,
}: MessageProps) {
  const { handleGetQuestion, handlePostAnswer } = useChat();

  const isSystemMessage = chat.sender === "system";
  const containerClasses = cn(
    "items-top flex space-x-1.5",
    chat.sender === "user" ? "flex-row-reverse" : "flex-row",
    chat.sender,
  );

  return (
    <div className={containerClasses}>
      {isSystemMessage && (
        <Avatar className="mr-2 mt-2 h-6 w-6 [.other:has(+.other)>&]:opacity-0">
          <AvatarImage src={picPick.src} alt="pic-pick" />
          <AvatarFallback />
        </Avatar>
      )}

      <div
        className={cn(
          "my-2 flex flex-col justify-center space-y-2 rounded-xl p-4",
          chat.sender === "user"
            ? "bg-black text-white"
            : "bg-[#88888840] text-black",
        )}
      >
        <p className="text-sm">{chat.content}</p>
        {chat.questionId && (
          <>
            <div className="max-w-1/4 flex flex-col text-sm">
              {chat.options?.map(
                (option, idx) =>
                  option && (
                    <p key={idx}>
                      {idx + 1}. {option}
                    </p>
                  ),
              )}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {chat.options?.map(
                (option, idx) =>
                  option && (
                    <Button
                      className="block"
                      key={idx}
                      onClick={async (e) => {
                        e.preventDefault();
                        await handlePostAnswer({ answer: `Option ${idx + 1}` });
                        setCount((prev) => prev + 1);
                        setAnswerList((prev) => [...prev, chat.options[idx]]);
                        if (count + 1 < 3) await handleGetQuestion();
                      }}
                    >
                      Option {idx + 1}
                    </Button>
                  ),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
