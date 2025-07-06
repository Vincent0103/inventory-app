import { Router } from "express";
import editController from "../controllers/editController";

const editRouter = Router();
editRouter.get("/plushy/:plushySlug", editController.plushyEditGet);
editRouter.post("/plushy/:plushySlug", editController.plushyEditPost);
editRouter.get("/category/:categorySlug", editController.categoryEditGet);
editRouter.post("/category/:categorySlug", editController.categoryEditPost);

export default editRouter;
