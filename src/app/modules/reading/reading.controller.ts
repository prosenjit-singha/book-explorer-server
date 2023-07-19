import catchAsync from "../../../shared/catchAsync";
import WishlistService from "./reading.service";

const getAllReadingBooks = catchAsync(async (req) => {
  const userId = req.user.id;
  const data = await WishlistService.getAllReadingBookList(userId);
  return {
    message: "",
    data,
  };
});
const addToReadingList = catchAsync(async (req) => {
  const userId = req.user.id;
  const { bookId } = req.body;
  const data = await WishlistService.addToReadingList(userId, bookId);
  return {
    message: "",
    data,
  };
});

const removeFromReadingList = catchAsync(async (req) => {
  const { wishlistId } = req.params;
  const data = await WishlistService.removeFromReadingList(wishlistId);
  return {
    message: "",
    data,
  };
});
const updateReadingStatus = catchAsync(async (req) => {
  const { id } = req.params;
  const data = await WishlistService.updateReadingStatus(id, req.body);
  return {
    message: "",
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
