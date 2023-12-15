import { eq } from "drizzle-orm";

import { db } from "@/db";
import { bookTable } from "@/db/schema";

import BookReader from "./_components/BookReader";

type BookPageProps = {
  params: {
    bookId: number;
  };
};

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = params;
  const [book] = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.id, bookId));

  return (
    <div className="w-full overflow-y-hidden p-4">
      <BookReader book={book}></BookReader>
    </div>
  );
}
