import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { bookTable } from "@/db/schema";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      bookId: string;
    };
  },
) {
  try {
    const result = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.bookId, params.bookId));

    if (result.length === 0) {
      return NextResponse.json(
        { error: `cannot find book id "${params.bookId}"` },
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
