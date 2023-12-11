import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { favouriteTable } from "@/db/schema";

export async function GET() {
  const { userId } = useParams();

  if (!userId) {
    return NextResponse.json(
      { error: "user id cannot be null" },
      { status: 404 },
    );
  }

  try {
    const book = await db
      .select()
      .from(favouriteTable)
      .where(eq(favouriteTable.userId, parseInt(userId as string)));
    return NextResponse.json(book);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
