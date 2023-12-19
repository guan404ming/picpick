import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { questionTable } from "@/db/schema";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      questionId: number;
    };
  },
) {
  try {
    const [question] = await db
      .select()
      .from(questionTable)
      .where(eq(questionTable.id, params.questionId));
    return NextResponse.json(question);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
