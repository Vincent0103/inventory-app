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

const toHtmlRGBA = (hex, alphaHex) => {
  return hex && alphaHex
    ? "rgba("
        .concat(Object.values(hexRgb(hex.concat(alphaHex))).join(", "))
        .concat(")")
    : "rgba(0, 0, 0, 1)";
};

export { toTitleCase, formatPrice, toSlug, toHtmlRGBA };
