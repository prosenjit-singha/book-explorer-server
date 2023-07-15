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

// GET SINGLE BOOK
BookRoutes.get("/:bookId", BookController.getSingleBook);

export default BookRoutes;
