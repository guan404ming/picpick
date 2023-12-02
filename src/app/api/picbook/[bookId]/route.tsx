import { NextApiRequest, NextApiResponse } from 'next';
import { serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { bookTable } from "@/db/schema";

export default async function GET( req: NextApiRequest, res: NextApiResponse ) {
    
    const bookId = req.query.bookId as string;
  
    const result = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.bookId, bookId))
    .execute();

    if (result.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
    }

    return res.json(result[0])
}