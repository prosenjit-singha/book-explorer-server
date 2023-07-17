import { ObjectId } from "mongoose";

export type Review = {
  userId: ObjectId;
  bookId: ObjectId;
  content: string;
  createdAt: string;
  updatedAt: string;
};
