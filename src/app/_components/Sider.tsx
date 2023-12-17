"use client";

import Image from "next/image";
import Link from "next/link";

import { Home, Bot, Bookmark } from "lucide-react";

import picPick from "@/assets/pic-pick.png";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import ProfileDialog from "./ProfileDialog";

export default function Sider() {
  return (
    <aside
      className={`flex h-screen flex-col justify-between bg-[#F0F0F0] px-6 py-6 text-center dark:bg-slate-800`}
    >
      <div className="flex flex-col gap-2">
        <div className="mb-2 p-2">
          <Link href="/">
            <Image src={picPick} alt="pic-pick" width={40} height={40} />
          </Link>
        </div>
        <SiderButton Icon={Home} text="Home" router="/" />
        <SiderButton Icon={Bot} text="Chat" router="/chat" />
        <SiderButton Icon={Bookmark} text="Saves" router="/saves" />
        <Separator className="my-2" />
        <ProfileDialog />
      </div>
    </aside>
  );
}

type SiderButtonProps = {
  Icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number | string;
  }>;
  text: string;
  active?: boolean;
  router: string;
};

function SiderButton({ Icon, text, active, router }: SiderButtonProps) {
  return (
    <Link href={`${router}`}>
      <button className="group w-full">
        <div className="w-fit items-center p-2">
          <div className="grid h-[40px] w-[40px] place-items-center">
            <Icon size={26} strokeWidth={active ? 3 : 2} />
          </div>
          <span className={cn("text-md max-lg:hidden", active && "font-bold")}>
            {text}
          </span>
        </div>
      </button>
    </Link>
  );
}
