"use client";

import type { SelectBook } from "@/lib/types/db";

type BookReaderProps = {
  book: SelectBook;
};

export default function BookReader({ book }: BookReaderProps) {
  return (
    <div>
      {book?.pdfLink ? (
        <iframe src={book.pdfLink || ""} className="h-screen w-full"></iframe>
      ) : (
        <p>Currently don't have online version</p>
      )}
    </div>
  );
}
