import { Router } from "express";
import deleteController from "../controllers/deleteController";

const deleteRouter = Router();
deleteRouter.get("/plushy/:plushySlug", deleteController.plushyDeleteGet);
deleteRouter.get("/category/:categorySlug", deleteController.categoryDeleteGet);

export default deleteRouter;
