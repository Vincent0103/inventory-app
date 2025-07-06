import { Router } from "express";
import creationController from "../controllers/creationController";

const creationRouter = new Router();
creationRouter.get("/plushy", creationController.createPlushyGet);
creationRouter.post("/plushy", creationController.createPlushyPost);
creationRouter.get("/category", creationController.createCategoryGet);

export default creationRouter;
