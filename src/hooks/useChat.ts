import { useState } from "react";

import { useRouter } from "next/navigation";

// import { publicEnv } from "@/lib/env/public";
import bookList from "@/assets/book.json";
import type { SelectBook } from "@/lib/types/db";

export default function useChat() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getBook = ({ answer }: { answer: string }) => {
    if (loading) return;

    setLoading(true);

    // const res = await fetch(
    //   `${publicEnv.NEXT_PUBLIC_MODEL_BASE_URL}/predictions/dpr`,
    //   {
    //     method: "POST",
    //     body: answer,
    //   },
    // );

    // if (!res.ok) {
    //   return;
    // }

    // const body: {
    //   id: string;
    // } = await res.json();

    console.log(answer);
    setLoading(false);

    const res: SelectBook =
      bookList[Math.floor(Math.random() * bookList.length)];

    return res;
  };

  const postMessage = async ({
    content,
    sender,
    questionId,
    bookId,
  }: {
    content: string;
    sender: "system" | "user";
    questionId: number | null;
    bookId: number | null;
  }) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ content, sender, questionId, bookId }),
    });

    if (!res.ok) {
      return;
    }

    setLoading(false);
  };

  const handlePostAnswer = async ({ answer }: { answer: string }) => {
    if (loading) return;

    setLoading(true);

    await postMessage({
      content: answer,
      sender: "user",
      questionId: null,
      bookId: null,
    });
    router.refresh();

    setLoading(false);
  };

  const handleGetQuestion = async () => {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/question");

    if (!res.ok) {
      return;
    }

    const body: { question: string; id: number } = await res.json();

    await postMessage({
      content: body.question,
      sender: "system",
      questionId: body.id,
      bookId: null,
    });

    router.refresh();
    setLoading(false);

    return body;
  };

  return {
    getBook,
    postMessage,
    handlePostAnswer,
    handleGetQuestion,
    loading,
  };
}
