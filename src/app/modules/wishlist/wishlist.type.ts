import { ObjectId } from "mongoose";

type Wishlist = {
  userId: ObjectId;
  bookId: ObjectId;
};

export default Wishlist;
