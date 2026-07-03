import express from "express";
import cors from "cors";

// Import Routes
import appRoutes from "./routes/app.routes.js";

// Import middlewares
import errorMiddleware from "./middlewares/errorMiddleware.js";
import routeNotFound from "./middlewares/routeNotFound.js";

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/", appRoutes);

// Middlewares
app.use(routeNotFound);
app.use(errorMiddleware);

export default app;
