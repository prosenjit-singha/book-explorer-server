import { z } from "zod";
import BookConst from "./book.const";

const book = z.object({
  body: z.object({
    title: z.string(),
    genre: z.enum(BookConst.genre),
    publishedOn: z.coerce.date(),
  }),
});

const BookZodSchema = { book };

export default BookZodSchema;