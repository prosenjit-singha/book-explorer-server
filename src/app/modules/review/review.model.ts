import { Schema, Types, model } from "mongoose";
import { Review } from "./review.type";

const reviewSchema = new Schema<Review>({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  bookId: { type: Types.ObjectId, ref: "Book", required: true },
  content: { type: String, required: true },
});

const ReviewModel = model("Review", reviewSchema);

export default ReviewModel;
