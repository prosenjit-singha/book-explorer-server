import PaginationConst from "../../../constants/pagination.const";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import BookConst from "./book.const";
import BookService from "./book.service";

const createBook = catchAsync(async (req) => {
  const payload = { ...req.body, author: req.user.id };
  const data = await BookService.createBook(payload);

  return {
    data,
    message: "Book successfully added.",
  };
});

const getAllBooks = catchAsync(async (req) => {
  const filters = pick(req.query, BookConst.filterableFields);
  const paginationOptions = pick(req.query, PaginationConst.fields);

  const data = await BookService.getAllBooks(filters, paginationOptions);

  return {
    message: "Books has been successfully retrieved.",
    data,
  };
});

const BookController = { createBook, getAllBooks };

export default BookController;
