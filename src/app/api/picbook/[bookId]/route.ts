import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { bookTable } from "@/db/schema";

export async function GET() {
  const { bookId: bookId_ } = useParams();
  const bookId = Array.isArray(bookId_) ? bookId_[0] : bookId_;

  try {
    const result = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.bookId, bookId));

    if (result.length === 0) {
      return NextResponse.json(
        { error: `cannot find book id "${bookId}"` },
        { status: 404 },
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
