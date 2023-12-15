"use client";

import { useState } from "react";
import { ReactReader } from "react-reader";

import type { SelectBook } from "@/lib/types/db";

type BookReaderProps = {
  book: SelectBook;
};

export default function BookReader({ book }: BookReaderProps) {
  const [location, setLocation] = useState<string | number>(0);

  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url={book.pdfLink || ""}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
      />
    </div>
  );
}
