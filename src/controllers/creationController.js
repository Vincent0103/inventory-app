import { validationResult } from "express-validator";
import { toSlug, validatePlushy } from "../utilities";

const creationController = (() => {
  const createPlushyGet = (req, res) => {
    res.render("formPlushy", {
      title: "Create plushy",
      action: "/create/plushy",
      submitBtnTextContent: "Create",
    });
  };

  const createPlushyPost = [
    validatePlushy,
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

  return { createPlushyGet, createPlushyPost };
})();

export default creationController;
