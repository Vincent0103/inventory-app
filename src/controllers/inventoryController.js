import { getItem, getItems, getFilters } from "../db/queries";
import { formatPrice, toTitleCase } from "../utilities";

const inventoryController = (() => {
  const inventoryGet = async (req, res) => {
    const filters = await getFilters();
    const items = await getItems();
    res.render("inventory", {
      filters,
      items,
      toTitleCase,
      formatPrice,
    });
  };

  const itemGet = async (req, res) => {
    const { itemUrlName } = req.params;
    const item = await getItem(itemUrlName);
    res.render("item", { ...item, formatPrice });
  };

  const itemEditGet = (req, res) => {};
  const itemEditPost = [null, (req, res) => {}];

  return { itemGet, itemEditGet, itemEditPost, inventoryGet };
})();

export default inventoryController;
