import { Book } from "./book.type";

const genre = ["Science", "Arts", "Romance", "Comedy", "Manga"] as const;

const searchableFields: (keyof Book)[] = ["title", "genre", "author"];

const filterableFields = [
  "searchTerm",
  "minPrice",
  "maxPrice",
  "genre",
  "publishedOn",
];

const updatableFields: (keyof Book)[] = [
  "title",
  "genre",
  "publishedOn",
  "isPublished",
];

const BookConst = {
  genre,
  searchableFields,
  filterableFields,
  updatableFields,
};

export default BookConst;
