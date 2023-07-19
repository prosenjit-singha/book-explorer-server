import { Schema, Types, model } from "mongoose";
import Wishlist from "./wishlist.type";

const wishlistSchema = new Schema<Wishlist>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    bookId: { type: Types.ObjectId, ref: "Book", required: true },
  },
  { timestamps: true },
);

const WishlistModel = model<Wishlist>("Wishlist", wishlistSchema);

export default WishlistModel;
