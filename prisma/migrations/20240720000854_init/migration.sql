-- CreateTable
CREATE TABLE `phonebook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `number` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `number`(`number`),
    INDEX `number_2`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
