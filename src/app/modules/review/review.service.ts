import ReviewModel from "./review.model";
import { Review } from "./review.type";

const getAllReviews = async (bookId: string) => {
  const data = await ReviewModel.find({ bookId })
    .populate("userId", "fullName")
    .sort({ createdAt: "desc" })
    .lean()
    .exec();

  return data;
};

const postReview = async (payload: Review) => {
  const data = await ReviewModel.create(payload);
  return data;
};

const ReviewService = { postReview, getAllReviews };

export default ReviewService;
