import { body, validationResult } from "express-validator";

const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

  const createItemGet = (req, res) => {
    res.render("createPlushy");
  };

  const alphaErr = "must only contain letters.";
  const lengthErr = (maxLength) =>
    `must be between 1 and ${maxLength} characters`;
  const dateErr = "must be in the format DD/MM/YYYY";
  const urlErr = "must be a valid URL (e.g: https://example.com";
  const imgErr =
    "must end with a valid image extension (jpg, jpeg, png, gif, webp, svg)";
  const numberErr = (min) => `must be a number greater than or equal to ${min}`;
  const sizeErr = "must be a proper sizing (XS, S, M, L, XL)";
  const squishinessErr =
    "must select a valid squishiness option from the select dropdown";

  const validatePlushy = [
    body("name")
      .trim()
      .isAlpha()
      .withMessage(`Name ${alphaErr}`)
      .isLength({ min: 1, max: 255 })
      .withMessage(`Name ${lengthErr(255)}`),
    body("creation-date")
      .trim()
      .isDate()
      .withMessage(`Creation date ${dateErr}`)
      .custom((value) => {
        const inputDate = new Date(value);
        const today = new Date();
        // Set time to 00:00:00 for both dates to compare only the date part
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        console.log(inputDate, today);
        console.log(inputDate > today);
        if (inputDate > today) {
          throw new Error("Creation date must be from the past or today");
        }
        return true;
      }),
    body("img-url")
      .trim()
      .isURL()
      .withMessage(`Image URL ${urlErr}`)
      .matches(/\.(jpeg|jpg|gif|png|webp|svg)$/i)
      .withMessage(`Image URL ${imgErr}`),
    body("desc")
      .optional()
      .trim()
      .isLength({ min: 0, max: 500 })
      .withMessage(`Description ${lengthErr(500)}`),
    body("price")
      .trim()
      .isFloat({ min: 0 })
      .withMessage(`Price ${numberErr(0)}`),
    body("size")
      .trim()
      .isIn(["XS", "S", "M", "L", "XL"])
      .withMessage(`Size ${sizeErr}`),
    body("squishiness")
      .trim()
      .isIn([
        "not-squishy",
        "kinda-squishy",
        "pretty-squishy",
        "really-squishy",
      ])
      .withMessage(`Squishiness ${squishinessErr}`),
    body("stocks-left")
      .trim()
      .isInt({ min: 0 })
      .withMessage(`Stocks left ${numberErr(0)}`),
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
