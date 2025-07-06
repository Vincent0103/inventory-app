import db from "../db/queries";
import { validationResult } from "express-validator";
import utilityController from "./utilityController";

const creationController = (() => {
  const createPlushyGet = async (req, res) => {
    res.render("formPlushy", {
      title: "Create plushy",
      action: "/create/plushy",
      categories: await db.getCategories(),
      materials: await db.getMaterials(),
      submitBtnTextContent: "Create",
    });
  };

  const createPlushyPost = [
    utilityController.validation.plushy,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formPlushy", {
          title: "Create plushy",
          action: "/create/plushy",
          categories: await db.getCategories(),
          materials: await db.getMaterials(),
          userInputs: req.body,
          errors: errors.array(),
          submitBtnTextContent: "Create",
        });
      }

      const plushy = await utilityController.getPlushyInfos(req.body);

      await db.addPlushy(plushy);
      res.redirect(`/inventory/${plushy.slug}`);
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
    utilityController.validation.category,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formCategory", {
          title: "Create category",
          action: "/create/category",
          userInputs: req.body,
          errors: errors.array(),
          submitBtnTextContent: "Create",
        });
      }

      const category = await utilityController.getCategoryInfos(req.body);

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
