"use client";

import { Button } from "@/components/ui/button";

export default function TestPage() {
  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div className="flex flex-col space-y-2">
        <Button onClick={async () => await fetch("api/upload")}>UPLOAD</Button>
      </div>
    </div>
  );
}
