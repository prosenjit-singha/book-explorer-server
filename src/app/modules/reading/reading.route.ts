import express from "express";
import auth from "../../middlewares/auth";
import WishlistController from "./reading.controller";

const ReadingBooksRoutes = express.Router();

ReadingBooksRoutes.get("/", auth("all"), WishlistController.getAllReadingBooks);
ReadingBooksRoutes.post("/", auth("all"), WishlistController.addToReadingList);
ReadingBooksRoutes.delete(
  "/:id",
  auth("all"),
  WishlistController.removeFromReadingList,
);
ReadingBooksRoutes.patch(
  "/:id",
  auth("all"),
  WishlistController.updateReadingStatus,
);

export default ReadingBooksRoutes;
