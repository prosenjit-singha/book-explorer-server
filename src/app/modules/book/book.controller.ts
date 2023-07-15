import catchAsync from "../../../shared/catchAsync";
import BookService from "./book.service";

const createBook = catchAsync(async req => {
  const payload = { ...req.body, author: req.user.id };
  const data = await BookService.createBook(payload);

  return {
    data,
    message: "Book successfully added.",
  };
});

const BookController = { createBook };

export default BookController;
