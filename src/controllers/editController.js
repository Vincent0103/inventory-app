import db from "../db/queries";
import { validationResult } from "express-validator";
import { toSlug, validation } from "../utilities";

const editController = (() => {
  const plushyEditGet = async (req, res) => {
    const { plushySlug } = req.params;
    const plushy = await db.getPlushy(plushySlug);
    res.render("formPlushy", {
      hasGoBackBtn: true,
      slug: plushySlug,
      title: "Edit plushy",
      action: `/inventory/edit/${plushySlug}`,
      nameValue: plushy.name,
      creationDateValue: plushy.creationDate,
      imgUrlValue: plushy.imgSrc,
      imgAltValue: plushy.imgAlt,
      descValue: plushy.desc,
      priceValue: plushy.price,
      sizeValue: plushy.size,
      categoriesValue: plushy.categories.map(({ slug }) => slug),
      materialsValue: plushy.materials.map(({ slug }) => slug),
      squishinessValue: plushy.squishiness,
      stocksLeftValue: plushy.stocksLeft,
      submitBtnTextContent: "Edit",
    });
  };

  const plushyEditPost = [
    validation.plushy,
    async (req, res) => {
      const pastSlug = req.params.plushySlug;
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
      const plushy = {
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

      await db.editPlushy(pastSlug, plushy);
      res.redirect(`/inventory/${slug}`);
    },
  ];

  const categoryEditGet = () => {};

  const categoryEditPost = () => {};

  return { plushyEditGet, plushyEditPost, categoryEditGet, categoryEditPost };
})();

export default editController;
