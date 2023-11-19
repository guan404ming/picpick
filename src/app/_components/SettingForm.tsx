"use client";

import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import useUserInfo from "@/hooks/useUserInfo"

export function SettingForm() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="my-4 grid grid-cols-1 gap-4">
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

      <p className="font-bold">Notifacation</p>
      <Select>
        <SelectTrigger id="type">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="ON">ON</SelectItem>
          <SelectItem value="OFF">OFF</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
