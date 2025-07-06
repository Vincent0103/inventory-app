DROP TABLE MATERIALPLUSHY;
DROP TABLE CATEGORYPLUSHY;
DROP TABLE PLUSHY;
DROP TABLE CATEGORY;
DROP TABLE MATERIAL;
DROP TABLE SIZE;
DROP TABLE SQUISHINESS;

CREATE TABLE SIZE (
    idSize INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    valueSize VARCHAR(10) NOT NULL 
);

CREATE TABLE SQUISHINESS (
    idSquishiness INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    valueSquishiness VARCHAR(50) NOT NULL
);

CREATE TABLE PLUSHY (
    idPlushy INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    namePlushy VARCHAR(255) NOT NULL,
    imgSrcPlushy TEXT,
    imgAltPlushy VARCHAR(255),
    slugPlushy TEXT NOT NULL,
    creationDatePlushy DATE,
    descPlushy TEXT,
    pricePlushy NUMERIC(10, 2) NOT NULL,
    stocksLeftPlushy INTEGER,
    idSize INTEGER NOT NULL,
    idSquishiness INTEGER,
    CONSTRAINT fk_plushy_size FOREIGN KEY (idSize) REFERENCES Size(idSize),
    CONSTRAINT fk_plushy_squishiness FOREIGN KEY (idSquishiness) REFERENCES Squishiness(idSquishiness)
);

CREATE TABLE CATEGORY (
    idCategory INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nameCategory VARCHAR(255) NOT NULL,
    slugCategory VARCHAR(255) NOT NULL,
    bgColorCategory VARCHAR(7),
    borderColorCategory VARCHAR(7),
    textWhite BOOLEAN DEFAULT FALSE
);

CREATE TABLE CATEGORYPLUSHY (
    idPlushy INTEGER NOT NULL,
    idCategory INTEGER NOT NULL,
    PRIMARY KEY (idPlushy, idCategory),
    CONSTRAINT fk_categoryplushy_plushy FOREIGN KEY (idPlushy) REFERENCES Plushy(idPlushy) ON DELETE CASCADE,
    CONSTRAINT fk_categoryplushy_category FOREIGN KEY (idCategory) REFERENCES Category(idCategory) ON DELETE CASCADE
);

CREATE TABLE MATERIAL (
    idMaterial INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nameMaterial VARCHAR(255) NOT NULL,
    slugMaterial VARCHAR(255) NOT NULL
);

CREATE TABLE MATERIALPLUSHY (
    idPlushy INTEGER NOT NULL,
    idMaterial INTEGER NOT NULL,
    PRIMARY KEY (idPlushy, idMaterial),
    CONSTRAINT fk_materialplushy_plushy FOREIGN KEY (idPlushy) REFERENCES Plushy(idPlushy) ON DELETE CASCADE,
    CONSTRAINT fk_materialplushy_material FOREIGN KEY (idMaterial) REFERENCES Material(idMaterial) ON DELETE CASCADE
);

INSERT INTO CATEGORY (nameCategory, slugCategory, bgColorCategory, borderColorCategory, textWhite)
VALUES
('Y2K', 'y2k', '#602100', '#4D1A00', TRUE),
('Japanese-style', 'japanese-style', '#750002', '#4D0001', TRUE),
('Cottagecore', 'cottagecore', '#593800', '#332000', TRUE),
('Gothic', 'gothic', '#000000', '#494949', TRUE),
('Pastel Emo', 'pastel-emo', '#75006B', '#52004B', TRUE),
('Retro', 'retro', '#00FC22', '#00C71B', FALSE);


INSERT INTO MATERIAL (nameMaterial, slugMaterial)
VALUES
('Plush', 'plush'), ('Felt', 'felt'), ('Cotton', 'cotton'),
('Polyester', 'polyester'), ('Minky', 'minky'), ('Fleece', 'fleece');

INSERT INTO SIZE (valueSize)
VALUES
('XS'), ('S'), ('M'), ('L'), ('XL');

INSERT INTO SQUISHINESS (valueSquishiness)
VALUES
('Not squishy'), ('Kinda squishy'), ('Pretty squishy'), ('Really squishy');

INSERT INTO PLUSHY (namePlushy, imgSrcPlushy, imgAltPlushy, slugPlushy, creationDatePlushy, descPlushy,
pricePlushy, stocksLeftPlushy, idSize, idSquishiness)
VALUES 
('Black gloomy bear', 'https://i.pinimg.com/736x/58/2a/02/582a022415451de3b2076b2119747db8.jpg', 'Black gloomy bear plushy', 'black-gloomy-bear', '2023-02-19', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 19, 9, 3, 2),
('Black halloween bear', 'https://i.pinimg.com/736x/7b/a3/5f/7ba35f9a560436e37b3a9ff145fcd955.jpg', 'Black halloween bear plushy', 'black-halloween-bear', '2024-05-11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.', 28.99, 4, 3, 2),
('Black white gloomy bear', 'https://i.pinimg.com/736x/ed/b1/e0/edb1e021951c27ecffbf6bb09414a39a.jpg', 'Black white gloomy bear plushy', 'black-white-gloomy-bear', '2008-12-14', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.', 38.99, 2, 4, 3),
('Frown pink thing', 'https://i.pinimg.com/736x/21/6f/b4/216fb425d3853f0eaaeaec7660b9d904.jpg', 'Frown pink thing plushy', 'frown-pink-thing', '2015-12-18', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam.', 5.99, 15, 2, 3);

INSERT INTO CATEGORYPLUSHY (idPlushy, idCategory)
VALUES 
(1, 1), (1, 4), (2, 1), (2, 3), (2, 5),
(3, 1), (3, 4), (4, 5);

INSERT INTO MATERIALPLUSHY (idPlushy, idMaterial)
VALUES 
(1, 3), (1, 4), (2, 1), (2, 2),
(3, 3), (3, 5), (4, 6), (4, 2);
