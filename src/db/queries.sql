DROP TABLE MATERIALPLUSHY;
DROP TABLE CATEGORYPLUSHY;
DROP TABLE PLUSHY;
DROP TABLE CATEGORY;
DROP TABLE ANIMAL;
DROP TABLE MATERIAL;
DROP TABLE SIZE;
DROP TABLE SQUISHINESS;

CREATE TABLE ANIMAL (
    idAnimal INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nameAnimal VARCHAR(255) NOT NULL,
    formNameAnimal VARCHAR(255)
);

CREATE TABLE SIZE (
    idSize INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    valueSize VARCHAR(10) NOT NULL
);

CREATE TABLE SQUISHINESS (
    idSquishiness INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    valueSquishiness VARCHAR(10) NOT NULL
);

CREATE TABLE PLUSHY (
    idPlushy INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    namePlushy VARCHAR(255) NOT NULL,
    imgSrcPlushy TEXT,
    imgAltPlushy VARCHAR(255),
    urlNamePlushy TEXT NOT NULL,
    creationDatePlushy DATE,
    descPlushy TEXT,
    pricePlushy NUMERIC(10, 2) NOT NULL,
    stocksLeftPlushy INTEGER,
    idAnimal INTEGER,
    idSize INTEGER,
    idSquishiness INTEGER,
    CONSTRAINT fk_plushy_animal FOREIGN KEY (idAnimal) REFERENCES Animal(idAnimal),
    CONSTRAINT fk_plushy_size FOREIGN KEY (idSize) REFERENCES Size(idSize),
    CONSTRAINT fk_plushy_squishiness FOREIGN KEY (idSquishiness) REFERENCES Squishiness(idSquishiness)
);

CREATE TABLE CATEGORY (
    idCategory INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nameCategory VARCHAR(255) NOT NULL,
    formNameCategory VARCHAR(255),
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
    nameMaterial VARCHAR(255) NOT NULL
);

CREATE TABLE MATERIALPLUSHY (
    idPlushy INTEGER NOT NULL,
    idMaterial INTEGER NOT NULL,
    PRIMARY KEY (idPlushy, idMaterial),
    CONSTRAINT fk_materialplushy_plushy FOREIGN KEY (idPlushy) REFERENCES Plushy(idPlushy) ON DELETE CASCADE,
    CONSTRAINT fk_materialplushy_material FOREIGN KEY (idMaterial) REFERENCES Material(idMaterial) ON DELETE CASCADE
);

INSERT INTO CATEGORY (nameCategory, formNameCategory, bgColorCategory, borderColorCategory, textWhite)
VALUES
('Y2K', 'y2k', '#602100', '#4D1A00', TRUE),
('Japanese-style', 'japanese-style', '#750002', '#4D0001', TRUE),
('Cottagecore', 'cottagecore', '#593800', '#332000', TRUE),
('Gothic', 'gothic', '#000000', '#494949', TRUE),
('Pastel Emo', 'pastel-emo', '#75006B', '#52004B', TRUE),
('Retro', 'retro', '#00FC22', '#00C71B', FALSE);


INSERT INTO ANIMAL (nameAnimal, formNameAnimal)
VALUES
('Bear', 'bear'), ('Cat', 'cat'),
('Dog', 'dog'), ('Fox', 'fox');

INSERT INTO MATERIAL (nameMaterial)
VALUES
('Plush'), ('Felt'), ('Cotton'), ('Polyester'),
('Minky'), ('Fleece');

INSERT INTO SIZE (valueSize)
VALUES
('XS'), ('S'), ('M'), ('L'), ('XL');

INSERT INTO SQUISHINESS (valueSquishiness)
VALUES
('+'), ('++'), ('+++');

INSERT INTO PLUSHY (namePlushy, imgSrcPlushy, imgAltPlushy, urlNamePlushy, creationDatePlushy, descPlushy,
pricePlushy, stocksLeftPlushy, idAnimal, idSize, idSquishiness)
VALUES 
('Black gloomy bear', '/images/plushies/black-gloomy-bear.jpg', 'Black gloomy bear plushy', 'black-gloomy-bear', '2023-02-19', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 19, 9, 1, 3, 2),
('Black halloween bear', '/images/plushies/black-halloween-bear.jpg', 'Black halloween bear plushy', 'black-halloween-bear', '2024-05-11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.', 28.99, 4, 1, 3, 2),
('Black white gloomy bear', '/images/plushies/black-white-gloomy-bear.jpg', 'Black white gloomy bear plushy', 'black-white-gloomy-bear', '2008-12-14', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.', 38.99, 2, 1, 4, 3),
('Frown pink thing', '/images/plushies/frown-pink-thing.jpg', 'Frown pink thing plushy', 'frown-pink-thing', '2015-12-18', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam.', 5.99, 15, NULL, 2, 3);

INSERT INTO CATEGORYPLUSHY (idPlushy, idCategory)
VALUES 
(1, 1), (1, 4), (2, 1), (2, 3), (2, 5),
(3, 1), (3, 4), (4, 5);

INSERT INTO MATERIALPLUSHY (idPlushy, idMaterial)
VALUES 
(1, 3), (1, 4), (2, 1), (2, 2),
(3, 3), (3, 5), (4, 6), (4, 2);