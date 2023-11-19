"use client";

import { useEffect, useState } from "react";

import { signIn, signOut } from "next-auth/react";

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

import { SettingForm } from "./SettingForm";

/* eslint-disable @next/next/no-img-element */

export default function ProfileDialog() {
  const { session } = useUserInfo();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(false);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div className="flex cursor-pointer items-center gap-2 rounded-full p-3">
          {session?.user && (
            <img
              src={session?.user?.image as string}
              alt="user avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Picbook Home!</DialogTitle>
          <DialogDescription>Sign in to get all Picbooks~~</DialogDescription>
        </DialogHeader>

        {session && <SettingForm></SettingForm>}

        <DialogFooter>
          <Button
            className={`round-xl mr-5 ${session?.user && "hidden"}`}
            onClick={() => signIn()}
          >
            Sign In
          </Button>
          <Button className="round-xl" onClick={() => signOut()}>
            Sign Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
