import { Router } from "express";
import inventoryController from "../controllers/inventoryController";

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.inventoryGet);
inventoryRouter.get("/:itemSlug", inventoryController.itemGet);
inventoryRouter.get("/:itemSlug/edit", inventoryController.itemEditGet);
inventoryRouter.post("/:itemSlug/edit", inventoryController.itemEditPost);
inventoryRouter.get("/:itemSlug/delete", inventoryController.itemDeleteGet);

export default inventoryRouter;
