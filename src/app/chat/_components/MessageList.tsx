"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useChat from "@/hooks/useChat";
import type { Book } from "@/lib/types/db";

import Message from "./Message";
import ResultMessage from "./ResultMessage";

type MessageProps = {
  messageList: {
    id: number;
    userId: number;
    content: string;
    sender: "system" | "user";
    createdAt: Date;
    questionId: number | null;
    options: string[];
  }[];
};

export default function MessageList({ messageList }: MessageProps) {
  const [count, setCount] = useState(0);
  const [answerList, setAnswerList] = useState<string[]>([]);
  const [book, setBook] = useState<Book>();
  const router = useRouter();
  const { postMessage, getBook } = useChat();

  useEffect(() => {
    (async () => {
      if (count === 3) {
        const book_ = await getBook({ answer: answerList.join(" ") });
        setBook(book_);
        router.refresh();
        setCount(0);
        setAnswerList([]);
      }
    })();
  }, [answerList, count, getBook, postMessage, router]);

  return (
    <div className="flex grow flex-col-reverse space-y-2 overflow-y-auto">
      {count}
      <ResultMessage book={book}></ResultMessage>
      {messageList.length === 0 && (
        <Message
          setAnswerList={setAnswerList}
          count={count}
          setCount={setCount}
          chat={{
            id: 0,
            userId: 1,
            content: "Hello, let's chat!",
            sender: "system",
            createdAt: new Date(),
            questionId: 1,
            options: ["GO"],
          }}
        ></Message>
      )}
      {messageList.map((chat, idx) => (
        <Message
          count={count}
          setAnswerList={setAnswerList}
          setCount={setCount}
          chat={chat}
          key={idx}
        ></Message>
      ))}
    </div>
  );
}
