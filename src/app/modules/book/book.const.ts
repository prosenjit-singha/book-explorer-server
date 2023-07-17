import { Book } from "./book.type";

const genre = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Historical Fiction",
  "Dystopian",
  "Adventure",
  "Crime Fiction",
  "Young Adult (YA)",
  "Children's Literature",
  "Biography",
  "Non-fiction",
  "Self-help",
  "Poetry",
  "Graphic Novel / Comic",
  "Satire",
  "Classic Literature",
  "Contemporary Fiction",
  "Paranormal",
  "Steampunk",
  "Urban Fantasy",
  "Cyberpunk",
  "Gothic Fiction",
  "Memoir",
  "Science Non-fiction",
  "Western",
  "Humor/Comedy",
] as const;

const searchableFields: (keyof Book)[] = ["title", "genre", "author"];

const filterableFields = [
  "searchTerm",
  "minPrice",
  "maxPrice",
  "genre",
  "publishedOn",
  "createdBy",
];

const updatableFields: (keyof Book)[] = [
  "title",
  "genre",
  "publishedOn",
  "isPublished",
  "author",
];

const BookConst = {
  genre,
  searchableFields,
  filterableFields,
  updatableFields,
};

export default BookConst;
