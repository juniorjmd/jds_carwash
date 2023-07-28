CREATE TABLE `jdpsoluc_snbx_la11`.`cajas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `descripcion` VARCHAR(100) NULL,
  `estadoGeneral` INT NULL DEFAULT 1,
  `estadoCaja` INT NULL DEFAULT 0,
  `usuarioEstadoCaja` INT NULL,
  `usuarioEstadoGeneral` INT NULL,
  `fechaEstadoCaja` DATETIME NULL,
  `fechaEstadoGeneral` DATETIME NULL,
  PRIMARY KEY (`id`));

