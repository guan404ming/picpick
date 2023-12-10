import { useState } from "react";

import { useRouter } from "next/navigation";

import { publicEnv } from "@/lib/env/public";

export default function useChat() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getBook = async ({ answer }: { answer: string }) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(
      `${publicEnv.NEXT_PUBLIC_MODEL_BASE_URL}/predictions/dpr`,
      {
        method: "POST",
        body: answer,
      },
    );

    if (!res.ok) {
      return;
    }

    const body: {
      id: string;
    } = await res.json();

    setLoading(false);

    return body;
  };

  const postMessage = async ({
    content,
    sender,
    questionId,
  }: {
    content: string;
    sender: "system" | "user";
    questionId: number | null;
  }) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ content, sender, questionId }),
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
