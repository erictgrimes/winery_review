import express from "express";
const app = express();

import Login from "./components/login.jsx";

import usersRouter from "#server/api/users";
import reviewsRouter from "#server/api/reviews";
import wineriesRouter from "#server/api/wineries";

import getUserFromToken from "#server/middleware/getUserFromToken";
import handlePostgresErrors from "#server/middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Hello, World!"));

app.use("/users", usersRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

function app() {
  return (
    <div>
      <h1>Welcome to the Winery Review App</h1>
      <Login />
    </div>
  );
}

export default app;
