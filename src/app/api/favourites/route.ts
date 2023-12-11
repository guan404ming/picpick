import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { bookTable, favouriteTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

const addFavoriteRequestSchema = z.object({
  bookId: z.string(),
});

type addFavoriteRequest = z.infer<typeof addFavoriteRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    addFavoriteRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { bookId } = data as addFavoriteRequest;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw Error("No session!");

    const [book] = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.bookId, bookId));

    await db
      .insert(favouriteTable)
      .values({
        userId: session.user.id,
        bookId: book.id,
      })
      .onConflictDoNothing()
      .execute();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function DELETE(request: NextRequest) {
  try {
    const { favouriteId } = await request.json();
    await db.delete(favouriteTable).where(eq(favouriteTable.id, favouriteId));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function PATCH(request: NextRequest) {
  try {
    const { favouriteId, bookmark } = await request.json();
    console.log(`favouriteId: ${favouriteId}, bookmark: ${bookmark}`);
    if (!favouriteId)
      return NextResponse.json(
        { error: "favouriteId cannot be null" },
        { status: 404 },
      );

    if (!bookmark)
      return NextResponse.json(
        { error: "bookmark cannot be null" },
        { status: 404 },
      );

    await db
      .update(favouriteTable)
      .set({ bookmark: bookmark })
      .where(eq(favouriteTable.id, favouriteId));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
