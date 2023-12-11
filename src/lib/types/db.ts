import type {
  bookTable,
  favouriteTable,
  messageTable,
  questionTable,
} from "@/db/schema";

export type SelectBook = typeof bookTable.$inferSelect;

export type InsertBook = typeof bookTable.$inferInsert;

export type InsertQuestion = typeof questionTable.$inferSelect;

export type SelectQuestion = typeof questionTable.$inferSelect;

export type InsertMessage = typeof messageTable.$inferInsert;

export type SelectMessage = typeof messageTable.$inferSelect;

export type SelectFavourite = typeof favouriteTable.$inferSelect;

export type InsertFavourite = typeof favouriteTable.$inferInsert;
