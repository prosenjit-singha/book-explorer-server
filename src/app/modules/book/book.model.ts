import { Schema, Types, model } from "mongoose";
import { Book, BookMethods, BookModelType } from "./book.type";
import BookConst from "./book.const";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const bookSchema = new Schema<Book, BookModelType, BookMethods>(
  {
    title: { type: String, trim: true, required: true },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    genre: { type: String, enum: BookConst.genre, required: true },
    publishedOn: { type: Date, required: true },
    reviews: {
      type: [Types.ObjectId],
      ref: "Reviews",
      default: [],
    },
    totalViews: { type: Number, default: 0 },
  },
  { timestamps: true },
);

bookSchema.static(
  "verifyAuthor",
  async function (bookId: string, userId: string, msg: string) {
    const book = await this.findById(bookId);

    if (!book)
      throw new ApiError(httpStatus.NOT_FOUND, msg, "Book doesn't exist.");

    if (String(book.author) !== userId) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        msg,
        "User is not the author of this book.",
      );
    }
  },
);

const BookModel = model<Book, BookModelType>("Book", bookSchema);

export default BookModel;
