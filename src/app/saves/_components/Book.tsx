"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Bookmark } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import type { SelectFavourite, SelectBook } from "@/lib/types/db";

type BookProps = {
  book: {
    FAVOURITE: SelectFavourite;
    BOOK: SelectBook;
  };
};

export default function Book({ book }: BookProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
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

      <DialogContent className="flex max-w-[80%] justify-between p-12 max-md:p-10 max-sm:flex-col max-sm:text-xs sm:min-w-[90%] md:min-w-[70%] md:space-x-10 lg:min-w-[40%] lg:max-w-[40%]">
        <div className="space-y-5">
          <div className="mb-2 font-bold max-sm:items-center">
            {book.BOOK.bookName}
          </div>
          <div className="flex flex-col space-y-3">
            <div className="grid w-5/6 grid-cols-2">
              <span className="mr-5 font-bold">By:</span>
              <span>{book.BOOK.bookName}</span>
            </div>
            <div className="grid w-5/6 grid-cols-2">
              <span className="mr-5 font-bold">Topics: </span>
              <span>{book.BOOK.bookName}</span>
            </div>
            <div className="grid w-5/6 grid-cols-2">
              <span className="mr-5 font-bold">Publish Date:</span>
              <span>{book.BOOK.bookName}</span>
            </div>
          </div>
        </div>

        <div className="flex min-w-[200px] flex-col space-y-5 bg-[#E9E9E9] p-10 max-md:mx-[auto] max-md:p-6">
          <Link href={"/book/123"}>
            <AspectRatio ratio={4 / 5} className="bg-muted">
              <Image
                src={"/book1.jpg"}
                alt="Photo by Drew Beamer"
                fill
                sizes={"100"}
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </Link>

          <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
