export type Book = {
  id: number;
  author?: string;
  publishDate?: string;
  topics?: string;
  publisher?: string;
  language?: string;
  bookId?: string;
  bookName: string;
  epubLink?: string;
  pdfLink?: string;
};

export type Question = {
  id: number;
  question: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  option4: string | null;
};

export type Message = {
  content: string;
  sender: "system" | "user";
  questionId: number | null;
  id: number;
  bookId: number | null;
  userId: number;
  createdAt: Date;
};
