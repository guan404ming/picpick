"use client";

import { useState } from "react";

import Image from "next/image";

import dayjs from "dayjs";
import { Bookmark } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import useFavourite from "@/hooks/useFavourite";
import type { SelectFavourite, SelectBook } from "@/lib/types/db";
import { cn } from "@/lib/utils";

import BookDialogContent from "./BookDialogContent";

type BookProps = {
  book: {
    FAVOURITE: SelectFavourite;
    BOOK: SelectBook;
  };
};

export default function Book({ book }: BookProps) {
  const [saved, setSaved] = useState(true);
  const { postFavourite } = useFavourite();

  return (
    <Dialog>
      <Card className="w-[300px] text-center drop-shadow max-sm:w-[200px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-md mb-2 flex items-start justify-between">
            <div className="flex max-w-[80%] flex-col truncate text-left">
              <p>{book.BOOK.bookName}</p>
              <p className="text-sm font-light text-gray-400">{`${dayjs(
                book.FAVOURITE.createdAt,
              ).format("MM / DD / YYYY ")}`}</p>
            </div>

            <Bookmark
              onClick={() => {
                postFavourite({ bookId: book.BOOK.id });
                setSaved(!saved);
              }}
              className={cn(
                "mt-1 cursor-pointer",
                `${saved ? "fill-black dark:fill-white" : "fill-none"}`,
              )}
              width={20}
            ></Bookmark>
          </CardTitle>
        </CardHeader>
        <DialogTrigger>
          <CardContent className="w-[250px] cursor-pointer max-sm:w-[150px]">
            <AspectRatio ratio={4 / 5} className="bg-muted">
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/quiztory-f5e09.appspot.com/o/cover%2F${book.BOOK.bookId}.jpg?alt=media`}
                alt="Photo by Drew Beamer"
                fill
                sizes={"250"}
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </CardContent>
        </DialogTrigger>
      </Card>

      <BookDialogContent
        book={book.BOOK}
        dep={saved}
        setDep={setSaved}
      ></BookDialogContent>
    </Dialog>
  );
}
