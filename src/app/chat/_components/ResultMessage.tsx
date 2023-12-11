"use client";

import Link from "next/link";

import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useChat from "@/hooks/useChat";
import type { SelectBook, SelectMessage, SelectQuestion } from "@/lib/types/db";

type ResultMessageProps = {
  message: {
    MESSAGE: SelectMessage;
    BOOK: SelectBook | null;
    QUESTION: SelectQuestion | null;
    options: string[];
  };
};

export default function ResultMessage({ message }: ResultMessageProps) {
  const { handleGetQuestion } = useChat();

  return (
    message.BOOK && (
      <div className={"items-top flex flex-row space-x-1.5"}>
        <Avatar className="mr-2 mt-2 h-6 w-6 [.other:has(+.other)>&]:opacity-0">
          <AvatarImage src={picPick.src} alt="pic-pick" />
          <AvatarFallback />
        </Avatar>

        <div
          className={
            "my-2 flex flex-col justify-center space-y-2 rounded-xl bg-[#88888840] p-4 text-black"
          }
        >
          <p className="text-sm">Here is our recommendation: </p>
          <div>
            <span>Book Name: </span>
            <span>{message.BOOK.bookName}</span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link href={`/message/${message.BOOK.id}`}>
              <Button className="block w-full" size="lg">
                Read
              </Button>
            </Link>

            <Button
              className="block"
              size="lg"
              onClick={async (e) => {
                e.preventDefault();
                await handleGetQuestion();
              }}
            >
              More
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
