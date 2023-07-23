import catchAsync from "../../../shared/catchAsync";
import ReadingService from "./reading.service";

const getAllReadingBooks = catchAsync(async (req) => {
  const userId = req.user.id;
  const data = await ReadingService.getAllReadingBookList(userId);
  return {
    message: "Reading book list retrieved.",
    data,
  };
});
const addToReadingList = catchAsync(async (req) => {
  const userId = req.user.id;
  const { bookId } = req.body;
  const data = await ReadingService.addToReadingList(userId, bookId);
  return {
    message: "Book added to reading list.",
    data,
  };
});

const removeFromReadingList = catchAsync(async (req) => {
  const { id } = req.params;
  const data = await ReadingService.removeFromReadingList(id);
  return {
    message: "Book removed from reading list.",
    data,
  };
});
const updateReadingStatus = catchAsync(async (req) => {
  const { id } = req.params;
  const data = await ReadingService.updateReadingStatus(id, req.body);
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
