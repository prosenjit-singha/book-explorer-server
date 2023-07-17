import { z } from "zod";
import BookConst from "./book.const";

const book = z.object({
  body: z.object({
    title: z.string(),
    genre: z.enum(BookConst.genre),
    author: z.string(),
    publishedOn: z.coerce.date(),
    isPublished: z.boolean().optional(),
  }),
});

const BookZodSchema = { book };

export default BookZodSchema;
