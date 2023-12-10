"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useChat from "@/hooks/useChat";

import Message from "./Message";

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
  const router = useRouter();
  const { postMessage } = useChat();

  useEffect(() => {
    (async () => {
      if (count === 3) {
        await postMessage({
          content: answerList.join("\n"),
          sender: "system",
          questionId: null,
        });
        router.refresh();
        setCount(0);
      }
    })();
  }, [answerList, count, postMessage, router]);

  return (
    <div className="flex grow flex-col-reverse space-y-2 overflow-y-auto">
      {count}
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
