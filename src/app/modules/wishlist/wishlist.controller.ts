import catchAsync from "../../../shared/catchAsync";
import WishlistService from "./wishlist.service";

const getAllWishlist = catchAsync(async (req) => {
  const userId = req.user.id;
  const data = await WishlistService.getAllWishlist(userId);
  return {
    message: "",
    data,
  };
});
const addToWishlist = catchAsync(async (req) => {
  const userId = req.user.id;
  const { bookId } = req.body;
  const data = await WishlistService.addToWishlist(userId, bookId);
  return {
    message: "",
    data,
  };
});

const removeFromWishlist = catchAsync(async (req) => {
  const { wishlistId } = req.params;
  const data = await WishlistService.removeFromWishlist(wishlistId);
  return {
    message: "",
    data,
  };
});

const WishlistController = {
  getAllWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default WishlistController;
