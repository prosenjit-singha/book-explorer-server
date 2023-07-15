import { Router } from "express";
import BookController from "./book.controller";
import auth from "../../middlewares/auth";
import validateReq from "../../middlewares/validateReq";
import BookZodSchema from "./book.validation";

const BookRoutes = Router();

// ADD A BOOK
BookRoutes.post(
  "/",
  validateReq(BookZodSchema.book),
  auth("all"),
  BookController.createBook,
);

// GET ALL BOOKS
BookRoutes.get("/", BookController.getAllBooks);

BookRoutes.get("/my-books");

BookRoutes.route("/:bookId")
  .get(BookController.getSingleBook) // GET SINGLE BOOK
  .patch(BookController.updateBook) // UPDATE BOOK DETAILS
  .delete(BookController.deleteBook); // DELETE A BOOK

export default BookRoutes;
