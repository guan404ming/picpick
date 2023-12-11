import { useState } from "react";

import type { SelectFavourite } from "@/lib/types/db";

export default function useFavourite() {
  const [loading, setLoading] = useState(false);

  const postFavourite = async ({ bookId }: { bookId: number }) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/favourite", {
      method: "POST",
      body: JSON.stringify({ bookId }),
    });

    if (!res.ok) {
      return;
    }

    setLoading(false);
  };

  const getFavourite = async ({ userId }: { userId: number }) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(`/api/favourite/${userId}`, {
      method: "GET",
    });

    if (!res.ok) {
      return;
    }

    setLoading(false);

    const bookList: SelectFavourite[] = await res.json();

    return bookList;
  };

  return {
    postFavourite,
    getFavourite,
    loading,
  };
}
