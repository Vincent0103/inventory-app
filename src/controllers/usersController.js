import { toTitleCase } from "../utilities";

const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

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
        {
          filterName: "colors",
          filterChildName: "color",
          list: [
            { formName: "red" },
            { formName: "green" },
            { formName: "orange" },
            { formName: "black" },
            { formName: "white" },
          ],
        }
      ],
      items: [
        {
          imgSrc: "/images/plushies/black-gloomy-bear.jpg",
          imgAlt: "Black gloomy bear plushy",
          name: "Black gloomy bear",
          price: "19€",
          tags: [
            { tag: "Y2K", bgColor: "#602100", textColor: "#fff", borderColor: "#4D1A00" },
            { tag: "GOTHIC", bgColor: "#000000", textColor: "#fff", borderColor: "#494949" },
          ],
          amountAvailable: 9
        },
        {
          imgSrc: "/images/plushies/black-halloween-bear.jpg",
          imgAlt: "Black halloween bear plushy",
          name: "Black halloween bear",
          price: "28,99€",
          tags: [
            { tag: "Y2K", bgColor: "#602100", textColor: "#fff", borderColor: "#4D1A00" },
            { tag: "COTTAGECORE", bgColor: "#593800", textColor: "#fff", borderColor: "#332000" },
            { tag: "PASTEL EMO", bgColor: "#75006B", textColor: "#fff", borderColor: "#52004B" },
          ],
          amountAvailable: 4
        }
      ],
      toTitleCase,
    });
  };

  const createItemGet = (req, res) => { };
  const createItemPost = [null, (req, res) => { }];

  return { homepageGet, createItemGet, createItemPost, inventoryGet };
})();

export default usersController;
