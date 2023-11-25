import { index, pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";

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

export const favourites = pgTable(
  "FAVOURITES",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => userTable.id),
    bookId: integer("book_id").references(() => bookTable.bookId),
    createdAt: timestamp("created_at", { mode:"date" }).defaultNow(),
  },
);

export const bookTable = pgTable(
  "PICBOOK",
  {
    bookId: varchar("book_id", {length: 256}).primaryKey(),
    bookName: varchar("book_name", { length: 256 }).notNull(),
    pdfLink: varchar("pdf_link", { length: 512 }),
    epubLink: varchar("epub_link", { length: 512 }).notNull(),
    author: varchar("author", { length: 256 }),
    publishDate: timestamp("publish_date", { mode:"date" }),
  }
);

export const messageTable = pgTable(
  "MESSAGE",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => userTable.id),
    content: varchar("content", { length: 512 }).notNull(),
    createdAt: timestamp("created_at", { mode:"date" }).defaultNow(),
  }
);