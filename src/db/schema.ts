import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "USER",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 50 }).notNull(),
    role: varchar("role", { enum: ["normal", "admin"] })
      .notNull()
      .default("normal"),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

export const favouriteTable = pgTable(
  "FAVOURITE",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    bookId: integer("book_id").references(() => bookTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    bookmark: integer("bookmark").default(0),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  },
  (table) => ({
    unq: unique().on(table.userId, table.bookId),
    createdAtIndex: index("createdAt_index").on(table.createdAt),
  }),
);

export const bookTable = pgTable(
  "BOOK",
  {
    id: serial("id").primaryKey(),
    bookId: varchar("book_id", { length: 256 }).unique(),
    bookName: varchar("book_name", { length: 256 }).notNull(),
    pdfLink: varchar("pdf_link", { length: 512 }),
    author: varchar("author", { length: 256 }),
    publishDate: varchar("publish_date", { length: 256 }),
    topics: varchar("topics", { length: 256 }),
    publisher: varchar("publisher", { length: 256 }),
  },
  (table) => ({
    bookIdIndex: index("bookId_index").on(table.bookId),
  }),
);

export const messageTable = pgTable(
  "MESSAGE",
  {
    id: serial("id").primaryKey(),
    questionId: integer("question_id").references(() => questionTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    bookId: integer("book_id").references(() => bookTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    userId: integer("user_id")
      .references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    content: varchar("content", { length: 512 }).notNull(),
    sender: varchar("sender", { enum: ["user", "system"] }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    createdAtIndex: index("createdAt_index").on(table.createdAt),
    userIdIndex: index("userId_index").on(table.userId),
  }),
);

export const questionTable = pgTable("QUESTION", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }).notNull(),
  option1: varchar("option_1", { length: 256 }),
  option2: varchar("option_2", { length: 256 }),
  option3: varchar("option_3", { length: 256 }),
  option4: varchar("option_4", { length: 256 }),
});
