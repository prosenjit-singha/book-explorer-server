import express from "express";
import AuthRoutes from "../modules/auth/auth.route";
import BookRoutes from "../modules/book/book.route";
import ReviewRoutes from "../modules/review/review.route";

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
];

modules.forEach((module) => {
  router.use(module.path, module.routes);
});

export default router;
