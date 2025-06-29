import "dotenv/config";
import express from "express";
import path from "path";
import usersRouter from "./routes/usersRouter";
import inventoryRouter from "./routes/inventoryRouter";

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static files (for CSS, JS, images)
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);
app.use("/inventory", inventoryRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Express app listening at port ${PORT}`);
});
