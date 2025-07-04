import db from "../db/queries";
import { formatPrice, toSlug, toTitleCase, validatePlushy } from "../utilities";
import { validationResult } from "express-validator";

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

  const itemEditPost = [
    validatePlushy,
    async (req, res) => {
      const pastSlug = req.params.itemSlug;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formPlushy", {
          title: "Edit plushy",
          action: `/inventory/${toSlug(req.body.name)}/edit`,
          errors: errors.array(),
          submitBtnTextContent: "Edit",
        });
      }

      const {
        name,
        creationDate,
        imgUrl,
        desc,
        price,
        size,
        categories,
        materials,
        squishiness,
        stocksLeft,
      } = req.body;

      const imgAlt = `'${name}' user created plushy`;
      const idSquishiness = await db.getIdFromSquishiness(squishiness);
      const idSize = await db.getIdFromSize(size);

      const selectedCategories = [].concat(categories || []);
      const selectedMaterials = [].concat(materials || []);

      const slug = toSlug(name);
      const item = {
        name,
        imgSrc: imgUrl,
        imgAlt,
        slug,
        creationDate,
        desc,
        price,
        selectedCategories,
        selectedMaterials,
        stocksLeft,
        idSize,
        idSquishiness,
      };

      await db.editItem(pastSlug, item);
      res.redirect(`/inventory/${slug}`);
    },
  ];

  const itemDeleteGet = async (req, res) => {
    const { itemSlug } = req.params;
    await db.deleteItem(itemSlug);
    res.redirect("/inventory");
  };

  return { itemGet, itemEditGet, itemEditPost, itemDeleteGet, inventoryGet };
})();

export default inventoryController;
