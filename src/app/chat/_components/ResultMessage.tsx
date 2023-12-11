"use client";

import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useChat from "@/hooks/useChat";
import { cn } from "@/lib/utils";

type ResultMessageProps = {
  book:
    | {
        author?: string;
        publishDate?: string;
        topics?: string;
        publisher?: string;
        language: string;
        bookId: string;
        bookName: string;
        epubLink: string;
        pdfLink: string;
      }
    | undefined;
};

export default function ResultMessage({ book }: ResultMessageProps) {
  const { handleGetQuestion } = useChat();

  const isSystemMessage = true;
  const containerClasses = cn("items-top flex space-x-1.5", "flex-row");

  return (
    book && (
      <div className={containerClasses}>
        {isSystemMessage && (
          <Avatar className="mr-2 mt-2 h-6 w-6 [.other:has(+.other)>&]:opacity-0">
            <AvatarImage src={picPick.src} alt="pic-pick" />
            <AvatarFallback />
          </Avatar>
        )}

        <div
          className={
            "my-2 flex flex-col justify-center space-y-2 rounded-xl bg-[#88888840] p-4 text-black"
          }
        >
          <p className="text-sm">Here is our recommendation: </p>
          <div>
            <span>Book Name: </span>
            <span>{book.bookName}</span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button className="block" size="lg">
              Read
            </Button>
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
