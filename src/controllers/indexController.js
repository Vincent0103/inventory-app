import db from "../db/queries";
import { toHtmlRGBA } from "../utilities";

const indexController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

  const categoriesGet = async (req, res) => {
    let categories = await db.getCategories();
    const POINT_NINE_ALPHA_HEX = "E6";
    categories = categories.map((category) => ({
      ...category,
      bgColor: toHtmlRGBA(category.bgColor, POINT_NINE_ALPHA_HEX),
    }));
    res.render("categories", { categories });
  };

  return { homepageGet, categoriesGet };
})();

export default indexController;
