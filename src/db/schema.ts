import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
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
    onUpdate: "cascade",
  }),
  bookId: integer("book_id").references(() => bookTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  bookmark: integer("bookmark").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const bookTable = pgTable("PICBOOK", {
  id: serial("id").primaryKey().unique(),
  bookId: varchar("book_id", { length: 256 }).unique(),
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
});

export const questionTable = pgTable("QUESTION", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }).notNull(),
  option1: varchar("option_1", { length: 256 }),
  option2: varchar("option_2", { length: 256 }),
  option3: varchar("option_3", { length: 256 }),
  option4: varchar("option_4", { length: 256 }),
});
