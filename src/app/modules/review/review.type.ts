import { ObjectId } from "mongoose";

export type Review = {
  user: ObjectId;
  bookId: ObjectId;
  content: string;
  createdAt: string;
  updatedAt: string;
};
