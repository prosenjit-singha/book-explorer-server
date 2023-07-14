import {
  PaginationOptionsResult,
  PaginationOptions,
} from "../types/pagination.type";

const calcPagination = (
  options: PaginationOptions,
): PaginationOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 20);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calcPagination;
