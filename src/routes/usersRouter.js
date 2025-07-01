import { Router } from "express";
import usersController from "../controllers/usersController";

const usersRouter = Router();
usersRouter.get("/", usersController.homepageGet);
usersRouter.get("/create", usersController.createItemGet);
usersRouter.post("/create", usersController.createItemPost);

export default usersRouter;
