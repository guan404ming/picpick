"use client";

import { useEffect, useState } from "react";

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
  const { postMessage } = useChat();

  useEffect(() => {
    if (count === 3) {
      postMessage({ content: "END", sender: "system", questionId: null });
      setCount(0);
    }
  }, [count, postMessage]);

  return (
    <div className="flex grow flex-col-reverse space-y-2 overflow-y-auto">
      {count}
      {messageList.map((chat, idx) => (
        <Message setCount={setCount} chat={chat} key={idx}></Message>
      ))}
    </div>
  );
}
