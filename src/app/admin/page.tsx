import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { bookTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

import { BookTable } from "./_components/BookTable";
import UploadButton from "./_components/UploadButton";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  const bookList = await db.select().from(bookTable);

  return (
    <div className="mx-auto flex flex-col space-y-4 p-5">
      <div className="flex border-b pb-2 space-x-4 items-center">
        <h2 className="scroll-m-20 mt-10 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Book
        </h2>
        <UploadButton></UploadButton>
      </div>

      <BookTable bookList={bookList}></BookTable>
    </div>
  );
}
