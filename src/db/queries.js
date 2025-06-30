const itemsData = [
  {
    id: 0,
    imgSrc: "/images/plushies/black-gloomy-bear.jpg",
    imgAlt: "Black gloomy bear plushy",
    urlName: "black-gloomy-bear",
    name: "Black gloomy bear",
    price: 19,
    creationDate: "19/02/2023",
    size: "M",
    squishiness: "++",
    materials: ["Cotton", "Polyester"],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
    id: 1,
    imgSrc: "/images/plushies/black-halloween-bear.jpg",
    imgAlt: "Black halloween bear plushy",
    urlName: "black-halloween-bear",
    name: "Black halloween bear",
    price: 28.99,
    creationDate: "11/05/2024",
    size: "M",
    squishiness: "++",
    materials: ["Plush", "Felt"],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.",
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
    id: 2,
    imgSrc: "/images/plushies/black-white-gloomy-bear.jpg",
    imgAlt: "Black white gloomy bear plushy",
    urlName: "black-white-gloomy-bear",
    name: "Black white gloomy bear",
    price: 38.99,
    creationDate: "14/12/2008",
    size: "L",
    squishiness: "+++",
    materials: ["Cotton", "Minky"],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
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
    id: 3,
    imgSrc: "/images/plushies/frown-pink-thing.jpg",
    imgAlt: "Frown pink thing plushy",
    urlName: "frown-pink-thing",
    name: "Frown pink thing",
    price: 5.99,
    creationDate: "18/12/2015",
    size: "S",
    squishiness: "+++",
    materials: ["Fleece", "Felt"],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
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
];

const getItem = (itemUrlName) => {
  const item = itemsData.find(({ urlName }) => itemUrlName === urlName);
  if (!item) throw new Error(`Item of url ${itemUrlName} is not found`);
  return item;
};

export { getItem };
