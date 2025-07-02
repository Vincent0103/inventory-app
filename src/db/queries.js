import { name } from "ejs";
import pool from "./pool";

const db = (() => {
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

    const materialRows = (await pool.query("SELECT nameMaterial FROM MATERIAL"))
      .rows;
    const materials = await Promise.all(
      (materialRows ?? []).map((material) => ({
        name: material.namematerial,
      })),
    );

    const sizeRows = (await pool.query("SELECT valueSize FROM SIZE")).rows;
    const sizes = await Promise.all(
      (sizeRows ?? []).map((size) => ({
        name: size.valuesize,
      })),
    );

    return [
      {
        filterName: "categories",
        filterChildName: "category",
        list: categories,
      },
      {
        filterName: "materials",
        filterChildName: "material",
        list: materials,
      },
      {
        filterName: "sizes",
        filterChildName: "size",
        list: sizes,
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
      stocksLeft: plushyRow.stocksleftplushy,
    };

    return item;
  };

  const addCategories = async (idPlushy, categories) => {
    Promise.all(
      categories.map(async (category) => {
        const { rows } = await pool.query(
          "SELECT idCategory FROM CATEGORY WHERE formNameCategory = $1",
          [category],
        );
        console.log(rows);
        await pool.query(
          "INSERT INTO CATEGORYPLUSHY (idPlushy, nameCategory) VALUES ($1, $2)",
          [idPlushy, rows[0].idcategory],
        );
      }),
    );
  };

  const addMaterials = async (idPlushy, materials) => {
    Promise.all(
      materials.map(async (material) => {
        const { rows } = await pool.query(
          "SELECT idMaterial FROM MATERIAL WHERE nameMaterial = $1",
          [material],
        );
        await pool.query(
          "INSERT INTO MATERIALPLUSHY (idPlushy, nameMaterial) VALUES ($1, $2)",
          [idPlushy, rows[0].idmaterial],
        );
      }),
    );
  };

  const addItem = async (item) => {
    const {
      name,
      imgSrc,
      imgAlt,
      urlName,
      creationDate,
      desc,
      price,
      selectedCategories: categories,
      selectedMaterials: materials,
      stocksLeft,
      idSize,
      idSquishiness,
    } = item;

    const { rows } = await pool.query(
      `INSERT INTO PLUSHY
    (namePlushy, imgSrcPlushy, imgAltPlushy, urlNamePlushy, creationDatePlushy,
    descPlushy, pricePlushy, stocksLeftPlushy, idSize, idSquishiness)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING idPlushy`,
      [
        name,
        imgSrc,
        imgAlt,
        urlName,
        creationDate,
        desc,
        price,
        stocksLeft,
        idSize,
        idSquishiness,
      ],
    );

    if (!rows)
      throw new Error(
        "Failed to add new plushy: could not retrieve its id from the database.",
      );
    const idPlushy = rows[0].idplushy;

    addCategories(idPlushy, categories);
    addMaterials(idPlushy, materials);
  };

  const getIdFromSquishiness = async (value) => {
    const row = (
      await pool.query(
        "SELECT idSquishiness FROM SQUISHINESS WHERE valueSquishiness = $1",
        [value],
      )
    ).rows[0];

    return row.idsquishiness;
  };

  const getIdFromSize = async (value) => {
    const row = (
      await pool.query("SELECT idSize FROM SIZE WHERE valueSize = $1", [value])
    ).rows[0];

    return row.idsize;
  };

  return {
    getFilters,
    getCategories,
    getItems,
    getItem,
    addItem,
    getIdFromSquishiness,
    getIdFromSize,
  };
})();

export default db;
