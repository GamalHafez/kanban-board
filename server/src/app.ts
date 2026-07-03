import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { getHome } from "./src/controllers/app.controller.js";

const app = express();
config();

app.use(cors());
app.use(express.json());

app.get("/", getHome);

export default app;
