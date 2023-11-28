import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    await db
      .insert(userTable)
      .values({
        name: session.user.name as string,
        email: session.user.email as string,
      })

      .onConflictDoUpdate({
        target: userTable.email,
        set: {
          name: session.user.name as string,
        },
      })
      .execute();
  }

  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-1 gap-7 rounded-lg bg-[#F0F0F0] p-10 text-center drop-shadow dark:bg-slate-800">
        <p className="truncate text-4xl font-bold">PICPICK</p>

        <div className="text-xl">
          <p className="truncate font-bold">Make a click, we take a pick.</p>
          <p className="truncate">
            Unlock your Personalized PicBook with PICPICK!
          </p>
        </div>

        <Button className="mx-auto w-1/6 p-6 text-xl drop-shadow-lg">
          Start
        </Button>
      </div>

      <Separator className="my-8"></Separator>

      <div className="grid grid-cols-6 py-10">
        <p className="col-span-2 flex items-center justify-center text-center text-3xl font-bold">
          About
        </p>
        <div className="col-span-4 pr-20 text-xl leading-normal">
          PICPICK is a picture book recommendation website where users can
          receive AI-curated book suggestions by responding to psychological
          assessment questions. Users can explore, read, and collect the
          recommended picture books. Through the design, we aim to create a
          therapeutic and inspiring experience for readers, providing solace and
          inspiration in their daily lives.
        </div>
      </div>

      <div className="grid grid-cols-6 py-10">
        <p className="col-span-2 flex items-center justify-center text-center text-3xl font-bold">
          Introduction
        </p>
        <div className="col-span-4 pr-20 text-xl leading-normal">
          PICPICK is a picture book recommendation website where users can
          receive AI-curated book suggestions by responding to psychological
          assessment questions. Users can explore, read, and collect the
          recommended picture books. Through the design, we aim to create a
          therapeutic and inspiring experience for readers, providing solace and
          inspiration in their daily lives.
        </div>
      </div>
    </div>
  );
}
