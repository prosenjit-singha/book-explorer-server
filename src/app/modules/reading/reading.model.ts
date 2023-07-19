import { Schema, Types, model } from "mongoose";
import ReadingBook from "./reading.type";
import ReadingConst from "./reading.const";

const readingBookSchema = new Schema<ReadingBook>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    bookId: { type: Types.ObjectId, ref: "Book", required: true },
    status: { type: String, enum: ReadingConst.status, default: "reading" },
  },
  { timestamps: true },
);

const ReadingBookModel = model<ReadingBook>("Wishlist", readingBookSchema);

export default ReadingBookModel;
