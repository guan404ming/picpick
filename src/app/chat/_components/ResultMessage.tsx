"use client";

import { useState } from "react";

import Link from "next/link";

import BookDialogContent from "@/app/saves/_components/BookDialogContent";
import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };
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
            <Link href={`/book/${message.BOOK.id}`}>
              <Button className="block w-full" size="lg">
                Read
              </Button>
            </Link>

            <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
              <DialogTrigger className="disabled:opacity-50, inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none">
                More
              </DialogTrigger>
              <BookDialogContent book={message.BOOK}></BookDialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    )
  );
}
