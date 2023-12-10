export type Chat = {
  id: number;
  userId: number;
  content: string;
  sender: "user" | "system";
  createdAt: Date;
};
