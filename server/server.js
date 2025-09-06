import db from "#server/db/client";
import app from "./app.js";

const init = async () => {
  const PORT = process.env.PORT ?? 3000;

  try {
    await db.connect();
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

init();
