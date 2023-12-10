import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { messageTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

const addMessageRequestSchema = z.object({
  content: z.string(),
  sender: z.enum(["system", "user"]),
  questionId: z.number().nullable(),
});

type addMessageRequest = z.infer<typeof addMessageRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  try {
    addMessageRequestSchema.parse(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { content, sender, questionId } = data as addMessageRequest;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw Error("No session!");

    await db
      .insert(messageTable)
      .values({
        content: content,
        sender: sender,
        userId: session.user.id,
        questionId: questionId,
      })
      .onConflictDoNothing()
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
