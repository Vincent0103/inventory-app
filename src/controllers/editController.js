import db from "../db/queries";
import { validationResult } from "express-validator";
import { toSlug } from "../utilities";
import utilityController from "./utilityController";

const editController = (() => {
  const plushyEditGet = async (req, res) => {
    const { plushySlug } = req.params;
    const plushy = await db.getPlushy(plushySlug);
    const userInputs = {
      ...plushy,
      categories: plushy.categories.map(({ slug }) => slug),
      materials: plushy.materials.map(({ slug }) => slug),
    };

    res.render("formPlushy", {
      hasGoBackBtn: true,
      slug: plushySlug,
      title: "Edit plushy",
      action: `/edit/plushy/${plushySlug}`,
      categories: await db.getCategories(),
      materials: await db.getMaterials(),
      userInputs,
      submitBtnTextContent: "Edit",
    });
  };

  const plushyEditPost = [
    utilityController.validation.plushy,
    async (req, res) => {
      const pastSlug = req.params.plushySlug;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formPlushy", {
          hasGoBackBtn: true,
          slug: pastSlug,
          title: "Edit plushy",
          action: `/edit/plushy/${toSlug(req.body.name)}`,
          categories: await db.getCategories(),
          materials: await db.getMaterials(),
          errors: errors.array(),
          submitBtnTextContent: "Edit",
        });
      }

      const plushy = await utilityController.getPlushyInfos(req.body);

      await db.editPlushy(pastSlug, plushy);
      res.redirect(`/inventory/${plushy.slug}`);
    },
  ];

  const categoryEditGet = async (req, res) => {
    const { categorySlug } = req.params;
    const category = await db.getCategory(categorySlug);

    res.render("formCategory", {
      hasGoBackBtn: true,
      slug: categorySlug,
      title: "Edit category",
      action: `/edit/category/${categorySlug}`,
      userInputs: { ...category },
      submitBtnTextContent: "Edit",
    });
  };

  const categoryEditPost = [
    utilityController.validation.category,
    async (req, res) => {
      const pastSlug = req.params.categorySlug;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("formCategory", {
          hasGoBackBtn: true,
          slug: pastSlug,
          title: "Edit category",
          action: `/edit/category/${toSlug(req.body.name)}`,
          errors: errors.array(),
          submitBtnTextContent: "Edit",
        });
      }

      const category = await utilityController.getCategoryInfos(req.body);

      await db.editCategory(pastSlug, category);
      res.redirect(`/categories`);
    },
  ];

  return { plushyEditGet, plushyEditPost, categoryEditGet, categoryEditPost };
})();

export default editController;
