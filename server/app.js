import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import usersRouter from "#server/api/users";
import reviewsRouter from "#server/api/reviews";
import wineriesRouter from "#server/api/wineries";

import getUserFromToken from "#server/middleware/getUserFromToken";
import handlePostgresErrors from "#server/middleware/handlePostgresErrors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/,
   credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getUserFromToken);

// API Routes
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/wineries", wineriesRouter);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Serve static assets
  app.use("/assets", express.static(path.join(__dirname, "../client/dist/assets")));

  // Serve index.html for all other routes (React handles routing)
  app.get("/*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
} else {
  // Development: simple root route
  app.get("/", (req, res) => res.send("Hello, World!"));
}

// Error handling
app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;