import express from "express";
import AuthRoutes from "../modules/auth/auth.route";

const router = express.Router();

const modules = [
  {
    path: "/auth",
    routes: AuthRoutes,
  },
];

modules.forEach(module => {
  router.use(module.path, module.routes);
});

export default router;
