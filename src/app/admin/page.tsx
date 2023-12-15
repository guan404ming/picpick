import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { messageTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

import { Overview } from "./_components/Overview";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  const messageList = await db.select().from(messageTable);

  return (
    <div className="w-full space-y-4 p-5">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Admin
      </h2>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Message Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview messageList={messageList}></Overview>
        </CardContent>
      </Card>
    </div>
  );
}
