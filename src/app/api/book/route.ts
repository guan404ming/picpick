import { db } from '@/db';
import { bookTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse, type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if(!id) {
    return NextResponse.json(
      { error: 'book id cannot be null' },
      { status: 400 }
    );
  }

  try {
    const book = await db.select().from(bookTable).where(eq(bookTable.bookId, id));
    
    if(book.length === 0)
      return NextResponse.json(
        { error: `cannot find book id "${id}"`},
        { status: 404 }
      )
    return NextResponse.json(book[0]);

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}