import { toTitleCase } from "../utilities";

const usersController = (() => {
  const homepageGet = (req, res) => {
    res.render("index");
  };

  const inventoryGet = (req, res) => {
    // res.render("inventory", {
    //   categories: [
    //     { formName: "y2k", name: "Y2K" },
    //     { formName: "japanese-style" },
    //     { formName: "cottagecore" },
    //     { formName: "gothic" },
    //     { formName: "pastel-emo", name: "Pastel Emo" },
    //     { formName: "retro" },
    //   ],
    //   animals: [
    //     { formName: "bear" },
    //     { formName: "cat" },
    //     { formName: "dog" },
    //     { formName: "fox" },
    //   ],
    //   toTitleCase,
    // });

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
      toTitleCase,
    });
  };

  const createItemGet = (req, res) => { };
  const createItemPost = [null, (req, res) => { }];

  return { homepageGet, createItemGet, createItemPost, inventoryGet };
})();

export default usersController;
