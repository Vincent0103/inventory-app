import { Router } from "express";
import indexController from "../controllers/indexController";

const indexRouter = Router();
indexRouter.get("/", indexController.homepageGet);
indexRouter.get("/categories", indexController.categoriesGet);

export default indexRouter;
