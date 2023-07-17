import PaginationConst from "../../../constants/pagination.const";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import BookConst from "./book.const";
import BookService from "./book.service";

const createBook = catchAsync(async (req) => {
  const payload = { ...req.body, createdBy: req.user.id };
  const data = await BookService.createBook(payload);

  return {
    data,
    message: "Book successfully added.",
  };
});

const getAllBooks = catchAsync(async (req) => {
  const filters = pick(req.query, BookConst.filterableFields);
  const paginationOptions = pick(req.query, PaginationConst.fields);

  const { data, meta } = await BookService.getAllBooks(
    filters,
    paginationOptions,
  );

  return {
    message: "Books has been successfully retrieved.",
    data,
    meta,
  };
});

const getSingleBook = catchAsync(async (req) => {
  const bookId = req.params.bookId;
  const data = await BookService.getSingleBook(bookId);

  return {
    message: "Book details successfully retrieved.",
    data,
  };
});

const updateBook = catchAsync(async (req) => {
  const payload = pick(req.body, BookConst.updatableFields);
  const userId = req.user.id;
  const bookId = req.params.bookId;
  const book = await BookService.updateBook(bookId, userId, payload);

  return {
    data: book,
    message: "Book has been successfully updated.",
  };
});

const deleteBook = catchAsync(async (req) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;
  const data = await BookService.deleteBook(bookId, userId);
  return {
    data,
    message: "Book has been deleted successfully.",
  };
});

const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
};

export default BookController;
