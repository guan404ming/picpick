import { NextApiRequest, NextApiResponse } from 'next';
import { serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { bookTable } from "@/db/schema";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    
}