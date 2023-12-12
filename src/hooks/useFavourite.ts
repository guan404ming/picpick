import { useState } from "react";

import type { SelectFavourite } from "@/lib/types/db";

import useUserInfo from "./useUserInfo";

export default function useFavourite() {
  const [loading, setLoading] = useState(false);
  const { session } = useUserInfo();

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

  const getIsFavourited = async ({ bookId }: { bookId: number }) => {
    setLoading(true);

    if (session) {
      const favouriteList = await getFavourite({ userId: session.user.id });
      if (favouriteList) {
        const isSaved =
          favouriteList.filter((i) => i.bookId === bookId).length > 0;
        return isSaved;
      }
    }

    setLoading(false);
    return false;
  };

  return {
    postFavourite,
    getFavourite,
    getIsFavourited,
    loading,
  };
}
