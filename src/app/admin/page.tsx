"use client";

import { useState } from "react";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import useUserInfo from "@/hooks/useUserInfo";

export default function AdminPage() {
  const [res, setRes] = useState("");
  const { session } = useUserInfo();

  async function initDB() {
    await fetch("api/upload");
    setRes("Successfully upload books and questions");
  }

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center space-y-4">
      <Button size={"lg"} onClick={() => initDB()}>
        UPLOAD
      </Button>
      <p>{res}</p>
    </div>
  );
}
