CREATE TABLE `tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `completed` BOOLEAN DEFAULT FALSE
);

INSERT INTO `tasks` (`title`, `description`, `completed`)
VALUES ('Test task', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus mollis lectus, quis laoreet mi mattis ac. Etiam mattis consectetur justo, a tempor ex consectetur faucibus. Nam ullamcorper maximus arcu, sed dapibus ante. Nulla congue egestas sollicitudin. Quisque vehicula vestibulum finibus. Nulla ipsum dolor, egestas vel nulla sed, accumsan ullamcorper purus. Nulla aliquam eleifend erat sed elementum.', '0');
