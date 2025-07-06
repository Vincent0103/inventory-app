import db from "../db/queries";
import { validationResult } from "express-validator";
import { toSlug, validation } from "../utilities";

const creationController = (() => {
  const createPlushyGet = (req, res) => {
    res.render("formPlushy", {
      title: "Create plushy",
      action: "/create/plushy",
      submitBtnTextContent: "Create",
    });
  };

  const createPlushyPost = [
    validation.plushy,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formPlushy", {
          title: "Create plushy",
          action: "/create/plushy",
          errors: errors.array(),
          submitBtnTextContent: "Create",
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

      await db.addPlushy(plushy);
      res.redirect("/inventory");
    },
  ];

  const createCategoryGet = (req, res) => {
    res.render("formCategory", {
      title: "Create category",
      action: "/create/category",
      submitBtnTextContent: "Create",
    });
  };

  const createCategoryPost = [
    validation.category,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formCategory", {
          title: "Create category",
          action: "/create/category",
          errors: errors.array(),
          submitBtnTextContent: "Create",
        });
      }

      const { name, backgroundColor, borderColor, textWhite } = req.body;

      const slug = toSlug(name);
      const category = {
        name,
        slug,
        backgroundColor,
        borderColor,
        textWhite,
      };

      await db.addCategory(category);
      res.redirect("/inventory");
    },
  ];

  return {
    createPlushyGet,
    createPlushyPost,
    createCategoryGet,
    createCategoryPost,
  };
})();

export default creationController;
