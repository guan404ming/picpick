"use client";

import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/navigation";

import useChat from "@/hooks/useChat";
import type { SelectBook, SelectMessage, SelectQuestion } from "@/lib/types/db";

import GreetingMessage from "./GreetingMessage";
import Message from "./Message";
import ResultMessage from "./ResultMessage";

type MessageListProps = {
  messageList: {
    MESSAGE: SelectMessage;
    BOOK: SelectBook | null;
    QUESTION: SelectQuestion | null;
    options: string[];
  }[];
};

export default function MessageList({ messageList }: MessageListProps) {
  const [count, setCount] = useState(0);
  const [answerList, setAnswerList] = useState<string[]>([]);
  const router = useRouter();
  const { getBook, postMessage } = useChat();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) {
      return;
    }

    (async () => {
      if (messageList) {
        effectRan.current = true;
        const isGreeting = !messageList[0].QUESTION && !messageList[0].BOOK;
        if (count === 0 && !isGreeting) {
          await postMessage({
            content: "Greeting!",
            sender: "system",
            questionId: null,
            bookId: null,
          });
          router.refresh();
        }
      }
    })();
  }, [count, messageList, postMessage, router]);

  useEffect(() => {
    (async () => {
      if (count === 3) {
        const book_ = getBook({ answer: answerList.join(" ") });
        if (book_?.id) {
          await postMessage({
            content: "Recommendation",
            sender: "system",
            questionId: null,
            bookId: book_.id,
          });
        }

        router.refresh();
        setCount(0);
        effectRan.current = false;
        setAnswerList([]);
      }
    })();
  }, [answerList, count, getBook, postMessage, router]);

  return (
    <div className="flex grow flex-col-reverse space-y-2 overflow-y-auto">
      {count}
      {messageList.map((message) => (
        <div key={message.MESSAGE.id}>
          {!message.BOOK ? (
            !message.QUESTION?.id && message.MESSAGE.sender === "system" ? (
              <GreetingMessage />
            ) : (
              <Message
                count={count}
                setAnswerList={setAnswerList}
                setCount={setCount}
                message={message}
              />
            )
          ) : (
            <ResultMessage message={message} />
          )}
        </div>
      ))}
    </div>
  );
}
