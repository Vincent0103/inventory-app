import { Router } from "express";
import editController from "../controllers/editController";

const editRouter = Router();
editRouter.get("/:plushySlug", editController.plushyEditGet);
editRouter.post("/:plushySlug", editController.plushyEditPost);
editRouter.get("/:categorySlug", editController.categoryEditGet);
editRouter.post("/:categorySlug", editController.categoryEditPost);

export default editRouter;
