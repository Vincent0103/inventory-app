import db from "../db/queries";

const deleteController = (() => {
  const plushyDeleteGet = async (req, res) => {
    const { plushySlug } = req.params;
    await db.deletePlushy(plushySlug);
    res.redirect("/inventory");
  };

  const categoryDeleteGet = async (req, res) => {
    const { categorySlug } = req.params;
    await db.deleteCategory(categorySlug);
    res.redirect("/categories");
  };

  return { plushyDeleteGet, categoryDeleteGet };
})();

export default deleteController;
