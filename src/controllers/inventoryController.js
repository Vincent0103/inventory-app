import db from "../db/queries";
import { formatPrice, toSlug, toTitleCase } from "../utilities";

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

  const itemEditGet = async (req, res) => {
    const { itemSlug } = req.params;
    const item = await db.getItem(itemSlug);
    res.render("formPlushy", {
      title: "Edit plushy",
      action: `/inventory/${itemSlug}/edit`,
      nameValue: item.name,
      creationDateValue: item.creationDate,
      imgUrlValue: item.imgSrc,
      imgAltValue: item.imgAlt,
      descValue: item.desc,
      priceValue: item.price,
      sizeValue: item.size,
      categoriesValue: item.categories.map(({ slug }) => slug),
      materialsValue: item.materials.map(({ slug }) => slug),
      squishinessValue: item.squishiness,
      stocksLeftValue: item.stocksLeft,
      submitBtnTextContent: "Edit",
    });
  };
  const itemEditPost = [null, (req, res) => {}];

  return { itemGet, itemEditGet, itemEditPost, inventoryGet };
})();

export default inventoryController;
