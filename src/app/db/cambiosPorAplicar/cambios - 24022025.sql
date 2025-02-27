CREATE TABLE `mst_per_clientes_chg_pass` (
  `id` VARCHAR(50) NOT NULL,
  `id_usuario` INT NOT NULL,
  `activo` TINYINT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT now(),
  `fecha_cierre` DATETIME NULL,
  PRIMARY KEY (`id`));

  CREATE  
VIEW `vw_usuario_activo` AS
    SELECT 
        `usuarios`.`ID` AS `ID`,
        `usuarios`.`Login` AS `Login`,
        `usuarios`.`libranza` AS `libranza`,
        `usuarios`.`estado` AS `estado`,
        `usuarios`.`usr_registro` AS `usr_registro`,
        `usuarios`.`Fecha_Registro` AS `Fecha_Registro`,
        `usuarios`.`Usr_Modif` AS `Usr_Modif`,
        `usuarios`.`Fecha_Modif` AS `Fecha_Modif`,
        `usuarios`.`pass` AS `pass`,
        `usuarios`.`change_pass` AS `change_pass`,
        `usuarios`.`ultimo_ingreso` AS `ultimo_ingreso`,
        `mst_per_clientes`.`email` AS `mail`,
        `usuarios`.`descripcion` AS `descripcion`,
        `usuarios`.`img` AS `img`,
        `mst_per_clientes`.`nombre` AS `Nombre1`,
        `mst_per_clientes`.`sec_nombre` AS `Nombre2`,
        `mst_per_clientes`.`apellido` AS `Apellido1`,
        `mst_per_clientes`.`sec_apellido` AS `Apellido2`,
        `mst_per_clientes`.`nombreCompleto` AS `nombreCompleto`,
        `usuarios`.`idPersona` AS `idPersona`,
        `usuarios`.`empleado` AS `empleado`,
        COALESCE(`perfil_usuario`.`id_perfil`,
                0) AS `perfil`
    FROM
        ((`usuarios`
        JOIN `mst_per_clientes` ON (`mst_per_clientes`.`id` = `usuarios`.`idPersona`))
        LEFT JOIN `perfil_usuario` ON (`usuarios`.`ID` = `perfil_usuario`.`id_usuario`))
        where  usuarios.estado =(select id from     estado_registro where estado = 'A')