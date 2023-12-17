"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function UploadButton() {
  const router = useRouter();
  const { toast } = useToast();

  async function initDB() {
    await fetch("api/upload");
    toast({
      title: "Successfully upload books and questions 😻",
      description: "check the table below",
    });
    router.refresh();
  }

  return (
    <div className="flex items-center space-x-8">
      <p>Generate Books and Questions</p>
      <Button size={"sm"} onClick={() => initDB()}>
        Click to Generate
      </Button>
    </div>
  );
}
