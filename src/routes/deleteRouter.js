import { Router } from "express";
import deleteController from "../controllers/deleteController";

const deleteRouter = Router();
deleteRouter.get("/:itemSlug", deleteController.plushyDeleteGet);

export default deleteRouter;
