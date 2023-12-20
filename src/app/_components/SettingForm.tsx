/* eslint-disable @next/next/no-img-element */
"use client";

import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useUserInfo from "@/hooks/useUserInfo";

/* eslint-disable @next/next/no-img-element */

export function SettingForm() {
  const { setTheme, theme } = useTheme();
  const { session } = useUserInfo();

  return (
    <div className="my-4 flex w-full flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center space-x-4">
          <img
            src={session?.user?.image as string}
            alt="user avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-sm">{session?.user.name}</p>
            <p className="text-sm text-gray-400">{session?.user.email}</p>
          </div>
        </div>

        <Button
          className={`round-xl ${!session?.user && "hidden"}`}
          onClick={() => signOut()}
          variant={"secondary"}
        >
          Logout
        </Button>
      </div>

      <Separator />

      <div className="flex items-center space-x-3">
        <p className="font-bold">Theme</p>
        <Select
          defaultValue={theme}
          onValueChange={(e) => {
            setTheme(e);
          }}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="system">system</SelectItem>
            <SelectItem value="light">light</SelectItem>
            <SelectItem value="dark">dark</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
