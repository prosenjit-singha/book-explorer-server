import { Types } from "mongoose";
import ReadingBookModel from "./reading.model";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import ReadingBook from "./reading.type";

const getAllReadingBookList = async (userId: string) => {
  const data = await ReadingBookModel.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $unwind: "$book",
    },
  ]);
  return data;
};

const removeFromReadingList = async (id: string) => {
  const data = await ReadingBookModel.findOneAndDelete({ _id: id })
    .lean()
    .exec();

  if (!data) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to remove",
      "Book not found in wishlist",
    );
  }
};

const addToReadingList = async (userId: string, bookId: string) => {
  const data = await ReadingBookModel.create({ userId, bookId });
  return data.toObject();
};

const updateReadingStatus = async (
  id: string,
  payload: { status: ReadingBook["status"] },
) => {
  const data = await ReadingBookModel.findOneAndUpdate(
    { _id: id },
    { status: payload.status },
    { new: true },
  );

  if (!data) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to updated status.",
      "Book not found",
    );
  }
};

const WishlistService = {
  getAllReadingBookList,
  removeFromReadingList,
  addToReadingList,
  updateReadingStatus,
};

export default WishlistService;
