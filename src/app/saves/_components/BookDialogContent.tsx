import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Bookmark } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import useFavourite from "@/hooks/useFavourite";
import useUserInfo from "@/hooks/useUserInfo";
import type { SelectBook } from "@/lib/types/db";

type BookDialogContentProps = {
  book: SelectBook;
};

export default function Book({ book }: BookDialogContentProps) {
  const { getFavourite, postFavourite } = useFavourite();
  const { session } = useUserInfo();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      if (session) {
        const favouriteList = await getFavourite({ userId: session.user.id });
        const isSaved =
          favouriteList === undefined ||
          favouriteList.filter((i) => i.userId === session.user.id).length ===
            0;
        setSaved(!isSaved);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <DialogContent className="flex max-w-[80%] justify-between p-12 max-md:p-10 max-sm:flex-col max-sm:text-xs sm:min-w-[90%] sm:space-x-4 md:min-w-[70%] md:space-x-10 lg:min-w-[46%] lg:max-w-[46%]">
      <div className="space-y-5">
        <div className="mb-2 flex items-start justify-between font-bold max-sm:items-center">
          <p>{book.bookName}</p>
          <Bookmark
            onClick={() => {
              postFavourite({ bookId: book.id });
              setSaved(!saved);
              router.refresh();
            }}
            className="ml-2 cursor-pointer max-sm:w-4"
            fill={saved ? "true" : "none"}
          ></Bookmark>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="grid w-full grid-cols-2">
            <span className="mr-5 font-bold">By:</span>
            <span>{book.bookName}</span>
          </div>
          <div className="grid w-full grid-cols-2">
            <span className="mr-5 font-bold">Topics: </span>
            <span>{book.topics}</span>
          </div>
          <div className="grid w-full grid-cols-2">
            <span className="mr-5 font-bold">Publish Date:</span>
            <span>{book.publishDate}</span>
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
  );
}
