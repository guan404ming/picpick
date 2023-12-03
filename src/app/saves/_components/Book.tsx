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
import { Progress } from "@/components/ui/progress";

type BookProps = {
  book: {
    id: number;
    title: string;
    image: string;
  };
};

export default function Book({ book }: BookProps) {
  return (
    <Card className="w-[300px] drop-shadow">
      <CardHeader>
        <CardTitle className="mb-2 flex justify-between">
          {book.title}
          <Bookmark className="cursor-pointer" />
        </CardTitle>
      </CardHeader>
      <CardContent className="m-[auto] w-[250px] cursor-pointer">
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
      <CardFooter>
        <Progress
          value={Math.floor(Math.random() * 100)}
          className="mx-4 h-2"
        />
      </CardFooter>
    </Card>
  );
}
