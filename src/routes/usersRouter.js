import { Router } from "express";
import usersController from "../controllers/usersController";

const usersRouter = Router();
usersRouter.get("/", usersController.homepageGet);
// usersRouter.get("/create", usersRouter.createItemGet);
// usersRouter.post("/create", usersRouter.createItemPost);
// usersRouter.get("/inventory", usersRouter.inventoryGet);

export default usersRouter;
