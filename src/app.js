import "dotenv/config";
import express from "express";
import path from "path";
import indexRouter from "./routes/indexRouter";
import inventoryRouter from "./routes/inventoryRouter";
import creationRouter from "./routes/creationRouter";
import editRouter from "./routes/editRouter";
import deleteRouter from "./routes/deleteRouter";

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static files (for CSS, JS, images)
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/edit", editRouter);
app.use("/delete", deleteRouter);
app.use("/inventory", inventoryRouter);
app.use("/create", creationRouter);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Express app listening at port ${PORT}`);
});
