import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { messageTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

import Message from "./_components/Message";

export default async function ChatPage() {
  const date = "Today, 12/01";
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/");
  }

  const messageData = await db
    .select()
    .from(messageTable)
    .where(eq(messageTable.userId, session.user.id))
    .orderBy(desc(messageTable.createdAt));

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#BEBEBE] py-10">
      <div className="w-2/3 overflow-y-auto rounded-xl bg-white shadow-md">
        <div className="flex w-full items-center justify-start px-8 py-3 shadow">
          <span className="chatbot-icon">ICON</span>
          <span className="p-4 text-xl">PicPick</span>
        </div>

        <div className="p-8">
          <p className="mx-[auto] mb-8 max-w-[100px] rounded-full bg-gray-200 px-2.5 py-1 text-center text-xs">
            {date}
          </p>

          <div className="flex grow flex-col-reverse space-y-1 overflow-y-auto">
            {messageData.map((chat, idx) => (
              <Message chat={chat} key={idx}></Message>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
