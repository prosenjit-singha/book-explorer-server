import catchAsync from "../../../shared/catchAsync";
import WishlistService from "./reading.service";

const getAllReadingBooks = catchAsync(async (req) => {
  const userId = req.user.id;
  const data = await WishlistService.getAllReadingBookList(userId);
  return {
    message: "Reading book list retrieved.",
    data,
  };
});
const addToReadingList = catchAsync(async (req) => {
  const userId = req.user.id;
  const { bookId } = req.body;
  const data = await WishlistService.addToReadingList(userId, bookId);
  return {
    message: "Book added to reading list.",
    data,
  };
});

const removeFromReadingList = catchAsync(async (req) => {
  const { id } = req.params;
  const data = await WishlistService.removeFromReadingList(id);
  return {
    message: "Book removed from reading list.",
    data,
  };
});
const updateReadingStatus = catchAsync(async (req) => {
  const { id } = req.params;
  const data = await WishlistService.updateReadingStatus(id, req.body);
  return {
    message: "Reading status updated.",
    data,
  };
});

const WishlistController = {
  getAllReadingBooks,
  addToReadingList,
  removeFromReadingList,
  updateReadingStatus,
};

export default WishlistController;
