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
    id: number;
    title: string;
    image: string;
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
      <Card className="w-[300px] text-center drop-shadow">
        <CardHeader>
          <CardTitle className="mb-2 flex justify-between">
            {book.title}
            <Bookmark className="cursor-pointer" />
          </CardTitle>
        </CardHeader>
        <DialogTrigger>
          <CardContent className="w-[250px] cursor-pointer">
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

      <DialogContent className="flex min-w-[800px] justify-between space-x-10 p-12">
        <div className="w-full">
          <div className="mb-2 flex justify-between font-bold">
            {book.title}
            <Bookmark className="cursor-pointer" />
          </div>
          <div className="flex flex-col space-y-2">
            <p>By: </p>
            <p>Topics:</p>
            <p>Publish Date: </p>
            <p>
              繪本簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介
            </p>
          </div>
        </div>

        <div className="flex w-[500px] flex-col space-y-5 bg-[#E9E9E9] p-10">
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
