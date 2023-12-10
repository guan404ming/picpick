import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { messageTable, userTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

const addMessageRequestSchema = z.object({
    content: z.string(),
    sender: z.string()
});

type addMessageRequest = z.infer<typeof addMessageRequestSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  try {
    addMessageRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { content, sender } = data as addMessageRequest;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw Error("No session!");

    const [user] = await db
      .select({
        id: userTable.id,
      })
      .from(userTable)
      .where(eq(userTable.email, session.user.email));

    await db
      .insert(messageTable)
      .values({
        userId: user.id,
        content: content,
        sender: sender
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