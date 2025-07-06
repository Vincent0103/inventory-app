import db from "../db/queries";

const deleteController = (() => {
  const plushyDeleteGet = async (req, res) => {
    const { plushySlug } = req.params;
    await db.deletePlushy(plushySlug);
    res.redirect("/inventory");
  };

  return { plushyDeleteGet };
})();

export default deleteController;
