"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import useRecommend from "@/hooks/useRecommend";

export default function TestPage() {
  const { getBook } = useRecommend();
  const [bookId, setBookId] = useState<string>("");

  async function handleGetBook() {
    const book = await getBook();
    setBookId(`${book?.id}`);
  }

  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div>
        <Button className="mb-5" onClick={handleGetBook}>
          TEST
        </Button>
        <p className="text-center">{`Id: ${bookId}`}</p>
      </div>
    </div>
  );
}
