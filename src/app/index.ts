import express from "express";
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import handleNotFoundAPI from "./middlewares/notFoundAPI";
import cookieParser from "cookie-parser";
const app = express();

// PARSERS
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running..."));

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(handleNotFoundAPI);

export default app;
