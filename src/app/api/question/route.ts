import { NextResponse } from "next/server";

import { db } from "@/db";
import { questionTable } from "@/db/schema";

export async function GET() {
  try {
    const questions = await db.select().from(questionTable);
    const randomIndex = Math.floor(Math.random() * questions.length);
    const item = questions[randomIndex];
    return NextResponse.json(item);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
