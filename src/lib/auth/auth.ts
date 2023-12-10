import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { privateEnv } from "../env/private";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { userTable } from "@/db/schema";

export const authOptions: NextAuthOptions = {
  secret: privateEnv.NEXTAUTH_SECRET,
  events: {
    signIn: async (session) => {
      await db
        .insert(userTable)
        .values({
          name: session.user.name as string,
          email: session.user.email as string,
        })
        .onConflictDoUpdate({
          target: userTable.email,
          set: {
            name: session.user.name as string,
          },
        })
        .execute();
    },
  },

  callbacks: {
    session: async ({ session }) => {
      const [user] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, session.user.email!));

      session.user.id = user.id;

      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: privateEnv.GOOGLE_CLIENT_ID,
      clientSecret: privateEnv.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
