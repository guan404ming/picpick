import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { messageTable, questionTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

import MessageList from "./_components/MessageList";

export default async function ChatPage() {
  const date = "Today, 12/01";
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/");
  }

  const messageData = await db
    .select({
      id: messageTable.id,
      userId: messageTable.userId,
      content: messageTable.content,
      sender: messageTable.sender,
      createdAt: messageTable.createdAt,
      questionId: messageTable.questionId,
      option1: questionTable.option1,
      option2: questionTable.option2,
      option3: questionTable.option3,
      option4: questionTable.option4,
    })
    .from(messageTable)
    .leftJoin(questionTable, eq(messageTable.questionId, questionTable.id))
    .where(eq(messageTable.userId, session.user.id))
    .orderBy(desc(messageTable.createdAt));

  const transformedMessageData: Array<{
    id: number;
    userId: number;
    content: string;
    sender: "system" | "user";
    createdAt: Date;
    questionId: number | null;
    options: string[];
  }> = messageData.map((message) => ({
    id: message.id,
    userId: message.userId,
    content: message.content,
    sender: message.sender,
    createdAt: message.createdAt,
    questionId: message.questionId,
    options: [
      message.option1,
      message.option2,
      message.option3,
      message.option4,
    ].map((option) => option as string), // Ensure non-null options are treated as strings
  }));

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

          <MessageList messageList={transformedMessageData}></MessageList>
        </div>
      </div>
    </div>
  );
}
