const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index", { content: "Your Plush, Your Power. Inventory Made Iconic." });
  };

  const createItemGet = (req, res) => { };
  const createItemPost = [null, (req, res) => { }];
  const inventoryGet = (req, res) => { };

  return { homepageGet, createItemGet, createItemPost, inventoryGet };
})();

export default usersController;
