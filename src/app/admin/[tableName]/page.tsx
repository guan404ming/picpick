import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import UploadButton from "../_components/UploadButton";

import { db } from "@/db";
import { bookTable, questionTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

const tableMap = {
  book: bookTable,
  question: questionTable,
};

export default async function AdminBookPage({
  params,
}: {
  params: {
    tableName: "book" | "question";
  };
}) {
  const session = await getServerSession(authOptions);
  const { tableName } = params;

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  const bookList = await db.select().from(bookTable);
  console.log(bookList, tableMap);

  return (
    <div className="mx-auto flex flex-col space-y-4 p-5">
      <div className="flex items-center space-x-4 border-b pb-2">
        <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {tableName}
        </h2>
        <UploadButton></UploadButton>
      </div>
    </div>
  );
}
