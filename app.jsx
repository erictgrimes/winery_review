import express from "express";
const app = express();

import Login from "./components/login.jsx";

import usersRouter from "#api/users";
import reviewsRouter from "#api/reviews";
import wineriesRouter from "#api/wineries";

import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
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

function App() {
  return (
    <div>
      <h1>Welcome to the Winery Review App</h1>
      <Login />
    </div>
  );
}

export default App;
