import { Router } from "express";
import BookController from "./book.controller";
import auth from "../../middlewares/auth";

const BookRoutes = Router();

BookRoutes.post("/", auth("all"), BookController.createBook);

export default BookRoutes;
