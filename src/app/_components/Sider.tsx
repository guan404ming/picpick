"use client";

import Link from "next/link";

import { Home, Bot, Bookmark, UserCog } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

import ProfileDialog from "./ProfileDialog";

export default function Sider() {
  const { session } = useUserInfo();

  return (
    <aside
      className={`flex h-screen flex-col justify-between bg-[#F0F0F0] px-4 py-6 text-center dark:bg-slate-800 max-md:px-1 max-md:py-2`}
    >
      <div className="flex flex-col">
        <SiderButton Icon={Home} text="Home" router="/" />
        <SiderButton Icon={Bot} text="Chat" router="/chat" />
        <SiderButton Icon={Bookmark} text="Saves" router="/saves" />
        {session?.user.role === "admin" && (
          <SiderButton Icon={UserCog} text="Admin" router="/admin" />
        )}
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
