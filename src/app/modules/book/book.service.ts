import { SortOrder } from "mongoose";
import ApiResponse from "../../../types/apiResponse.type";
import { PaginationOptions } from "../../../types/pagination.type";
import BookModel from "./book.model";
import { Book } from "./book.type";
import BookConst from "./book.const";
import calcPagination from "../../../helpers/pagination.helper";

const createBook = async (payload: Book) => {
  const data = await BookModel.create(payload);
  console.log(data);
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
        // minPrice
        if (field === "publishedOn") {
          return {
            publishedOn: { $eq: new Date(value as string) },
          };
        }

        // location
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

  const data = await BookModel.find(whereConditions)
    .select("-reviews")
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

const BookService = { createBook, getAllBooks };

export default BookService;
