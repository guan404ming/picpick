"use client";

import { useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

import { SettingForm } from "./SettingForm";

/* eslint-disable @next/next/no-img-element */

export default function ProfileDialog() {
  const { session } = useUserInfo();
  const [dialogOpen, setDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
      if (searchParams.get("open")) {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (searchParams.get("open")) {
      setDialogOpen(true);
    }
  }, [searchParams]);

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div className="flex cursor-pointer items-center gap-2 rounded-full p-2">
          {session?.user ? (
            <img
              src={session?.user?.image as string}
              alt="user avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className={"-m-1 rounded-lg bg-black p-2 text-sm text-white"}>
              Login
            </span>
          )}
        </div>
      </DialogTrigger>

      <DialogContent
        className={cn(
          `${session?.user && "p-10 pb-2 pt-6"}`,
          "max-sm:max-w-[70%]",
        )}
      >
        {!session && (
          <DialogHeader>
            <DialogTitle>Welcome to PicPick!</DialogTitle>
            <DialogDescription>
              Sign in to pick all Picbooks~~
            </DialogDescription>
          </DialogHeader>
        )}

        {session && <SettingForm></SettingForm>}

        <DialogFooter>
          <Button
            className={`round-xl ${session?.user && "mr-5 hidden"}`}
            onClick={() => signIn()}
          >
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
