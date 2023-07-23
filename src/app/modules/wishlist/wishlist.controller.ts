import catchAsync from "../../../shared/catchAsync";
import WishlistService from "./wishlist.service";

const getAllWishlist = catchAsync(async (req) => {
  const userId = req.user.id;
  const data = await WishlistService.getAllWishlist(userId);
  return {
    message: "Wishlist retrieved.",
    data,
  };
});
const addToWishlist = catchAsync(async (req) => {
  const userId = req.user.id;
  const { bookId } = req.body;
  const data = await WishlistService.addToWishlist(userId, bookId);
  return {
    message: "Book added to wishlist.",
    data,
  };
});

const removeFromWishlist = catchAsync(async (req) => {
  const { bookId } = req.params;
  const data = await WishlistService.removeFromWishlist(bookId);
  return {
    message: "Book removed from wishlist.",
    data,
  };
});

const WishlistController = {
  getAllWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default WishlistController;
