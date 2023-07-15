import express from "express";
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import handleNotFoundAPI from "./middlewares/notFoundAPI";
const app = express();

// parser
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running..."));

app.use(router);

app.use(globalErrorHandler);

app.use(handleNotFoundAPI);

export default app;
