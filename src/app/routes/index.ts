import express from "express";
import AuthRoutes from "../modules/auth/auth.route";
import BookRoutes from "../modules/book/book.route";
import ReviewRoutes from "../modules/review/review.route";
import WishlistRoutes from "../modules/wishlist/wishlist.route";

const router = express.Router();

const modules = [
  {
    path: "/auth",
    routes: AuthRoutes,
  },
  {
    path: "/books",
    routes: BookRoutes,
  },
  {
    path: "/book/reviews",
    routes: ReviewRoutes,
  },
  {
    path: "/wishlist",
    routes: WishlistRoutes,
  },
];

modules.forEach((module) => {
  router.use(module.path, module.routes);
});

export default router;
