import { getServerSession } from "next-auth";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { authOptions } from "@/lib/auth";

import AuthDialog from "./_components/AuthDialog";

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
    <div>
      <AuthDialog></AuthDialog>
    </div>
  );
}
