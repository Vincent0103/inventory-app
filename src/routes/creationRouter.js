import { Router } from "express";
import creationController from "../controllers/creationController";
import usersController from "../controllers/indexController";

const creationRouter = new Router();
creationRouter.get("/plushy", creationController.createPlushyGet);
creationRouter.post("/plushy", creationController.createPlushyPost);
creationRouter.get("/category", creationController.createCategoryGet);

export default creationRouter;
