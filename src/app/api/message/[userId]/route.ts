import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { messageTable } from "@/db/schema";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: number;
    };
  },
) {
  if (!params.userId) {
    return NextResponse.json(
      { error: "user id cannot be null" },
      { status: 404 },
    );
  }

  try {
    const messages = await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.userId, params.userId));
    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
