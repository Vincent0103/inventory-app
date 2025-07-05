import db from "../db/queries";
import { formatPrice, toTitleCase } from "../utilities";

const inventoryController = (() => {
  const inventoryGet = async (req, res) => {
    const filters = await db.getFilters();
    if (Object.keys(req.query).length === 0) {
      const items = await db.getItems();
      return res.render("inventory", {
        filters,
        items,
        toTitleCase,
        formatPrice,
      });
    }

    if ("q" in req.query) {
      const items = await db.getItemByName(req.query.q);
      return res.render("inventory", {
        filters,
        items,
        toTitleCase,
        formatPrice,
      });
    }

    const items = await db.getItemByFilters(req.query);
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

  return { itemGet, inventoryGet };
})();

export default inventoryController;
