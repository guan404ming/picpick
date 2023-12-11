import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { bookTable, messageTable, questionTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

import MessageList from "./_components/MessageList";

export default async function ChatPage() {
  const date = "Today, 12/01";
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/");
  }

  const messageData = await db
    .select()
    .from(messageTable)
    .leftJoin(questionTable, eq(messageTable.questionId, questionTable.id))
    .leftJoin(bookTable, eq(messageTable.bookId, bookTable.id))
    .where(eq(messageTable.userId, session.user.id))
    .limit(10)
    .orderBy(desc(messageTable.createdAt));

  const transformedMessageData: Array<{
    id: number;
    userId: number;
    content: string;
    sender: "system" | "user";
    createdAt: Date;
    questionId: number | null;
    bookId: number | null;
    bookName?: string | null;
    options: string[];
  }> = messageData.map((message) => ({
    id: message.MESSAGE.id,
    userId: message.MESSAGE.userId,
    content: message.MESSAGE.content,
    sender: message.MESSAGE.sender,
    createdAt: message.MESSAGE.createdAt,
    questionId: message.MESSAGE.questionId,
    bookId: message.MESSAGE.bookId,
    bookName: message.PICBOOK?.bookName,
    options: [
      message.QUESTION?.option1,
      message.QUESTION?.option2,
      message.QUESTION?.option3,
      message.QUESTION?.option4,
    ].map((option) => option as string),
  }));

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#BEBEBE] py-10">
      <div className="w-2/3 min-w-[300px] overflow-y-auto rounded-xl bg-white shadow-md">
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
