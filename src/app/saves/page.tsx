import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { bookTable, favouriteTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

import Book from "./_components/Book";

export default async function SavesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/");
  }

  const books = await db
    .select()
    .from(favouriteTable)
    .innerJoin(bookTable, eq(favouriteTable.bookId, bookTable.id))
    .where(eq(favouriteTable.userId, session.user.id))
    .execute();

  return (
    <div className="block w-full overflow-scroll p-8">
      <h1 className="mb-10 text-3xl font-bold">Saves</h1>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="grid gap-x-16 gap-y-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {books.map((book, idx) => (
            <Book key={idx} book={book}></Book>
          ))}
        </div>
      </div>
    </div>
  );
}
