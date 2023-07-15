import { Schema, Types, model } from "mongoose";
import { Book } from "./book.type";

const bookSchema = new Schema<Book>(
  {
    title: { type: String, trim: true, required: true },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    genre: { type: String, required: true },
    publishedOn: { type: Date, required: true },
    reviews: {
      type: [Types.ObjectId],
      ref: "Reviews",
      default: [],
    },
  },
  { timestamps: true },
);

const BookModel = model<Book>("Book", bookSchema);

export default BookModel;
