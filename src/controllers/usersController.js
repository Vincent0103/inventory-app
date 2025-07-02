import db from "../db/queries";
import { toSlug } from "../utilities";
import { body, validationResult } from "express-validator";

const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

  const createItemGet = (req, res) => {
    res.render("createPlushy");
  };

  const wordAndWhitespaceErr =
    "must only contain letters, numbers, underscores or spaces";
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
      .matches(/^[\w\s]+$/)
      .withMessage(`Name ${wordAndWhitespaceErr}`)
      .isLength({ min: 1, max: 255 })
      .withMessage(`Name ${lengthErr(255)}`),
    body("creationDate")
      .trim()
      .isDate()
      .withMessage(`Creation date ${dateErr}`)
      .custom((value) => {
        const inputDate = new Date(value);
        const today = new Date();
        // Set time to 00:00:00 for both dates to compare only the date part
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (inputDate > today) {
          throw new Error("Creation date must be from the past or today");
        }
        return true;
      }),
    body("imgUrl")
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
        "Not squishy",
        "Kinda squishy",
        "Pretty squishy",
        "Really squishy",
      ])
      .withMessage(`Squishiness ${squishinessErr}`),
    body("stocksLeft")
      .trim()
      .isInt({ min: 0 })
      .withMessage(`Stocks left ${numberErr(0)}`),
  ];

  const createItemPost = [
    validatePlushy,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createPlushy", {
          errors: errors.array(),
        });
      }

      const {
        name,
        creationDate,
        imgUrl,
        desc,
        price,
        size,
        categories,
        materials,
        squishiness,
        stocksLeft,
      } = req.body;

      const imgAlt = `'${name}' user created plushy`;
      const idSquishiness = await db.getIdFromSquishiness(squishiness);
      const idSize = await db.getIdFromSize(size);

      const selectedCategories = [].concat(categories || []);
      const selectedMaterials = [].concat(materials || []);

      const slug = toSlug(name);
      const item = {
        name,
        imgSrc: imgUrl,
        imgAlt,
        slug,
        creationDate,
        desc,
        price,
        selectedCategories,
        selectedMaterials,
        stocksLeft,
        idSize,
        idSquishiness,
      };

      await db.addItem(item);
      res.redirect("/");
    },
  ];

  return { homepageGet, createItemGet, createItemPost };
})();

export default usersController;
