import { Router } from "express";
import BookController from "./book.controller";

const BookRoutes = Router();

BookRoutes.post("/", BookController.createBook);

export default BookRoutes;
