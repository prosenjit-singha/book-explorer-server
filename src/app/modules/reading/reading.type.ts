import { ObjectId } from "mongoose";

type ReadingBook = {
  userId: ObjectId;
  bookId: ObjectId;
  status: "finished" | "reading";
};

export default ReadingBook;
