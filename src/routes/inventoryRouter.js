import { Router } from "express";
import inventoryController from "../controllers/inventoryController";

const inventoryRouter = Router();
inventoryRouter.get("/", inventoryController.inventoryGet);
inventoryRouter.get("/:plushySlug", inventoryController.plushyGet);

export default inventoryRouter;
