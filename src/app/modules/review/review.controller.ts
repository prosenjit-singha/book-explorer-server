import catchAsync from "../../../shared/catchAsync";
import ReviewService from "./review.service";

const getAllReviews = catchAsync(async (req) => {
  const { bookId } = req.params;
  const data = await ReviewService.getAllReviews(bookId);
  return { data, message: "All reviews retrieved" };
});

const postReview = catchAsync(async (req) => {
  const payload = { ...req.body, user: req.user.id };
  const data = await ReviewService.postReview(payload);
  return {
    message: "Review successfully added.",
    data,
  };
});

const ReviewController = { getAllReviews, postReview };

export default ReviewController;
