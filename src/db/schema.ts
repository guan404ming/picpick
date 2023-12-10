import {
  index,
  pgTable,
  serial,
  boolean,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

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

export const favouritesTable = pgTable("FAVOURITES", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userTable.id, {
    onDelete: "cascade",
  }),
  bookId: varchar("book_id").references(() => bookTable.bookId, {
    onDelete: "cascade",
  }),
  bookmark: integer("bookmark").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const bookTable = pgTable("PICBOOK", {
  bookId: varchar("book_id", { length: 256 }).primaryKey(),
  bookName: varchar("book_name", { length: 256 }).notNull(),
  pdfLink: varchar("pdf_link", { length: 512 }),
  epubLink: varchar("epub_link", { length: 512 }).notNull(),
  author: varchar("author", { length: 256 }),
  publishDate: varchar("publish_date", { length: 256 }),
  topics: varchar("topics", { length: 256 }),
  language: varchar("language", { length: 256 }),
  publisher: varchar("publisher", { length: 256 }),
});

export const messageTable = pgTable("MESSAGE", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userTable.id, {
    onDelete: "cascade",
  }),
  content: varchar("content", { length: 512 }).notNull(),
  sender: varchar("sender", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const questionTable = pgTable("QUESTION", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }),
  option1: varchar("option_1", { length: 256 }),
  option2: varchar("option_2", { length: 256 }),
  option3: varchar("option_3", { length: 256 }),
  option4: varchar("option_4", { length: 256 }),
});
