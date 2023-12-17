import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { messageTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

import { ApiStatus } from "./_components/ApiStatus";
import { Overview } from "./_components/Overview";
import UploadButton from "./_components/UploadButton";

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Data Generator</CardTitle>
          </CardHeader>
          <CardContent className="pl-6">
            <UploadButton></UploadButton>
          </CardContent>
        </Card>
        <Card className="col-span-4 max-h-[400px]">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview messageList={messageList} />
          </CardContent>
        </Card>
        <Card className="col-span-3 max-h-[400px]">
          <CardHeader>
            <CardTitle>API status</CardTitle>
            <CardDescription>Check real time API status</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ApiStatus />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
