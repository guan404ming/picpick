import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import dayjs from "dayjs";
import { desc, eq } from "drizzle-orm";

import picPick from "@/assets/pic-pick.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db";
import { bookTable, messageTable, questionTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";
import type { SelectBook, SelectMessage, SelectQuestion } from "@/lib/types/db";

import MessageList from "./_components/MessageList";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    redirect("/");
  }

  const rawMessageList = await db
    .select()
    .from(messageTable)
    .leftJoin(questionTable, eq(messageTable.questionId, questionTable.id))
    .leftJoin(bookTable, eq(messageTable.bookId, bookTable.id))
    .where(eq(messageTable.userId, session.user.id))
    .limit(10)
    .orderBy(desc(messageTable.createdAt));

  const messageList: Array<{
    MESSAGE: SelectMessage;
    BOOK: SelectBook | null;
    QUESTION: SelectQuestion | null;
    options: string[];
  }> = rawMessageList.map((message) => ({
    ...message,
    options: [
      message.QUESTION?.option1,
      message.QUESTION?.option2,
      message.QUESTION?.option3,
      message.QUESTION?.option4,
    ].map((option) => option as string),
  }));

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#BEBEBE] py-10 dark:bg-inherit max-md:py-0">
      <div className="relative h-full w-2/3 min-w-[300px] overflow-y-auto rounded-xl bg-white shadow-md dark:bg-slate-800 max-md:w-full max-md:rounded-none">
        <div className="sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-start bg-white px-7 py-3 shadow dark:bg-slate-800">
          <Avatar className="h-8 w-8">
            <AvatarImage src={picPick.src} alt="pic-pick" />
            <AvatarFallback />
          </Avatar>
          <span className="p-4 text-xl">PicPick</span>
        </div>

        <div className="p-8">
          <p className="mx-[auto] mb-8 max-w-[100px] rounded-full bg-gray-200 px-2.5 py-1 text-center text-xs dark:border-2 dark:border-white dark:bg-slate-800">
            {`Today, ${dayjs(new Date()).format("MM/DD")}`}
          </p>

          <MessageList messageList={messageList}></MessageList>
        </div>
      </div>
    </div>
  );
}
