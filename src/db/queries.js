import { getInventoryItemInfos } from "../utilities";
import pool from "./pool";

const db = (() => {
  const getFilters = async () => {
    const categoryRows = (
      await pool.query("SELECT nameCategory, slugCategory FROM CATEGORY")
    ).rows;
    const categories = await Promise.all(
      (categoryRows ?? []).map((category) => ({
        name: category.namecategory,
        value: category.slugcategory,
      })),
    );

    const materialRows = (
      await pool.query("SELECT nameMaterial, slugMaterial FROM MATERIAL")
    ).rows;
    const materials = await Promise.all(
      (materialRows ?? []).map((material) => ({
        name: material.namematerial,
        value: material.slugmaterial,
      })),
    );

    const sizeRows = (await pool.query("SELECT valueSize FROM SIZE")).rows;
    const sizes = await Promise.all(
      (sizeRows ?? []).map((size) => ({
        name: size.valuesize,
        value: size.valuesize,
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

  const getCategories = async () => {
    const { rows } = await pool.query("SELECT * FROM CATEGORY");
    if (!rows) throw new Error("Could not fetch categories");

    return []
      .concat(rows)
      .map(
        ({
          namecategory,
          slugcategory,
          bgcolorcategory,
          bordercolorcategory,
          textwhite,
        }) => ({
          name: namecategory,
          slug: slugcategory,
          bgColor: bgcolorcategory,
          borderColor: bordercolorcategory,
          textColor: textwhite ? "#FFFFFF" : "#000000",
        }),
      );
  };

  const getCategoriesByPlushy = async (idPlushy) => {
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
          slugcategory,
          bgcolorcategory,
          bordercolorcategory,
          textwhite,
        } = (
          await pool.query(
            "SELECT nameCategory, slugCategory, bgColorCategory, borderColorCategory, textWhite FROM CATEGORY WHERE idCategory = $1",
            [row.idcategory],
          )
        ).rows[0];

        return {
          name: namecategory,
          slug: slugcategory,
          bgColor: bgcolorcategory,
          borderColor: bordercolorcategory,
          textColor: textwhite ? "#FFFFFF" : "#000000",
        };
      }),
    );

    return categories;
  };

  const getMaterials = async (idPlushy) => {
    const materialRows = (
      await pool.query(
        "SELECT idMaterial FROM MATERIALPLUSHY WHERE idPlushy = $1",
        [idPlushy],
      )
    ).rows;

    const materials = await Promise.all(
      (materialRows ?? []).map(async (row) => {
        const { namematerial, slugmaterial } = (
          await pool.query(
            "SELECT nameMaterial, slugMaterial FROM MATERIAL WHERE idMaterial = $1",
            [row.idmaterial],
          )
        ).rows[0];
        return { name: namematerial, slug: slugmaterial };
      }),
    );

    return materials;
  };

  const getItems = async () => {
    const { rows } = await pool.query(
      "SELECT idPlushy, imgSrcPlushy, imgAltPlushy, slugPlushy, namePlushy, pricePlushy, stocksLeftPlushy FROM PLUSHY",
    );

    const items = getInventoryItemInfos(rows, getCategoriesByPlushy);
    return items;
  };

  const getItem = async (itemSlug) => {
    const plushyRow = (
      await pool.query("SELECT * FROM PLUSHY WHERE slugPlushy = $1", [itemSlug])
    ).rows[0];

    if (!plushyRow) throw new Error(`Item of url ${itemSlug} is not found`);

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

    const categories = await getCategoriesByPlushy(plushyRow.idplushy);
    const materials = await getMaterials(plushyRow.idplushy);

    const creationDateValue = plushyRow.creationdateplushy
      .toISOString()
      .split("T")[0];

    const item = {
      id: plushyRow.idplushy,
      imgSrc: plushyRow.imgsrcplushy,
      imgAlt: plushyRow.imgaltplushy,
      slug: plushyRow.slugplushy,
      name: plushyRow.nameplushy,
      desc: plushyRow.descplushy,
      price: plushyRow.priceplushy,
      creationDate: creationDateValue,
      stocksLeft: plushyRow.stocksleftplushy,
      size: valuesize,
      squishiness: valuesquishiness,
      materials,
      categories,
    };

    return item;
  };

  const hasItem = async (itemSlug) => {
    const plushyRow = (
      await pool.query("SELECT * FROM PLUSHY WHERE slugPlushy = $1", [itemSlug])
    ).rows[0];

    return !!plushyRow;
  };

  const addCategories = async (idPlushy, categories) => {
    Promise.all(
      categories.map(async (category) => {
        const { rows } = await pool.query(
          "SELECT idCategory FROM CATEGORY WHERE slugCategory = $1",
          [category],
        );
        await pool.query(
          "INSERT INTO CATEGORYPLUSHY (idPlushy, idCategory) VALUES ($1, $2)",
          [idPlushy, rows[0].idcategory],
        );
      }),
    );
  };

  const addMaterials = async (idPlushy, materials) => {
    Promise.all(
      materials.map(async (material) => {
        const { rows } = await pool.query(
          "SELECT idMaterial FROM MATERIAL WHERE slugMaterial = $1",
          [material],
        );
        await pool.query(
          "INSERT INTO MATERIALPLUSHY (idPlushy, idMaterial) VALUES ($1, $2)",
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
      slug,
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
    (namePlushy, imgSrcPlushy, imgAltPlushy, slugPlushy, creationDatePlushy,
    descPlushy, pricePlushy, stocksLeftPlushy, idSize, idSquishiness)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING idPlushy`,
      [
        name,
        imgSrc,
        imgAlt,
        slug,
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

  const editItem = async (pastSlug, item) => {
    const {
      name,
      imgSrc,
      imgAlt,
      slug,
      creationDate,
      desc,
      price,
      selectedCategories: categories,
      selectedMaterials: materials,
      stocksLeft,
      idSize,
      idSquishiness,
    } = item;

    await pool.query(
      `
      UPDATE PLUSHY
      SET
        namePlushy = $1,
        imgSrcPlushy = $2,
        imgAltPlushy = $3,
        slugPlushy = $4,
        creationDatePlushy = $5,
        descPlushy = $6,
        pricePlushy = $7,
        stocksLeftPlushy = $8,
        idSize = $9,
        idSquishiness = $10
      WHERE
        slugPlushy = $11
    `,
      [
        name,
        imgSrc,
        imgAlt,
        slug,
        creationDate,
        desc,
        price,
        stocksLeft,
        idSize,
        idSquishiness,
        pastSlug,
      ],
    );

    const { rows } = await pool.query(
      "SELECT idPlushy FROM PLUSHY WHERE slugPlushy = $1",
      [slug],
    );
    if (!rows) throw new Error(`Could not fetch idPlushy from slug ${slug}`);

    const idPlushy = rows[0].idplushy;

    await pool.query("DELETE FROM CATEGORYPLUSHY WHERE idPlushy = $1", [
      idPlushy,
    ]);
    await pool.query("DELETE FROM MATERIALPLUSHY WHERE idPlushy = $1", [
      idPlushy,
    ]);

    addCategories(idPlushy, categories);
    addMaterials(idPlushy, materials);
  };

  const deleteItem = async (itemSlug) => {
    const { rows } = await pool.query(
      "SELECT idPlushy FROM PLUSHY WHERE slugPlushy = $1",
      [itemSlug],
    );
    if (!rows)
      throw new Error(`Could not fetch idPlushy from slug ${itemSlug}`);

    const idPlushy = rows[0].idplushy;
    await pool.query("DELETE FROM CATEGORYPLUSHY WHERE idPlushy = $1", [
      idPlushy,
    ]);
    await pool.query("DELETE FROM MATERIALPLUSHY WHERE idPlushy = $1", [
      idPlushy,
    ]);
    await pool.query("DELETE FROM PLUSHY WHERE idPlushy = $1", [idPlushy]);
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

  const getItemByFilters = async (filters) => {
    const { price } = filters;
    const arrayFilters = [filters.categories, filters.materials, filters.sizes];

    // Make filters be always arrays even if its undefined or is a string
    const [categories, materials, sizes] = arrayFilters.map((filter) =>
      [].concat(filter || []),
    );
    const params = [];
    let query = `
      SELECT DISTINCT P.idPlushy, namePlushy, imgSrcPlushy, imgAltPlushy, slugPlushy, pricePlushy, stocksLeftPlushy FROM PLUSHY P
      INNER JOIN CATEGORYPLUSHY CP ON P.idPlushy = CP.idPlushy
      INNER JOIN CATEGORY C ON CP.idCategory = C.idCategory
      INNER JOIN MATERIALPLUSHY MP ON P.idPlushy = MP.idPlushy
      INNER JOIN MATERIAL M ON MP.idMaterial = M.idMaterial
      INNER JOIN SIZE S ON P.idSize = S.idSize
      WHERE 1=1
    `;

    if (categories.length > 0) {
      const categoryPlaceholders = categories
        .map((_, i) => `$${i + 1}`)
        .join(", ");
      params.push(...categories);
      query += ` AND C.slugCategory IN (${categoryPlaceholders})`;
    }
    if (materials.length > 0) {
      const materialPlaceholders = materials
        .map((_, i) => `$${params.length + i + 1}`)
        .join(", ");
      params.push(...materials);
      query += ` AND M.slugMaterial IN (${materialPlaceholders})`;
    }
    if (sizes.length > 0) {
      const sizePlaceholders = sizes
        .map((_, i) => `$${params.length + i + 1}`)
        .join(", ");
      params.push(...sizes);
      query += ` AND S.valueSize IN (${sizePlaceholders})`;
    }
    if (price) {
      const MAX_PRICE = 50;
      const pricePlaceholder = `$${params.length + 1}`;
      params.push(price);
      const priceCondition = parseInt(price, 10) < MAX_PRICE ? "<=" : ">=";
      query += ` AND P.pricePlushy ${priceCondition} ${pricePlaceholder}`;
    }
    query += ";";

    const { rows } = await pool.query(query, params);

    const items = getInventoryItemInfos(rows, getCategoriesByPlushy);
    return items;
  };

  const getItemByName = async (name) => {
    const { rows } = await pool.query(
      "SELECT * FROM PLUSHY WHERE LOWER(namePlushy) LIKE $1",
      [`%${name.toLowerCase()}%`],
    );
    if (!rows) throw new Error(`Could not find plushy of name ${name}`);

    const items = getInventoryItemInfos(rows, getCategoriesByPlushy);
    return items;
  };

  return {
    getFilters,
    getCategories,
    getCategoriesByPlushy,
    getItems,
    getItem,
    hasItem,
    addItem,
    editItem,
    deleteItem,
    getIdFromSquishiness,
    getIdFromSize,
    getItemByFilters,
    getItemByName,
  };
})();

export default db;
