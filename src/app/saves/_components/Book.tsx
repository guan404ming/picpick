"use client";

import { useState } from "react";

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
import useFavourite from "@/hooks/useFavourite";
import type { SelectFavourite, SelectBook } from "@/lib/types/db";

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
        <CardHeader>
          <CardTitle className="text-md mb-2 flex justify-between">
            <p className="max-w-[80%] truncate">{book.BOOK.bookName}</p>
            <Bookmark
              onClick={() => {
                postFavourite({ bookId: book.BOOK.id });
                setSaved(!saved);
              }}
              className="cursor-pointer"
              width={20}
              fill={saved ? "true" : "none"}
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
        <CardFooter>
          <Progress
            value={Math.floor(Math.random() * 100)}
            className="mx-4 h-2"
          />
        </CardFooter>
      </Card>

      <BookDialogContent
        book={book.BOOK}
        dep={saved}
        setDep={setSaved}
      ></BookDialogContent>
    </Dialog>
  );
}
