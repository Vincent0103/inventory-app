const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const formatPrice = (n) => n.toString().replace(/\./, ",").concat("€");

export { toTitleCase, formatPrice };
