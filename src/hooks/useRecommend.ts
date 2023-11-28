import { useState } from "react";

import { publicEnv } from "@/lib/env/public";

export default function useRecommend() {
  const [loading, setLoading] = useState(false);

  const getBook = async () => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(
      `${publicEnv.NEXT_PUBLIC_MODEL_BASE_URL}/predictions/dpr`,
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

  return {
    getBook,
    loading,
  };
}
