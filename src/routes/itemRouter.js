import { Router } from "express";
import itemController from "../controllers/itemController";

const itemRouter = Router();

itemRouter.get("/", itemController.itemGet);
itemRouter.get("/edit", itemController.itemEditGet);
// itemRouter.post("/edit", itemController.itemEditPost);

export default itemRouter;
