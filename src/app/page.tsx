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
      <div className=" grid grid-cols-1 gap-7 rounded-lg bg-[#F0F0F0] p-10 text-center drop-shadow dark:bg-slate-800">
        <p className="truncate text-5xl font-bold">Picbook Home</p>
        <p className="truncate">
          SloganSloganSloganSloganSloganSloganSloganSloganSlogan
        </p>
        <Button className="mx-auto w-1/4 p-6 text-xl drop-shadow-lg">
          Start
        </Button>
      </div>

      <Separator className="my-8"></Separator>

      <div className="flex items-center px-[10%] py-10">
        <p className="text-3xl font-bold">Picbook Home</p>
        <div className="ml-[20%] grid grid-cols-1 gap-4">
          <p className="truncate text-xl">Picbook Home Picbook</p>
          <p className="truncate text-xl">Picbook Home</p>
          <p className="truncate text-xl">Picbook </p>
          <p className="truncate text-xl">Picbook Home Picbook Home</p>
          <p className="truncate text-xl">
            Picbook Home Picbook Home Picbook Home
          </p>
        </div>
      </div>
    </div>
  );
}
