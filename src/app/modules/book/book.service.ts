import mongoose, { SortOrder, Types } from "mongoose";
import ApiResponse from "../../../types/apiResponse.type";
import { PaginationOptions } from "../../../types/pagination.type";
import BookModel from "./book.model";
import { Book } from "./book.type";
import BookConst from "./book.const";
import calcPagination from "../../../helpers/pagination.helper";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const createBook = async (payload: Book) => {
  const data = await BookModel.create(payload);
  return data;
};

const getAllBooks = async (
  filters: { searchTerm?: string },
  paginationOptions: PaginationOptions,
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calcPagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BookConst.searchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        // match by year
        if (field === "publishedOn") {
          return {
            $expr: {
              $eq: [{ $year: "$publishedOn" }, value],
            },
          };
        }

        // match by creator id
        if (field === "createdBy") {
          return { [field]: value };
        }

        return {
          [field]: {
            $regex: new RegExp(`^${value}$`, "i"), // Perform case-insensitive regex exact match
          },
        };
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const data = await BookModel.find(whereConditions, { reviews: 0 })
    .populate("author", "fullName -_id")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  const totalResults = await BookModel.countDocuments(whereConditions)
    .lean()
    .exec();

  const meta: ApiResponse["meta"] = {
    page,
    limit,
    sortBy,
    sortOrder,
    totalResults,
    totalPages: Math.round(totalResults / limit) + 1,
  };

  return { data, meta };
};

const getSingleBook = async (bookId: string) => {
  const book = await BookModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(bookId) },
    },
    {
      $addFields: {
        totalReviews: { $size: "$reviews" },
      },
    },
    {
      $project: {
        __v: 0,
        reviews: 0,
      },
    },
  ]);

  if (!book.length)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to retrieve book details.",
      "Book doesn't exist.",
    );

  return book[0];
};

const updateBook = async (
  bookId: string,
  userId: string,
  payload: Partial<Book>,
) => {
  await BookModel.verifyAuthor(
    bookId,
    userId,
    "Failed to update book details.",
  );

  const data = await BookModel.findOneAndUpdate({ _id: bookId }, payload, {
    new: true,
  })
    .select("-__v -reviews")
    .lean()
    .exec();

  return data;
};

const deleteBook = async (bookId: string, userId: string) => {
  await BookModel.verifyAuthor(bookId, userId, "Failed to delete the book.");

  const book = await BookModel.findOneAndDelete({
    _id: new Types.ObjectId(bookId),
  }).select("-__v, -reviews");

  return book;
};

const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};

export default BookService;
