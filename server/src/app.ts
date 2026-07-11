import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import Routes
import appRoutes from "@routes/app.routes.js";
import authRoutes from "@routes/auth.routes.js";

// Import middlewares
import errorMiddleware from "@middlewares/errorMiddleware.js";
import routeNotFound from "@middlewares/routeNotFound.js";
import logger from "@middlewares/logger.js";

const app = express();

// Global middlewares
app.use(
  cors({
    // To be fixed
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(logger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", appRoutes);
app.use("/auth", authRoutes);

// Middlewares
app.use(routeNotFound);
app.use(errorMiddleware);

export default app;
