import db from "../db/queries";
import { validationResult } from "express-validator";
import { toSlug, validatePlushy } from "../utilities";

const editController = (() => {
  const plushyEditGet = async (req, res) => {
    const { itemSlug } = req.params;
    const item = await db.getItem(itemSlug);
    res.render("formPlushy", {
      hasGoBackBtn: true,
      slug: itemSlug,
      title: "Edit plushy",
      action: `/inventory/edit/${itemSlug}`,
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

  const plushyEditPost = [
    validatePlushy,
    async (req, res) => {
      const pastSlug = req.params.itemSlug;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formPlushy", {
          hasGoBackBtn: true,
          title: "Edit plushy",
          action: `/inventory/edit/${toSlug(req.body.name)}`,
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

  const categoryEditGet = () => {};

  const categoryEditPost = () => {};

  return { plushyEditGet, plushyEditPost, categoryEditGet, categoryEditPost };
})();

export default editController;
