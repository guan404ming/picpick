"use client";

import { useEffect, useState, useRef } from "react";

import useChat from "@/hooks/useChat";
import type { SelectBook, SelectMessage, SelectQuestion } from "@/lib/types/db";

import GreetingMessage from "./GreetingMessage";
import LoadingMessage from "./LoadingMessage";
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
  const { handleGreet, handleGetResult, loading } = useChat();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) {
      return;
    }

    (async () => {
      if (messageList) {
        effectRan.current = true;
        // check last message is greet or not
        if (
          messageList.length === 0 ||
          (!!messageList[0].QUESTION && !messageList[0].BOOK)
        ) {
          await handleGreet();
        }
      }
    })();
  }, [messageList, handleGreet]);

  useEffect(() => {
    (async () => {
      if (count === 3) {
        setCount(0);
        setAnswerList([]);
        await handleGetResult({ answerList });
        await handleGreet();
      }
    })();
  }, [answerList, count, handleGetResult, handleGreet]);

  return (
    <div className="flex grow flex-col-reverse space-y-2 overflow-y-auto">
      {loading && <LoadingMessage />}
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
