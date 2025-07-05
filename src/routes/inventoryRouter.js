import { Router } from "express";
import inventoryController from "../controllers/inventoryController";
import editRouter from "./editRouter";
import deleteRouter from "./deleteRouter";

const inventoryRouter = Router();

inventoryRouter.use("/edit", editRouter);
inventoryRouter.use("/delete", deleteRouter);

inventoryRouter.get("/", inventoryController.inventoryGet);
inventoryRouter.get("/:itemSlug", inventoryController.itemGet);

export default inventoryRouter;
