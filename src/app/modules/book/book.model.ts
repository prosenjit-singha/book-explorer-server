import { Schema, model } from "mongoose";
import { Book } from "./book.type";

const bookSchema = new Schema<Book>({
  title: String,
  author: String,
  genre: String,
  publishedOn: String,
  reviews: String,
});

const BookModel = model("Book", bookSchema);

export default BookModel;
