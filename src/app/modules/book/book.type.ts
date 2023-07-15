import { Model, ObjectId } from "mongoose";

export type Book = {
  title: string;
  author: ObjectId;
  genre: string;
  publishedOn: Date;
  reviews: ObjectId;
  totalViews: number;
  isPublished: boolean;
};

export type BookMethods = object;

export type BookModelType = Model<Book, object, BookMethods> & {
  verifyAuthor: (bookId: string, userId: string, msg: string) => Promise<void>;
};
