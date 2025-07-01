import { body, validationResult } from "express-validator";

const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

  const createItemGet = (req, res) => {
    res.render("createPlushy");
  };

  const alphaErr = "must only contain letters.";
  const lengthErr = "must be between 1 and 255 characters";
  const dateErr = "must be in the format DD/MM/YYYY";

  const validatePlushy = [
    body("name")
      .trim()
      .isAlpha()
      .withMessage(`Name ${alphaErr}`)
      .isLength({ min: 1, max: 255 })
      .withMessage(`Name ${lengthErr}`),
    body("creation-date")
      .trim()
      .isDate()
      .withMessage(`Creation date ${dateErr}`),
  ];

  const createItemPost = [
    validatePlushy,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createPlushy", {
          errors: errors.array(),
        });
      }

      res.redirect("/inventory");
    },
  ];

  return { homepageGet, createItemGet, createItemPost };
})();

export default usersController;
