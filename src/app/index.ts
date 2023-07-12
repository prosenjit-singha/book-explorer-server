import express from "express";

const app = express();

// parser
app.use(cors());
app.use(express.json());

export default app;
