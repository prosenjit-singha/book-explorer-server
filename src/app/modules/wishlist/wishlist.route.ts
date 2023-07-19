import express from "express";
import auth from "../../middlewares/auth";
import WishlistController from "./wishlist.controller";

const WishlistRoutes = express.Router();

WishlistRoutes.get("/", auth("all"), WishlistController.getAllWishlist);
WishlistRoutes.post("/", auth("all"), WishlistController.addToWishlist);
WishlistRoutes.get(
  "/:wishlistId",
  auth("all"),
  WishlistController.removeFromWishlist,
);

export default WishlistRoutes;
