import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { favourites } from '@/db/schema';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    const userId = parseInt(req.query.userId as string, 10);
  
    if(!userId) {
      return res.status(404).json( { error: 'book id cannot be null' } );
    }

    try {
        const book = await db.select().from(favourites).where(eq(favourites.userId, userId));
        
        if(book.length === 0)
          return res.status(404).json(
            { error: 'cannot find book id "${userId}"'},
          )
        return res.json(book[0]);
    
      } catch (error) {
        console.log(error);
        return res.status(500).json( { error: "Something went wrong" } );
      }
}

