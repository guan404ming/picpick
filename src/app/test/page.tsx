"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import useChat from "@/hooks/useChat";

export default function TestPage() {
  const { getBook } = useChat();
  const [bookId, setBookId] = useState<string>("");

  async function handleGetBook() {
    const book = await getBook();
    setBookId(`${book?.id}`);
  }

  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div className="flex flex-col space-y-2">
        <Button className="mb-5" onClick={handleGetBook}>
          TEST
        </Button>

        <Button onClick={async () => await fetch("api/upload")}>UPLOAD</Button>
        <p className="text-center">{`Id: ${bookId}`}</p>
      </div>
    </div>
  );
}
