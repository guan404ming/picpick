"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useChat from "@/hooks/useChat";

import GreetingMessage from "./GreetingMessage";
import Message from "./Message";
import ResultMessage from "./ResultMessage";

type MessageListProps = {
  messageList: {
    id: number;
    userId: number;
    content: string;
    sender: "system" | "user";
    createdAt: Date;
    questionId: number | null;
    bookId: number | null;
    bookName?: string | null;
    options: string[];
  }[];
};

export default function MessageList({ messageList }: MessageListProps) {
  const [count, setCount] = useState(0);
  const [answerList, setAnswerList] = useState<string[]>([]);
  const router = useRouter();
  const { getBook, postMessage } = useChat();

  useEffect(() => {
    (async () => {
      if (count === 3) {
        const book_ = getBook({ answer: answerList.join(" ") });
        if (book_?.id) {
          console.log(book_.id);
          await postMessage({
            content: "Recommendation",
            sender: "system",
            questionId: null,
            bookId: book_.id,
          });
        }

        router.refresh();
        setCount(0);
        setAnswerList([]);
      }
    })();
  }, [answerList, count, getBook, postMessage, router]);

  return (
    <div className="flex grow flex-col-reverse space-y-2 overflow-y-auto">
      {count}
      {messageList.length === 0 && <GreetingMessage />}
      {messageList.map((chat) => (
        <div key={chat.id}>
          {!chat.bookId ? (
            <Message
              count={count}
              setAnswerList={setAnswerList}
              setCount={setCount}
              chat={chat}
            />
          ) : (
            <ResultMessage
              book={{ id: chat.bookId, bookName: chat.bookName! }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
