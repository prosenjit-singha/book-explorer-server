import { Types } from "mongoose";
import WishlistModel from "./wishlist.model";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const getAllWishlist = async (userId: string) => {
  const data = await WishlistModel.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
      },
    },
  ]);
  return data;
};

const removeFromWishlist = async (id: string) => {
  const data = await WishlistModel.findOneAndDelete({ _id: id }).lean().exec();

  if (!data) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to remove",
      "Book not found in wishlist",
    );
  }
};

const addToWishlist = async (userId: string, bookId: string) => {
  const data = await WishlistModel.create({ userId, bookId });
  return data.toObject();
};

const WishlistService = { getAllWishlist, removeFromWishlist, addToWishlist };

export default WishlistService;
