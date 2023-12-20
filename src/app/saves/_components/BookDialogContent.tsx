import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Bookmark } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogContent } from "@/components/ui/dialog";
import useFavourite from "@/hooks/useFavourite";
import useUserInfo from "@/hooks/useUserInfo";
import type { SelectBook } from "@/lib/types/db";

type BookDialogContentProps = {
  book: SelectBook;
  dep?: boolean;
  setDep?: Dispatch<SetStateAction<boolean>>;
};

export default function Book({ book, dep, setDep }: BookDialogContentProps) {
  const { postFavourite } = useFavourite();
  const { session } = useUserInfo();
  const { getIsFavourited } = useFavourite();
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    (async () => {
      setSaved(await getIsFavourited({ bookId: book.id }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, dep]);

  return (
    <DialogContent className="flex max-w-[80%] justify-between p-12 max-md:p-10 max-sm:flex-col max-sm:text-xs sm:min-w-[90%] sm:space-x-4 md:min-w-[70%] md:space-x-2 lg:min-w-[60%] lg:max-w-[60%] xl:min-w-[50%] xl:max-w-[50%]">
      <div className="space-y-5">
        <div className="mb-2 flex items-start justify-between font-bold max-sm:items-center">
          <p className="max-w-[85%] text-lg">{book.bookName}</p>
          <Bookmark
            onClick={() => {
              postFavourite({ bookId: book.id });
              if (dep !== undefined && setDep) {
                setDep(!dep);
              } else {
                setSaved(!saved);
                router.refresh();
              }
            }}
            className="ml-2 cursor-pointer max-sm:w-4"
            fill={
              (dep !== undefined ? dep : saved)
                ? theme === "dark"
                  ? "white"
                  : "true"
                : "none"
            }
          ></Bookmark>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="grid w-full grid-cols-3">
            <span className="col-span-1 mr-5 font-bold">By</span>
            <span className="col-span-2">{book.author}</span>
          </div>
          <div className="grid w-full grid-cols-3">
            <span className="col-span-1 mr-5 font-bold">Topics</span>
            <span className="col-span-2">{book.topics}</span>
          </div>
          <div className="grid w-full grid-cols-3">
            <span className="col-span-1 mr-5 font-bold">Publish Date</span>
            <span className="col-span-2">{book.publishDate}</span>
          </div>
        </div>
      </div>

      <div className="flex min-w-[200px] flex-col space-y-5 bg-[#E9E9E9] p-5 dark:bg-[#131313] max-md:mx-[auto] max-md:p-6">
        <Link
          target="_blank"
          href={`https://archive.org/details/${book.bookId}/mode/2up?view=theater`}
        >
          <AspectRatio ratio={4 / 5} className="bg-muted">
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/quiztory-f5e09.appspot.com/o/cover%2F${book.bookId}.jpg?alt=media`}
              alt="Photo of the book"
              fill
              sizes={"100"}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </Link>
      </div>
    </DialogContent>
  );
}
