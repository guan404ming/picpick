import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { messageTable } from '@/db/schema';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    const userId = parseInt(req.query.userId as string, 10);
  
    if(!userId) {
      return res.status(404).json( { error: 'user id cannot be null' } );
    }

    try {
        const messages = await db.select().from(messageTable).where(eq(messageTable.userId, userId));
        
        if(messages.length === 0)
          return res.status(404).json(
            { error: 'cannot find user id "${userId}"'},
          )
        return res.json(messages);
    
      } catch (error) {
        console.log(error);
        return res.status(500).json( { error: "Something went wrong" } );
      }
}

