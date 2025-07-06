import { Router } from "express";
import editController from "../controllers/editController";

const editRouter = Router();
editRouter.get("/:plushySlug", editController.plushyEditGet);
editRouter.post("/:plushySlug", editController.plushyEditPost);

export default editRouter;
