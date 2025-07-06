import { body } from "express-validator";
import db from "./db/queries";
import hexRgb from "hex-rgb";

const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
};

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
}

const formatPrice = (n) => n.toString().replace(/\./, ",").concat("€");

const validation = (() => {
  const wordAndWhitespaceErr =
    "must only contain letters, numbers, underscores or spaces";
  const uniqueErr = "already exists, please choose another one";
  const lengthErr = (maxLength) =>
    `must be between 1 and ${maxLength} characters`;
  const dateErr = "must be in the format DD/MM/YYYY";
  const pastOrPresentDateErr = "must be from the past or today";
  const urlErr = "must be a valid URL (e.g: https://example.com";
  const imgErr =
    "must end with a valid image extension (jpg, jpeg, png, gif, webp, svg)";
  const numberErr = (min) => `must be a number greater than or equal to ${min}`;
  const sizeErr = "must be a proper sizing (XS, S, M, L, XL)";
  const squishinessErr =
    "must select a valid squishiness option from the select dropdown";

  const plushy = [
    body("name")
      .trim()
      .matches(/^[\w\s]+$/)
      .withMessage(`Name ${wordAndWhitespaceErr}`)
      .isLength({ min: 1, max: 255 })
      .withMessage(`Name ${lengthErr(255)}`)
      .custom(async (value, { req }) => {
        // if the past old slug is equal to the newly generated
        // slug then ask user to change name because of being non-unique
        if (req.params.plushySlug === toSlug(req.body.name)) return true;
        const plushyExists = await db.hasPlushy(toSlug(value));
        if (plushyExists) throw new Error(`Name ${uniqueErr}`);
      }),
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
          throw new Error(`Creation date ${pastOrPresentDateErr}`);
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

  const category = [
    body("name")
      .trim()
      .matches(/^[\w\s]+$/)
      .withMessage(`Name ${wordAndWhitespaceErr}`)
      .isLength({ min: 1, max: 255 })
      .withMessage(`Name ${lengthErr(255)}`)
      .custom(async (value, { req }) => {
        // if the past old slug is equal to the newly generated
        // slug then ask user to change name because of being non-unique
        if (req.params.categorySlug === toSlug(req.body.category)) return true;
        const categoryExists = await db.hasCategory(toSlug(value));
        if (categoryExists) throw new Error(`Name ${uniqueErr}`);
      }),
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
          throw new Error(`Creation date ${pastOrPresentDateErr}`);
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

  return { plushy, category };
})();

const getInventoryPlushyInfos = async (rows, getCategoriesByPlushy) => {
  const plushies = await Promise.all(
    (rows ?? []).map(async (row) => {
      const categories = await getCategoriesByPlushy(row.idplushy);

      return {
        imgSrc: row.imgsrcplushy,
        imgAlt: row.imgaltplushy,
        slug: row.slugplushy,
        name: row.nameplushy,
        price: row.priceplushy,
        categories,
        amountAvailable: row.stocksleftplushy,
      };
    }),
  );

  return plushies;
};

const toHtmlRGBA = (hex, alphaHex) => {
  return "rgba("
    .concat(Object.values(hexRgb(hex.concat(alphaHex))).join(", "))
    .concat(")");
};

export {
  toTitleCase,
  formatPrice,
  toSlug,
  validation,
  getInventoryPlushyInfos,
  toHtmlRGBA,
};
