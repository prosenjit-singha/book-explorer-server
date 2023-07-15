import BookModel from "./book.model";
import { Book } from "./book.type";

const createBook = async (payload: Book) => {
  const data = await BookModel.create(payload);
  console.log(data);
  return data;
};

const BookService = { createBook };

export default BookService;
