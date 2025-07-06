import { Router } from "express";
import deleteController from "../controllers/deleteController";

const deleteRouter = Router();
deleteRouter.get("/:plushySlug", deleteController.plushyDeleteGet);

export default deleteRouter;
