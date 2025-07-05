import db from "../db/queries";

const deleteController = (() => {
  const plushyDeleteGet = async (req, res) => {
    const { itemSlug } = req.params;
    await db.deleteItem(itemSlug);
    res.redirect("/inventory");
  };

  return { plushyDeleteGet };
})();

export default deleteController;
