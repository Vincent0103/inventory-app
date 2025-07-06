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

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).render("error", {
    statusCode: 404,
    title: "Page Not Found",
    message: "The page you're looking for doesn't exist.",
    showBackButton: true,
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;
  const title = err.title || "Server Error";
  const message = err.message || "Something went wrong on our end.";

  res.status(statusCode).render("error", {
    statusCode,
    title,
    message,
    showBackButton: true,
    errors: err.errors || [],
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Express app listening at port ${PORT}`);
});
