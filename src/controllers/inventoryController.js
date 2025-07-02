import db from "../db/queries";
import { formatPrice, toTitleCase } from "../utilities";

const inventoryController = (() => {
  const inventoryGet = async (req, res) => {
    const filters = await db.getFilters();
    const items = await db.getItems();
    res.render("inventory", {
      filters,
      items,
      toTitleCase,
      formatPrice,
    });
  };

  const itemGet = async (req, res) => {
    const { itemSlug } = req.params;
    const item = await db.getItem(itemSlug);
    res.render("item", { ...item, formatPrice });
  };

  const itemEditGet = (req, res) => {};
  const itemEditPost = [null, (req, res) => {}];

  return { itemGet, itemEditGet, itemEditPost, inventoryGet };
})();

export default inventoryController;
