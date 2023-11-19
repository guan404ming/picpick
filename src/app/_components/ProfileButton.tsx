/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import useUserInfo from "@/hooks/useUserInfo";

export default function ProfileButton() {
    const router = useRouter();
    const { session } = useUserInfo();

    return (
        <div
            className="flex items-center gap-2 rounded-full p-3 cursor-pointer"
            onClick={() => router.push("/?open=true")}
        >
            {session?.user ? (
                <>
                    <img
                        src={session?.user?.image as string}
                        alt="user avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </>

            ) : (
                <Button>Login</Button>
            )}
        </div>
    );
}
