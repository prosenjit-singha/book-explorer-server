import express from "express";
import auth from "../../middlewares/auth";
import ReadingController from "./reading.controller";

const ReadingBooksRoutes = express.Router();

ReadingBooksRoutes.get("/", auth("all"), ReadingController.getAllReadingBooks);
ReadingBooksRoutes.post("/", auth("all"), ReadingController.addToReadingList);
ReadingBooksRoutes.delete(
  "/:id",
  auth("all"),
  ReadingController.removeFromReadingList,
);
ReadingBooksRoutes.patch(
  "/:id",
  auth("all"),
  ReadingController.updateReadingStatus,
);

export default ReadingBooksRoutes;
