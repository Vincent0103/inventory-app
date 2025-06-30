import { getItem } from "../db/queries";
import { formatPrice, toTitleCase } from "../utilities";

const inventoryController = (() => {
  const inventoryGet = (req, res) => {
    res.render("inventory", {
      filters: [
        {
          filterName: "categories",
          filterChildName: "category",
          list: [
            { formName: "y2k", name: "Y2K" },
            { formName: "japanese-style" },
            { formName: "cottagecore" },
            { formName: "gothic" },
            { formName: "pastel-emo", name: "Pastel Emo" },
            { formName: "retro" },
          ],
        },
        {
          filterName: "animals",
          filterChildName: "animal",
          list: [
            { formName: "bear" },
            { formName: "cat" },
            { formName: "dog" },
            { formName: "fox" },
          ],
        },
      ],
      items: [
        {
          imgSrc: "/images/plushies/black-gloomy-bear.jpg",
          imgAlt: "Black gloomy bear plushy",
          urlName: "black-gloomy-bear",
          name: "Black gloomy bear",
          price: 19,
          tags: [
            {
              tag: "Y2K",
              bgColor: "#602100",
              textColor: "#fff",
              borderColor: "#4D1A00",
            },
            {
              tag: "GOTHIC",
              bgColor: "#000000",
              textColor: "#fff",
              borderColor: "#494949",
            },
          ],
          animal: "bear",
          amountAvailable: 9,
        },
        {
          imgSrc: "/images/plushies/black-halloween-bear.jpg",
          imgAlt: "Black halloween bear plushy",
          urlName: "black-halloween-bear",
          name: "Black halloween bear",
          price: 28.99,
          tags: [
            {
              tag: "Y2K",
              bgColor: "#602100",
              textColor: "#fff",
              borderColor: "#4D1A00",
            },
            {
              tag: "COTTAGECORE",
              bgColor: "#593800",
              textColor: "#fff",
              borderColor: "#332000",
            },
            {
              tag: "PASTEL EMO",
              bgColor: "#75006B",
              textColor: "#fff",
              borderColor: "#52004B",
            },
          ],
          animal: "bear",
          amountAvailable: 4,
        },
        {
          imgSrc: "/images/plushies/black-white-gloomy-bear.jpg",
          imgAlt: "Black white gloomy bear plushy",
          urlName: "black-white-gloomy-bear",
          name: "Black white gloomy bear",
          price: 38.99,
          tags: [
            {
              tag: "Y2K",
              bgColor: "#602100",
              textColor: "#fff",
              borderColor: "#4D1A00",
            },
            {
              tag: "GOTHIC",
              bgColor: "#000000",
              textColor: "#fff",
              borderColor: "#494949",
            },
          ],
          animal: "bear",
          amountAvailable: 2,
        },
        {
          imgSrc: "/images/plushies/frown-pink-thing.jpg",
          imgAlt: "Frown pink thing plushy",
          urlName: "frown-pink-thing",
          name: "Frown pink thing",
          price: 5.99,
          tags: [
            {
              tag: "PASTEL EMO",
              bgColor: "#75006B",
              textColor: "#fff",
              borderColor: "#52004B",
            },
          ],
          animal: "unknown",
          amountAvailable: 15,
        },
      ],
      toTitleCase,
      formatPrice,
    });
  };

  const itemGet = async (req, res) => {
    const { itemUrlName } = req.params;
    const item = await getItem(itemUrlName);
    res.render("item", { ...item, formatPrice });
  };

  const itemEditGet = (req, res) => {};
  const itemEditPost = [null, (req, res) => {}];

  return { itemGet, itemEditGet, itemEditPost, inventoryGet };
})();

export default inventoryController;
