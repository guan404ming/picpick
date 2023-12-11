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

type BookProps = {
  book: {
    bookName: string | null;
    author: string | null;
    publishDate: string | null;
    topics: string | null;
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
            <p className="max-w-[80%] truncate">{book.bookName}</p>
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

      <DialogContent className="flex max-w-[800px] justify-between p-12 max-md:max-w-[400px] max-md:flex-col md:space-x-10">
        <div className="w-full space-y-5">
          <div className="mb-2 flex justify-between font-bold">
            <p className="max-w-[300px]">{book.bookName}</p>
            <Bookmark className="cursor-pointer" />
          </div>
          <div className="flex flex-col space-y-3">
            <div className="grid w-5/6 grid-cols-2">
              <span className="mr-5 font-bold">By:</span>
              <span>{book.author}</span>
            </div>
            <div className="grid w-5/6 grid-cols-2">
              <span className="mr-5 font-bold">Topics: </span>
              <span>{book.topics}</span>
            </div>
            <div className="grid w-5/6 grid-cols-2">
              <span className="mr-5 font-bold">Publish Date:</span>
              <span>{book.publishDate}</span>
            </div>
          </div>
        </div>

        <div className="flex w-[500px] flex-col space-y-5 bg-[#E9E9E9] p-10 max-md:mx-[auto] max-md:max-w-[250px]">
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
