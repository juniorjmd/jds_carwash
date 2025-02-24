CREATE TABLE `dlausr_car_wash`.`mst_per_clientes_chg_pass` (
  `id` VARCHAR(50) NOT NULL,
  `id_usuario` INT NOT NULL,
  `activo` TINYINT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT now(),
  `fecha_cierre` DATETIME NULL,
  PRIMARY KEY (`id`));