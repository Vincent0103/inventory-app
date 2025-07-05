import { Router } from "express";
import editController from "../controllers/editController";

const editRouter = Router();
editRouter.get("/:itemSlug", editController.plushyEditGet);
editRouter.post("/:itemSlug", editController.plushyEditPost);

export default editRouter;
