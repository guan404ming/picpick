"use client";

import { Button } from "@/components/ui/button";
import useRecommend from "@/hooks/useRecommend";

export default function TestPage() {
  const { getQuestion } = useRecommend();

  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <Button onClick={async () => getQuestion()}>TEST</Button>
    </div>
  );
}
