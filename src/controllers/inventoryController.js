import db from "../db/queries";
import { formatPrice, toTitleCase } from "../utilities";

const inventoryController = (() => {
  const inventoryGet = async (req, res) => {
    const filters = await db.getFilters();
    if (Object.keys(req.query).length === 0) {
      const plushies = await db.getPlushies();
      return res.render("inventory", {
        filters,
        plushies,
        toTitleCase,
        formatPrice,
      });
    }

    if ("q" in req.query) {
      const plushies = await db.getPlushiesByName(req.query.q);
      return res.render("inventory", {
        filters,
        plushies,
        toTitleCase,
        formatPrice,
      });
    }

    const plushies = await db.getPlushiesByFilters(req.query);
    res.render("inventory", {
      filters,
      plushies,
      toTitleCase,
      formatPrice,
    });
  };

  const plushyGet = async (req, res) => {
    const { plushySlug } = req.params;
    const plushy = await db.getPlushy(plushySlug);
    res.render("plushy", { ...plushy, formatPrice });
  };

  return { plushyGet, inventoryGet };
})();

export default inventoryController;
