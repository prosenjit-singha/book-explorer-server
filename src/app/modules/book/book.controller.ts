import catchAsync from "../../../shared/catchAsync";
import BookService from "./book.service";

const createBook = catchAsync(async req => {
  const data = await BookService.createBook(req.body);

  return {
    data,
    message: "Book successfully added.",
  };
});

const BookController = { createBook };

export default BookController;
