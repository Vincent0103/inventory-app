import pool from "./pool";

const getFilters = async () => {
  const categoryRows = (
    await pool.query("SELECT nameCategory, formNameCategory FROM CATEGORY")
  ).rows;
  const categories = await Promise.all(
    (categoryRows ?? []).map((category) => ({
      name: category.namecategory,
      formName: category.formnamecategory,
    })),
  );

  const animalRows = (
    await pool.query("SELECT nameAnimal, formNameAnimal FROM ANIMAL")
  ).rows;
  const animals = await Promise.all(
    (animalRows ?? []).map((animal) => ({
      name: animal.nameanimal,
      formName: animal.formnameanimal,
    })),
  );

  return [
    {
      filterName: "categories",
      filterChildName: "category",
      list: categories,
    },
    {
      filterName: "animals",
      filterChildName: "animal",
      list: animals,
    },
  ];
};

const getCategories = async (idPlushy) => {
  const categoryRows = (
    await pool.query(
      "SELECT idCategory FROM CATEGORYPLUSHY WHERE idPlushy = $1",
      [idPlushy],
    )
  ).rows;

  const categories = await Promise.all(
    (categoryRows ?? []).map(async (row) => {
      const {
        namecategory,
        formnamecategory,
        bgcolorcategory,
        bordercolorcategory,
        textwhite,
      } = (
        await pool.query(
          "SELECT nameCategory, formNameCategory, bgColorCategory, borderColorCategory, textWhite FROM CATEGORY WHERE idCategory = $1",
          [row.idcategory],
        )
      ).rows[0];

      return {
        name: namecategory,
        formName: formnamecategory,
        bgColor: bgcolorcategory,
        borderColor: bordercolorcategory,
        textColor: textwhite ? "#FFFFFF" : "#000000",
      };
    }),
  );

  return categories;
};

const getItems = async () => {
  const plushyRows = (
    await pool.query(
      "SELECT idPlushy, imgSrcPlushy, imgAltPlushy, urlNamePlushy, namePlushy, pricePlushy, stocksLeftPlushy FROM PLUSHY",
    )
  ).rows;

  const items = await Promise.all(
    (plushyRows ?? []).map(async (plushyRow) => {
      const categories = await getCategories(plushyRow.idplushy);

      return {
        imgSrc: plushyRow.imgsrcplushy,
        imgAlt: plushyRow.imgaltplushy,
        urlName: plushyRow.urlnameplushy,
        name: plushyRow.nameplushy,
        price: plushyRow.priceplushy,
        categories,
        amountAvailable: plushyRow.stocksleftplushy,
      };
    }),
  );

  return items;
};

const getItem = async (itemUrlName) => {
  const plushyRow = (
    await pool.query("SELECT * FROM PLUSHY WHERE urlNamePlushy = $1", [
      itemUrlName,
    ])
  ).rows[0];

  if (!plushyRow) throw new Error(`Item of url ${itemUrlName} is not found`);

  const sizeRow = (
    await pool.query("SELECT valueSize FROM SIZE WHERE idSize = $1", [
      plushyRow.idsize,
    ])
  ).rows[0];
  const valuesize = sizeRow?.valuesize ?? "";

  const squishinessRow = (
    await pool.query(
      "SELECT valueSquishiness FROM SQUISHINESS WHERE idSquishiness = $1",
      [plushyRow.idsquishiness],
    )
  ).rows[0];
  const valuesquishiness = squishinessRow?.valuesquishiness ?? "";

  const animalRow = (
    await pool.query("SELECT nameAnimal FROM ANIMAL WHERE idAnimal = $1", [
      plushyRow.idanimal,
    ])
  ).rows[0];
  const nameanimal = animalRow?.nameanimal ?? "Unknown";

  const materialRows = (
    await pool.query(
      "SELECT idMaterial FROM MATERIALPLUSHY WHERE idPlushy = $1",
      [plushyRow.idplushy],
    )
  ).rows;

  const materials = await Promise.all(
    (materialRows ?? []).map(async (row) => {
      const { namematerial } = (
        await pool.query(
          "SELECT nameMaterial FROM MATERIAL WHERE idMaterial = $1",
          [row.idmaterial],
        )
      ).rows[0];
      return namematerial;
    }),
  );

  const categories = await getCategories(plushyRow.idplushy);

  const item = {
    id: plushyRow.idplushy,
    imgSrc: plushyRow.imgsrcplushy,
    imgAlt: plushyRow.imgaltplushy,
    urlName: plushyRow.urlnameplushy,
    name: plushyRow.nameplushy,
    price: plushyRow.priceplushy,
    creationDate: plushyRow.creationdateplushy,
    size: valuesize,
    squishiness: valuesquishiness,
    materials,
    desc: plushyRow.descplushy,
    categories,
    animal: nameanimal,
    stocksLeft: plushyRow.stocksleftplushy,
  };

  return item;
};

export { getItem, getItems, getFilters };
