import { useState } from "react";

import { publicEnv } from "@/lib/env/public";

export default function useRecommend() {
  const [loading, setLoading] = useState(false);

  const getQuestion = async () => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(`${publicEnv.NEXT_PUBLIC_MODEL_BASE_URL}/questions`);

    console.log(res);

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    setLoading(false);
  };

  return {
    getQuestion,
    loading,
  };
}
