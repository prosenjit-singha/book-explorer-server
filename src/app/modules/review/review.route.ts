import auth from "../../middlewares/auth";
import ReviewController from "./review.controller";
import express from "express";

const ReviewRoutes = express.Router();

ReviewRoutes.get("/:bookId", auth("all"), ReviewController.getAllReviews);
ReviewRoutes.post("/", auth("all"), ReviewController.postReview);

export default ReviewRoutes;
