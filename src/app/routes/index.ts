import express from "express";
import AuthRoutes from "../modules/auth/auth.route";
import BookRoutes from "../modules/book/book.route";
import ReviewRoutes from "../modules/review/review.route";
import WishlistRoutes from "../modules/wishlist/wishlist.route";
import ReadingBooksRoutes from "../modules/reading/reading.route";

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
  {
    path: "/reading",
    routes: ReadingBooksRoutes,
  },
];

modules.forEach((module) => {
  router.use(module.path, module.routes);
});

export default router;
