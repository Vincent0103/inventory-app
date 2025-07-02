const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
};

function toUrlName(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
}

const formatPrice = (n) => n.toString().replace(/\./, ",").concat("€");

export { toTitleCase, formatPrice, toUrlName };
