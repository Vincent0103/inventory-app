import pool from "./pool";

const getItem = async (itemUrlName) => {
  // if (!item) throw new Error(`Item of url ${itemUrlName} is not found`);
  const plushyRow = (
    await pool.query("SELECT * FROM PLUSHY WHERE urlNamePlushy = $1", [
      itemUrlName,
    ])
  ).rows[0];
  const { valuesize } = (
    await pool.query("SELECT valueSize FROM SIZE WHERE idSize = $1", [
      plushyRow.idsize,
    ])
  ).rows[0];
  const { valuesquishiness } = (
    await pool.query(
      "SELECT valueSquishiness FROM SQUISHINESS WHERE idSquishiness = $1",
      [plushyRow.idsquishiness],
    )
  ).rows[0];
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
    materialRows.map(async (row) => {
      const { namematerial } = (
        await pool.query(
          "SELECT nameMaterial FROM MATERIAL WHERE idMaterial = $1",
          [row.idmaterial],
        )
      ).rows[0];
      return namematerial;
    }),
  );

  const categoryRows = (
    await pool.query(
      "SELECT idCategory FROM CATEGORYPLUSHY WHERE idPlushy = $1",
      [plushyRow.idplushy],
    )
  ).rows;
  const categories = await Promise.all(
    categoryRows.map(async (row) => {
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

export { getItem };
