import { Router } from "express";
import BookController from "./book.controller";
import auth from "../../middlewares/auth";
import validateReq from "../../middlewares/validateReq";
import BookZodSchema from "./book.validation";

const BookRoutes = Router();

BookRoutes.post(
  "/",
  validateReq(BookZodSchema.book),
  auth("all"),
  BookController.createBook,
);

BookRoutes.get("/", auth("all"), BookController.getAllBooks);

export default BookRoutes;
