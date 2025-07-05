import { Router } from "express";
import usersController from "../controllers/usersController";

const usersRouter = Router();
usersRouter.get("/", usersController.homepageGet);
usersRouter.get("/categories", usersController.categoriesGet);
usersRouter.get("/create/plushy", usersController.createItemGet);
usersRouter.post("/create/plushy", usersController.createItemPost);

export default usersRouter;
