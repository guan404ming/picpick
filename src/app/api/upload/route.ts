import { db } from '@/db';
import { bookTable, questionTable } from '@/db/schema';
import books from '@/assets/book.json' ;
import questions from '@/assets/question.json';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('book:', books[0]);
  console.log('question:', questions[0]);
  
  try {
    await db.insert(bookTable).values(books).onConflictDoNothing();
  } catch (err) {
    return NextResponse.json(
      { err: "Something went wrong" },
      { status: 500 },
    );
  }

  try {
    await db.insert(questionTable).values(questions).onConflictDoNothing();
  } catch (err) {
    return NextResponse.json(
      { err: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}