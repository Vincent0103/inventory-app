import { Router } from "express";
import inventoryController from "../controllers/inventoryController";

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.inventoryGet);
inventoryRouter.get("/:itemUrlName", inventoryController.itemGet);
// inventoryRouter.get("/:itemUrlName/edit", inventoryController.itemEditGet);
// inventoryRouter.post("/:itemUrlName/edit", inventoryController.itemEditPost);

export default inventoryRouter;
