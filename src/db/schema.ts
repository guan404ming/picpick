import { index, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "USER",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 50 }).notNull(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);
