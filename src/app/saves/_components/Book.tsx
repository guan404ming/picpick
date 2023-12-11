"use client";

import Image from "next/image";

import { Bookmark } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { SelectFavourite, SelectBook } from "@/lib/types/db";

import BookDialogContent from "./BookDialogContent";

type BookProps = {
  book: {
    FAVOURITE: SelectFavourite;
    BOOK: SelectBook;
  };
};

export default function Book({ book }: BookProps) {
  return (
    <Dialog>
      <Card className="w-[300px] text-center drop-shadow max-sm:w-[200px]">
        <CardHeader>
          <CardTitle className="text-md mb-2 flex justify-between">
            <p className="max-w-[80%] truncate">{book.BOOK.bookName}</p>
            <Bookmark className="cursor-pointer" width={20} />
          </CardTitle>
        </CardHeader>
        <DialogTrigger>
          <CardContent className="w-[250px] cursor-pointer max-sm:w-[150px]">
            <AspectRatio ratio={4 / 5} className="bg-muted">
              <Image
                src={"/book1.jpg"}
                alt="Photo by Drew Beamer"
                fill
                sizes={"250"}
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </CardContent>
        </DialogTrigger>
        <CardFooter>
          <Progress
            value={Math.floor(Math.random() * 100)}
            className="mx-4 h-2"
          />
        </CardFooter>
      </Card>

      <BookDialogContent book={book.BOOK}></BookDialogContent>
    </Dialog>
  );
}
