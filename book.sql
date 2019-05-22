CREATE TABLE `Book` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`title` varchar(255) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Author` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `BookWrittenBy` (
`fk_Book` int(11) NOT NULL,
`fk_Author` int(11) NOT NULL,
INDEX `fk_Book_index` (`fk_Book` ASC),
INDEX `fk_Author_index` (`fk_Author` ASC)
);

CREATE TABLE `Location` (
`name` varchar(255) NOT NULL,
`longitude` varchar(255) NULL,
`latitude` varchar(255) NULL,
PRIMARY KEY (`name`) 
);

CREATE TABLE `LocationInBook` (
`fk_Book` int(11) NOT NULL,
`fk_Location` varchar(255) NOT NULL,
`amount` int NULL DEFAULT 0,
INDEX `fk_Book_index` (`fk_Book` ASC),
INDEX `fk_Location_index` (`fk_Location` ASC)
);


ALTER TABLE `BookWrittenBy` ADD CONSTRAINT `fk_BookWrittenBy_Book_1` FOREIGN KEY (`fk_Book`) REFERENCES `Book` (`id`);
ALTER TABLE `BookWrittenBy` ADD CONSTRAINT `fk_BookWrittenBy_Author_1` FOREIGN KEY (`fk_Author`) REFERENCES `Author` (`id`);
ALTER TABLE `LocationInBook` ADD CONSTRAINT `fk_LocationInBook_Location_1` FOREIGN KEY (`fk_Location`) REFERENCES `Location` (`name`);
ALTER TABLE `LocationInBook` ADD CONSTRAINT `fk_LocationInBook_Book_1` FOREIGN KEY (`fk_Book`) REFERENCES `Book` (`id`);

