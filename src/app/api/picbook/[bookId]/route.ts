import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { bookTable } from "@/db/schema";
import { NextResponse } from 'next/server';

export async function GET( 
  req: NextApiRequest, 
  { params }: { params: { bookId: string } }
) {
    
  const bookId = params.bookId

  try {
    const result = await db
      .select()
      .from(bookTable)
      .where(eq(bookTable.bookId, bookId));

    if (result.length === 0) {
      return NextResponse.json(
        { error: `cannot find book id "${bookId}"`},
        { status: 404 }
      )
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