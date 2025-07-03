import db from "../db/queries";
import { toSlug, validatePlushy } from "../utilities";
import { validationResult } from "express-validator";

const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

  const createItemGet = (req, res) => {
    res.render("formPlushy", {
      title: "Create plushy",
      action: "/create",
      submitBtnTextContent: "Create",
    });
  };

  const createItemPost = [
    validatePlushy,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formPlushy", {
          title: "Create plushy",
          action: "/create",
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

      await db.addItem(item);
      res.redirect("/inventory");
    },
  ];

  return { homepageGet, createItemGet, createItemPost };
})();

export default usersController;
