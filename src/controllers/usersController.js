const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

  const createItemGet = (req, res) => { };
  const createItemPost = [null, (req, res) => { }];

  return { homepageGet, createItemGet, createItemPost };
})();

export default usersController;
