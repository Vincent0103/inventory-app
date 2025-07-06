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
      action: `/edit/${plushySlug}`,
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
          action: `/inventory/edit/${toSlug(req.body.name)}`,
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

  const categoryEditGet = () => {};

  const categoryEditPost = () => {};

  return { plushyEditGet, plushyEditPost, categoryEditGet, categoryEditPost };
})();

export default editController;
