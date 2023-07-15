import { ObjectId } from "mongoose";

export type Book = {
  title: string;
  author: ObjectId;
  genre: string;
  publishedOn: Date;
  reviews: ObjectId;
  totalViews: number;
};
