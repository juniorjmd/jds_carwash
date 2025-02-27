-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: mysql.us.stackcp.com    Database: 
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.18-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping events for database ''
--

--
-- Dumping routines for database ''
--
/*!50003 DROP FUNCTION IF EXISTS `GetChildren` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `GetChildren`(parentId INT) RETURNS longtext CHARSET utf8mb4 COLLATE utf8mb4_bin
BEGIN
        RETURN (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', child.id,
                    'name', child.name,
                    'icon', child.icon,
                    'children', GetChildren(child.id)
                )
            )
            FROM MenuHierarchy as child
            WHERE child.parent_id = parentId
        );
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getCostoProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getCostoProducto`(codigoproducto text) RETURNS int(11)
BEGIN

RETURN coalesce((select precioCompra from  inv_mst_producto where id =  codigoproducto ) , 0 ) ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getEstablecimientoActivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getEstablecimientoActivo`(`_key` TEXT) RETURNS int(11)
BEGIN
declare _flag int;
declare _esta int;
set _esta = -1 ; 
set _key = trim(_key);
if _key <> '' then
  SELECT count(*) into _flag FROM    `session` 
  inner join estado_registro on nombre_estado = 'Activo'
  and  `session`.estado =  estado_registro.id  
  where `session`.key = _key ;
  if _flag > 0 then
   SELECT establecimiento into _esta FROM vw_cajas_activas 
   inner join  `session` on 
   usuario = usuarioEstadoCaja  and `session`.key = _key ;
  else 
    set _esta = -2 ; 
  end if;
end if;
RETURN _esta;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getEstado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getEstado`(`letra` CHAR) RETURNS int(11)
BEGIN

RETURN (SELECT id FROM  estado_registro where estado = letra) ; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdCierreDeCajaActivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdCierreDeCajaActivo`(`_id_caja` INT) RETURNS int(11)
BEGIN
RETURN ( coalesce( (SELECT id FROM corte_de_caja where id_Caja =  _id_caja and coalesce(fecha_cierre , 0 ) = 0),0));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdCierreDeCajaParcialActivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdCierreDeCajaParcialActivo`(`_id_usuario` INT) RETURNS int(11)
BEGIN

RETURN ( coalesce(
(SELECT id FROM corte_de_caja_parcial where usuario_apertura =  _id_usuario  and coalesce(fecha_cierre , 0 ) = 0) , 0 ));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdContadorByName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdContadorByName`(`_NOMBRE` CHAR(50)) RETURNS int(11)
BEGIN
RETURN (SELECT id FROM  tipos_de_documentos WHERE TRIM(nombre ) = TRIM(_NOMBRE)); 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdDocumentoByIdFactura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdDocumentoByIdFactura`(idFactura text) RETURNS int(11)
BEGIN
   
RETURN coalesce( (select orden from documentos where idDocumentoFinal = idFactura ), 0 ) ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdEmpleadoPorTipNombre` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdEmpleadoPorTipNombre`(`_NOMBRE` CHAR(50)) RETURNS int(11)
BEGIN
RETURN (SELECT id FROM  mst_per_empleados_tipos WHERE TRIM(nombre ) = TRIM(_NOMBRE)); 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdEstado` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdEstado`(`nombreEstado` CHAR(2)) RETURNS int(11)
BEGIN
RETURN (select id from  estado_registro where trim(estado) = trim(nombreEstado));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdEstadoEnvio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdEstadoEnvio`(`_nombreEstado` CHAR(45)) RETURNS int(11)
BEGIN
RETURN (select id from  estado_domicilio where trim(nombre_estado) = trim(_nombreEstado));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdExistenciaActiva` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdExistenciaActiva`(`_key` INT) RETURNS int(11)
BEGIN
declare _flag int;
declare _esta int;
set _esta = -1 ;  
  SELECT count(*) into _flag FROM    `prd_actualizacion_existencias`  where bodega = _key and estado = 1 ; 
   
  if _flag > 0 then
    SELECT id into _esta FROM    `prd_actualizacion_existencias` 
    where bodega = _key and estado = 1 ; 
  else 
    set _esta = -2 ; 
  end if; 
RETURN _esta;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIdTipoDocumentoPorNombre` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIdTipoDocumentoPorNombre`(`_name` VARCHAR(45)) RETURNS int(11)
BEGIN

RETURN (select coalesce(id,-1) as id from 
tipos_de_documentos where   nombre = _name);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getIngresosByDoc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getIngresosByDoc`(idDoc int) RETURNS int(11)
BEGIN
   declare retorno decimal(16,2);
   set retorno = coalesce(
   (select sum( case movimiento when 'I' then valorPagado else ( -1 ) * valorPagado end )  from documentos_pagos  where idDocumento = idDoc) , 0 ) ;

RETURN retorno;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getNameProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getNameProducto`(idProducto text) RETURNS text CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
  RETURN ( select nombre from inv_mst_producto where id = coalesce(idProducto , '' ) ); 
  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getNumTotalHijos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getNumTotalHijos`(_id bigint) RETURNS int(11)
BEGIN 
RETURN ( select count(0) from inv_categorias b where b.idPadreCategoria = _id) ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getParametroNumerico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getParametroNumerico`(_codPar text) RETURNS decimal(16,2)
BEGIN

RETURN coalesce((SELECT par_numerico FROM parametros 
where cod_parametro = _codPar) , 0 ) ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getPrefijoContadorByName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `getPrefijoContadorByName`(`_NOMBRE` int) RETURNS text CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
RETURN (SELECT coalesce( prefijoAux ,concat('AUX',_NOMBRE) ) FROM  tipos_de_documentos WHERE id = _NOMBRE );  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `get_recurso_hijos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  FUNCTION `get_recurso_hijos`(_padreId INT) RETURNS longtext CHARSET utf8mb4 COLLATE utf8mb4_bin
BEGIN
    DECLARE hijos_json JSON;
    
    SET hijos_json = (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', id,
                'nombre_recurso', nombre_recurso,
                'estado', estado,
                'img', img,
                'idtipo', idtipo,
                'tipo', tipo,
                'padreId', padreId,
                'display_nombre', display_nombre,
                'arrayDir', arrayDir,
                'hijos', get_recurso_hijos(id)
            )
        )
        FROM vw_recurso
        WHERE padreId = _padreId
    );

    RETURN IFNULL(hijos_json, JSON_ARRAY());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `id_cuenta_contable` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `id_cuenta_contable`(`cuenta` INT(11)) RETURNS int(11)
BEGIN
RETURN (select ifnull(id_cuenta, -1 ) from cnt_cuentas where nro_cuenta = cuenta LIMIT 1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ID_TIPO_RELACION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `ID_TIPO_RELACION`(`_name_tipo_relacion` VARCHAR(150)) RETURNS int(11)
BEGIN
if _name_tipo_relacion <> '' then
set @id_tipo = '';
SELECT id_relacion  into @id_tipo FROM tipo_relacion_mail_cliente where descripcion = trim(_name_tipo_relacion);
else 
	set @id_tipo = '-1';
end if;
RETURN @id_tipo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `ID_TIP_NOTIFICACION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  FUNCTION `ID_TIP_NOTIFICACION`(`_name_tip_notificacion` VARCHAR(150)) RETURNS int(11)
BEGIN
if _name_tip_notificacion <> '' then
set @id_tipo = '';
SELECT id_tipo  into @id_tipo FROM tipo_notificacion where nom_tipo_notificacion = trim(_name_tip_notificacion);
else 
	set @id_tipo = '-1';
end if;
RETURN @id_tipo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `new_function` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `new_function`(codigoproducto text) RETURNS int(11)
BEGIN

RETURN coalesce((select precioCompra from  inv_mst_producto where id =  codigoproducto ) , 0 ) ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `abrir_caja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `abrir_caja`(IN `idCaja` INT, IN `usuarioId` INT, IN `_valorInicial` DECIMAL(16,2))
BEGIN
   declare count int;
   declare _estado_caja int;
   declare _id_cierre int;
	select count(0) into count from cajas where id = idCaja and estadoCaja = 1 ;
    if count > 0 then
		select -1 as _result , 'La caja ya se encuentra abierta - Valide por favor' as msg;
	else 
    select estadoCaja into _estado_caja from cajas where id = idCaja ;
     update cajas set  estadoCaja = 1 ,
	   usuarioEstadoCaja = usuarioId where id = idCaja ; 
    if _estado_caja = 3 then 
     select getIdCierreDeCajaActivo(idCaja) into _id_cierre;
      select   base into _valorInicial  from corte_de_caja where id = _id_cierre ; 
      SET SQL_SAFE_UPDATES = 0;
			  update corte_de_caja_parcial
			  set fecha_cierre = now(),
			  usuario_cierre =  usuarioId
			  where id_Caja =idCaja;
	SET SQL_SAFE_UPDATES = 1;
      
    insert into  corte_de_caja_parcial(base , id_Caja, usuario_apertura , fecha_apertura , id_cierre_total )
       values
       (_valorInicial , idCaja , usuarioId , now()  , _id_cierre  );
       
    else    
       insert into  corte_de_caja(base , id_Caja, usuario_apertura , fecha_apertura  )
       values
       (_valorInicial , idCaja , usuarioId , now() );
        select getIdCierreDeCajaActivo(idCaja) into _id_cierre;
        
      select   base into _valorInicial  from corte_de_caja where id = _id_cierre ; 
      
			
     SET SQL_SAFE_UPDATES = 0;
			  update corte_de_caja_parcial
			  set fecha_cierre = now(),
			  usuario_cierre =  usuarioId
			  where id_Caja =idCaja;
	SET SQL_SAFE_UPDATES = 1;

       insert into  corte_de_caja_parcial(base , id_Caja, usuario_apertura , fecha_apertura , id_cierre_total )
       values
       (_valorInicial , idCaja , usuarioId , now() , _id_cierre );
       
    end if;
     
		select 100 as _result , 'Caja abierta con exito' as msg;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizaCierresPagos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `actualizaCierresPagos`(IN `_documento` INT)
BEGIN
     declare _idMedioDePago int ;
     declare _valorPagado decimal(16,2);
     declare _id_cierre_caja , _id_cierre_caja_p int;
    
     DECLARE recorrerPagos CURSOR FOR SELECT  idMedioDePago, valorPagado
     from documentos_pagos where `idDocumento` =  _documento;	 
     
     
     DECLARE CONTINUE HANDLER FOR NOT FOUND SET @finito = TRUE; 
     set @finito = false;    
     
     select id_cierre_caja  , id_cierre_caja_p into _id_cierre_caja , _id_cierre_caja_p  from documentos where 
     orden = _documento ; 
     
     OPEN recorrerPagos;
     
		loop1: LOOP
		FETCH recorrerPagos INTO  _idMedioDePago , _valorPagado;
		
        IF @finito THEN
				LEAVE loop1;
		END IF;
        -- _id_cierre_caja , _id_cierre_caja_p
          set @existe = 0 ;
           select count(0)  into @existe from corte_de_caja_pagos where 
           tipo_pago = _idMedioDePago and   cod_cierre = _id_cierre_caja ;
          if @existe = 0 then
            insert into corte_de_caja_pagos( tipo_pago, valor, cod_cierre)
            values ( _idMedioDePago , 0 ,  _id_cierre_caja );
          end if;
          set @existe = 0 ;
           select count(0)  into @existe from corte_de_caja_parcial_pagos where 
           tipo_pago = _idMedioDePago and   cod_cierre = _id_cierre_caja_p ;
          if @existe = 0 then
            insert into corte_de_caja_parcial_pagos( tipo_pago, valor, cod_cierre)
            values ( _idMedioDePago , 0 ,  _id_cierre_caja_p );
          end if;
          
SET SQL_SAFE_UPDATES = 0;
          update corte_de_caja_pagos
         set valor =  valor + _valorPagado where 
         tipo_pago = _idMedioDePago and  cod_cierre = _id_cierre_caja;
         update corte_de_caja_parcial_pagos
         set valor =  valor + _valorPagado where 
         tipo_pago = _idMedioDePago and  cod_cierre = _id_cierre_caja_p;
         
SET SQL_SAFE_UPDATES = 1;
       END LOOP loop1; 
       close recorrerPagos;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cambiarDocumentoActual` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `cambiarDocumentoActual`(IN `_usuario` INT, IN `_documento` INT)
BEGIN 
declare _esta int;
declare _caja int;
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2  where usuario  = _usuario;
    update documentos set estado = 1  where orden  = _documento; 
    select 100 as _result , 'Documento creador con exito' as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cambiarDocumentoCompraActual` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `cambiarDocumentoCompraActual`(IN `_documento` INT)
BEGIN 
declare _esta int;
declare _caja int;
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2  where tipoDocumentoFinal  = getIdContadorByName('compra_activa');
    update documentos set estado = 1  where orden  = _documento; 
    select 100 as _result , 'Documento seleccionado con exito' as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cancelarDocumento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `cancelarDocumento`(IN `_usuario` INT, IN `_documento` INT)
BEGIN 
declare CONTADOR int;
    select count(*) into contador from documentos where  usuario  = _usuario
    and orden = _documento ;
    if CONTADOR = 0 then 
    select -1 as _result , 'Documento no existe o no pertenece al usuario' as msg;
    else 
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2 ,
    tipoDocumentoFinal = (SELECT id FROM tipos_de_documentos where nombre = 'eliminado'),
    usuario  = _usuario
    where orden = _documento ; 
    
    update documentos_listado_productos set estado_linea_venta = 'E' ,
    usuario  = _usuario
    where orden = _documento ; 
    
    
    	select 100 as _result , 'Documento Cancelado con exito' as msg;
   end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cerrarCaja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `cerrarCaja`(IN `idCaja` INT, IN `usuarioId` INT)
BEGIN
	declare count int;
	declare _id int;
	select count(0) into count from cajas where id = idCaja and estadoCaja in ( 1 , 3 );
    if count <= 0 then
		select -1 as _result , 'La caja no se encuentra abierta - Valide por favor' as msg;
	else
     update cajas set 
	   estadoCaja = 2 ,
	   usuarioEstadoCaja = usuarioId where id = idCaja ; 
       select id into _id from corte_de_caja where id_Caja = idCaja 
        and coalesce(fecha_cierre,-1) = -1 ;
       if _id > 0 then 
        update corte_de_caja set usuario_cierre =  usuarioId , fecha_cierre = now()  where 
        id  = _id; 
        
        update corte_de_caja_parcial set usuario_cierre =  usuarioId , fecha_cierre = now()  where 
        id_cierre_total  = _id and coalesce(fecha_cierre,-1)  = -1 ; 
		select 100 as _result , 'Caja cerrada con exito' as msg;
        else 
        select -1 as _result , 'Error al cerrar la caja' as msg;
        end if;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumento`(IN `_usuario` INT)
BEGIN 
declare _esta int;
declare _caja int;
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2  where usuario  = _usuario;
    select establecimiento , id into _esta ,_caja from  cajas 
    where estadoCaja = 1 and 
	      usuarioEstadoCaja = _usuario; 
    SET SQL_SAFE_UPDATES = 1;
    insert into documentos( caja, establecimiento,  usuario, cod_vendedor) 
          values( _caja, _esta ,_usuario,_usuario);
          SET SESSION group_concat_max_len = 1000000;
    	select 100 as _result , 'Documento creador con exito' as msg , objeto as OBJ
        from vw_obj_documentos_por_usuario where usuario = _usuario and vw_obj_documentos_por_usuario.tipoDocumentoFinal = 1 ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumentoAbonoCxC` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumentoAbonoCxC`(IN `_usuario` INT , in idCliente int)
BEGIN 
declare _esta int;
declare _caja int;
declare _documento_creado int; 
declare _clienteNombre text;
SELECT coalesce(nombreCompleto, 'NA')  into _clienteNombre FROM  mst_per_clientes where id = idCliente ; 
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2  where usuario  = _usuario;
    select establecimiento , id into _esta ,_caja from  cajas 
    where estadoCaja = 1 and 
	      usuarioEstadoCaja = _usuario; 
    SET SQL_SAFE_UPDATES = 1;
    insert into documentos( id_cliente , cliente , caja, establecimiento,  usuario, cod_vendedor, campo_info_5, campo_info_6 ,campo_info_1,campo_info_2) 
          values( idCliente, idCliente ,_caja, _esta ,_usuario,_usuario,   'NO_FACTURABLE' , 'RecaudosCuentaXCobrar' , 'Comprobante' , _clienteNombre);
          SET SESSION group_concat_max_len = 1000000; 
	set  _documento_creado = LAST_INSERT_ID() ;  
    	select 100 as _result , 'Documento creador con exito' as msg , _documento_creado as idIngresado ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumentoAbonoCxP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumentoAbonoCxP`(IN `_usuario` INT , in idCliente int , in _establecimiento int)
BEGIN 
declare _esta int;
declare _caja int;
declare _documento_creado int; 
declare _clienteNombre text;
SELECT coalesce(nombreCompleto, 'NA')  into _clienteNombre FROM  mst_per_clientes where id = idCliente ; 
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2  where usuario  = _usuario;  
    SET SQL_SAFE_UPDATES = 1;
    
 --   Borrador_pagos_cuenta_por_pagar
    insert into documentos(     tipoDocumentoFinal , id_cliente , cliente , caja, establecimiento,  usuario, cod_vendedor, campo_info_5, campo_info_6 ,campo_info_1,campo_info_2) 
          values( getIdTipoDocumentoPorNombre('Borrador_pagos_cuenta_por_pagar'), idCliente, idCliente ,0, _establecimiento ,_usuario,_usuario,   'NO_FACTURABLE' , 'Pagos_cuenta_por_pagar' , 'Comprobante' , _clienteNombre);
          SET SESSION group_concat_max_len = 1000000; 
	set  _documento_creado = LAST_INSERT_ID() ;  
    	select 100 as _result , 'Documento creador con exito' as msg , _documento_creado as idIngresado ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumentoCompra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumentoCompra`(IN `_usuario` INT , IN `_esta` INT)
BEGIN  
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2  where usuario  = _usuario and tipoDocumentoFinal = getIdTipoDocumentoPorNombre('compra_activa')   ; 
    SET SQL_SAFE_UPDATES = 1;
   -- select 0, _esta ,_usuario,_usuario ,_usuario ,  getIdTipoDocumentoPorNombre('compra_activa') ;
    insert into documentos( caja, establecimiento,  usuario, cod_vendedor, vendedor ,tipoDocumentoFinal) 
          values( 0, _esta ,_usuario,_usuario ,_usuario ,  getIdTipoDocumentoPorNombre('compra_activa')  );
          
          SET SESSION group_concat_max_len = 1000000;
    	select 100 as _result , 'Documento Compra creador con exito' as msg , objeto as OBJ
        from vw_obj_documentos_por_usuario where usuario = _usuario and vw_obj_documentos_por_usuario.tipoDocumentoFinal = getIdTipoDocumentoPorNombre('compra_activa') ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumentoDevolucion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumentoDevolucion`(IN `_usuario` INT , in idFactura text)
BEGIN  
declare _caja ,_esta, idCliente int;
declare _documento_creado int;   
	select
     caja, establecimiento,  cliente into _caja ,_esta, idCliente from documentos where idDocumentoFinal = idFactura;
    insert into documentos( id_cliente , cliente , caja, establecimiento,  usuario, cod_vendedor, campo_info_5, campo_info_6 ,campo_info_1,campo_info_2,campo_info_3) 
          values( idCliente, idCliente ,_caja, _esta ,_usuario,_usuario,   'NO_FACTURABLE' , 'comprobante_devolucion' , 'Comprobante' , 'devolucion de factura',idFactura);
          SET SESSION group_concat_max_len = 1000000; 
	set  _documento_creado = LAST_INSERT_ID() ;  
    	select 100 as _result , 'Documento creador con exito' as msg , _documento_creado as idIngresado ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumentoGasto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumentoGasto`(IN `_usuario` INT)
BEGIN 
declare _esta int;
declare _caja int;
declare _documento_creado int; 
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2  where usuario  = _usuario;
    select establecimiento , id into _esta ,_caja from  cajas 
    where estadoCaja = 1 and 
	      usuarioEstadoCaja = _usuario; 
    SET SQL_SAFE_UPDATES = 1;
    insert into documentos( caja, establecimiento,  usuario, cod_vendedor) 
          values( _caja, _esta ,_usuario,_usuario);
          SET SESSION group_concat_max_len = 1000000; 
	set  _documento_creado = LAST_INSERT_ID() ;  
    	select 100 as _result , 'Documento creador con exito' as msg , _documento_creado as idIngresado ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumentoNotaDebito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumentoNotaDebito`(IN `_usuario` INT , in idFactura text)
BEGIN

declare _caja ,_esta, idCliente int;
declare _documento_creado int;   
	select caja, establecimiento,  cliente into _caja ,_esta, idCliente from documentos where idDocumentoFinal = idFactura;
    insert into documentos( id_cliente , cliente , caja, establecimiento,  usuario, cod_vendedor, campo_info_5, campo_info_6 ,campo_info_1,campo_info_2,campo_info_3) 
          values( idCliente, idCliente ,_caja, _esta ,_usuario,_usuario,   'NO_FACTURABLE' , 'comprobante_nota_debito' , 'Comprobante' , 'Nota debito de compra',idFactura);
          SET SESSION group_concat_max_len = 1000000; 
	set  _documento_creado = LAST_INSERT_ID() ;  
    	select 100 as _result , 'Documento creador con exito' as msg , _documento_creado as idIngresado ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `crearNuevoDocumentoPorIngresoVehiculo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `crearNuevoDocumentoPorIngresoVehiculo`(IN `_usuario` INT ,  in cajaId int,
in _infoAdicional text,
in _cliente int 

)
BEGIN 
declare _esta int;
declare _caja int; 
declare _documento_creado int; 
    select establecimiento , id into _esta ,_caja from  cajas 
    where  id = cajaId;  
    insert into documentos( caja, establecimiento,  usuario, cod_vendedor, campo_info_1 , cliente) 
          values( _caja, _esta ,_usuario,_usuario, _infoAdicional, _cliente);
	set  _documento_creado = LAST_INSERT_ID() ;  
    	select 100 as _result , 'Documento creador con exito' as msg , _documento_creado as idIngresado ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `devolucionTotal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `devolucionTotal`(IN `Id_Venta` VARCHAR(12), IN `codusuario` INT, OUT `estatus` VARCHAR(10), OUT `totalDevuelto` DOUBLE, OUT `ivaDevuelto` DOUBLE, OUT `totalProductos` INT, OUT `totalPresioVent` DOUBLE)
BEGIN
		declare count int ; 
        declare id_cuenta_cartera varchar(100);
		declare contProductos int;
		declare  iva_devuelto,  precio_venta ,total_devuelto , cntDevuelta, cntDevuelta_real float ;
		declare vidProducto varchar(12) ;		
		DECLARE recorrerVentas CURSOR FOR SELECT  `idProducto` , `cantidadVendida` , cant_real_descontada from ventastemp where `idVenta` =  Id_Venta;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE; 
		set count = 0 ;
		set contProductos = 0 ;
		OPEN recorrerVentas;
		SET autocommit=0;
		set @flagInicio =0;
		START TRANSACTION;
		select count(*) from ventastemp where  `idVenta` =  Id_Venta and `estado_venta` = 'C' into @flagInicio ;
		
		if (@flagInicio = 0) then

		loop1: LOOP
		FETCH recorrerVentas INTO  vidProducto, cntDevuelta, cntDevuelta_real;
		
        IF @hecho THEN
				LEAVE loop1;
		END IF;
        
		set contProductos = contProductos + cntDevuelta;
		update producto set  `cantActual` =  `cantActual` + cntDevuelta_real ,
						`ventas` = `ventas` - cntDevuelta_real , `devoluciones` = `devoluciones` + cntDevuelta_real
		where `idProducto` = vidProducto;
		if ( ROW_COUNT() <= 0) THEN
					set count = 1 ;
		end if ;
 		
		END LOOP loop1;
		update ventastemp set `estado_venta` = 'C'  where `idVenta` =  Id_Venta;
		 select ROW_COUNT() into @flag ;
		if ( @flag <= 0) THEN
					select 'entro';
					set count = 1 ;
		end if ;

		update ventas  set estadoFactura = 'C' where `idVenta` =  Id_Venta ; 

		if ( ROW_COUNT() <= 0) THEN
					set count = 1 ;
		end if ; 
select   `valorIVA` ,    `valorParcial` , `valorTotal` from  
ventas  where `idVenta` =  Id_Venta into iva_devuelto , precio_venta , total_devuelto;

INSERT INTO `devoluciones`
( `id_factura`,
`fec_devolucion`,
`cnt_prd_devueltos`,
`iva_devuelto`,
`precio_venta`,
`total_devuelto`,
`estado_cierre_caja`,
`estado_cierre1`,
`cod_usuario_generador`)
VALUES
(Id_Venta,CURDATE(),
contProductos,
iva_devuelto,
 precio_venta ,total_devuelto ,'ACTIVO','ACTIVO',codusuario
);
	if ( ROW_COUNT() <= 0) THEN
					set count = 1 ;
		end if ;
set totalDevuelto    =   total_devuelto;
set ivaDevuelto      = 	 iva_devuelto;
set totalProductos   =   contProductos;
set totalPresioVent  =   precio_venta ;

SET SQL_SAFE_UPDATES = 0;

select idCuenta from  cartera where refFact = Id_Venta into id_cuenta_cartera;

update cartera set TotalActual = 0 , origen = 'devolucion' where refFact = Id_Venta ;

insert into abonoscartera (  idCliente, idFactura, valorAbono, fecha )
SELECT  idCliente, idFactura, (-1 * valorAbono), curdate() 
from abonoscartera where idFactura = id_cuenta_cartera;

		if ( count = 0 ) THEN
					COMMIT;
					set estatus = 'ok';
		else 
					ROLLBACK;
					set estatus = 'error';
					
		end if ;	
else
set estatus = 'error2';
end if ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `distribuir_abono_en_cuotas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `distribuir_abono_en_cuotas`(IN p_abono DECIMAL(16,2), IN p_id_cartera INT)
BEGIN
    DECLARE remaining_abono DECIMAL(16,2);
    DECLARE cuota_id INT;
    DECLARE cuota_total_actual DECIMAL(16,2);
    DECLARE cuota_total_pagado DECIMAL(16,2);
    DECLARE done INT DEFAULT 0;

    -- Inicializar el abono restante con el valor del abono recibido
 

    -- Cursor para recorrer las cuotas activas más antiguas primero
    DECLARE cur CURSOR FOR
        SELECT id, totalActual, totalPagado
        FROM mst_mov_cartera_cuotas
        WHERE id_cartera = p_id_cartera
        AND totalActual > 0
        ORDER BY fecha_max_pago ASC;

    -- Handler para manejar el fin del cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
   SET remaining_abono = p_abono;
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO cuota_id, cuota_total_actual, cuota_total_pagado;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Si el abono restante es mayor o igual al totalActual de la cuota
        IF remaining_abono >= cuota_total_actual THEN
            -- Actualizar la cuota pagada completamente
            UPDATE mst_mov_cartera_cuotas
            SET abono = cuota_total_actual 
            WHERE id = cuota_id;
            -- Restar el totalActual de la cuota del abono restante
            SET remaining_abono = remaining_abono - cuota_total_actual;
        ELSE
            -- Actualizar la cuota parcialmente
            UPDATE mst_mov_cartera_cuotas
            SET abono = remaining_abono 
            WHERE id = cuota_id;

            -- El abono se ha distribuido completamente
            SET remaining_abono = 0;
            LEAVE read_loop;
        END IF;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `distribuir_abono_en_cuotas_credito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `distribuir_abono_en_cuotas_credito`(IN p_abono DECIMAL(16,2), IN p_id_cartera INT , in _fechaPago datetime)
BEGIN
    DECLARE remaining_abono DECIMAL(16,2);
    DECLARE cuota_id INT;
    DECLARE cuota_total_actual DECIMAL(16,2);
    DECLARE cuota_total_pagado DECIMAL(16,2);
    DECLARE done INT DEFAULT 0;

    -- Inicializar el abono restante con el valor del abono recibido
 

    -- Cursor para recorrer las cuotas activas más antiguas primero
    DECLARE cur CURSOR FOR
        SELECT id, totalActual, totalPagado
        FROM mst_mov_credito_cuotas
        WHERE id_cartera = p_id_cartera
        AND totalActual > 0
        ORDER BY fecha_max_pago ASC;

    -- Handler para manejar el fin del cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
   SET remaining_abono = p_abono;
    set done = false;
    OPEN cur; 
    read_loop: LOOP
        FETCH cur INTO cuota_id, cuota_total_actual, cuota_total_pagado;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- select cuota_id, cuota_total_actual, cuota_total_pagado;
        if remaining_abono > 0 then
        -- Si el abono restante es mayor o igual al totalActual de la cuota
        IF remaining_abono >= cuota_total_actual THEN
            -- Actualizar la cuota pagada completamente
            UPDATE  mst_mov_credito_cuotas
            SET abono = cuota_total_actual , fechaPago = _fechaPago
            WHERE id = cuota_id;
            -- Restar el totalActual de la cuota del abono restante
            SET remaining_abono = remaining_abono - cuota_total_actual;
        ELSE
            -- Actualizar la cuota parcialmente
            UPDATE mst_mov_credito_cuotas
            SET abono = remaining_abono  , fechaPago = _fechaPago
            WHERE id = cuota_id;
            -- El abono se ha distribuido completamente
            SET remaining_abono = 0;
            set done = true;
        END IF;
      END IF;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `editarListaCompra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `editarListaCompra`(IN `id_compra` INT)
BEGIN 
declare _idLinea int; 
declare _idCompra VARCHAR(10);  
declare _idProducto VARCHAR(10);  
declare _nombreProducto VARCHAR(100);  
declare _presioCompra VARCHAR(10);   
declare _cantidad VARCHAR(10);   
declare _valorTotal VARCHAR(10);  
declare _usuario VARCHAR(10);  
declare _iva double;  
declare _porcent_iva float;  
declare _valorsiva double;  
declare _estado VARCHAR(1);  
declare _id_linea_editar INT;  
declare _cantidad_edicion FLOAT;

DECLARE recorrerCompraEditada CURSOR FOR 		
SELECT * FROM `listacompraedicion`
where  `idCompra` = id_compra ; 
DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE; 
 
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
BEGIN 
ROLLBACK; 
SELECT '-2'as _error; 
END; 

SET autocommit = 0;
START TRANSACTION;
    OPEN recorrerCompraEditada;
    
    loop1: LOOP 
	FETCH recorrerCompraEditada into _idLinea, _idCompra,  _idProducto,  _nombreProducto,  _presioCompra,  
    _cantidad,  _valorTotal,  _usuario,  _iva,  _porcent_iva,  _valorsiva,  _estado,  _id_linea_editar,  
    _cantidad_edicion ;
    
     IF @hecho THEN
		LEAVE loop1;
	END IF;

	 IF _estado = 'E'  THEN 
        
        IF _cantidad_edicion <>  _cantidad THEN
         update `producto` set `producto`.`cantActual` = (`producto`.`cantActual` - _cantidad ) ,
		`producto`.`compras` = (`producto`.`compras` - _cantidad) where `idProducto` = _idProducto ;
        
        
         update `producto` set `producto`.`cantActual` = (`producto`.`cantActual` + _cantidad_edicion ),
		`producto`.`compras` = ( `producto`.`compras` + _cantidad_edicion ) where `idProducto` = _idProducto ;
        
        UPDATE listacompra SET cantidad = _cantidad_edicion ,    
        valorTotal =  ( _presioCompra * _cantidad_edicion  ) , 
        valorsiva = (( _presioCompra * _cantidad_edicion  ) -(( _presioCompra * _cantidad_edicion  ) * (_porcent_iva / 100))) 
         WHERE idLinea = _id_linea_editar;
        
        
       END IF;
       
		ELSEIF _estado = 'D' THEN 
			update `producto` set `producto`.`cantActual` = `producto`.`cantActual` - _cantidad ,
		     `producto`.`compras` = `producto`.`compras` - _cantidad where `idProducto` = _idProducto ;
             
            DELETE FROM listacompra WHERE idLinea = _id_linea_editar;
      
			ELSEIF _estado = 'N'  THEN   
            
              INSERT INTO `listacompra`  ( `idCompra`,`idProducto`,`nombreProducto`,`presioCompra`,
				`cantidad`,`valorTotal`,`usuario`,`iva`,`porcent_iva`,`valorsiva`) VALUES
				(_idCompra,_idProducto,_nombreProducto,_presioCompra,_cantidad,
				_valorTotal,_usuario,_iva,_porcent_iva,_valorsiva);

            
              update `producto` set `producto`.`cantActual` = `producto`.`cantActual` + _cantidad ,
		`producto`.`compras` = `producto`.`compras` + _cantidad where `idProducto` = _idProducto ;

            
    END IF;

   
    
    
   
	END LOOP loop1;
                
	COMMIT;
    CLOSE recorrerCompraEditada;
    SET autocommit = 1;
        select '100' _error ;
 
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminarCompras` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `eliminarCompras`(IN `id_compra` INT)
BEGIN
declare _idProducto , _cantidad float ; 
DECLARE recorrerCompra CURSOR FOR 		
SELECT `listacompra`.`idProducto`, `listacompra`.`cantidad`
FROM `listacompra`
where `listacompra`.`idCompra` = id_compra ;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE; 
 
DECLARE EXIT HANDLER FOR SQLEXCEPTION 
BEGIN 
SELECT '-2'as _error; 
ROLLBACK; 
END; 

 
SELECT  
    `compras`.`estado`,
    `compras`.`referencia`
FROM `compras` where `compras`.`idCompra` = id_compra into @estado,@referencia;

SET autocommit = 0;
START TRANSACTION;
if @estado = 'activo' then 	if @referencia <> 'ninguno' then 		SELECT count(*) FROM  abonoscredito  where 
        abonoscredito.idFactura = @referencia into @countAbonos;
        if @countAbonos = 0 then 
			delete from credito where idCuenta = @referencia;
            set @continuar = 'ok';
		else
			select '-33' _error ;             set @continuar = 'nok';
        end if;
     else
     set @continuar = 'ok';
	END if ;
    OPEN recorrerCompra;
    loop1: LOOP 
	FETCH recorrerCompra into _idProducto , _cantidad;
    IF @hecho THEN
		LEAVE loop1;
	END IF;
    
    update `producto` set `producto`.`cantActual` = `producto`.`cantActual` - _cantidad ,
    `producto`.`compras` = `producto`.`compras` - _cantidad where `idProducto` = _idProducto ;
    
	END LOOP loop1;
    DELETE FROM `listacompra` WHERE `listacompra`.`idCompra` = id_compra;
	DELETE FROM `compras` WHERE `compras`.`idCompra` = id_compra;
    COMMIT;
    CLOSE recorrerCompra;
    SET autocommit = 1;
        select '100' _error ;
else
	select '-44' _error ; end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `generarDomicilio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `generarDomicilio`(IN `_documento` INT)
BEGIN
    declare _id_cliente , _state_id, _country_id  int;
    declare _display_name,_email, _mobile, _phone, _street, _city, _street2 
           , _nombre_pais , _nombre_estado char(45) ;
    
    select cliente into _id_cliente  from documentos where orden = _documento;
    SELECT  display_name,email, mobile, phone, street, city, street2, state_id, country_id , 
    nombre_pais , nombre_estado
    into _display_name,_email, _mobile, _phone, _street, _city, _street2, _state_id, _country_id 
    , _nombre_pais , _nombre_estado FROM  documentos_clientes where 
    orden = _id_cliente ; 
      
      insert into documentos_domicilio ( cod_doc, cod_cliente, estado_domicilio, direccion, cod_doc_pago)
      values ( _documento , _id_cliente,getIdEstadoEnvio('Generado'), concat_ws('-' , _country_id  , _nombre_pais , 
                             _state_id , _nombre_estado , _city,
                             _street,  _street2 ) , 0 ) ;
      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `generar_json_recursos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `generar_json_recursos`()
BEGIN
    SELECT JSON_OBJECT(
        'recursos', JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', id,
                'nombre_recurso', nombre_recurso,
                'estado', estado,
                'img', img,
                'idtipo', idtipo,
                'tipo', tipo,
                'padreId', padreId,
                'display_nombre', display_nombre,
                'arrayDir', arrayDir,
                'hijos', get_recurso_hijos(id)
            )
        )
    ) AS recursos_json
    FROM vw_recurso
    WHERE padreId = 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllProductosByCategoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getAllProductosByCategoria`(in _idCategoria bigInt, in inicio int , in cnt int)
BEGIN
 declare prd_obj text ;
    declare precio_obj text ;
    declare existencia_obj text ;
    declare img_obj text ;
    DECLARE resultado VARCHAR(255) ;
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET resultado = CONCAT('{ "estado" : "error", "codigo" : ', errorCode, ', "mensaje" : "', errorMessage, '" }');
        
        select resultado as _result ;
        -- Devolver el mensaje de error
        SELECT resultado AS obj; 
    END;   
    SET SESSION group_concat_max_len = 1000000;
    set precio_obj = '';
    set existencia_obj = '';
    set img_obj = '' ;
     -- Obtener productos 
    if    cnt > 0 then 
             -- Crear tabla temporal para productos limitados
			CREATE TEMPORARY TABLE temp_productos_categoria AS
			SELECT id FROM inv_mst_producto   where idCategoria = _idCategoria            
            LIMIT inicio, cnt;
	else 
		 -- Crear tabla temporal para productos limitados
			CREATE TEMPORARY TABLE temp_productos_categoria AS
			SELECT id FROM inv_mst_producto  where idCategoria = _idCategoria  ;
    end if;
     SELECT JSON_ARRAYAGG(obj ) INTO  prd_obj FROM vw_inv_mst_producto_obj
			where id   IN (SELECT id FROM temp_productos_categoria);  
			-- Obtener precios
			SELECT JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO precio_obj 
			FROM vw_inv_mst_producto_precios_obj_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_categoria);

			-- Obtener existencias
			SELECT    JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO existencia_obj 
			FROM vw_inv_mst_producto_existencias_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_categoria);

			-- Obtener imágenes
			SELECT JSON_ARRAYAGG( json_object(
           'id_producto',id_producto, 
           'objeto' , objeto)) INTO img_obj
			FROM vw_inv_mst_producto_images_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_categoria); 
     
       select  'ok' as _result , coalesce( prd_obj ,JSON_ARRAY() )   as producto, 
          coalesce(img_obj , JSON_ARRAY()) as img , 
        coalesce(precio_obj , JSON_ARRAY()) as precios , 
        coalesce(existencia_obj, JSON_ARRAY())  as existencias ;
     
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllProductosByMarca` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getAllProductosByMarca`(in _idMarca bigInt, in inicio int , in cnt int)
BEGIN
 declare prd_obj text ;
    declare precio_obj text ;
    declare existencia_obj text ;
    declare img_obj text ;
    DECLARE resultado VARCHAR(255) ;
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET resultado = CONCAT('{ "estado" : "error", "codigo" : ', errorCode, ', "mensaje" : "', errorMessage, '" }');
        
        select resultado as _result ;
        -- Devolver el mensaje de error
        SELECT resultado AS obj; 
    END;   
    SET SESSION group_concat_max_len = 1000000;
    set precio_obj = '';
    set existencia_obj = '';
    set img_obj = '' ;
     
     -- Obtener productos
    if    cnt > 0 then 
             -- Crear tabla temporal para productos limitados
			CREATE TEMPORARY TABLE temp_productos_marca AS
			SELECT id FROM inv_mst_producto  where idMarca = _idMarca   LIMIT inicio, cnt;
	else 
		 -- Crear tabla temporal para productos limitados
			CREATE TEMPORARY TABLE temp_productos_marca AS
			SELECT id FROM inv_mst_producto where idMarca = _idMarca;
    end if;
            SELECT JSON_ARRAYAGG(obj ) INTO  prd_obj FROM vw_inv_mst_producto_obj
			where id   IN (SELECT id FROM temp_productos_marca);  
			-- Obtener precios
			SELECT JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO precio_obj 
			FROM vw_inv_mst_producto_precios_obj_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_marca);

			-- Obtener existencias
			SELECT    JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO existencia_obj 
			FROM vw_inv_mst_producto_existencias_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_marca);

			-- Obtener imágenes
			SELECT JSON_ARRAYAGG( json_object(
           'id_producto',id_producto, 
           'objeto' , objeto)) INTO img_obj
			FROM vw_inv_mst_producto_images_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_marca); 

     
       select  'ok' as _result , coalesce( prd_obj ,JSON_ARRAY() )   as producto, 
          coalesce(img_obj , JSON_ARRAY()) as img , 
        coalesce(precio_obj , JSON_ARRAY()) as precios , 
        coalesce(existencia_obj, JSON_ARRAY())  as existencias ;
   
     
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllProductosByName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getAllProductosByName`(in _dato_busqueda text, in inicio int , in cnt int)
BEGIN
 declare prd_obj text ;
    declare precio_obj text ;
    declare existencia_obj text ;
    declare img_obj , _IdProducto text ;
    DECLARE resultado VARCHAR(255) ;
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET resultado = CONCAT('{ "estado" : "error", "codigo" : ', errorCode, ', "mensaje" : "', errorMessage, '" }');
        
        select resultado as _result ;
        -- Devolver el mensaje de error
        SELECT resultado AS obj; 
    END;   
    SET SESSION group_concat_max_len = 1000000;
    set precio_obj = '';
    set existencia_obj = '';
    set img_obj = '' ;
     -- Obtener productos
	set _IdProducto = upper(trim(_dato_busqueda) ) ;
    set  _dato_busqueda = concat('%' , trim(_dato_busqueda) , '%' ) ;
    if    cnt > 0 then 
             -- Crear tabla temporal para productos limitados
			CREATE TEMPORARY TABLE temp_productos_nombre AS
			SELECT id FROM inv_mst_producto  where nombre like _dato_busqueda 
            or nombre2 like _dato_busqueda  or nombre3 like _dato_busqueda 
            or upper(cod_prd_externo) = _IdProducto
            LIMIT inicio, cnt;
	else 
		 -- Crear tabla temporal para productos limitados
			CREATE TEMPORARY TABLE temp_productos_nombre AS
			SELECT id FROM inv_mst_producto where nombre like _dato_busqueda 
            or nombre2 like _dato_busqueda  or nombre3 like _dato_busqueda 
            ;
    end if;
            SELECT JSON_ARRAYAGG(obj ) INTO  prd_obj FROM vw_inv_mst_producto_obj
			where id   IN (SELECT id FROM temp_productos_nombre);  
			-- Obtener precios
			SELECT JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO precio_obj 
			FROM vw_inv_mst_producto_precios_obj_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_nombre);

			-- Obtener existencias
			SELECT    JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO existencia_obj 
			FROM vw_inv_mst_producto_existencias_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_nombre);

			-- Obtener imágenes
			SELECT JSON_ARRAYAGG( json_object(
           'id_producto',id_producto, 
           'objeto' , objeto)) INTO img_obj
			FROM vw_inv_mst_producto_images_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_nombre); 
     
       select  'ok' as _result , coalesce( prd_obj ,JSON_ARRAY() )   as producto, 
          coalesce(img_obj , JSON_ARRAY()) as img , 
        coalesce(precio_obj , JSON_ARRAY()) as precios , 
        coalesce(existencia_obj, JSON_ARRAY())  as existencias ;
   
     
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllProductosCompletos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getAllProductosCompletos`( in inicio int , in cnt int)
BEGIN
 declare prd_obj text ;
    declare precio_obj text ;
    declare existencia_obj text ;
    declare img_obj text ;
    DECLARE resultado VARCHAR(255) ;
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET resultado = CONCAT('{ "estado" : "error", "codigo" : ', errorCode, ', "mensaje" : "', errorMessage, '" }');
        
        select resultado as _result ;
        -- Devolver el mensaje de error
        SELECT resultado AS obj; 
    END;   
    SET SESSION group_concat_max_len = 1000000;
    set precio_obj = '';
    set existencia_obj = '';
    set img_obj = '' ;
     -- Obtener productos 
    if    cnt > 0 then 
             -- Crear tabla temporal para productos limitados
		
			CREATE TEMPORARY TABLE temp_productos_completos AS
			SELECT id FROM inv_mst_producto LIMIT inicio, cnt;
	else 
		 -- Crear tabla temporal para productos limitados
			CREATE TEMPORARY TABLE temp_productos_completos AS
			SELECT id FROM inv_mst_producto ;
    end if;
            SELECT JSON_ARRAYAGG(obj ) INTO  prd_obj FROM vw_inv_mst_producto_obj
			where id   IN (SELECT id FROM temp_productos_completos);  
			-- Obtener precios
			SELECT JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO precio_obj 
			FROM vw_inv_mst_producto_precios_obj_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_completos);

			-- Obtener existencias
			SELECT    JSON_ARRAYAGG( json_object(
            'id_producto',id_producto, 
            'objeto' , objeto)) INTO existencia_obj 
			FROM vw_inv_mst_producto_existencias_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_completos);

			-- Obtener imágenes
			SELECT JSON_ARRAYAGG( json_object(
           'id_producto',id_producto, 
           'objeto' , objeto)) INTO img_obj
			FROM vw_inv_mst_producto_images_byprd 
			WHERE id_producto IN (SELECT id FROM temp_productos_completos); 

     
       select  'ok' as _result , coalesce( prd_obj ,JSON_ARRAY() )   as producto, 
          coalesce(img_obj , JSON_ARRAY()) as img , 
        coalesce(precio_obj , JSON_ARRAY()) as precios , 
        coalesce(existencia_obj, JSON_ARRAY())  as existencias ;
     
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getIdProductoCategoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getIdProductoCategoria`(IN categoriaID BIGINT)
BEGIN
    DECLARE letras VARCHAR(255) DEFAULT '';
    DECLARE tempID BIGINT;
    DECLARE _contador BIGINT;
    DECLARE tempLetra VARCHAR(10);
    DECLARE resultado VARCHAR(255) ;
    DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255);
    declare validate int;
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET resultado = CONCAT('{ "estado" : "error", "codigo" : ', errorCode, ', "mensaje" : "', errorMessage, '" }');
        -- Devolver el mensaje de error
        SELECT resultado AS obj; 
    END; 
    -- Inicializar variables
    SET tempID = categoriaID;
    SET resultado = '';

    
  SELECT   UPPER(letra)  as letra  INTO letras 
        FROM inv_categorias
        WHERE id = categoriaID;  
    -- Devolver el resultado
    SET resultado = letras;
    
     -- Iniciar una transacción
   

    -- Bloquear la fila para evitar concurrencia
    SELECT contador INTO _contador
    FROM inv_categorias
    WHERE id = categoriaID
    FOR UPDATE;

    -- Incrementar el contador
    SET _contador = _contador + 1;

    -- Actualizar la tabla con el nuevo valor del contador
    UPDATE inv_categorias
    SET contador = _contador
    WHERE id = categoriaID;
    -- Confirmar la transacción
    
 -- Formatear el resultado final
    SET resultado = CONCAT(' { "estado" : "ok" ,  "idProducto" : "', CONCAT(letras, LPAD(_contador, 4, '0')), '"  , "letras" : "', letras, '" , "contador" : ', _contador, ' } ');
    -- Devolver el resultado
    SELECT resultado AS obj;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetMenus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `GetMenus`()
BEGIN
   
     CREATE TEMPORARY TABLE TempMenuHierarchy (
        id INT PRIMARY KEY,
        name VARCHAR(255),
        parent_id INT,
        icon VARCHAR(255),
        level INT
    );

    -- Insertar los registros raíz (padreId = 0)
    INSERT INTO TempMenuHierarchy (id, name, parent_id, icon, level)
    SELECT id, nombre_recurso, padreId, img, 0 FROM recurso WHERE padreId = 0;

    -- Insertar los hijos de forma iterativa (máximo 10 niveles para evitar ciclos infinitos)
    INSERT INTO TempMenuHierarchy (id, name, parent_id, icon, level)
    SELECT r.id, r.nombre_recurso, r.padreId, r.img, tm.level + 1
    FROM recurso r
    INNER JOIN TempMenuHierarchy tm ON r.padreId = tm.id;
   
   SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', root.id,
            'name', root.name,
            'icon', root.icon,
            'children', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', c.id,
                        'name', c.name,
                        'icon', c.icon
                    )
                ) FROM TempMenuHierarchy c WHERE c.parent_id = root.id
            )
        )
    ) AS menus
    FROM TempMenuHierarchy root
    WHERE root.parent_id = 0;
 DROP TEMPORARY TABLE IF EXISTS TempMenuHierarchy;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductoCompleto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getProductoCompleto`(in IdProducto text)
BEGIN
    declare prd_obj text ;
    declare precio_obj text ;
    declare existencia_obj text ;
    declare img_obj text ;
    declare contador int ; 
    DECLARE resultado VARCHAR(255) ;
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET resultado = CONCAT('{ "estado" : "error", "codigo" : ', errorCode, ', "mensaje" : "', errorMessage, '" }');
        
        select resultado as _result ;
        -- Devolver el mensaje de error
        SELECT resultado AS obj; 
    END;   
    SET SESSION group_concat_max_len = 1000000;
    set precio_obj = '';
    set existencia_obj = '';
    set img_obj = '' ;
      select obj into prd_obj from  vw_inv_mst_producto_obj where upper(id) =  upper(IdProducto) ;
     if trim(prd_obj) <> '' then
        select objeto into precio_obj from  vw_inv_mst_producto_precios_obj_byprd where id_producto = IdProducto ;
		select objeto into existencia_obj from  vw_inv_mst_producto_existencias_byprd where id_producto = IdProducto ; 
		select objeto into img_obj from  vw_inv_mst_producto_images_byprd where id_producto = IdProducto ;  
      else 
           select upper(id) into IdProducto from inv_mst_producto where upper(barcode) = upper(IdProducto) ;
           select obj into prd_obj from  vw_inv_mst_producto_obj where id = IdProducto ;
			 if trim(prd_obj) <> '' then
				select objeto into precio_obj from  vw_inv_mst_producto_precios_obj_byprd where upper(id_producto) = IdProducto ;
				select objeto into existencia_obj from  vw_inv_mst_producto_existencias_byprd where upper(id_producto) = IdProducto ; 
				select objeto into img_obj from  vw_inv_mst_producto_images_byprd where upper(id_producto) = IdProducto ; 
             else 
				select  JSON_ARRAY(obj ) into prd_obj from  vw_inv_mst_producto_obj where id in (
								select upper(id)   from inv_mst_producto
								where upper(cod_prd_externo) = upper(IdProducto) 
                   ) ;
		 
					 if trim(prd_obj) <> '' then
						select objeto into precio_obj from  vw_inv_mst_producto_precios_obj_byprd where upper(id_producto) 
                        in (  select upper(id)   from inv_mst_producto where upper(cod_prd_externo) = upper(IdProducto) 
                   ) ; 
                   
						select objeto into existencia_obj from  vw_inv_mst_producto_existencias_byprd where upper(id_producto) in (
                    select upper(id)   from inv_mst_producto where upper(cod_prd_externo) = upper(IdProducto) 
                   ) ;   
                   
						select objeto into img_obj from  vw_inv_mst_producto_images_byprd where upper(id_producto) in (
                    select upper(id)   from inv_mst_producto where upper(cod_prd_externo) = upper(IdProducto) 
                   ) ; 
						end if;
			 end if;
        
     end if;
     
       select  'ok' as _result ,coalesce( prd_obj , JSON_ARRAY() ) as producto,  COALESCE(img_obj, JSON_ARRAY())   as img , 
      coalesce(precio_obj , JSON_ARRAY()) as precios , 
      coalesce(existencia_obj, JSON_ARRAY())  as existencias ;
   
     

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getProductoCompletoExistencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getProductoCompletoExistencia`( in _id_producto text ,  in _id_caja int)
BEGIN
    select obj from vw_inv_mst_producto_existencias_by_caja where id = _id_caja and id_producto = _id_producto ; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getSessionActive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getSessionActive`()
BEGIN
SELECT * FROM  `session` where coalesce(fecha_hora_fin,'') = '';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTiposVehiculosNoAsignadoAservicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getTiposVehiculosNoAsignadoAservicio`( in _id_servicio int)
BEGIN
    SELECT id, usuario_creacion, name_usuario_creacion, usuario_edicion, fecha_creacion, fecha_actualizacion, estado, nombre_estado, nombre, descripcion
    FROM  vw_inv_mst_vehiculos_tipos where id not in (
      SELECT cod_tipo_vehiculo FROM  vw_vehiculos_servicios_costos where cod_servicio =_id_servicio )  ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getUserGenericDocuments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `getUserGenericDocuments`( in idUser integer , in validarCaja integer)
BEGIN  
    SET SESSION group_concat_max_len = 1000000;
    
    -- SELECT * FROM vw_cajas_activas where usuarioEstadoCaja = 1;
    
   if idUser = 0 then 
      if validarCaja = 0 then 
    	select  *  from vw_obj_documentos_por_usuario 
        where  vw_obj_documentos_por_usuario.tipoDocumentoFinal = 1 ;
	  else  
		 select  vw_obj_documentos_por_usuario.* from vw_obj_documentos_por_usuario 
         inner join vw_cajas_activas on usuarioEstadoCaja = vw_obj_documentos_por_usuario.usuario
		 where  vw_obj_documentos_por_usuario.tipoDocumentoFinal = 1 ;
	  end if;
   else  
       if validarCaja = 0 then 
    	select  vw_obj_documentos_por_usuario.*  from vw_obj_documentos_por_usuario 
        where usuario = idUser and vw_obj_documentos_por_usuario.tipoDocumentoFinal = 1 ;
	  else  
		 select vw_obj_documentos_por_usuario.* from vw_obj_documentos_por_usuario 
         inner join vw_cajas_activas on usuarioEstadoCaja = vw_obj_documentos_por_usuario.usuario
		 where usuario = idUser and vw_obj_documentos_por_usuario.tipoDocumentoFinal = 1 ;
	  end if;
   end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ingresar_saldo_cuenta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `ingresar_saldo_cuenta`(IN `id_subcuenta` INT, IN `_fecha` DATE, IN `_debito` DECIMAL(16,2), IN `_credito` DECIMAL(16,2), IN `origen` VARCHAR(20))
BEGIN
declare _dia ,_mes,_anio , _count int;
declare  _clase ,_grupo , _cuenta int;
select YEAR(_fecha)into _anio;  #Selecciona el año
select MONTH (_fecha) into _mes;  #Selecciona el mes
select DAY(_fecha) into _dia; #Selecciona el día  

select cod_clase ,cod_grupo ,cod_cuenta from vw_cnt_scuentas where id_scuenta = id_subcuenta 
into _clase ,_grupo , _cuenta;
set @_tabla = '' ;
set @columna = '' ;
 
if _debito = 0 then
	set @num_debito = 0;
	set @num_credito = 1;
end if;
if _credito = 0 then
	set @num_debito = 1;
	set @num_credito = 0;
end if;
 
-- when 'cuenta' then
select count(*) from cnt_saldo_cuenta where cod_cuenta = _cuenta
and anio = _anio into _count;
if _count = 0 then  
insert into cnt_saldo_cuenta (cod_cuenta,anio,grupo,clase) values(_cuenta ,_anio , _grupo  , _clase );
END IF;


-- when 'grupo' then
select count(*) from cnt_saldo_grupo where cod_grupo = _grupo
and anio = _anio into _count;
-- _clase ,_grupo , _cuenta
if _count = 0 then  
insert into cnt_saldo_grupo (cod_grupo,anio , clase) values(_grupo ,_anio , _clase);
END IF;

-- when 'clase' then
select count(*) from cnt_saldo_clases where cod_clase = _clase
and anio = _anio into _count;
if _count = 0 then  
  insert into cnt_saldo_clases (cod_clase,anio) values(_clase ,_anio );
END IF;
SET SQL_SAFE_UPDATES = 0;
case _mes
when 1 then
update cnt_saldo_cuenta
set debito_1 = debito_1 + _debito ,
credito_1 = credito_1 + _credito,
num_trn_c_1 = num_trn_c_1 + @num_credito ,
num_trn_d_1 = num_trn_d_1 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_1 = saldo_1 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_1 = debito_1 + _debito ,
credito_1 = credito_1 + _credito,
num_trn_c_1 = num_trn_c_1 + @num_credito ,
num_trn_d_1 = num_trn_d_1 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1 ,
saldo_1 = saldo_1 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_1 = debito_1 + _debito ,
credito_1 = credito_1 + _credito,
num_trn_c_1 = num_trn_c_1 + @num_credito ,
num_trn_d_1 = num_trn_d_1 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1 ,
saldo_1 = saldo_1 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;
 
when 2 then
update cnt_saldo_cuenta
set debito_2 = debito_2 + _debito ,
credito_2 = credito_2 + _credito,
num_trn_c_2 = num_trn_c_2 + @num_credito ,
num_trn_d_2 = num_trn_d_2 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_2 = saldo_2 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_2 = debito_2 + _debito ,
credito_2 = credito_2 + _credito,
num_trn_c_2 = num_trn_c_2 + @num_credito ,
num_trn_d_2 = num_trn_d_2 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_2 = saldo_2 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_2 = debito_2 + _debito ,
credito_2 = credito_2 + _credito,
num_trn_c_2 = num_trn_c_2 + @num_credito ,
num_trn_d_2 = num_trn_d_2 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_2 = saldo_2 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 3 then
update cnt_saldo_cuenta
set debito_3 = debito_3 + _debito ,
credito_3 = credito_3 + _credito,
num_trn_c_3 = num_trn_c_3 + @num_credito ,
num_trn_d_3 = num_trn_d_3 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_3 = saldo_3 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_3 = debito_3 + _debito ,
credito_3 = credito_3 + _credito,
num_trn_c_3 = num_trn_c_3 + @num_credito ,
num_trn_d_3 = num_trn_d_3 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_3 = saldo_3 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_3 = debito_3 + _debito ,
credito_3 = credito_3 + _credito,
num_trn_c_3 = num_trn_c_3 + @num_credito ,
num_trn_d_3 = num_trn_d_3 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_3 = saldo_3 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 4 then
update cnt_saldo_cuenta
set debito_4 = debito_4 + _debito ,
credito_4 = credito_4 + _credito,
num_trn_c_4 = num_trn_c_4 + @num_credito ,
num_trn_d_4 = num_trn_d_4 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_4 = saldo_4 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_4 = debito_4 + _debito ,
credito_4 = credito_4 + _credito,
num_trn_c_4 = num_trn_c_4 + @num_credito ,
num_trn_d_4 = num_trn_d_4 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_4 = saldo_4 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_4 = debito_4 + _debito ,
credito_4 = credito_4 + _credito,
num_trn_c_4 = num_trn_c_4 + @num_credito ,
num_trn_d_4 = num_trn_d_4 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_4 = saldo_4 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 5 then
update cnt_saldo_cuenta
set debito_5 = debito_5 + _debito ,
credito_5 = credito_5 + _credito,
num_trn_c_5 = num_trn_c_5 + @num_credito ,
num_trn_d_5 = num_trn_d_5 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_5 = saldo_5 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_5 = debito_5 + _debito ,
credito_5 = credito_5 + _credito,
num_trn_c_5 = num_trn_c_5 + @num_credito ,
num_trn_d_5 = num_trn_d_5 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_5 = saldo_5 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_5 = debito_5 + _debito ,
credito_5 = credito_5 + _credito,
num_trn_c_5 = num_trn_c_5 + @num_credito ,
num_trn_d_5 = num_trn_d_5 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_5 = saldo_5 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 6 then
update cnt_saldo_cuenta
set debito_6 = debito_6 + _debito ,
credito_6 = credito_6 + _credito,
num_trn_c_6 = num_trn_c_6 + @num_credito ,
num_trn_d_6 = num_trn_d_6 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_6 = saldo_6 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_6 = debito_6 + _debito ,
credito_6 = credito_6 + _credito,
num_trn_c_6 = num_trn_c_6 + @num_credito ,
num_trn_d_6 = num_trn_d_6 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_6 = saldo_6 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_6 = debito_6 + _debito ,
credito_6 = credito_6 + _credito,
num_trn_c_6 = num_trn_c_6 + @num_credito ,
num_trn_d_6 = num_trn_d_6 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_6 = saldo_6 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 7 then
update cnt_saldo_cuenta
set debito_7 = debito_7 + _debito ,
credito_7 = credito_7 + _credito,
num_trn_c_7 = num_trn_c_7 + @num_credito ,
num_trn_d_7 = num_trn_d_7 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_7 = saldo_7 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_7 = debito_7 + _debito ,
credito_7 = credito_7 + _credito,
num_trn_c_7 = num_trn_c_7 + @num_credito ,
num_trn_d_7 = num_trn_d_7 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_7 = saldo_7 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_7 = debito_7 + _debito ,
credito_7 = credito_7 + _credito,
num_trn_c_7 = num_trn_c_7 + @num_credito ,
num_trn_d_7 = num_trn_d_7 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_7 = saldo_7 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 8 then
update cnt_saldo_cuenta
set debito_8 = debito_8 + _debito ,
credito_8 = credito_8 + _credito,
num_trn_c_8 = num_trn_c_8 + @num_credito ,
num_trn_d_8 = num_trn_d_8 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_8 = saldo_8 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_8 = debito_8 + _debito ,
credito_8 = credito_8 + _credito,
num_trn_c_8 = num_trn_c_8 + @num_credito ,
num_trn_d_8 = num_trn_d_8 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_8 = saldo_8 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_8 = debito_8 + _debito ,
credito_8 = credito_8 + _credito,
num_trn_c_8 = num_trn_c_8 + @num_credito ,
num_trn_d_8 = num_trn_d_8 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_8 = saldo_8 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;
 
when 9 then
update cnt_saldo_cuenta
set debito_9 = debito_9 + _debito ,
credito_9 = credito_9 + _credito,
num_trn_c_9 = num_trn_c_9 + @num_credito ,
num_trn_d_9 = num_trn_d_9 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_9 = saldo_9 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_9 = debito_9 + _debito ,
credito_9 = credito_9 + _credito,
num_trn_c_9 = num_trn_c_9 + @num_credito ,
num_trn_d_9 = num_trn_d_9 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_9 = saldo_9 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_9 = debito_9 + _debito ,
credito_9 = credito_9 + _credito,
num_trn_c_9 = num_trn_c_9 + @num_credito ,
num_trn_d_9 = num_trn_d_9 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_9 = saldo_9 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 10 then
update cnt_saldo_cuenta
set debito_10 = debito_10 + _debito ,
credito_10 = credito_10 + _credito,
num_trn_c_10 = num_trn_c_10 + @num_credito ,
num_trn_d_10 = num_trn_d_10 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_10 = saldo_10 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_10 = debito_10 + _debito ,
credito_10 = credito_10 + _credito,
num_trn_c_10 = num_trn_c_10 + @num_credito ,
num_trn_d_10 = num_trn_d_10 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_10 = saldo_10 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_10 = debito_10 + _debito ,
credito_10 = credito_10 + _credito,
num_trn_c_10 = num_trn_c_10 + @num_credito ,
num_trn_d_10 = num_trn_d_10 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_10 = saldo_10 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;
 
when 11 then
update cnt_saldo_cuenta
set debito_11 = debito_11 + _debito ,
credito_11 = credito_11 + _credito,
num_trn_c_11 = num_trn_c_11 + @num_credito ,
num_trn_d_11 = num_trn_d_11 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1  ,
saldo_11 = saldo_11 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_11 = debito_11 + _debito ,
credito_11 = credito_11 + _credito,
num_trn_c_11 = num_trn_c_11 + @num_credito ,
num_trn_d_11 = num_trn_d_11 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1 ,
saldo_11 = saldo_11 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_11 = debito_11 + _debito ,
credito_11 = credito_11 + _credito,
num_trn_c_11 = num_trn_c_11 + @num_credito ,
num_trn_d_11 = num_trn_d_11 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1 ,
saldo_11 = saldo_11 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

when 12 then

update cnt_saldo_cuenta
set debito_12 = debito_12 + _debito ,
credito_12 = credito_12 + _credito,
num_trn_c_12 = num_trn_c_12 + @num_credito ,
num_trn_d_12 = num_trn_d_12 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1   ,
saldo_12 = saldo_12 +( _debito - _credito) 
where cod_cuenta = _cuenta and  anio =  _anio;

update cnt_saldo_grupo
set debito_12 = debito_12 + _debito ,
credito_12 = credito_12 + _credito,
num_trn_c_12 = num_trn_c_12 + @num_credito ,
num_trn_d_12 = num_trn_d_12 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1 ,
saldo_12 = saldo_12 +( _debito - _credito) 
where cod_grupo = _grupo and  anio =  _anio;

update cnt_saldo_clases 
set debito_12 = debito_12 + _debito ,
credito_12 = credito_12 + _credito,
num_trn_c_12 = num_trn_c_12 + @num_credito ,
num_trn_d_12 = num_trn_d_12 + @num_debito,
saldo_credito_t = saldo_credito_t + _credito,
saldo_debito_t = saldo_debito_t + _debito,
saldo_total = saldo_total +( _debito - _credito)  , 
num_trn_credito = num_trn_credito + @num_credito ,
num_trn_debito = num_trn_debito  + @num_debito ,
num_trn_total = num_trn_total + 1 ,
saldo_12 = saldo_12 +( _debito - _credito) 
where cod_clase = _clase and  anio =  _anio;

end case;
 SET SQL_SAFE_UPDATES = 1;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertaRetefuente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `insertaRetefuente`(IN `_id_usuario` VARCHAR(50), IN `_id_venta` VARCHAR(50), IN `_IVA` DOUBLE, IN `_total_venta_bruta` DOUBLE, IN `_total_venta_neta` DOUBLE, IN `_porcentaje_retefuente` DOUBLE)
BEGIN
set @tRF = 0;

set @tRF = (_total_venta_neta * _porcentaje_retefuente)/100;

insert into retefuente ( id_usuario, IVA, FECHA, total_venta_bruta, total_venta_neta, id_cierre_de_caja,id_venta,porcentaje_retefuente,totalRf)
values (_id_usuario, _IVA, CURDATE(), _total_venta_bruta, _total_venta_neta, '', _id_venta,_porcentaje_retefuente, @tRF
) ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtenerIdProductoCategoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `obtenerIdProductoCategoria`(IN categoriaID BIGINT)
BEGIN
    DECLARE letras VARCHAR(255) DEFAULT '';
    DECLARE tempID BIGINT;
    DECLARE _contador BIGINT;
    DECLARE tempLetra VARCHAR(10);
    DECLARE resultado VARCHAR(255) ;
    DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255);
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET resultado = CONCAT('{ "estado" : "error", "codigo" : ', errorCode, ', "mensaje" : "', errorMessage, '" }');
        -- Devolver el mensaje de error
        SELECT resultado AS obj; 
    END; 
    -- Inicializar variables
    SET tempID = categoriaID;
    SET resultado = '';

    -- Recorrer la jerarquía de categorías hasta que no haya más padres
    WHILE tempID > 0 DO
        -- Obtener la letra de la categoría actual
        SELECT concat(  UPPER(letra) , trim(letras) ) as letra, idPadreCategoria  INTO letras, tempID
        FROM inv_categorias
        WHERE id = tempID; 
    END WHILE;

    -- Devolver el resultado
    SET resultado = letras;
    
     -- Iniciar una transacción
   

    -- Bloquear la fila para evitar concurrencia
    SELECT contador INTO _contador
    FROM inv_categorias
    WHERE id = categoriaID
    FOR UPDATE;

    -- Incrementar el contador
    SET _contador = _contador + 1;

    -- Actualizar la tabla con el nuevo valor del contador
    UPDATE inv_categorias
    SET contador = _contador
    WHERE id = categoriaID;
    -- Confirmar la transacción
    
 -- Formatear el resultado final
    SET resultado = CONCAT(' { "estado" : "ok" ,  "idProducto" : "', CONCAT(letras, LPAD(_contador, 4, '0')), '"  , "letras" : "', letras, '" , "contador" : ', _contador, ' } ');
    -- Devolver el resultado
    SELECT resultado AS obj;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `rectificaCantidades` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `rectificaCantidades`()
BEGIN
declare vidProducto varchar(12) ;
declare cant int ;
DECLARE recorrerVentas CURSOR FOR SELECT    idProducto , ifnull(sum(cantidad),0)  
  FROM listacompra group by  idProducto ;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET @hecho = TRUE; 
 OPEN recorrerVentas;
loop1: LOOP

FETCH recorrerVentas INTO  vidProducto, cant;
IF @hecho THEN
	LEAVE loop1;
END IF;
select vidProducto ,cant;


END LOOP loop1;
close recorrerVentas;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `resumenCaja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `resumenCaja`(IN `_idCaja` INT)
BEGIN
	declare idCajaResumen int;
    if _idCaja > 0 then 
	select max(id) into idCajaResumen from corte_de_caja where id_Caja = _idCaja;
    -- select idCajaResumen ;
    select * from  vwcorte_de_caja where id = idCajaResumen;
    else
      select * from  vwcorte_de_caja ;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `resumenCajaParcial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `resumenCajaParcial`(IN `_idCaja` INT)
BEGIN
	declare idCajaResumen int;
    if _idCaja > 0 then 
	select max(id) into idCajaResumen from corte_de_caja_parcial where id_Caja = _idCaja;
    -- select idCajaResumen ;
    select * from  vwcorte_de_caja_parcial where id = idCajaResumen;
    else
      select * from  vwcorte_de_caja_parcial ;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `setPerfilAUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `setPerfilAUsuario`(IN `_idPerfil` INT, IN `_idUsuario` INT)
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		select 'error al ingresar a la base de datos' as msg , '-1' AS _result LIMIT 1; 
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		select  WARNINGS  as msg , '-1' AS _result LIMIT 1; 
	END;
delete from perfil_usuario where id_usuario = _idUsuario;

  
insert into perfil_usuario (  id_usuario , id_perfil) values
(_idUsuario, _idPerfil);

select '100' as _result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_cuotas_vencidas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_actualizar_cuotas_vencidas`()
BEGIN

SET SQL_SAFE_UPDATES = 0;
    UPDATE mst_mov_cartera_cuotas
    SET estadoCuota = 'OUTTIME'
    WHERE fechaPago IS NULL 
    AND fecha_max_pago < CURRENT_DATE ;
    
    UPDATE mst_mov_cartera_cuotas
    SET estadoCuota = 'OUTTIME_ABONADO'
    WHERE  fecha_max_pago < CURRENT_DATE
    AND totalPagado > 0 and  valorCuota > totalPagado;
    
     UPDATE mst_mov_credito_cuotas
    SET estadoCuota = 'OUTTIME'
    WHERE fechaPago IS NULL 
    AND fecha_max_pago < CURRENT_DATE ;
    
    UPDATE mst_mov_credito_cuotas
    SET estadoCuota = 'OUTTIME_ABONADO'
    WHERE  fecha_max_pago < CURRENT_DATE
    AND totalPagado > 0 and  valorCuota > totalPagado;
    
SET SQL_SAFE_UPDATES = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizar_saldo_bonos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_actualizar_saldo_bonos`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;   
    DECLARE v_idMedioDePago INT;
    DECLARE v_valorPagado DECIMAL(10,2);  
    DECLARE v_referencia VARCHAR(50); 
    DECLARE v_nombre VARCHAR(50);    
    DECLARE v_cuentaContable INT ;   
    declare  _documento_bono int ;  
    DECLARE cur CURSOR FOR 
    SELECT documentos_pagos.idMedioDePago , valorPagado , referencia, 
    UPPER(vw_medios.nombre) ,  cuentaContable FROM  documentos_pagos
		inner join vw_medios on vw_medios.id = idMedioDePago
		  where documentos_pagos.idDocumento = p_idDocumento  ; 

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    SET done = false;  
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO   v_idMedioDePago , v_valorPagado , v_referencia, v_nombre ,  v_cuentaContable;
        IF done THEN
            LEAVE read_loop;
        END IF; 
        -- select v_idMedioDePago , v_valorPagado , v_referencia, v_nombre ,  v_cuentaContable; 
        if v_nombre = 'BONOS' THEN
			select orden into _documento_bono from documentos where  
			idDocumentoFinal = v_referencia ; 
            
            UPDATE documentos SET campo_auxiliar_6 =  campo_auxiliar_6 + v_valorPagado WHERE orden = 
            _documento_bono ; 
            
        END IF;
    END LOOP; 
    -- Close the cursor
    CLOSE cur; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_asignar_consecutivo_factura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_asignar_consecutivo_factura`(IN `_usuario` INT, IN `_modulo` VARCHAR(5), OUT `s_id_venta` VARCHAR(100), OUT `_id_venta` VARCHAR(100))
BEGIN
	declare _cod_generado int;
    declare _cont_codigo int;
    select count(*) from consecutivos_factura where estado = 'ACTIVO'
    AND modulo_factura = _modulo AND cod_usuario = _usuario  INTO  _cont_codigo ;
    
    
    IF _cont_codigo <= 0 THEN	     
		select count(*) from consecutivos_factura where estado = 'noAsignado'  INTO  _cont_codigo ;
        IF _cont_codigo > 0 THEN
			UPDATE consecutivos_factura 
			SET	modulo_factura = _modulo , cod_usuario = _usuario , estado = 'ACTIVO'
            where estado = 'noAsignado'   ;
        ELSE
			SELECT IFNULL(MAX(cod_factura),0) FROM consecutivos_factura INTO _cod_generado;
            
			INSERT INTO consecutivos_factura
            (  cod_factura, modulo_factura, cod_usuario, estado) 
            VALUES(_cod_generado + 1 , _modulo , _usuario, 'ACTIVO') ,
            (_cod_generado + 2 , 'NN' , 0 , 'noAsignado') ;
            
            
            
        END IF;
        
        
        
        
    END IF;
    
    
    select cod_factura , CONCAT(_modulo,'_',cod_factura) AS id_venta_generado from consecutivos_factura where estado = 'ACTIVO'
		AND modulo_factura = _modulo AND cod_usuario = _usuario into _id_venta , s_id_venta    ;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_buscar_productos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_buscar_productos`(IN `_dato_busqueda` TEXT)
BEGIN
set @w = '';
set @id_sh = '';
set @like_sh = '';
set @cantidad = 0;
set @cantBarcode = 0;
set @sql_exe='select * from allproductplustotalsales';
 
if COALESCE(_dato_busqueda,'') != '' then

select COUNT(*) from allproductplustotalsales WHERE idProducto = _dato_busqueda INTO @cantidad;
if @cantidad = 0 then
select COUNT(*) from allproductplustotalsales WHERE barcode = _dato_busqueda INTO @cantBarcode;
if @cantBarcode = 0 then
set @w = ' where ';
set @like_sh = concat('`nombre` LIKE ''%',_dato_busqueda,'%'' OR `Grupo` LIKE ''%',_dato_busqueda,'%'' OR `descripcion` LIKE ''%',_dato_busqueda,'%'' OR `nom_subgrupo_1` LIKE ''%',_dato_busqueda,'%'' OR `nom_subgrupo_2` LIKE ''%',_dato_busqueda,'%'' OR `laboratorio` LIKE ''%',_dato_busqueda,'%''');
else
set @w = ' where ';
set @id_sh = concat(' barcode = ''',_dato_busqueda ,'''');
end if;
else
set @w = ' where ';
set @id_sh = concat(' idProducto = ''',_dato_busqueda ,'''');
end if;

set @SQL = '';
-- set @sql_exe = concat(@sql_exe,@w,@id_sh,@like_sh,' order by IDLINEA');
set @SQL  = concat(@sql_exe,@w,@id_sh,@like_sh,' order by IDLINEA');

-- SELECT @SQL as consulta;

PREPARE stmt FROM @SQL ;
execute stmt;
deallocate prepare stmt;

else 
set @SQL = 'select * from allproductplustotalsales';

PREPARE stmt FROM @SQL ;
execute stmt;
deallocate prepare stmt;
-- SELECT @SQL as consulta;
end if;



-- PREPARE insertar FROM @sql_exe;
-- EXECUTE insertar;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_cerrarCajaParcial` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_cerrarCajaParcial`(IN `idCaja` INT, IN `usuarioId` INT)
BEGIN
	declare count int;
	declare _id_corte_caja int;
	declare _id_corte_caja_parcial int;
	select count(0) into count from cajas where id = idCaja and estadoCaja = 1 ;
    if count <= 0 then
		select -1 as _result , 'La caja no se encuentra abierta - Valide por favor' as msg;
	else
     update cajas set 
	   estadoCaja = 3 ,
	   usuarioEstadoCaja = usuarioId where id = idCaja ; 
       
       select getIdCierreDeCajaParcialActivo(usuarioId) into _id_corte_caja  ;
        
       if _id_corte_caja > 0 then 
        update corte_de_caja_parcial set usuario_cierre =  usuarioId , fecha_cierre = now()  where 
        id  = _id_corte_caja; 
		select 100 as _result , 'Caja cerrada con exito' as msg;
        else 
        select -1 as _result , 'Error al cerrar la caja' as msg;
        end if;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_cerrar_inventario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_cerrar_inventario`(
    IN _id_usuario INT,
    IN _id_bodega INT,
    IN nombre_inventario VARCHAR(45),
    IN descripcion_del_inventario TEXT,
    IN tipo_inventario INT
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_id_producto VARCHAR(255);
    DECLARE v_cantidad DECIMAL(10,2);
    DECLARE v_referencia VARCHAR(255);
    DECLARE v_fecha_creacion DATETIME;
    DECLARE v_id_inventario INT;
    DECLARE v_cantidad_anterior DECIMAL(10,2);
    DECLARE v_ajuste DECIMAL(10,2);
    DECLARE v_existencia INT;
    DECLARE v_count INT;
    Declare _ult_mov text ; 

    DECLARE cur CURSOR FOR
        SELECT cod_producto, cantidad, referencia
        FROM inv_inventario_ingreso_auxiliar
        WHERE cod_usuario = _id_usuario AND bodega = _id_bodega;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    main_block: BEGIN
        -- Obtener la menor fecha de creación
        SELECT MIN(fecha_creacion)
        INTO v_fecha_creacion
        FROM inv_inventario_ingreso_auxiliar
        WHERE cod_usuario = _id_usuario AND bodega = _id_bodega;

        -- Validar si existen datos a ingresar
        SELECT COUNT(*)
        INTO v_count
        FROM inv_inventario_ingreso_auxiliar
        WHERE cod_usuario = _id_usuario AND bodega = _id_bodega;

        IF v_count = 0 THEN
            SELECT  104 AS _result , 'No existen datos para ingresar' AS msg;
            LEAVE main_block;
        END IF;

        -- Crear el registro en la tabla inv_inventario
        INSERT INTO inv_inventario (nombre, descripcion, id_tipo, estado, fechaCreacion, fechaAplicacion ,usuario)
        VALUES (nombre_inventario, descripcion_del_inventario, tipo_inventario, 'APL', v_fecha_creacion, CURDATE() , _id_usuario );

        -- Obtener el ID del inventario recién creado
        SET v_id_inventario = LAST_INSERT_ID();

    set _ult_mov = concat("inventario # " , v_id_inventario , " por el usuario :  " , _id_usuario ) ; 
        -- Abrir el cursor
        OPEN cur;

        read_loop: LOOP
            FETCH cur INTO v_id_producto, v_cantidad, v_referencia;
            IF done THEN
                LEAVE read_loop;
            END IF;

            -- Verificar si el producto ya tiene existencias en la bodega
            SELECT COUNT(*)
            INTO v_existencia
            FROM inv_mst_producto_existencias
            WHERE id_producto = v_id_producto AND id_bodega = _id_bodega;

            IF v_existencia > 0 THEN
                -- Obtener la cantidad anterior si existe el producto
                SELECT cant_actual
                INTO v_cantidad_anterior
                FROM inv_mst_producto_existencias
                WHERE id_producto = v_id_producto AND id_bodega = _id_bodega; 
                IF tipo_inventario = 2 THEN
                    -- Suma a la cantidad actual
                    SET v_ajuste = v_cantidad;
                    SET v_cantidad_anterior = v_cantidad_anterior + v_ajuste;
                ELSE
                    -- Reemplazo de la cantidad actual
                    SET v_ajuste = v_cantidad - v_cantidad_anterior;
                    SET v_cantidad_anterior = v_cantidad;
                END IF;

                -- Actualizar en la tabla de existencias
                UPDATE inv_mst_producto_existencias
                SET cant_actual = v_cantidad_anterior, 
					ajustes = ajustes + v_ajuste , 
                    usuario_edicion = _id_usuario,
                    fecha_actualizacion = NOW() ,
                    ult_mov =  _ult_mov
                WHERE id_producto = v_id_producto AND id_bodega = _id_bodega;
            ELSE
                -- Si no existe, insertar en la tabla de existencias
                INSERT INTO inv_mst_producto_existencias (
                    id_producto, id_bodega, cant_inicial, cant_actual, stock, usuario_creacion, fecha_creacion,ult_mov
                ) VALUES (
                    v_id_producto, _id_bodega , v_cantidad, v_cantidad,v_cantidad, _id_usuario, NOW(),  _ult_mov
                );
                SET v_cantidad_anterior = v_cantidad;
            END IF;

            -- Insertar en la tabla inv_inventario_ingreso_aplicado
            INSERT INTO inv_inventario_ingreso_aplicado (
                cod_producto, cantidad, idInventario, referencia, usuario_creacion, fecha_creacion, estado, cantidadAnterios, cantidadAjuste
            ) VALUES (
                v_id_producto, v_cantidad, v_id_inventario, v_referencia, _id_usuario, NOW(), 1, v_cantidad_anterior, v_ajuste
            );

        END LOOP;
			delete
			FROM inv_inventario_ingreso_auxiliar
			WHERE cod_usuario = _id_usuario AND bodega = _id_bodega;
        CLOSE cur;

        -- Devolver resultado exitoso
        SELECT 100 AS _result;

    END main_block;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_cerrar_remision` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_cerrar_remision`(IN `_id_remision` INT, IN `_id_orden_compra` INT, IN `_usuario` VARCHAR(100))
BEGIN
declare _cantidadVendida decimal(12,2);
declare _presioSinIVa decimal(12,2);
declare _valorIVA decimal(12,2) ;
declare _presioVenta decimal(12,2);
declare _valorTotal decimal(12,2);
declare _total_valores int;

select count(*)  FROM remision_detalle 
where id_remision = _id_remision and id_orden_compra = _id_orden_compra into _total_valores ;

if (_total_valores > 0 )THEN 
 
 select 
sum(cantidadVendida) as cantidadVendida ,
SUM(CAST( ( presioSinIVa * cantidadVendida ) AS DECIMAL(16,2) ) ) as presioSinIVa,
sum(CAST( ( IVA * cantidadVendida ) AS DECIMAL(16,2) ) ) as IVA,
sum(presioVenta) as presioVenta,
sum(valorTotal) as valorTotal 
 FROM remision_detalle 
where id_remision = _id_remision and id_orden_compra = _id_orden_compra
group by 
id_orden_compra, id_remision into _cantidadVendida , _presioSinIVa ,_valorIVA ,_presioVenta , _valorTotal
 ;

INSERT INTO `remision_cabeza`
(`num_remision`,
`orden_de_compra`,
`cantidadVendida`,
`valorParcial`,
`descuento`,
`valorIVA`,
`valorTotal`,
`fecha`,
`hora`,
`usuario`,  
`fecha_entrega`)
VALUES
(_id_remision,
_id_orden_compra ,
_cantidadVendida ,
_presioSinIVa,
	0,
_valorIVA,
_valorTotal,
curdate(),
CURTIME() ,
_usuario  ,
curdate());


	SELECT '100' as result; 
 
else  
	SELECT 'No existen datos para ingresar en el cierre.' as result; 
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_change_pass` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_change_pass`(IN `_ID` VARCHAR(20), IN `_usr_registro` VARCHAR(150), IN `_pass` BLOB)
BEGIN 
set @usuarioIngresado = _usr_registro;
IF _ID is null or _ID = ''  THEN
 
     	SELECT '-1' as result;
	 
else
	    
				UPDATE `usuarios`
					SET					 
					`pass` = _pass ,
                    `change` = '1'  
					WHERE `ID` =  CAST(_ID AS UNSIGNED) ;       
        
        SELECT '101' as result;
END if;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_CREAR_DOCUMENTO_COTIZACION` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `SP_CREAR_DOCUMENTO_COTIZACION`(IN `_usuario` INT, IN `_documento` INT)
BEGIN 
declare CONTADOR int;
    select count(*) into contador from documentos where  usuario  = _usuario
    and orden = _documento ;
    if CONTADOR = 0 then 
    select -1 as _result , 'Documento no existe o no pertenece al usuario' as msg;
    else 
    SET SQL_SAFE_UPDATES = 0;
    update documentos set estado = 2 ,
    tipoDocumentoFinal = (SELECT id FROM tipos_de_documentos where nombre = 'cotizacion'),
    usuario  = _usuario
    where orden = _documento ; 
    
    update documentos_listado_productos set estado_linea_venta = 'C' ,
    usuario  = _usuario
    where orden = _documento ; 
    
    
    	select 100 as _result , 'Cotizacion generada con exito' as msg;
   end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_editar_pedidos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_crear_editar_pedidos`(`_id_pedido_SAP` VARCHAR(20), `_cod_generado_sistema` VARCHAR(20), `_estado` VARCHAR(2), `_usuario` VARCHAR(150))
BEGIN

DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		select 'error al ingresar los valores a la base de datos'  AS result LIMIT 1; 
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		select  WARNINGS  AS result LIMIT 1; 
	END;
    
set @usuarioIngresado = _usuario;

set @cont_datos = 0;
SELECT COUNT(*) INTO @cont_datos FROM pedidos_proceso WHERE id_pedido_SAP = _id_pedido_SAP;
 
if @cont_datos = 0 then

	insert into  pedidos_proceso (id_pedido_SAP, cod_generado_sistema, estado, usuario) 
	value (_id_pedido_SAP, _cod_generado_sistema, _estado, _usuario);
    

	SELECT '100' as result;
else
 SET SQL_SAFE_UPDATES = 0;
	UPDATE pedidos_proceso SET estado = _estado;  

	SELECT '101' as result;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_editar_perfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_crear_editar_perfil`(IN `_Perf_ID` VARCHAR(12), IN `_Perf_Nombre` VARCHAR(150), IN `_estado` CHAR(1), IN `_usuario` VARCHAR(100))
BEGIN
set @usuarioIngresado = _usuario;   

IF _Perf_ID is null or _Perf_ID = ''  THEN

INSERT INTO `Perfiles`
	(`Perf_ID`,
	`Perf_Nombre`,
	`estado`)
	VALUES
	(_Perf_ID,
	_Perf_Nombre,
	_estado );

	SELECT '100' as result;
else     
	UPDATE `Perfiles`
	SET
	`Perf_ID` = _Perf_ID,
	`Perf_Nombre` =_Perf_Nombre,
	`estado` = _estado
	WHERE `Perf_ID` = CAST(_Perf_ID AS UNSIGNED) ;    
        
        SELECT '101' as result;
	   
	
END if;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_editar_recurso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_crear_editar_recurso`(IN `_idrecurso` VARCHAR(5), IN `_id_menu` VARCHAR(5), IN `_tipo_recurso` VARCHAR(5), IN `_nombre_recurso` VARCHAR(200), IN `_id_recurso_sistema` VARCHAR(100), IN `_estado` VARCHAR(1), IN `_usuario` VARCHAR(150))
BEGIN


declare _cont_menu int; 
set @usuarioIngresado = _usuario;
  
 

-- idrecurso, id_menu, tipo_recurso, nombre_recurso, id_recurso_sistema, estado
 
if _idrecurso = '' then
	INSERT INTO `recurso`
( 
`id_menu`,
`tipo_recurso`,
`nombre_recurso`,
`id_recurso_sistema`,
`estado`)
VALUES
(
_id_menu ,
_tipo_recurso ,
_nombre_recurso ,
_id_recurso_sistema ,
_estado );

    set _idrecurso = LAST_INSERT_ID();
     select '100' as result;
else
	if _idrecurso = '' then
		select '-1' as result; 		
    else
		UPDATE `recurso`
SET
`idrecurso` =_idrecurso,
`id_menu` =_id_menu,
`tipo_recurso` = _tipo_recurso,
`nombre_recurso` =_nombre_recurso,
`id_recurso_sistema` = _id_recurso_sistema,
`estado` = _estado
WHERE `idrecurso` = _idrecurso;            
            select '101' as result;
    end if;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_Crear_editar_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_Crear_editar_usuario`(IN `_ID` VARCHAR(20), IN `_Login` VARCHAR(150), IN `_Nombre1` VARCHAR(150), IN `_Nombre2` VARCHAR(150), IN `_Apellido1` VARCHAR(150), IN `_Apellido2` VARCHAR(150), IN `_estado` VARCHAR(150), IN `_usr_registro` VARCHAR(150), IN `_pass` BLOB, IN `_change` CHAR(1), IN `_mail` VARCHAR(200))
BEGIN
declare _numusuario int;
declare _lastIsertId int;

declaRE _nombreCompleto  varchar(150) ;
declare _cod_remision varchar(3);
declare _cod_1 int;
declare _cod_2 int;
declare _cod_3 int;
DECLARE LT1 CHAR(1);
DECLARE LT2 CHAR(1);
DECLARE LT3 CHAR(1);

DECLARE CLAVE_OK CHAR(1);

SET CLAVE_OK = 1;

select FLOOR(RAND(now())*20) into  _cod_1;
select FLOOR(RAND( _cod_1 )*20) into _cod_2;
select FLOOR(RAND(_cod_2)*20) into _cod_3;




set _nombreCompleto = '';
if _Nombre1 != '' then
	set _nombreCompleto =  _Nombre1 ;
end if;

if _Nombre2 != '' then
set _nombreCompleto = CONCAT_WS(" ", trim(_nombreCompleto) ,trim(_Nombre2) );
end if;

if _Apellido1 != '' then
set _nombreCompleto = CONCAT_WS(" ", trim(_nombreCompleto) , trim(_Apellido1) );
end if;

if _Apellido2 != '' then
set _nombreCompleto = CONCAT_WS(" ", trim(_nombreCompleto) ,  trim(_Apellido2));
end if;
 


IF _ID is null or _ID = ''  THEN
  
	SELECT count(*) into _numusuario FROM  `usuarios` where Login = _Login;
 	IF _numusuario = 0 THEN   
    
     while CLAVE_OK > 0 do     
     
		  while _cod_3 > 0 and LT1 is  null do      
				SELECT letras INTO LT1 FROM letras ORDER BY rand() LIMIT 1 ;
				SET _cod_3 =  _cod_3 - 1;
		  end while;
		
		 while _cod_1 > 0 and LT2 is null  do      
				SELECT letras INTO LT2 FROM letras ORDER BY rand() LIMIT 1 ;
				SET _cod_1 =  _cod_1 - 1;
		  end while;
		  
		 while _cod_2 > 0 and LT3 is  null do      
				SELECT letras INTO LT3 FROM letras ORDER BY rand() LIMIT 1 ;
				SET _cod_2 =  _cod_2 - 1;
		  end while;
		-- select LT1,LT2,LT3;
		SET _cod_remision = CONCAT(LT1,LT2,LT3); 
       -- select _cod_remision;
        SELECT COUNT(*) INTO CLAVE_OK FROM usuarios WHERE convert(cod_remision using utf8 ) = convert(_cod_remision using utf8);  
      
    end while;
    -- select _cod_remision;
		INSERT INTO `usuarios`
		(`Login`,`Nombre1`,`Nombre2`,`Apellido1`,`Apellido2`,`nombreCompleto`,`estado`,`usr_registro`,`Fecha_Registro`,`pass`,cod_remision,mail)
		VALUES
		( _Login,_Nombre1,_Nombre2,_Apellido1,_Apellido2,_nombreCompleto,_estado,_usr_registro,now(),_pass,_cod_remision , _mail);
        
        set _lastIsertId = LAST_INSERT_ID();
        
       
        
        SELECT '100' as result;
	  
    ELSE
     	SELECT '-1' as result;
	END if;  
else

	SELECT count(*) into _numusuario FROM  `usuarios` where ID = _ID;
	IF _numusuario  >= 1 THEN 
    
		IF _change =  'P' THEN
           
		   UPDATE `usuarios`
					SET
					`Login` = _Login,
					`Nombre1` = _Nombre1,
					`Nombre2` = _Nombre2,
					`Apellido1` = _Apellido1,
					`Apellido2` = _Apellido2,
					`nombreCompleto` = _nombreCompleto,
					`estado` = _estado, 
					`Usr_Modif` = _usr_registro,
					`Fecha_Modif` = now(),
					`pass` = _pass ,
                    `change` = '0' ,
                    mail = _mail
					WHERE `ID` =  CAST(_ID AS UNSIGNED) ;  
			
            
		ELSE
				UPDATE `usuarios`
					SET
					`Login` = _Login,
					`Nombre1` = _Nombre1,
					`Nombre2` = _Nombre2,
					`Apellido1` = _Apellido1,
					`Apellido2` = _Apellido2,
					`nombreCompleto` = _nombreCompleto,
					`estado` = _estado, 
					`Usr_Modif` = _usr_registro,
					`Fecha_Modif` = now(), 
                    mail = _mail
					WHERE `ID` =  CAST(_ID AS UNSIGNED) ;    	 
        END IF;
				
        
        SELECT '101' as result;
	  
    ELSE
     	SELECT '-2' as result;
	END if;  
	
END if;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_crear_relacion_user_perfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_crear_relacion_user_perfil`(IN `_idRelacion` VARCHAR(12), IN `_user_id` VARCHAR(12), IN `_perfil_id` VARCHAR(12), IN `_usuario` VARCHAR(100))
BEGIN
 set @usuarioIngresado = _usuario;   

IF _idRelacion is null or _idRelacion = ''  THEN

INSERT INTO  `relacion_user_perfiles`
( 
`user_id`,
`perfil_id`)
VALUES
( _user_id ,
_perfil_id);


	SELECT '100' as result;
else     
	UPDATE  `relacion_user_perfiles`
	SET
	`perfil_id` = _perfil_id 
	WHERE `idRelacion` = CAST(_idRelacion AS UNSIGNED) ;    
        
        SELECT '101' as result;
	   
	
END if;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_devolver_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_devolver_producto`( in _id_linea_devolucion int)
BEGIN
  declare existenciaId int ;
  declare cntDevolucion decimal(10 , 2 );  
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON 
        select errorCode as _result , errorMessage as msg ; 
    END;   
    
    
  SELECT   cant_real_descontada , id_existencia
  into cntDevolucion , existenciaId
 FROM documentos_listado_productos where id  = _id_linea_devolucion ;
  
  
  update inv_mst_producto_existencias
  set   cant_actual = cant_actual + cntDevolucion  , 
  ventas = ventas - cntDevolucion
      
  where id = existenciaId ; 
  
  
  delete  FROM documentos_listado_productos where id  = _id_linea_devolucion ;
  
  select 100 as _result ,  'ok' as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_devolver_producto_cotizacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_devolver_producto_cotizacion`( in _id_linea_devolucion int)
BEGIN
  declare existenciaId int ;
  declare cntDevolucion decimal(10 , 2 );  
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON 
        select errorCode as _result , errorMessage as msg ; 
    END;   
    
    
  SELECT   cant_real_descontada , id_existencia
  into cntDevolucion , existenciaId
 FROM documentos_listado_productos where id  = _id_linea_devolucion ;
  
  
  update inv_mst_producto_existencias
  set   cant_actual = cant_actual + cntDevolucion  , 
  ventas = ventas - cntDevolucion 
  where id = existenciaId ; 
   
  
  select 100 as _result ,  'ok' as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_devolver_producto_devolucion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_devolver_producto_devolucion`( in _id_linea_devolucion int , in _cnt  DECIMAL(16,2) )
BEGIN
  declare existenciaId int ;
  declare cntDevolucion decimal(10 , 2 );  
     DECLARE errorCode INT;
    DECLARE errorMessage VARCHAR(255); 
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON 
        select errorCode as _result , errorMessage as msg ; 
    END;   
    
    
  SELECT   cant_real_descontada , id_existencia
  into cntDevolucion , existenciaId
 FROM documentos_listado_productos where id  = _id_linea_devolucion ;
  
  update documentos_listado_productos 
  set cant_real_descontada = cant_real_descontada - _cnt
   where id  = _id_linea_devolucion ;
  
  update inv_mst_producto_existencias
  set   cant_actual = cant_actual + _cnt  , 
  ventas = ventas - _cnt ,
  devoluciones = devoluciones + _cnt
  where id = existenciaId ; 
   
  
  select 100 as _result ,  'ok' as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_devolver_producto_nota_debito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_devolver_producto_nota_debito`( in _id_linea_devolucion int , in _cnt  DECIMAL(16,2) )
BEGIN
  declare existenciaId , _movimiento int ;
  declare cntDevolucion decimal(10 , 2 );  
     DECLARE errorCode INT;
   declare  _nombre_esta ,  _descripcion_esta ,  _idDocumentoFinal text;
    declare    v_idCCntCxPagar, v_idCCnttIvaCompra,  v_idCCntCajaGeneral ,  v_idCCntCompra , _idTercero , p_idDocumento, _idUsuario int;
              
    DECLARE errorMessage VARCHAR(255); 
    declare _total , _iva , _total_S_iva decimal(16,2) ;
       -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 errorCode = MYSQL_ERRNO, errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON 
        select errorCode as _result , errorMessage as msg ; 
    END;   
    
   
    
   SELECT ( (presioVenta - IVA ) *  _cnt  ) as total_sin_iva , 
   ( ( IVA ) *   _cnt   ) as total_iva , 
   ( (presioVenta ) *  _cnt   )  total  , cant_real_descontada , id_existencia , orden
  into   _total_S_iva , _iva , _total ,
  cntDevolucion , existenciaId , p_idDocumento
 FROM documentos_listado_productos where id  = _id_linea_devolucion ;
  
    select  idCCntCPagar,  idCCntIvaCompra, idCCntCajaGeneral, idCCntCompras ,
                cliente  , nombre , descripcion ,idDocumentoFinal , usuario  
        into  v_idCCntCxPagar, v_idCCnttIvaCompra,  v_idCCntCajaGeneral ,  v_idCCntCompra ,
        _idTercero ,
         _nombre_esta ,  _descripcion_esta ,  _idDocumentoFinal , _idUsuario
    FROM vw_documentos where orden = p_idDocumento;  
    
    
          select coalesce(max(id), 0 )  into _movimiento  
          from cnt_operaciones where idDocumento =p_idDocumento and nombre like '%Nota Debito%';
          select _movimiento;
          if _movimiento = 0 then
            -- select 'operacion cuenta por pagar'
				insert into cnt_operaciones ( 
					   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona)
				values ( _idUsuario ,now() , now(), 
				   concat( 'Opr. auto. POS - Mov. inventario Nota Debito','-Doc => ',_idDocumentoFinal ) ,
				   concat('Documento creado desde Nota Debito : ', _nombre_esta , '-', _descripcion_esta , '- Compra => ',_idDocumentoFinal)
				   ,p_idDocumento , _idTercero ) ;  
                     select max(id)  into _movimiento  
					from cnt_operaciones where idDocumento =p_idDocumento and nombre like '%Nota Debito%';
           
           end if;
           
           	insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntCxPagar , _total ,  0 , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero);
            
           
        --  _total_S_iva , _iva , _total     
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante  , cod_tercero) 
			values
			( v_idCCnttIvaCompra  , 0, _iva , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'nota_credito' , _idTercero );  
            
         /*   insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntCompra  ,0, _total_S_iva  , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  */
           insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			SELECT idCuentaContable , 0 , (     presioSinIVa * cant_real_descontada )  , now() 
            , 'documentos',   _idUsuario ,  now() , _movimiento ,'nota_credito' , _idTercero
				FROM  documentos_listado_productos 
				  left join vw_inv_mst_producto_existencias_resumen 
				  on vw_inv_mst_producto_existencias_resumen.id = documentos_listado_productos.idProducto
			  WHERE   orden = p_idDocumento   and estado_linea_venta = 'D' ;
  
  update documentos_listado_productos 
  set cant_real_descontada = cant_real_descontada - _cnt
   where id  = _id_linea_devolucion ; 
  
   select * from  documentos_listado_productos  
   where id  = _id_linea_devolucion ; 
   
   
  update inv_mst_producto_existencias
  set   cant_actual = cant_actual - _cnt  , 
  compras = compras - _cnt ,
  reversiones = reversiones + _cnt
  where id = existenciaId ; 
   
  
  select 100 as _result ,  'ok' as msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_elemento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_eliminar_elemento`(IN `_user` VARCHAR(150), IN `_TABLA` VARCHAR(150), IN `_DATO` VARCHAR(150), IN `_COLUMNA` VARCHAR(150))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		select 'error al intentar eliminar' AS result LIMIT 1; 
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		select  WARNINGS  AS result LIMIT 1; 
	END; 
	IF _TABLA = '' OR _TABLA IS NULL  then
		SELECT '-1' AS RESULT;
    ELSE
		IF _DATO = '' OR _DATO IS NULL  then
			SELECT '-2' AS RESULT;
		ELSE
			IF _COLUMNA = '' OR _COLUMNA IS NULL  then
				SELECT '-3' AS RESULT;
			ELSE
				set @usuarioIngresado = _user; 
				set @sqlExe = concat_ws(' ','delete from ',_TABLA,'WHERE',_COLUMNA,'=',concat('''',_DATO,''''));
				-- select @sqlExe ;
                PREPARE stmt1 FROM @sqlExe; 
                -- select @sqlExe;
				SET SQL_SAFE_UPDATES = 0;
                EXECUTE stmt1;                 
                select '100' as result;
			END IF; 
        END IF; 
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_generar_abonos_cartera` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_generar_abonos_cartera`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE; 
    DECLARE _idUsuario INT;
    DECLARE _idPersona INT;
    DECLARE v_nombreProducto VARCHAR(255); 
    DECLARE v_total_IVA DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa DECIMAL(10,2); 
    DECLARE v_cant_real_descontada DECIMAL(10,2); 
    
    DECLARE v_total_IVA_g DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa_g DECIMAL(10,2); 
    DECLARE v_total_venta_g DECIMAL(10,2); 
    
    DECLARE v_costo DECIMAL(10,2); 
    declare _movimiento int ; 
    declare _idCuentaContable int ; 
    
    declare   v_idCCntCCobrar,
              v_idCCntCPagar,
              v_idCCntIvaCompra,
              v_idCCnttIvaVenta,
              v_idCCntCostoVenta ,
              v_idCCntVenta int;
    
    declare _idTercero int ; 
    declare _NombreCaja varchar(50) ; 
    declare _tipoDocumento int ; 
    declare _idDocumentoFinal text ; 
    declare _caja int ; 
    
    DECLARE cur CURSOR FOR 
    SELECT nombreProducto,  total_IVA, total_presioSinIVa  , cant_real_descontada ,id_externo_auxiliar  , 0
    FROM  documentos_listado_productos  
    WHERE 
        orden = p_idDocumento 
        and estado_linea_venta = 'C'
        ; 

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;    
    SET done = false;
    
      select  idCCntCCobrar,  idCCnttIvaVenta, idCCntCostoVenta, idCCntVenta ,
            tipoDocumentoFinal , nombreCaja , cliente ,  
             valorParcial , valorIVA , totalFactura , usuario , idDocumentoFinal , caja
        into  v_idCCntCCobrar, v_idCCnttIvaVenta,  v_idCCntCostoVenta ,  v_idCCntVenta , 
             _tipoDocumento , _NombreCaja , _idTercero ,
			  v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g  , _idUsuario , _idDocumentoFinal , _caja
    FROM vw_documentos where orden = p_idDocumento;  
    -- Open the cursor  
     set _movimiento = 0;
    
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO   v_nombreProducto,  v_total_IVA, v_total_presioSinIVa  , v_cant_real_descontada , _idCuentaContable , v_costo ;
        IF done THEN
            LEAVE read_loop;
        END IF;  -- total_presioSinIVa
     --   select  v_nombreProducto,  v_total_IVA, v_total_presioSinIVa  , v_cant_real_descontada , _idCuentaContable , v_costo ;
        if _idCuentaContable > 0 then  
		-- id, 
			insert into   mst_mov_cartera_abonos
			( usuario_creacion,  totalAbonos, id_cartera , comprobante 
            )  
			values
			(   _idUsuario , v_total_presioSinIVa , _idCuentaContable  , p_idDocumento  );
			 
        end if; 
        
    END LOOP;

    -- Close the cursor
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_generar_abonos_credito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_generar_abonos_credito`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE; 
    DECLARE _idUsuario INT;
    DECLARE _idPersona INT;
    DECLARE v_nombreProducto VARCHAR(255); 
    DECLARE v_total_IVA DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa DECIMAL(10,2); 
    DECLARE v_cant_real_descontada   , v_valorPagado     DECIMAL(10,2); 
    DECLARE  v_idMedioDePago  ,     v_cuentaContable int;
    
    
    DECLARE v_referencia VARCHAR(50); 
    DECLARE v_nombre VARCHAR(50);  
    
    DECLARE v_total_IVA_g DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa_g DECIMAL(10,2); 
    DECLARE v_total_venta_g DECIMAL(10,2); 
    
    DECLARE v_costo DECIMAL(10,2); 
    declare _movimiento int ; 
    declare _idCuentaContable int ; 
    declare _nombre_esta , _descripcion_esta text;
    declare   v_idCCntCCobrar,
              v_idCCntCPagar,
              v_idCCntIvaCompra,
              v_idCCnttIvaVenta,
              v_idCCntCostoVenta ,
              v_idCCntVenta ,
              v_idCCntCxPagar, 
              v_idCCnttIvaCompra,
              v_idCCntCajaGeneral ,
              v_idCCntCompra int;
    
    declare _idTercero int ; 
    declare _NombreCaja varchar(50) ; 
    declare _tipoDocumento int ; 
    declare _idDocumentoFinal text ; 
    declare _caja int ; 
     
    DECLARE curMediosPago CURSOR FOR 
    SELECT documentos_pagos.idMedioDePago , valorPagado , referencia, 
    UPPER(vw_medios.nombre) ,  cuentaContable FROM  documentos_pagos
		inner join vw_medios on vw_medios.id = idMedioDePago
		  where documentos_pagos.idDocumento = p_idDocumento  ;   
    
    DECLARE cur CURSOR FOR 
    SELECT nombreProducto,  total_IVA, total_presioSinIVa  , cant_real_descontada ,id_externo_auxiliar  , 0
    FROM  documentos_listado_productos  
    WHERE 
        orden = p_idDocumento 
        and estado_linea_venta = 'C'
        ; 

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;    
    SET done = false;
     
        
        
      select  idCCntCCobrar,  idCCnttIvaVenta, idCCntCostoVenta, idCCntVenta ,
            tipoDocumentoFinal , nombreCaja , cliente ,  
             valorParcial , valorIVA , totalFactura , usuario , idDocumentoFinal , caja
        into  v_idCCntCCobrar, v_idCCnttIvaVenta,  v_idCCntCostoVenta ,  v_idCCntVenta , 
             _tipoDocumento , _NombreCaja , _idTercero ,
			  v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g  , _idUsuario , _idDocumentoFinal , _caja
    FROM vw_documentos where orden = p_idDocumento;  
    
     select  idCCntCPagar,  idCCntIvaCompra, idCCntCajaGeneral, 
             nombre , descripcion   into  v_idCCntCxPagar, v_idCCnttIvaCompra,  v_idCCntCajaGeneral ,  
            _nombre_esta , _descripcion_esta 
    FROM vw_documentos where orden = p_idDocumento;  
    -- Open the cursor  
     set _movimiento = 0;
     insert into cnt_operaciones ( 
		   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona)
		   values ( _idUsuario ,now() , now(), 
		   concat( 'Opr. auto. POS  - Mov. pagos cxp','-Doc => ',_idDocumentoFinal ) ,
		   concat('Documento creado compra => establecimiento : ', _nombre_esta , '-',_descripcion_esta , '-compra=> ',_idDocumentoFinal)
		   ,p_idDocumento , _idTercero ) ;  
	
       select max(id)  into _movimiento  
	   from cnt_operaciones where idDocumento =p_idDocumento;  
       
       
    -- v_total_venta_g
    OPEN curMediosPago;
    read_loop_mp: LOOP
    FETCH curMediosPago INTO   v_idMedioDePago , v_valorPagado , v_referencia, v_nombre ,  v_cuentaContable;
        IF done THEN
            LEAVE read_loop_mp;
        END IF; 
        if v_cuentaContable = 0 then
          set v_cuentaContable = v_idCCntCajaGeneral;
        end if ;
		insert into cnt_transacciones 
		(  id_cuenta,  valor_debito,
                       valor_credito, fecha_transaccion,
		relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante ,cod_tercero) 
		values
		( v_cuentaContable ,  0  , v_valorPagado , now()  , 
		'documentos',   _idUsuario ,  now() , _movimiento ,'Cuenta por Cobrar' , _idTercero); 
    END LOOP;
    -- Close the cursor
    CLOSE curMediosPago;
      SET done = false;
    insert into cnt_transacciones 
		(  id_cuenta,  valor_debito,
                       valor_credito, fecha_transaccion,
		relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante ,cod_tercero) 
		values
		( v_idCCntCxPagar ,  v_total_venta_g  , 0 , now()  , 
		'documentos',   _idUsuario ,  now() , _movimiento ,'Cuenta por Cobrar' , _idTercero); 
    -- ------------------------------------------------------------------------------------------------
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO   v_nombreProducto,  v_total_IVA, v_total_presioSinIVa  , v_cant_real_descontada , _idCuentaContable , v_costo ;
        IF done THEN
            LEAVE read_loop;
        END IF;  -- total_presioSinIVa
   --  select  v_nombreProducto,  v_total_IVA, v_total_presioSinIVa  , v_cant_real_descontada , _idCuentaContable , v_costo ;
         if _idCuentaContable > 0 then  
		-- id, 
			insert into  mst_mov_credito_abonos
			( usuario_creacion,  totalAbonos, id_cartera , comprobante 
            )  
			values
			(   _idUsuario , v_total_presioSinIVa , _idCuentaContable  , p_idDocumento  );
			 
        end if; 
        
    END LOOP;

    -- Close the cursor
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_generar_movimientos_cuenta_inventario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_generar_movimientos_cuenta_inventario`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE; 
    DECLARE _idUsuario INT;
    DECLARE _idPersona , id_resumen_iva INT;
    DECLARE v_nombreProducto VARCHAR(255); 
    DECLARE v_total_IVA DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa , _descuento DECIMAL(16,2); 
    DECLARE v_cant_real_descontada DECIMAL(10,2); 
    
    DECLARE v_total_IVA_g DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa_g DECIMAL(10,2); 
    DECLARE v_total_venta_g DECIMAL(10,2); 
    
    DECLARE v_costo DECIMAL(10,2); 
    declare _movimiento int ; 
    declare _idCuentaContable int ; 
    
    declare   v_idCCntCCobrar,
              v_idCCntCPagar,
              v_idCCntIvaCompra,
              v_idCCnttIvaVenta,
              v_idCCntCostoVenta ,
              v_idCCntVenta ,  
                cuentaRetefuente  , _establecimiento , _cod_vendedor,
              cuentaDescuento int;
    declare fechaDocumento date;
    declare _idTercero int ; 
    declare _NombreCaja varchar(50) ; 
    declare _tipoDocumento int ; 
    declare _idDocumentoFinal text ; 
    declare _caja int ; 
    
    DECLARE cur CURSOR FOR 
    SELECT nombreProducto,  total_IVA, (total_presioSinIVa - total_descuento)  , cant_real_descontada , (vw_inv_mst_producto.idCuentaContable) ,
    (precioCompra * cant_real_descontada)
    FROM  documentos_listado_productos 
      inner join vw_inv_mst_producto on vw_inv_mst_producto.id = documentos_listado_productos.idProducto
    WHERE 
        orden = p_idDocumento 
        and estado_linea_venta = 'A'
        ; 
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; 
    SET done = false;
    
      select  idCCntCCobrar,  idCCnttIvaVenta, idCCntCostoVenta, idCCntVenta ,
            tipoDocumentoFinal , nombreCaja , cliente ,  
             valorParcial  , valorIVA , totalFactura , usuario , idDocumentoFinal , caja , fecha , 
              idRetefuenteVenta ,  idDescuentoVenta , descuento , establecimiento , cod_vendedor
        into  v_idCCntCCobrar, v_idCCnttIvaVenta,  v_idCCntCostoVenta ,  v_idCCntVenta , 
             _tipoDocumento , _NombreCaja , _idTercero ,
			  v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g  , _idUsuario , _idDocumentoFinal , _caja , fechaDocumento ,
                cuentaRetefuente  , cuentaDescuento ,_descuento,  _establecimiento , _cod_vendedor
    FROM vw_documentos where orden = p_idDocumento; 
     
   
        insert into cnt_operaciones ( 
               usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona , vendedor , establecimiento )
        values ( _idUsuario ,now() , now(), 
           concat( 'Opr. auto. POS - Mov. Cnt. por cobrar venta','-Doc => ',_idDocumentoFinal ) ,
           concat('Documento creado desde punto de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
           ,p_idDocumento , _idTercero  , _cod_vendedor , _establecimiento ) ;  
           
          select max(id)  into _movimiento  
          from cnt_operaciones where idDocumento =p_idDocumento;
     
    --   v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g 
    -- genera cuenta por cobrar  
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntCCobrar ,  v_total_venta_g , 0 , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero);
		if _descuento > 0 then 
       --  cuentaDescuento
        	insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( cuentaDescuento ,  _descuento , 0 , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero);
        end if;
         -- genera iva  
         if v_total_IVA_g > 0 then 
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante  , cod_tercero) 
			values
			( v_idCCnttIvaVenta  , 0,  v_total_IVA_g , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
					
					select count(0) into id_resumen_iva from 
					resumen_iva_en_compra_y_venta where 
					mes = month(fechaDocumento)  and  
					anio  =   year(fechaDocumento) ;
                    if id_resumen_iva  = 0 then
                       insert into resumen_iva_en_compra_y_venta (valor_iva_venta ,valor_iva_compra,fecha_creacion,mes ,anio) values (
                       0,0, fechaDocumento , month(fechaDocumento)  ,   year(fechaDocumento)               );
                    end if;
                    select id into id_resumen_iva from 
					resumen_iva_en_compra_y_venta where 
					mes = month(fechaDocumento)  and  
					anio  =   year(fechaDocumento) ;
                    
                    update resumen_iva_en_compra_y_venta set valor_iva_venta = valor_iva_venta + v_total_IVA_g ,
                    fecha_ultimo_insert_venta = fechaDocumento
                    where id = id_resumen_iva;
            end if;
              -- genera venta  
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntVenta  , 0,  v_total_presioSinIVa_g , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
            
           --   v_idCCntCostoVenta ,  
			
    -- Open the cursor 

     set _movimiento = 0;
    
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO   v_nombreProducto,  v_total_IVA, v_total_presioSinIVa  , v_cant_real_descontada , _idCuentaContable , v_costo ;
        IF done THEN
            LEAVE read_loop;
        END IF;  
        if _idCuentaContable > 0 then  
			if _movimiento = 0 then
				insert into cnt_operaciones ( 
					   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
				values ( _idUsuario ,now() , now(), 
				   concat( 'Opr. auto. POS  - Mov. inventario','-Doc => ',_idDocumentoFinal ) ,
				   concat('Documento creado desde punto de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
				   ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;   
				  select max(id)  into _movimiento  
				  from cnt_operaciones where idDocumento =p_idDocumento; 
			 end if;
		-- movimiento valor inventario
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero)  
			values
			( _idCuentaContable , 0 ,v_costo  , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta', _idTercero );
			
		-- _movimiento costo en venta
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero)  
			values
			( v_idCCntCostoVenta , v_costo, 0, now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta', _idTercero );
        end if; 
        
    END LOOP;

    -- Close the cursor
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_generar_movimientos_cuenta_inventario_compra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_generar_movimientos_cuenta_inventario_compra`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE; 
    DECLARE _idUsuario, id_resumen_iva , _idPersona , _id_hst_iva_rete INT;
    DECLARE  _idProducto VARCHAR(10);  
    DECLARE  _cant_real_descontada DECIMAL(10,2);  
    
    DECLARE _descuento_antes,  _iva_antes ,  _retencion_Antes DECIMAL(16,2); 
    DECLARE v_total_IVA_g , _presioVenta , _existencia , _precioCompra, _nuevo_costo , _porc_retefuente , totalDescuentoCompra  , _retefuente DECIMAL(16,2); 
    DECLARE v_total_presioSinIVa_g , v_total_venta_g DECIMAL(10,2); 
    
    DECLARE v_costo , _abono_inicial , _cant_actual DECIMAL(10,2); 
    declare _movimiento , _idCuentaContable ,   _id_existencia int ; 
    declare fechaDocumento date;
    declare   v_idCCntCxPagar,
              v_idCCntCPagar, 
              v_idCCnttIvaCompra,
              v_idCCntCajaGeneral ,
              v_idCuentaReteF ,
              v_id_cuenta_inventario ,
              cuentaRetefuente  ,  _establecimiento , _cod_vendedor,
              cuentaDescuento int;
    
    declare _idTercero int ; 
    declare _nombre_esta varchar(50) ; 
    declare _tipoDocumento , _id_bodega bigint ; 
     
    declare _idDocumentoFinal , _descripcion_esta , _nombre_producto   text ; 
    declare _caja int ; 
    
    
    DECLARE cur CURSOR FOR 
    SELECT coalesce(`cant_actual` , 0 ) , (presioSinIVa * cant_real_descontada ) , idProducto, nombre ,   cant_real_descontada , presioVenta , coalesce(`cant_actual` , 0 )    , precioCompra ,
       case when  coalesce(`cant_actual` , 0 )  <= 0 then presioVenta else
      cast( (( ( presioVenta * cant_real_descontada ) + (coalesce(`cant_actual` , 0 )  * precioCompra ) ) / ( coalesce(`cant_actual` , 0 )  + cant_real_descontada ))   
            AS DECIMAL(16, 2)) end 
            , idCuentaContable
    FROM  documentos_listado_productos 
      inner join vw_inv_mst_producto_existencias_resumen on vw_inv_mst_producto_existencias_resumen.id = documentos_listado_productos.idProducto
    WHERE   orden = p_idDocumento  and estado_linea_venta = 'A' ; 

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    
    
    SET done = false;
      SET SQL_SAFE_UPDATES = 0;
      select porc_retefuente  , retefuente ,
      idCCntCPagar,  idCCntIvaCompra, idCCntCajaGeneral,  
            tipoDocumentoFinal , nombre , descripcion , idBodegaStock , 
                cliente ,  
             (totalFactura - valorIVA ) , valorIVA , totalFactura , usuario , idDocumentoFinal , caja , fecha ,
             idRetefuenteCompra , idDescuentoCompra , descuento ,  establecimiento , cod_vendedor
        into _porc_retefuente  , _retefuente , v_idCCntCxPagar, v_idCCnttIvaCompra,  v_idCCntCajaGeneral ,  
             _tipoDocumento , _nombre_esta , _descripcion_esta , _id_bodega , _idTercero ,
			  v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g  , _idUsuario , _idDocumentoFinal , _caja , fechaDocumento ,
                cuentaRetefuente  , cuentaDescuento , totalDescuentoCompra ,  _establecimiento , _cod_vendedor
    FROM vw_documentos where orden = p_idDocumento;  
    
     
    -- operacion cuenta por pagar
        insert into cnt_operaciones ( 
               usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
        values ( _idUsuario ,now() , now(), 
           concat( 'Opr. auto. POS - Mov. Cnt. por pagar compra','-Doc => ',_idDocumentoFinal ) ,
           concat('Documento creado desde Compras : ', _nombre_esta , '-', _descripcion_esta , '- Compra => ',_idDocumentoFinal)
           ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;  
           
          select max(id)  into _movimiento  
          from cnt_operaciones where idDocumento =p_idDocumento;
      
    -- genera cuenta por pagar   
			insert into cnt_transacciones 
			( descripcion, id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( 'Cuentas por pagar' , v_idCCntCxPagar , 0 ,  v_total_venta_g , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero);
            
          if   totalDescuentoCompra  > 0 then
          -- cuentaDescuento , totalDescuentoCompra
            insert into cnt_transacciones 
			( descripcion, id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( 'Descuento en compra' , cuentaDescuento , 0 ,  totalDescuentoCompra , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero);
            end if     ;
         -- genera iva  
         /*
    DECLARE _descuento_antes,  _iva_antes ,  _retencion_Antes DECIMAL(16,2); _id_hst_iva_rete*/
         select count(0) into _id_hst_iva_rete from 
         documento_IVA_retenciones where orden = p_idDocumento;
         if _id_hst_iva_rete = 0 then
            insert into documento_IVA_retenciones (orden) values (p_idDocumento) ; 
         end if;
         select id , IVA , retencion into _id_hst_iva_rete , _iva_antes ,  _retencion_Antes from 
         documento_IVA_retenciones where orden = p_idDocumento;
         
         if v_total_IVA_g > 0 then 
         
 /*   select 'genera iva  ' ,   v_idCCnttIvaCompra  ,  v_total_IVA_g, 0 , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero;*/
            
			insert into cnt_transacciones 
			(descripcion,  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante  , cod_tercero) 
			values
			('Iva descontable', v_idCCnttIvaCompra  ,  v_total_IVA_g , 0 , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
            -- -----------------------------------------------------------------------------------
            
					select count(0) into id_resumen_iva from 
					resumen_iva_en_compra_y_venta where 
					mes = month(fechaDocumento)  and  
					anio  =   year(fechaDocumento) ;
                    if id_resumen_iva  = 0 then
                       insert into resumen_iva_en_compra_y_venta (valor_iva_venta ,valor_iva_compra,fecha_creacion,mes ,anio) values (
                       0,0, fechaDocumento , month(fechaDocumento)  ,   year(fechaDocumento)               );
                    end if;
                    select id into id_resumen_iva from 
					resumen_iva_en_compra_y_venta where 
					mes = month(fechaDocumento)  and  
					anio  =   year(fechaDocumento) ;
                    
                    update resumen_iva_en_compra_y_venta set valor_iva_compra =   valor_iva_compra + v_total_IVA_g - _iva_antes ,
                    fecha_ultimo_insert_venta = fechaDocumento
                    where id = id_resumen_iva;
            -- -----------------------------------------------------------------------------------
            end if;
              -- genera compra (inventario) 
     /*     select 'genera compra  ' , v_idCuentaReteF  ,v_total_presioSinIVa_g , 0   , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero ;    */ 
		-- validar si el cliente tiene activo el cobro de retefuente en compra y si la base supera la minima
        -- _porc_retefuente  , _retefuente
        if _retefuente > 0 then
           insert into cnt_transacciones 
			( descripcion, id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			(concat('Retefuente ',_porc_retefuente , '%' ) , cuentaRetefuente , 0   ,_retefuente  , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
       end if     ;
           --   v_idCCntCajaGeneral ,  
        --    abono inicial 
            SELECT coalesce(sum(valorPagado),0)  into _abono_inicial FROM documentos_pagos where idDocumento = p_idDocumento; 
             -- genera cuenta por pagar  
           --   select 'abono inicial ' ,_abono_inicial;
             if _abono_inicial > 0 then
             
               -- operacion cuenta por pagar
				insert into cnt_operaciones ( 
					   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
				values ( _idUsuario ,now() , now(), 
				   concat( 'Opr. auto. POS - Mov. abono cuenta por pagar','-Doc => ',_idDocumentoFinal ) ,
				   concat('Documento creado desde Compras : ', _nombre_esta , '-', _descripcion_esta , '- Compra => ',_idDocumentoFinal)
				   ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;  
				   
				  select max(id)  into _movimiento  
				  from cnt_operaciones where idDocumento =p_idDocumento;
             
				insert into cnt_transacciones 
				(descripcion,  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
				relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
				values
				('Abono inicial a cxp', v_idCCntCxPagar ,_abono_inicial ,  0 , now()  , 
				'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero); 
                
                
       -- debes crear la cuenta por pagar en la tabla de cuentas por pagar y generar tambien los pagos iniciales, 
                insert into cnt_transacciones 
				( descripcion ,  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
				relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero)   
                SELECT concat('Abono por ',nombreMedioDePago ) , case cuentaContable when 0 then v_idCCntCajaGeneral else cuentaContable end ,0 ,
                 _abono_inicial  ,  curdate() , 'documentos' ,   _idUsuario  , curdate() ,   _movimiento
                 , 'COMPRA' ,   _idTercero  
                FROM vw_documentos_pagos    where idDocumento = p_idDocumento ;  
            end if;
            
    -- Open the cursor  
                 delete from documentos_compra_datos_productos_aux where orden =  p_idDocumento;
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO _cant_actual , v_total_presioSinIVa_g ,  _idProducto,_nombre_producto , _cant_real_descontada , 
        _presioVenta , _existencia   , _precioCompra , _nuevo_costo , v_id_cuenta_inventario;
        IF done THEN
            LEAVE read_loop;
        END IF;  
        
        -- documentos_compra_datos_productos_aux tabla donde se guardan los valores iniciales antes de ingresar el producto
        -- para que si mas adelante estos se modifican el producto regresa a sus valores iniciales y se le agregan los nuevos
       set _id_existencia = 0; 
       -- _id_bodega _id_existencia
       select count(0) into _id_existencia from  inv_mst_producto_existencias where  id_producto = _idProducto and 
       id_bodega  = _id_bodega ; 
        -- debes validar que exista existencia en la bodega a la que estas apuntando, esta debe ser extraida utilizando el establecimiento
       -- si no existe debes crear el registro en existencia  
       if _id_existencia = 0 then
	       insert into inv_mst_producto_existencias(id_producto , id_bodega  ,ult_mov , usuario_creacion ,
           cant_inicial , compras , cant_actual) values ( _idProducto ,
           _id_bodega , 'Compra inicial' , _idUsuario , _cant_actual ,_cant_real_descontada , _cant_real_descontada 
           );
		else         
      -- debes actualizar la existencia del nuevo producto 
         select id into _id_existencia from  inv_mst_producto_existencias where  id_producto = _idProducto and 
        id_bodega  = _id_bodega ; 
          update inv_mst_producto_existencias set 
          compras = compras + _cant_real_descontada , 
          cant_actual= cant_actual + _cant_real_descontada 
          where id = _id_existencia ;  
	   end if;
       
       
       insert into documentos_compra_datos_productos_aux
       (producto, precioCompraInicial, cantidadInicial, cantInsertada, precioFinal, orden, bodega)
       values (_idProducto , _precioCompra , 0 , _cant_real_descontada , _nuevo_costo, p_idDocumento , _id_bodega   );
       
       
       
       insert into cnt_transacciones 
			( descripcion ,  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( _nombre_producto ,  v_id_cuenta_inventario  ,v_total_presioSinIVa_g , 0   , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
      
       update inv_mst_producto set precioCompra = _nuevo_costo 
       where id = _idProducto; 
    
    END LOOP;

    -- Close the cursor
    CLOSE cur;  
    SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_generar_movimientos_cuenta_pagos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_generar_movimientos_cuenta_pagos`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE; 
    DECLARE _idUsuario INT;
    DECLARE _idPersona INT;
    DECLARE v_idMedioDePago INT;
    DECLARE v_valorPagado DECIMAL(10,2); 
    DECLARE v_sumTrc DECIMAL(10,2); 
    DECLARE v_referencia VARCHAR(50); 
    DECLARE v_nombre VARCHAR(50);  
    DECLARE v_debito VARCHAR(50);  
    DECLARE v_credito VARCHAR(50);  
    DECLARE v_cuentaContable INT ; 
    declare _movimiento int ;  
    declare _idCuentaContable int ; 
    declare _idCuentaContableGasto int ; 
    declare _idTercero int ; 
    declare _NombreCaja varchar(50) ; 
    declare _tipoDocumento , 
          _idCCntCCobrar , 
		   _idCCntCPagar , _establecimiento , _cod_vendedor,
		   _caja ,_cantidadPagos , _cuentaBonos int ; 
    declare   _idDocumentoFinal text; 
    DECLARE cur CURSOR FOR 
    SELECT documentos_pagos.idMedioDePago , valorPagado , referencia, 
    UPPER(vw_medios.nombre) ,  cuentaContable FROM  documentos_pagos
		inner join vw_medios on vw_medios.id = idMedioDePago
		  where documentos_pagos.idDocumento = p_idDocumento  ;  
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    SET done = false; 
    set v_sumTrc = 0;
     SELECT  count(0) into _cantidadPagos FROM  documentos_pagos
		inner join vw_medios on vw_medios.id = idMedioDePago
		  where documentos_pagos.idDocumento = p_idDocumento  ;   
          
    select cuentaContableGastos, cuentaContableEfectivo , tipoDocumentoFinal , nombreCaja , cliente ,  idCCntCCobrar , 
       idCCntCPagar, usuario , idDocumentoFinal , caja ,  establecimiento , cod_vendedor into 
    _idCuentaContableGasto ,_idCuentaContable , _tipoDocumento , _NombreCaja , _idTercero,  _idCCntCCobrar , 
       _idCCntCPagar , 
       _idUsuario , _idDocumentoFinal , _caja,  _establecimiento , _cod_vendedor
    FROM vw_documentos where orden = p_idDocumento;  
     if _tipoDocumento = getIdContadorByName('gastos') then
          insert into cnt_operaciones ( 
		   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
		   values ( _idUsuario ,now() , now(), 
		   concat( 'Opr. auto. POS  - Mov. Gasto','-Doc => ',_idDocumentoFinal ) ,
		   concat('Documento creado desde punto de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
		   ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;  
     else
		insert into cnt_operaciones ( 
		   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
		   values ( _idUsuario ,now() , now(), 
		   concat( 'Opr. auto. POS  - Mov. pagos','-Doc => ',_idDocumentoFinal ) ,
		   concat('Documento creado desde punto de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
		   ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;     
     end if;
       select max(id)  into _movimiento  
	   from cnt_operaciones where idDocumento =p_idDocumento;  
       
    -- Open the cursor
    if _cantidadPagos > 0 then
     SELECT par_id into _cuentaBonos FROM parametros
	where cod_parametro = 'ID_CUENTA_BONOS_EMITIDOS';
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO   v_idMedioDePago , v_valorPagado , v_referencia, v_nombre ,  v_cuentaContable;
        IF done THEN
            LEAVE read_loop;
        END IF; 
        
        if v_nombre = 'EFECTIVO' then
          set v_cuentaContable = _idCuentaContable;
        end if;
        if v_nombre = 'BONOS' then
          set v_cuentaContable = _cuentaBonos;
        end if;
        if v_cuentaContable > 0 then
      
      -- _idCuentaContableGasto
      
           if _tipoDocumento = getIdContadorByName('gastos') then
           -- Gastos
           -- sale de efectivo 
				insert into cnt_transacciones 
				(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
				relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante, cod_tercero) 
				values
				( v_cuentaContable , 0 , v_valorPagado  , now()  , 
				'documentos',   _idUsuario ,  now() , _movimiento ,'gasto' ,_idTercero );
            -- -----------------------------------------------------------------------
            -- entra en gasto
				insert into cnt_transacciones 
				(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
				relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante ,cod_tercero) 
				values
				( _idCuentaContableGasto , v_valorPagado , 0  , now()  , 
				'documentos',   _idUsuario ,  now() , _movimiento ,'gasto' , _idTercero );
           else
           -- entra el dinero  
               if _tipoDocumento = getIdContadorByName('Pagos') then
                 -- sale el dinero del pago
                    insert into cnt_transacciones 
					(  id_cuenta,  valor_debito, valor_credito, fecha_transaccion,
					relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante ,cod_tercero) 
					values
					( v_cuentaContable , 0, v_valorPagado   , now()  , 
					'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero);
				else
                   -- entra el dinero del pago
					insert into cnt_transacciones 
					(  id_cuenta,  valor_debito, valor_credito, fecha_transaccion,
					relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante ,cod_tercero) 
					values
					( v_cuentaContable , v_valorPagado , 0  , now()  , 
					'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero);
				end if;
                set v_sumTrc = v_sumTrc + v_valorPagado;
            end if;
        end if;
        
    END LOOP;
 
    -- Close the cursor
    CLOSE cur;
     end if;
     if v_sumTrc > 0 then
     -- saco de la cuenta por cobrar  
	 if _tipoDocumento = getIdContadorByName('Pagos') then
        set v_cuentaContable = _idCCntCPagar;
        set v_debito = v_sumTrc ;
        set v_credito   = 0 ; 
     else
        set v_cuentaContable = _idCCntCCobrar ; 
        set v_debito = 0 ;
        set v_credito   = v_sumTrc ; 
     end if;
	 insert into cnt_transacciones 
		(  id_cuenta,  valor_debito,
                       valor_credito, fecha_transaccion,
		relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante ,cod_tercero) 
		values
		( v_cuentaContable ,  v_debito  , v_credito  , now()  , 
		'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero); 
  end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_generar_movimientos_devolucion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_generar_movimientos_devolucion`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE; 
    DECLARE _idUsuario INT;
    DECLARE _idPersona INT;
    DECLARE v_nombreProducto VARCHAR(255); 
    DECLARE v_total_IVA DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa DECIMAL(10,2); 
    DECLARE v_cant_real_descontada DECIMAL(10,2); 
    
    DECLARE v_total_IVA_g DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa_g DECIMAL(10,2); 
    DECLARE v_total_venta_g DECIMAL(10,2); 
    
    DECLARE v_costo DECIMAL(10,2); 
    declare _movimiento int ; 
    declare _idCuentaContable int ; 
    
    declare   v_idCCntCCobrar,
              v_idCCntCPagar,
              v_idCCntIvaCompra,
              v_idCCnttIvaVenta,
              v_idCCntCostoVenta , _establecimiento , _cod_vendedor,
              v_idCCntVenta, _cuentaBonos int ;  
    
    declare _idTercero int ; 
    declare _NombreCaja varchar(50) ; 
    declare _tipoDocumento int ; 
    declare _idDocumentoFinal text ; 
    declare _caja int ; 
    
    DECLARE cur CURSOR FOR 
    SELECT nombreProducto,  total_IVA, total_presioSinIVa  , cant_real_descontada , (vw_inv_mst_producto.idCuentaContable) ,
   costo
    FROM  documentos_listado_productos 
      inner join vw_inv_mst_producto on vw_inv_mst_producto.id = documentos_listado_productos.idProducto
    WHERE 
        orden = p_idDocumento 
        and estado_linea_venta = 'A'
        ;  
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE; 
    SELECT par_id into _cuentaBonos FROM parametros
	where cod_parametro = 
	'ID_CUENTA_BONOS_EMITIDOS';
    SET done = false; 
      select  idCCntCCobrar,  idCCnttIvaVenta, idCCntCostoVenta, idCCntVenta ,
            tipoDocumentoFinal , nombreCaja , cliente ,  
             valorParcial , valorIVA , totalFactura , usuario , idDocumentoFinal , caja ,  establecimiento , cod_vendedor
        into  v_idCCntCCobrar, v_idCCnttIvaVenta,  v_idCCntCostoVenta ,  v_idCCntVenta , 
             _tipoDocumento , _NombreCaja , _idTercero ,
			  v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g  , _idUsuario , _idDocumentoFinal , _caja ,  _establecimiento , _cod_vendedor
    FROM vw_documentos where orden = p_idDocumento;  
        insert into cnt_operaciones ( 
               usuario, fechaOperacion, fechaCreacion,
               nombre, 
               descripcion, 
               idDocumento , idPersona, vendedor , establecimiento  )
        values ( _idUsuario ,now() , now(), 
           concat( 'Opr. auto. DEV - Mov. Bono Devolucion en venta','-Doc => ',_idDocumentoFinal ) ,
           concat('Documento creado desde devolucion de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
           ,p_idDocumento , _idTercero , _cod_vendedor , _establecimiento ) ;  
          select max(id)  into _movimiento  
          from cnt_operaciones where idDocumento =p_idDocumento; 
    -- genero bono del cliente
    	insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( _cuentaBonos  , 0 ,  v_total_venta_g, now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'devolucion' , _idTercero);
    -- genera cuenta por cobrar  
		/*	insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntCCobrar , 0 , v_total_venta_g , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero); */ 
         -- genera iva  
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante  , cod_tercero) 
			values
			( v_idCCnttIvaVenta  , v_total_IVA_g , 0,  now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
              -- genera venta  
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntVenta , v_total_presioSinIVa_g , 0    , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );   
           --   v_idCCntCostoVenta ,   
    -- Open the cursor  
     set _movimiento = 0; 
    OPEN cur; 
    read_loop: LOOP
        FETCH cur INTO   v_nombreProducto,  v_total_IVA, v_total_presioSinIVa  , v_cant_real_descontada , _idCuentaContable , v_costo ;
        IF done THEN
            LEAVE read_loop;
        END IF;  
        if _idCuentaContable > 0 then  
			if _movimiento = 0 then
				insert into cnt_operaciones ( 
					   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
				values ( _idUsuario ,now() , now(), 
				   concat( 'Opr. auto. DEV  - Mov. inventario','-Doc => ',_idDocumentoFinal ) ,
				   concat('Documento creado desde punto de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
				   ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;   
				  select max(id)  into _movimiento  
				  from cnt_operaciones where idDocumento =p_idDocumento; 
			 end if;
		-- movimiento valor inventario
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero)  
			values
			( _idCuentaContable  ,v_costo , 0 , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta', _idTercero ); 
		-- _movimiento costo en venta
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero)  
			values
			( v_idCCntCostoVenta, 0 , v_costo, now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta', _idTercero );
        end if;  
    END LOOP; 
    -- Close the cursor
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_generar_movimientos_nota_debito` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_generar_movimientos_nota_debito`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE; 
    DECLARE _idUsuario INT;
    DECLARE _idPersona INT;
    DECLARE v_nombreProducto VARCHAR(255); 
    DECLARE v_total_IVA DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa DECIMAL(10,2); 
    DECLARE v_cant_real_descontada DECIMAL(10,2); 
    
    DECLARE v_total_IVA_g DECIMAL(10,2); 
    DECLARE v_total_presioSinIVa_g DECIMAL(10,2); 
    DECLARE v_total_venta_g DECIMAL(10,2); 
    
    DECLARE v_costo DECIMAL(10,2); 
    declare _movimiento int ; 
    declare _idCuentaContable int ; 
    
    declare   v_idCCntCCobrar,
              v_idCCntCPagar,
              v_idCCntIvaCompra,
              v_idCCnttIvaVenta,
              v_idCCntCostoVenta , _establecimiento , _cod_vendedor,
              v_idCCntVenta, _cuentaBonos int ;  
    
    declare _idTercero int ; 
    declare _NombreCaja varchar(50) ; 
    declare _tipoDocumento int ; 
    declare _idDocumentoFinal text ; 
    declare _caja int ; 
    
    DECLARE cur CURSOR FOR 
    SELECT nombreProducto,  total_IVA, total_presioSinIVa  , cant_real_descontada , (vw_inv_mst_producto.idCuentaContable) ,
   costo
    FROM  documentos_listado_productos 
      inner join vw_inv_mst_producto on vw_inv_mst_producto.id = documentos_listado_productos.idProducto
    WHERE 
        orden = p_idDocumento 
        and estado_linea_venta = 'A'
        ; 

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    
    
    SELECT par_id into _cuentaBonos FROM parametros
	where cod_parametro = 
	'ID_CUENTA_BONOS_EMITIDOS';
    SET done = false;
    
      select  idCCntCCobrar,  idCCnttIvaVenta, idCCntCostoVenta, idCCntVenta ,
            tipoDocumentoFinal , nombreCaja , cliente ,  
             valorParcial , valorIVA , totalFactura , usuario , idDocumentoFinal , caja ,  establecimiento , cod_vendedor
        into  v_idCCntCCobrar, v_idCCnttIvaVenta,  v_idCCntCostoVenta ,  v_idCCntVenta , 
             _tipoDocumento , _NombreCaja , _idTercero ,
			  v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g  , _idUsuario , _idDocumentoFinal , _caja 
              ,  _establecimiento , _cod_vendedor
    FROM vw_documentos where orden = p_idDocumento; 
     
   
        insert into cnt_operaciones ( 
               usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
        values ( _idUsuario ,now() , now(), 
           concat( 'Opr. auto. DEV - Mov. Bono Devolucion en venta','-Doc => ',_idDocumentoFinal ) ,
           concat('Documento creado desde devolucion de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
           ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;  
           
          select max(id)  into _movimiento  
          from cnt_operaciones where idDocumento =p_idDocumento;
     
    --   v_total_presioSinIVa_g , v_total_IVA_g, v_total_venta_g 
    
    -- genero bono del cliente
    	insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( _cuentaBonos  , 0 ,  v_total_venta_g, now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'devolucion' , _idTercero);
    -- genera cuenta por cobrar  
		/*	insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntCCobrar , 0 , v_total_venta_g , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero); */
            
         -- genera iva  
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante  , cod_tercero) 
			values
			( v_idCCnttIvaVenta  , v_total_IVA_g , 0,  now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
              -- genera venta  
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero) 
			values
			( v_idCCntVenta , v_total_presioSinIVa_g , 0    , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta' , _idTercero );  
            
           --   v_idCCntCostoVenta ,  
			
    -- Open the cursor 

     set _movimiento = 0;
    
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO   v_nombreProducto,  v_total_IVA, v_total_presioSinIVa  , v_cant_real_descontada , _idCuentaContable , v_costo ;
        IF done THEN
            LEAVE read_loop;
        END IF;  
        if _idCuentaContable > 0 then  
			if _movimiento = 0 then
				insert into cnt_operaciones ( 
					   usuario, fechaOperacion, fechaCreacion, nombre, descripcion, idDocumento , idPersona, vendedor , establecimiento )
				values ( _idUsuario ,now() , now(), 
				   concat( 'Opr. auto. DEV  - Mov. inventario','-Doc => ',_idDocumentoFinal ) ,
				   concat('Documento creado desde punto de venta => caja : ', _caja , '-',_NombreCaja , '-fact=> ',_idDocumentoFinal)
				   ,p_idDocumento , _idTercero, _cod_vendedor , _establecimiento  ) ;   
				  select max(id)  into _movimiento  
				  from cnt_operaciones where idDocumento =p_idDocumento; 
			 end if;
		-- movimiento valor inventario
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero)  
			values
			( _idCuentaContable  ,v_costo , 0 , now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta', _idTercero );
			
		-- _movimiento costo en venta
			insert into cnt_transacciones 
			(  id_cuenta,  valor_debito,valor_credito, fecha_transaccion,
			relacion_tabla,   usuario, fecha_ingreso,  cod_comprobante, origen_comprobante , cod_tercero)  
			values
			( v_idCCntCostoVenta, 0 , v_costo, now()  , 
			'documentos',   _idUsuario ,  now() , _movimiento ,'venta', _idTercero );
        end if; 
        
    END LOOP;

    -- Close the cursor
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_genera_fechas_pagos_compromisos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_genera_fechas_pagos_compromisos`(`_cuotas` INT, `_intervalo_pagos` INT, `_fecha_obligacion` DATE, `_usuario` VARCHAR(100), `_compromiso` INT, `_tipo_compromiso` CHAR(3))
BEGIN
declare _contador int;
declare _fecha_pago date;
set _contador = 0;
set _fecha_pago = _fecha_obligacion;
while  _cuotas > _contador do 

set _contador = _contador +1;
set _fecha_pago = DATE_ADD( CAST(_fecha_pago AS char), INTERVAL  _intervalo_pagos DAY);
 
INSERT INTO  `fecha_cuotas_creditos`
( 
`usuario`,
`id_compromiso`,
`tipo_compromiso`,
`fecha_max_pago`,
`numero_cuota`)
VALUES
( 
_usuario,
_compromiso,
_tipo_compromiso,
_fecha_pago,
_contador);
end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_id_documentos_por_id_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_id_documentos_por_id_producto`( in id_producto text)
BEGIN
  select orden from 
      vw_documentos_listado_productos_ventas where idProducto = id_producto ; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_inserta_nuevo_contador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_inserta_nuevo_contador`(IN `_codContador` VARCHAR(45), IN `_establecimiento` INT, IN `_tipoContador` INT, 
IN `_desde` INT, IN `_hasta` INT, 
in _resolucion text , 
in _fechaInicio date,
in _fechaFin date,
IN `_usuario` INT
)
BEGIN
declare _id int;
--   fecha, hora, estado, tipoContador, desde, hasta

if _resolucion = '' then
-- id, codContador, establecimiento, contador, contador_real_establecimiento, fecha, hora, estado, tipoContador, desde, hasta, usuario, resolucion, fechaInicioResolucion, fechaFinResolucion
     INSERT INTO  `contadores` (    estado,  codContador   , establecimiento   , tipoContador , desde, hasta, usuario , contador
     ) VALUES(  getEstado('A')   ,  _codContador , _establecimiento , _tipoContador , _desde, _hasta , _usuario , _desde); 
 else  
 -- id, codContador, establecimiento, contador, contador_real_establecimiento, fecha, hora, estado, tipoContador, desde, hasta, usuario, resolucion, fechaInicioResolucion, fechaFinResolucion
     INSERT INTO  `contadores` (    estado,  codContador   , establecimiento   , tipoContador , desde, hasta, usuario , contador , 
     resolucion, fechaInicioResolucion, fechaFinResolucion
     ) VALUES(  getEstado('A')   ,  _codContador , _establecimiento , _tipoContador , _desde, _hasta , _usuario , 
     _desde , _resolucion , _fechaInicio , _fechaFin
     ); 
end if;
     select LAST_INSERT_ID() into _id;
     SET SQL_SAFE_UPDATES = 0;
     update contadores set estado  = getEstado('I')   where 
     establecimiento = _establecimiento and _tipoContador = tipoContador 
     and id <> _id;
     SET SQL_SAFE_UPDATES = 1;
     select 100 as _result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_inserta_tabla_auditoria` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_inserta_tabla_auditoria`(IN `_usuario` VARCHAR(255) CHARSET utf8, IN `_tabla` VARCHAR(255) CHARSET utf8, IN `_campo` VARCHAR(255) CHARSET utf8, IN `_valor_anterior` BLOB, IN `_valor_nuevo` BLOB, IN `_accion` VARCHAR(255) CHARSET utf8)
    NO SQL
    SQL SECURITY INVOKER
    COMMENT 'Inserta en sat_auditoria array IN'
BEGIN    
SET lc_time_names = 'es_MX';

 

INSERT INTO `auditoria`(`usuario`, `fecha_crea`, `tabla`, `campo`, `valor_anterior`, `valor_nuevo`, `accion`) VALUES (
   _usuario,
    NOW(),
    _tabla,
    _campo,
    _valor_anterior,
    _valor_nuevo,
    _accion);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_medida_grupo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_insert_medida_grupo`(IN `_id_tipo_medida` INT, IN `_id_grupo` INT, IN `usuarioIngresado` VARCHAR(150))
BEGIN	
 declare exit handler for 1452
    begin
        select '-1' as result;
    end;

set @usuarioIngresado = usuarioIngresado;
delete from tipo_medida_grupo where id_tipo_medida= _id_tipo_medida and id_grupo = _id_grupo;
insert into tipo_medida_grupo(  id_tipo_medida, id_grupo ) values(_id_tipo_medida,_id_grupo);
select '100' as result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insert_recurso_perfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_insert_recurso_perfil`(IN `_id_perfil` VARCHAR(50), IN `_id_recurso` VARCHAR(50), IN `usuarioIngresado` VARCHAR(150))
BEGIN	
 declare exit handler for 1452
    begin
        select '-1' as result;
    end;

set @usuarioIngresado = usuarioIngresado;
delete from perfil_recurso where id_perfil= _id_perfil and id_recurso = _id_recurso;
insert into perfil_recurso(  id_perfil, id_recurso ) values(_id_perfil,_id_recurso);
select '100' as result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_login`(IN `_usuarios` VARCHAR(45), IN `_pass` TEXT, IN `_key` TEXT)
BEGIN
    declare _count int;
    declare _id_usuarios int;
    
    set _count = 0;
    
    select count(*) , ID into _count , _id_usuarios  from usuarios where 
    usuarios.estado =(select id from     estado_registro where estado = 'A')
    and Login = _usuarios and pass = _pass group by ID;
    
    
    if _count > 0 then
       
		SET autocommit=0;
		START TRANSACTION;        
        SET SQL_SAFE_UPDATES = 0;
		update `session` set estado = (select id from     estado_registro where estado = 'I')  , 
        fecha_hora_fin = now()
        where usuario = _id_usuarios and  
        estado = (select id from     estado_registro where estado_registro.estado = 'A')  ;  
        
        INSERT INTO  `session` ( `nombre`, `usuario`,`key`,`fecha_hora_ini` ) 
        VALUES ( _usuarios,_id_usuarios, _key , now() );
			
        
        COMMIT; 
       set  _count = 0;
	   select count(*) into _count from `session`   
       where usuario = _id_usuarios 
       and  estado = (select id from estado_registro where estado_registro.estado = 'A')  
       and  `key` = _key;
       
       if _count = 0 then
        select '-2' as '_result' ; 
       else
        
    select count(*)   into _count    from usuarios
    inner join perfil_usuario on usuarios.id =  perfil_usuario.id_usuario
    where 
   usuarios.estado =(select id from estado_registro where estado_registro.estado = 'A')
    and Login = _usuarios and pass = _pass  ;
    -- select _count ;
        if _count = 0 then
            select '-3' as '_result' ; 
        else 
          select '100' as '_result', _key as 'llave_session' ,
        usuarios.ID,  '' as Login, Nombre1, Nombre2, Apellido1, Apellido2, nombreCompleto,
        usuarios.estado, usr_registro, Fecha_Registro, Usr_Modif, Fecha_Modif, '' as pass, change_pass, 
        ultimo_ingreso, email as mail ,  id_perfil  ,   Perf_Nombre , ifnull(descripcion , '' ) as descripcion, img
        from usuarios 
         inner join perfil_usuario on usuarios.id =  perfil_usuario.id_usuario
         inner join perfiles on perfiles.id = perfil_usuario.id_perfil
         left join documentos_clientes on documentos_clientes.id =   idPersona   
        where usuarios.ID = _id_usuarios ; 
        end if; 
        end if;
	else
        select '-1' as '_result' ; 
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_procesar_detalle_ordenes_carga` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_procesar_detalle_ordenes_carga`(`_id_cabecera` INT(11), `_pedido` INT(11), `_id_centro` VARCHAR(10), `_centro` VARCHAR(50), `_id_puesto_exp` VARCHAR(15), `_puesto_exp` VARCHAR(50), `_posicion` INT(11), `_id_material` INT(11), `_material` VARCHAR(50), `_cantidad` FLOAT, `_cod_usuario_registro` INT(11))
BEGIN
DECLARE _RETORNO INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		delete from clientes_cabeza_remision where cod_remitente_conse = _id_cabecera;
        delete from clientes_detalle_remision where id_cabecera = _id_cabecera;
		select 'error al ingresar valores a la base de datos clientes_detalle_remision'  AS result LIMIT 1; 
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		delete from clientes_cabeza_remision where cod_remitente_conse = _id_cabecera;
        delete from clientes_detalle_remision where id_cabecera = _id_cabecera;

		select  WARNINGS  AS result LIMIT 1; 
	END;
set @usuarioIngresado = _cod_usuario_registro;
set _RETORNO = -1 ;
	INSERT INTO `clientes_detalle_remision` (`id_cabecera`,`pedido`,`id_centro`,`centro`,`id_puesto_exp`,`puesto_exp`,`posicion`,`id_material`,`material`,`cantidad`)
		VALUES( _id_cabecera ,_pedido ,_id_centro ,_centro ,_id_puesto_exp ,_puesto_exp ,_posicion ,_id_material ,_material ,_cantidad );
	set _RETORNO = 100 ;
    
	SELECT _RETORNO as result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_procesar_ordenes_de_carga` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_procesar_ordenes_de_carga`(`_cod_cliente` VARCHAR(10), `_cod_remitente_conse` INT(10), `_ref_externa` VARCHAR(50), `_cod_ciudad` VARCHAR(45), `_ciudad_destino` VARCHAR(45), `_cod_destinataio` VARCHAR(20), `_destinatario` VARCHAR(45), `_placa` VARCHAR(6), `_cod_cedula` VARCHAR(45), `_cedula` VARCHAR(45), `_cod_transportador` VARCHAR(45), `_transportador` VARCHAR(150), `_fecha_estimada` VARCHAR(10), `_cod_usuario_registro` INT(11), `_estado` VARCHAR(2), `_cod_remision_sap` VARCHAR(45), `_fecha_remisioin_sap` VARCHAR(10), `_proceso` VARCHAR(10))
BEGIN
-- COLLATE utf8_unicode_ci 
DECLARE _RETORNO INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		select 'error  al ingresar las cabecera de ordenes de carga a la base de datos -clientes_cabeza_remision :'  AS result LIMIT 1; 
	END; 
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		select  WARNINGS  AS result LIMIT 1; 
	END; 
set @usuarioIngresado = _cod_usuario_registro;
-- select _cod_cliente ,_ref_externa , _cod_ciudad ,_ciudad_destino ,_cod_destinataio ,_destinatario ,_placa ,_cod_cedula ,_cedula ,_cod_transportador ,_transportador ,_fecha_estimada ,NOW() ,_cod_usuario_registro , 'ER'  ;
 
case _proceso 
 when 'INICIO'
 THEN
 set _RETORNO = 0;
 -- select _cod_cliente ,_ref_externa , _cod_ciudad ,_ciudad_destino ,_cod_destinataio ,_destinatario ,_placa ,_cod_cedula ,_cedula ,_cod_transportador ,_transportador ,_fecha_estimada ,NOW() ,_cod_usuario_registro , 'ER'  ;

 INSERT INTO  `clientes_cabeza_remision`
(`cod_cliente`, 
`ref_externa`, 
`cod_ciudad`,
`ciudad_destino`,
`cod_destinataio`,
`destinatario`,
`placa`,
`cod_cedula`,
`cedula`,
`cod_transportador`,
`transportador`,
`fecha_estimada`,
`fecha_registro`,
`cod_usuario_registro`,
`estado` )
VALUES
(_cod_cliente ,_ref_externa , _cod_ciudad ,_ciudad_destino ,_cod_destinataio ,_destinatario ,_placa ,_cod_cedula ,_cedula ,_cod_transportador ,_transportador ,_fecha_estimada ,NOW() ,_cod_usuario_registro , 'PR'  );
 
-- select _cod_destinataio ,_destinatario ,_placa ,_cod_cedula ,_cedula ,_cod_transportador ,_transportador ,_fecha_estimada ,NOW() ,_cod_usuario_registro ;

SET _RETORNO = last_insert_id();

WHEN 'RECHAZAR'
THEN 
 set _RETORNO = 0;
	UPDATE clientes_cabeza_remision SET estado = 'RE' WHERE cod_remitente_conse = _cod_remitente_conse;
  set _RETORNO = 1;   
    
WHEN 'APROBAR'
THEN
set _RETORNO = 0;
 -- select 'llego',_cod_remitente_conse as '_cod_remitente_conse',_cod_remision_sap as '_cod_remision_sap';
 
	UPDATE clientes_cabeza_remision SET 
    estado = 'AR', 
    cod_remision_sap = _cod_remision_sap , 
    fecha_remisioin_sap = NOW() WHERE cod_remitente_conse = _cod_remitente_conse;
set _RETORNO = 1;   
end CASE;
 
SELECT _RETORNO as result;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_recorrer_documentos_listado_productos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_recorrer_documentos_listado_productos`(IN p_idDocumento INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_id INT;
    DECLARE v_orden INT;
    DECLARE v_tipoDocumento INT;
    DECLARE v_fecha DATE;
    DECLARE v_hora TIME;
    DECLARE v_idProducto INT;
    DECLARE v_nombreProducto VARCHAR(255);
    DECLARE v_presioVenta DECIMAL(10,2);
    DECLARE v_porcent_iva DECIMAL(5,2);
    DECLARE v_presioSinIVa DECIMAL(10,2);
    DECLARE v_IVA DECIMAL(10,2);
    DECLARE v_cantidadVendida INT;
    DECLARE v_descuento DECIMAL(10,2);
    DECLARE v_valorTotal DECIMAL(10,2);
    DECLARE v_usuario INT;

    DECLARE cur CURSOR FOR 
    SELECT 
        id, orden, tipoDocumento, fecha, hora, idProducto, nombreProducto, presioVenta, porcent_iva, 
        presioSinIVa, IVA, cantidadVendida, descuento, valorTotal, usuario 
    FROM 
        documentos_listado_productos 
    WHERE 
        idDocumento = p_idDocumento;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open the cursor
    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO v_id, v_orden, v_tipoDocumento, v_fecha, v_hora, v_idProducto, v_nombreProducto, 
                      v_presioVenta, v_porcent_iva, v_presioSinIVa, v_IVA, v_cantidadVendida, 
                      v_descuento, v_valorTotal, v_usuario;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Process each row
        -- You can add your processing logic here
        SELECT 
            v_id, v_orden, v_tipoDocumento, v_fecha, v_hora, v_idProducto, v_nombreProducto, 
            v_presioVenta, v_porcent_iva, v_presioSinIVa, v_IVA, v_cantidadVendida, 
            v_descuento, v_valorTotal, v_usuario;
    END LOOP;

    -- Close the cursor
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_registro_ultimo_ingreso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_registro_ultimo_ingreso`(IN `_id_usuario` VARCHAR(10))
BEGIN
	update usuarios set ultimo_ingreso = now() where ID = _id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenDevoluciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenDevoluciones`(in _usuario int ,in fechaInicio date , in fechaFin date ,    in _session_id text )
BEGIN
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de devoluciones    ' ) into _desc  ;
     
   SELECT coalesce( sum(cantidadVendida) , 0 )  ,  coalesce( sum(valorTotal), 0) into numTotal , totalVendido FROM vw_documentos_listado_productos_devolucion 
   where fecha between fechaInicio and fechaFin 
   -- and idCategoria = idPrd group by idCategoria   
   ;
 --  select numTotal , totalVendido , fechaInicio , fechaFin ;
   -- mayor vendido 
   select cantidadVendida , valorTotal , idProducto , nombreProducto 
   into  _cantidadVendidaMa , _valorTotalMa , _idProductoMa , _nombreProductoMa
   from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , 
    idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_devolucion INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin   
   group by  idProducto ) as prdCatVent  
    ORDER BY cantidadVendida DESC
    LIMIT 1; 
    -- menor vendido 
      select cantidadVendida , valorTotal , idProducto , nombreProducto into 
      _cantidadVendidaMe , _valorTotalMe , _idProductoMe , _nombreProductoMe 
      from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_devolucion INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin 
   group by   idProducto ) as prdCatVent  
    ORDER BY cantidadVendida asc
    LIMIT 1; 
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin
		)
		SELECT _session_id ,  date , 0 , 0
		FROM date_range;
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_devolucion 
   where fecha between fechaInicio and fechaFin group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
       -- Obtener la fecha con el menor scv
     SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
   /*
    declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
 */ 
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'cantidad', cantidad,  
            'total', total,
            'idProducto', idProducto,   
            'nombre', nombre
        )
    ) AS productos
FROM (
    SELECT 
        SUM(cantidadVendida) AS cantidad,
        SUM(valorTotal) AS total,
        idProducto,
        inv_mst_producto.nombre
    FROM vw_documentos_listado_productos_devolucion 
    INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
    WHERE fecha BETWEEN  fechaInicio and fechaFin  
    GROUP BY  idProducto
) AS subquery ) 
      SELECT   
       JSON_OBJECT(
       'reporte' , 'devolucion' , 
       'productos' , productos , 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'productoMasVendido',
        JSON_OBJECT( 'cantidad', _cantidadVendidaMa , 'total',_valorTotalMa, 'idProducto',_idProductoMa ,'nombre', _nombreProductoMa ),
       'productoMenosVendido',
        JSON_OBJECT('cantidad', _cantidadVendidaMe ,'total', _valorTotalMe  ,'idProducto', _idProductoMe ,'nombre', _nombreProductoMe),
       'menorDiaVenta' ,
      JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' ,  
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento inner join 
     ArrPrdQry on    idSession = session_id
    where session_id = _session_id; 
     delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenVentas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenVentas`(in _usuario int ,in fechaInicio date , in fechaFin date ,    in _session_id text )
BEGIN
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de ventas    ' ) into _desc  ;
     
   SELECT coalesce( sum(cantidadVendida) , 0 )  ,  coalesce( sum(valorTotal), 0) into numTotal , totalVendido FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin 
   -- and idCategoria = idPrd group by idCategoria   
   ;
 --  select numTotal , totalVendido , fechaInicio , fechaFin ;
   -- mayor vendido 
   select cantidadVendida , valorTotal , idProducto , nombreProducto 
   into  _cantidadVendidaMa , _valorTotalMa , _idProductoMa , _nombreProductoMa
   from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , 
    idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin   
   group by  idProducto ) as prdCatVent  
    ORDER BY cantidadVendida DESC
    LIMIT 1; 
    -- menor vendido 
      select cantidadVendida , valorTotal , idProducto , nombreProducto into 
      _cantidadVendidaMe , _valorTotalMe , _idProductoMe , _nombreProductoMe 
      from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin 
   group by   idProducto ) as prdCatVent  
    ORDER BY cantidadVendida asc
    LIMIT 1; 
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin
		)
		SELECT _session_id ,  date , 0 , 0
		FROM date_range;
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
       -- Obtener la fecha con el menor scv
     SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
   /*
    declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
 */ 
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'cantidad', cantidad,  
            'total', total,
            'idProducto', idProducto,   
            'nombre', nombre
        )
    ) AS productos
FROM (
    SELECT 
        SUM(cantidadVendida) AS cantidad,
        SUM(valorTotal) AS total,
        idProducto,
        inv_mst_producto.nombre
    FROM vw_documentos_listado_productos_ventas 
    INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
    WHERE fecha BETWEEN  fechaInicio and fechaFin  
    GROUP BY  idProducto
) AS subquery ) 
      SELECT   
       JSON_OBJECT(
       'productos' , productos , 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'productoMasVendido',
        JSON_OBJECT( 'cantidad', _cantidadVendidaMa , 'total',_valorTotalMa, 'idProducto',_idProductoMa ,'nombre', _nombreProductoMa ),
       'productoMenosVendido',
        JSON_OBJECT('cantidad', _cantidadVendidaMe ,'total', _valorTotalMe  ,'idProducto', _idProductoMe ,'nombre', _nombreProductoMe),
       'menorDiaVenta' ,
      JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' ,  
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento inner join 
     ArrPrdQry on    idSession = session_id
    where session_id = _session_id; 
     delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenVentasCategorias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenVentasCategorias`(in _usuario int ,in fechaInicio date , in fechaFin date ,  in idPrd text ,  in _session_id text )
BEGIN
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de ventas filtrado por la categoria : ' , nombre) into _desc 
     from inv_categorias where id = idPrd;
     
   SELECT sum(cantidadVendida) ,  sum(valorTotal) into numTotal , totalVendido FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and idCategoria = idPrd group by idCategoria    ;
   
   -- mayor vendido 
   select cantidadVendida , valorTotal , idProducto , nombreProducto 
   into  _cantidadVendidaMa , _valorTotalMa , _idProductoMa , _nombreProductoMa
   from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and vw_documentos_listado_productos_ventas.idCategoria = idPrd 
   group by vw_documentos_listado_productos_ventas.idCategoria , idProducto ) as prdCatVent  
    ORDER BY cantidadVendida DESC
    LIMIT 1; 
    -- menor vendido 
      select cantidadVendida , valorTotal , idProducto , nombreProducto into 
      _cantidadVendidaMe , _valorTotalMe , _idProductoMe , _nombreProductoMe 
      from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and vw_documentos_listado_productos_ventas.idCategoria = idPrd 
   group by vw_documentos_listado_productos_ventas.idCategoria , idProducto ) as prdCatVent  
    ORDER BY cantidadVendida asc
    LIMIT 1; 
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin
		)
		SELECT _session_id ,  date , 0 , 0
		FROM date_range;
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and idCategoria = idPrd group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
       -- Obtener la fecha con el menor scv
    SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
   /*
    declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
 */ 
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'cantidad', cantidad,  
            'total', total,
            'idProducto', idProducto,   
            'nombre', nombre
        )
    ) AS productos
FROM (
    SELECT 
        SUM(cantidadVendida) AS cantidad,
        SUM(valorTotal) AS total,
        idProducto,
        inv_mst_producto.nombre
    FROM vw_documentos_listado_productos_ventas 
    INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
    WHERE fecha BETWEEN  fechaInicio and fechaFin  
      AND vw_documentos_listado_productos_ventas.idCategoria = idPrd
    GROUP BY vw_documentos_listado_productos_ventas.idCategoria, idProducto
) AS subquery ) 
      SELECT   
       JSON_OBJECT(
       'productos' , productos , 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'productoMasVendido',
        JSON_OBJECT( 'cantidad', _cantidadVendidaMa , 'total',_valorTotalMa, 'idProducto',_idProductoMa ,'nombre', _nombreProductoMa ),
       'productoMenosVendido',
        JSON_OBJECT('cantidad', _cantidadVendidaMe ,'total', _valorTotalMe  ,'idProducto', _idProductoMe ,'nombre', _nombreProductoMe),
       'menorDiaVenta' ,
      JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' , 
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento inner join 
     ArrPrdQry on    idSession = session_id
    where session_id = _session_id; 
     delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenVentasCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenVentasCliente`(in _usuario int ,in fechaInicio date , in fechaFin date ,  in idPrd text ,  in _session_id text )
BEGIN  
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
 
     SET SQL_SAFE_UPDATES = 0; 
     
     SELECT CONCAT('Reporte de ventas realizadas por el (los) cliente(s) : ', GROUP_CONCAT(DISTINCT nombreCompleto SEPARATOR ', ')) into _desc 
 FROM mst_per_clientes  c inner join vw_obj_ventas on vw_obj_ventas.cliente = c.id  and  FIND_IN_SET (orden , idPrd );
  --   select _desc;
   SELECT sum(cantidadVendida) ,  sum(valorTotal) into numTotal , totalVendido FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and FIND_IN_SET (orden , idPrd )      ;
   -- SELECT* FROM vw_documentos_listado_productos_ventas 
   -- where fecha between fechaInicio and fechaFin and  FIND_IN_SET (orden , idPrd )  ;
   
   -- mayor vendido 
   select cantidadVendida , valorTotal , idProducto , nombreProducto 
   into  _cantidadVendidaMa , _valorTotalMa , _idProductoMa , _nombreProductoMa
   from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and    FIND_IN_SET (orden , idPrd )
   group by   idProducto ) as prdCatVent  
    ORDER BY cantidadVendida DESC
    LIMIT 1; 
    -- menor vendido 
      select cantidadVendida , valorTotal , idProducto , nombreProducto into 
      _cantidadVendidaMe , _valorTotalMe , _idProductoMe , _nombreProductoMe 
      from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and  FIND_IN_SET (orden , idPrd )
   group by   idProducto ) as prdCatVent  
    ORDER BY cantidadVendida asc
    LIMIT 1; 
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
       
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin )
            SELECT _session_id ,  date , 0 , 0
		FROM date_range;
        
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and  FIND_IN_SET (orden , idPrd )  group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
    SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'cantidad', cantidad,  
            'total', total,
            'idProducto', idProducto,   
            'nombre', nombre
        )
    ) AS productos
FROM (
    SELECT 
        SUM(cantidadVendida) AS cantidad,
        SUM(valorTotal) AS total,
        idProducto,
        inv_mst_producto.nombre
    FROM vw_documentos_listado_productos_ventas 
    INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
    WHERE fecha BETWEEN  fechaInicio and fechaFin  
      AND FIND_IN_SET (orden , idPrd )  
    GROUP BY  idProducto
) AS subquery ) 
      SELECT   
       JSON_OBJECT(
       'productos' , productos , 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'productoMasVendido',
        JSON_OBJECT( 'cantidad', _cantidadVendidaMa , 'total',_valorTotalMa, 'idProducto',_idProductoMa ,'nombre', _nombreProductoMa ),
       'productoMenosVendido',
        JSON_OBJECT('cantidad', _cantidadVendidaMe ,'total', _valorTotalMe  ,'idProducto', _idProductoMe ,'nombre', _nombreProductoMe),
       'menorDiaVenta' ,
      JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' , 
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento inner join 
     ArrPrdQry on    idSession = session_id
    where session_id = _session_id; 
   delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenVentasHoras` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenVentasHoras`(in _usuario int ,in fechaInicio date , in fechaFin date ,  
in horaini time , in horaFin time ,  
  in _session_id text )
BEGIN
  declare nombreUsuario , _desc 
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de ventas entre las ' ,  horaini , ' y ',  horaFin ) into _desc  ;
   --  select _desc;
   SELECT coalesce( sum(cantidadVendida) , 0 )  ,  coalesce( sum(valorTotal), 0) into numTotal , totalVendido FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and hora  between horaini and horaFin 
   -- and idCategoria = idPrd group by idCategoria   
   ;
 --  select numTotal , totalVendido , fechaInicio , fechaFin ;
   -- mayor vendido 
   select cantidadVendida , valorTotal , idProducto , nombreProducto 
   into  _cantidadVendidaMa , _valorTotalMa , _idProductoMa , _nombreProductoMa
   from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , 
    idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin    and hora  between horaini and horaFin 
   group by  idProducto ) as prdCatVent  
    ORDER BY cantidadVendida DESC
    LIMIT 1; 
    -- menor vendido 
      select cantidadVendida , valorTotal , idProducto , nombreProducto into 
      _cantidadVendidaMe , _valorTotalMe , _idProductoMe , _nombreProductoMe 
      from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and hora  between horaini and horaFin 
   group by   idProducto ) as prdCatVent  
    ORDER BY cantidadVendida asc
    LIMIT 1; 
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin
		)
		SELECT _session_id ,  date , 0 , 0
		FROM date_range;
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin  and hora  between horaini and horaFin  group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
       -- Obtener la fecha con el menor scv
     SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
   /*
    declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
 */ 
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'cantidad', cantidad,  
            'total', total,
            'idProducto', idProducto,   
            'nombre', nombre
        )
    ) AS productos
FROM (
    SELECT 
        SUM(cantidadVendida) AS cantidad,
        SUM(valorTotal) AS total,
        idProducto,
        inv_mst_producto.nombre
    FROM vw_documentos_listado_productos_ventas 
    INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
    WHERE fecha BETWEEN  fechaInicio and fechaFin   and hora  between horaini and horaFin 
    GROUP BY  idProducto
) AS subquery ) 
      SELECT   
       JSON_OBJECT(
       'productos' , productos , 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'productoMasVendido',
        JSON_OBJECT( 'cantidad', _cantidadVendidaMa , 'total',_valorTotalMa, 'idProducto',_idProductoMa ,'nombre', _nombreProductoMa ),
       'productoMenosVendido',
        JSON_OBJECT('cantidad', _cantidadVendidaMe ,'total', _valorTotalMe  ,'idProducto', _idProductoMe ,'nombre', _nombreProductoMe),
       'menorDiaVenta' ,
      JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' ,  
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento inner join 
     ArrPrdQry on    idSession = session_id
    where session_id = _session_id; 
     delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenVentasProductos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenVentasProductos`(in _usuario int ,in fechaInicio date , in fechaFin date ,  in idPrd text ,  in _session_id text )
BEGIN
  declare nombreUsuario, _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
      select concat( 'Reporte de ventas filtrado por el producto : ' , nombre) into _desc 
     from inv_mst_producto  where id = idPrd;
     
   SELECT sum(cantidadVendida) ,  sum(valorTotal) into numTotal , totalVendido FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and idProducto = idPrd group by idProducto    ;
   
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin
		)
		SELECT _session_id ,  date , 0 , 0
		FROM date_range;
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and idProducto = idPrd group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
       -- Obtener la fecha con el menor scv
     SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
      SELECT 
       JSON_OBJECT(
       'usuarioGenerador' , nombreUsuario, 
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'menorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' , 
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento where session_id = _session_id; 
    delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenVentasUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenVentasUsuario`(in _usuario int ,in fechaInicio date , in fechaFin date ,  in idPrd text ,  in _session_id text )
BEGIN 
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de ventas filtrado por el cajero : ' , nombreCompleto) into _desc  
     from usuarios where ID = idPrd;
     
   SELECT sum(cantidadVendida) ,  sum(valorTotal) into numTotal , totalVendido FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and usuarioCaja = idPrd group by usuarioCaja    ;
   
   -- mayor vendido 
   select cantidadVendida , valorTotal , idProducto , nombreProducto 
   into  _cantidadVendidaMa , _valorTotalMa , _idProductoMa , _nombreProductoMa
   from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and usuarioCaja = idPrd 
   group by usuarioCaja, idProducto ) as prdCatVent  
    ORDER BY cantidadVendida DESC
    LIMIT 1; 
    -- menor vendido 
      select cantidadVendida , valorTotal , idProducto , nombreProducto into 
      _cantidadVendidaMe , _valorTotalMe , _idProductoMe , _nombreProductoMe 
      from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and usuarioCaja = idPrd 
   group by usuarioCaja , idProducto ) as prdCatVent  
    ORDER BY cantidadVendida asc
    LIMIT 1; 
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin
		)
		SELECT _session_id ,  date , 0 , 0
		FROM date_range;
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and usuarioCaja = idPrd group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
       -- Obtener la fecha con el menor scv
    SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
    
   /*
    declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
 */ 
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'cantidad', cantidad,  
            'total', total,
            'idProducto', idProducto,   
            'nombre', nombre
        )
    ) AS productos
FROM (
    SELECT 
        SUM(cantidadVendida) AS cantidad,
        SUM(valorTotal) AS total,
        idProducto,
        inv_mst_producto.nombre
    FROM vw_documentos_listado_productos_ventas 
    INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
    WHERE fecha BETWEEN  fechaInicio and fechaFin  
      AND usuarioCaja = idPrd
    GROUP BY usuarioCaja, idProducto
) AS subquery ) 
      SELECT   
       JSON_OBJECT(
       'productos' , productos , 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'productoMasVendido',
        JSON_OBJECT( 'cantidad', _cantidadVendidaMa , 'total',_valorTotalMa, 'idProducto',_idProductoMa ,'nombre', _nombreProductoMa ),
       'productoMenosVendido',
        JSON_OBJECT('cantidad', _cantidadVendidaMe ,'total', _valorTotalMe  ,'idProducto', _idProductoMe ,'nombre', _nombreProductoMe),
       'menorDiaVenta' ,
      JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' , 
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento inner join 
     ArrPrdQry on    idSession = session_id
    where session_id = _session_id; 
    delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumenVentasVendedor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumenVentasVendedor`(in _usuario int ,in fechaInicio date , in fechaFin date ,  in idPrd int ,  in _session_id text )
BEGIN  
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  totalVendido , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de ventas realizadas por el empleado : ' , nombreCompleto) into _desc 
     from vw_mst_per_empleados where id = idPrd;
     
   SELECT sum(cantidadVendida) ,  sum(valorTotal) into numTotal , totalVendido FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and cod_vendedor = idPrd group by cod_vendedor    ;
   
   -- mayor vendido 
   select cantidadVendida , valorTotal , idProducto , nombreProducto 
   into  _cantidadVendidaMa , _valorTotalMa , _idProductoMa , _nombreProductoMa
   from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and cod_vendedor = idPrd 
   group by cod_vendedor , idProducto ) as prdCatVent  
    ORDER BY cantidadVendida DESC
    LIMIT 1; 
    -- menor vendido 
      select cantidadVendida , valorTotal , idProducto , nombreProducto into 
      _cantidadVendidaMe , _valorTotalMe , _idProductoMe , _nombreProductoMe 
      from (
    SELECT  sum(cantidadVendida) as cantidadVendida ,  sum(valorTotal) as valorTotal , idProducto , inv_mst_producto.nombre as nombreProducto 
  FROM vw_documentos_listado_productos_ventas INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
   where fecha between fechaInicio and fechaFin  and cod_vendedor = idPrd 
   group by cod_vendedor , idProducto ) as prdCatVent  
    ORDER BY cantidadVendida asc
    LIMIT 1; 
  
       DELETE FROM ventas_del_dia_procedimiento WHERE session_id = _session_id;
       
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin )
            SELECT _session_id ,  date , 0 , 0
		FROM date_range;
        
   --  select * from    ventas_del_dia_procedimiento ; 

     update ventas_del_dia_procedimiento inner join 
     ( SELECT fecha as fechaVenta ,  sum(cantidadVendida) scv ,  sum(valorTotal) svt  FROM vw_documentos_listado_productos_ventas 
   where fecha between fechaInicio and fechaFin and cod_vendedor = idPrd group by fecha  ) as prdVenta on 
           prdVenta.fechaVenta = ventas_del_dia_procedimiento.fecha
           set total = svt , cnt = scv 
           where ventas_del_dia_procedimiento.session_id = _session_id; 
 
    SELECT fecha, cnt, total
    INTO fechaMenorCantidad, menorCantidad, menorValorTotal
    FROM ventas_del_dia_procedimiento where cnt > 0 and session_id = _session_id  
    ORDER BY cnt ASC
    LIMIT 1;   
    
     SELECT fecha, cnt, total
    INTO fechaMayorCantidad, mayorCantidad, mayorValorTotal
    FROM ventas_del_dia_procedimiento where  session_id = _session_id  
    ORDER BY cnt DESC
    LIMIT 1; 
    
   /*
    declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
 */ 
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'cantidad', cantidad,  
            'total', total,
            'idProducto', idProducto,   
            'nombre', nombre
        )
    ) AS productos
FROM (
    SELECT 
        SUM(cantidadVendida) AS cantidad,
        SUM(valorTotal) AS total,
        idProducto,
        inv_mst_producto.nombre
    FROM vw_documentos_listado_productos_ventas 
    INNER JOIN inv_mst_producto ON inv_mst_producto.id = idProducto
    WHERE fecha BETWEEN  fechaInicio and fechaFin  
      AND cod_vendedor = idPrd
    GROUP BY cod_vendedor, idProducto
) AS subquery ) 
      SELECT   
       JSON_OBJECT(
       'productos' , productos , 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadVendida',numTotal ,'totalVenta', totalVendido ,
       'productoMasVendido',
        JSON_OBJECT( 'cantidad', _cantidadVendidaMa , 'total',_valorTotalMa, 'idProducto',_idProductoMa ,'nombre', _nombreProductoMa ),
       'productoMenosVendido',
        JSON_OBJECT('cantidad', _cantidadVendidaMe ,'total', _valorTotalMe  ,'idProducto', _idProductoMe ,'nombre', _nombreProductoMe),
       'menorDiaVenta' ,
      JSON_OBJECT(
            'fecha', fechaMenorCantidad,
            'totalVendido', menorValorTotal,
            'cantidad', menorCantidad
        ),
          'mayorDiaVenta' ,
       JSON_OBJECT(
            'fecha', fechaMayorCantidad,
            'totalVendido', mayorValorTotal,
            'cantidad', mayorCantidad
        ),
       'resumen' , 
      JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', fecha,
            'totalVendido', total,
            'cantidad', cnt
        ))
    ) AS resumenVentas
    FROM ventas_del_dia_procedimiento inner join 
     ArrPrdQry on    idSession = session_id
    where session_id = _session_id; 
   delete from  ventas_del_dia_procedimiento where session_id = _session_id; 
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumen_cuentas_por_cobrar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumen_cuentas_por_cobrar`(in _usuario int ,in fechaInicio date , in fechaFin date ,    in _session_id text )
BEGIN
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare numCreditos int;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal, totalMenosV, totalMasV , 
   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial,  t_numero_plazos_vencidos,t_suma_plazos_vencidos  , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de cuentas por cobrar,  Desde ' , fechaInicio , ' hasta ' ,fechaFin ) into _desc  ;
     
   SELECT count(0),  coalesce( sum( valorInicial ) , 0 ), 
coalesce( sum(totalActual ), 0 ),
coalesce( sum(totalAbonos ), 0 ), 
coalesce( sum(abonoInicial ), 0 ),  
coalesce( sum(numero_plazos_vencidos ), 0 ),
coalesce( sum(suma_plazos_vencidos  ) , 0 )   
   into numCreditos ,   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial, 
   t_numero_plazos_vencidos,t_suma_plazos_vencidos FROM vw_mst_mov_cartera 
   where fecha_creacion between fechaInicio and fechaFin   ;
   -- getIdContadorByName('comprobante_cuentas_por_cobrar')   
   
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
            'id_cartera',id_cartera,
			 'usuario_creacion'	,	 nombre_usuario_creacion	,
			 'usuario_edicion'	,	   nombre_usuario_edicion	,
			 'fecha_creacion'	,	 DATE_FORMAT(fecha_creacion , '%Y-%m-%d %H:%i:%s')	,
			 'fecha_actualizacion'	,	 DATE_FORMAT(coalesce(fecha_actualizacion, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 estado	,
			 'totalAbonos'	,	 totalAbonos	,
			 'comprobante'	,	 comprobante	,
			 'descripcion'	,	 descripcion	 
        )
    ) AS abonos
    FROM vw_mst_mov_cartera_abonos
    WHERE fecha_creacion BETWEEN  fechaInicio and fechaFin  ) , 
    ArrPrdQry2 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
			 'fecha_max_pago'	,	 fecha_max_pago	,
			 'fechaPago'	,	 fechaPago	,
			 'numero_cuota'	,	 numero_cuota	,
			 'id_cartera'	,	 id_cartera	,
			 'usuarioCreador'	,	 usuarioCreador	,
			 'usuarioEdicion'	,	 usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 estado	,
			 'estadoCuota'	,	 estadoCuota	,
			 'valorCuota'	,	 valorCuota	,
			 'totalPagado'	,	 totalPagado	,
			 'totalActual'	,	 totalActual	,
			 'ultimoAbono'	,	 ultimoAbono	,
			 'abono',	 abono	
             )
    ) AS cuotas
    FROM mst_mov_cartera_cuotas
    WHERE fecha_max_pago BETWEEN  fechaInicio and fechaFin  ) , 
    ArrPrdQry3 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
			 'fecha_max_pago'	,	 fecha_max_pago	,
			 'fechaPago'	,	 fechaPago	,
			 'numero_cuota'	,	 numero_cuota	,
			 'id_cartera'	,	 id_cartera	,
			 'usuarioCreador'	,	 usuarioCreador	,
			 'usuarioEdicion'	,	 usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT(  fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	  DATE_FORMAT(coalesce( fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 estado	,
			 'estadoCuota'	,	 estadoCuota	,
			 'valorCuota'	,	 valorCuota	,
			 'totalPagado'	,	 totalPagado	,
			 'totalActual'	,	 totalActual	,
			 'ultimoAbono'	,	 ultimoAbono	,
			 'abono',	 abono	
             )
    ) AS cuotas
    FROM mst_mov_cartera_cuotas
    WHERE fecha_max_pago <=  fechaFin  and estadoCuota in ('OUTTIME' , 'OUTTIME_ABONADO' ))  , 
    ArrPrdQry4 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
			 'fecha_max_pago'	,	 fecha_max_pago	,
			 'fechaPago'	,	 fechaPago	,
			 'numero_cuota'	,	 numero_cuota	,
			 'id_cartera'	,	 id_cartera	,
			 'usuarioCreador'	,	 usuarioCreador	,
			 'usuarioEdicion'	,	 usuarioEdicion	,
			 'fechaCreacion'	,  DATE_FORMAT(  fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,  DATE_FORMAT(coalesce( fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	, 
			 'estado'	,	 estado	,
			 'estadoCuota'	,	 estadoCuota	,
			 'valorCuota'	,	 valorCuota	,
			 'totalPagado'	,	 totalPagado	,
			 'totalActual'	,	 totalActual	,
			 'ultimoAbono'	,	 ultimoAbono	,
			 'abono',	 abono	
             )
    ) AS cuotas
    FROM mst_mov_cartera_cuotas
    WHERE fecha_max_pago  =   fechaFin and totalActual > 0 ) 
      
    SELECT   JSON_OBJECT( 
                'descripcion' , _desc , 
                'fechaInicial', fechaInicio   ,   
				'fechaFinal', fechaFin,
				'numCreditos', numCreditos,
				't_valorInicial'	,	t_valorInicial	,
				't_totalActual'	,	 t_totalActual	,
				't_totalAbonos'	,	t_totalAbonos	,
				't_abonoInicial'	,	 t_abonoInicial	,
				't_numero_plazos_vencidos'	,	 t_numero_plazos_vencidos	,
				't_suma_plazos_vencidos' 	,	t_suma_plazos_vencidos ,
                'usuario_generador' , nombreUsuario , 
				'abonos' , ArrPrdQry.abonos ,  
				'cuotas' , ArrPrdQry2.cuotas , 
				'cuotas_vencidas' , ArrPrdQry3.cuotas , 
				'cuotas_a_vencerce' , ArrPrdQry4.cuotas , 
				'creditos' , JSON_ARRAYAGG(
                   JSON_OBJECT(
					'id'	,	id	,
					'usuario_creacion'	,	 usuario_creacion	,
					 'usuario_edicion'	,	 usuario_edicion	,
					 'fecha_creacion'	,	  DATE_FORMAT(  fecha_creacion , '%Y-%m-%d %H:%i:%s')	 ,
					 'fecha_actualizacion'	,	  DATE_FORMAT(   coalesce( fecha_actualizacion	, '0000-00-00') , '%Y-%m-%d %H:%i:%s') ,
					 'estado'	,	 estado	,
					 'valorInicial'	,	 valorInicial	,
					 'totalActual'	,	 totalActual	,
					 'totalAbonos'	,	 totalAbonos	,
					 'abonoInicial'	,	 abonoInicial	,
					 'idTercero'	,	 idTercero	,
                     'terceroNombre', terceroNombre ,
					 'idFacturaVenta'	,	 idFacturaVenta	,
					 'comprobante'	,	 comprobante	,
					 'fecha_ultimo_abono'	,	 fecha_ultimo_abono	,
					 'cuotas'	,	 vw_mst_mov_cartera.cuotas	,
					 'plazos'	,	 plazos	,
					 'numero_plazos_vencidos'	,	 numero_plazos_vencidos	,
					 'suma_plazos_vencidos'	,	 suma_plazos_vencidos	,
					 'descripcion'	,	 descripcion 
                     )
                     )
                     ) as resumenCreditoPorCobrar
				from 
				vw_mst_mov_cartera 
                inner join ArrPrdQry on ArrPrdQry.idSession = _session_id 
                inner join ArrPrdQry2 on ArrPrdQry2.idSession = _session_id  
                inner join ArrPrdQry3 on ArrPrdQry3.idSession = _session_id   
                inner join ArrPrdQry4 on ArrPrdQry4.idSession = _session_id
                where fecha_creacion BETWEEN  fechaInicio and fechaFin  ;  
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumen_cuentas_por_cobrar_por_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumen_cuentas_por_cobrar_por_cliente`(in _usuario int ,in fechaInicio date , in fechaFin date , in _cliente int ,  in _session_id text )
BEGIN
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad , _ffin date ;
  declare numCreditos int;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal, totalMenosV, totalMasV , 
   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial,  t_numero_plazos_vencidos,t_suma_plazos_vencidos  , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe  text;
  /*si idPrd es diferente a vacio*/  
     select concat( 'Reporte de cuentas por cobrar.  Desde ' , fechaInicio , ' hasta ' ,fechaFin , ' cliente : nit ' , numIdentificacion , ' - ' , nombreCompleto ) into _desc
     from mst_per_clientes where mst_per_clientes.id = _cliente ;
      set fechaFin = fechaFin;
    if fechaFin = '9999-12-31' then
       set _ffin = curdate();
     end if;
   SELECT count(0),  coalesce( sum( valorInicial ) , 0 ), 
coalesce( sum(totalActual ), 0 ),
coalesce( sum(totalAbonos ), 0 ), 
coalesce( sum(abonoInicial ), 0 ),  
coalesce( sum(numero_plazos_vencidos ), 0 ),
coalesce( sum(suma_plazos_vencidos  ) , 0 )   
   into numCreditos ,   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial, 
   t_numero_plazos_vencidos,t_suma_plazos_vencidos FROM vw_mst_mov_cartera 
   where date(fecha_creacion) between fechaInicio and fechaFin and _cliente = idTercero  ;
   -- getIdContadorByName('comprobante_cuentas_por_cobrar')   
   
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
     
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	vw_mst_mov_cartera_abonos.id	,
            'id_cartera',vw_mst_mov_cartera_abonos.id_cartera,
			 'usuario_creacion'	,	 vw_mst_mov_cartera_abonos.nombre_usuario_creacion	,
			 'usuario_edicion'	,	   vw_mst_mov_cartera_abonos.nombre_usuario_edicion	,
			 'fecha_creacion'	,	 DATE_FORMAT(vw_mst_mov_cartera_abonos.fecha_creacion , '%Y-%m-%d %H:%i:%s')	,
			 'fecha_actualizacion'	,	 DATE_FORMAT(coalesce(vw_mst_mov_cartera_abonos.fecha_actualizacion, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 vw_mst_mov_cartera_abonos.estado	,
			 'totalAbonos'	,	 vw_mst_mov_cartera_abonos.totalAbonos	,
			 'comprobante'	,	 vw_mst_mov_cartera_abonos.comprobante	,
			 'descripcion'	,	 vw_mst_mov_cartera_abonos.descripcion	 
        )
    ) AS abonos
    FROM vw_mst_mov_cartera_abonos inner join 
    vw_mst_mov_cartera on   _cliente = idTercero  and id_cartera = vw_mst_mov_cartera.id 
    where date(vw_mst_mov_cartera_abonos.fecha_creacion) between fechaInicio and fechaFin
    ) , 
    ArrPrdQry2 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	mst_mov_cartera_cuotas.id	,
			 'fecha_max_pago'	,	 mst_mov_cartera_cuotas.fecha_max_pago	,
			 'fechaPago'	,	 mst_mov_cartera_cuotas.fechaPago	,
			 'numero_cuota'	,	 mst_mov_cartera_cuotas.numero_cuota	,
			 'id_cartera'	,	 mst_mov_cartera_cuotas.id_cartera	,
			 'usuarioCreador'	,	 mst_mov_cartera_cuotas.usuarioCreador	,
			 'usuarioEdicion'	,	 mst_mov_cartera_cuotas.usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( mst_mov_cartera_cuotas.fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( mst_mov_cartera_cuotas.fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 mst_mov_cartera_cuotas.estado	,
			 'estadoCuota'	,	 mst_mov_cartera_cuotas.estadoCuota	,
			 'valorCuota'	,	 mst_mov_cartera_cuotas.valorCuota	,
			 'totalPagado'	,	 mst_mov_cartera_cuotas.totalPagado	,
			 'totalActual'	,	 mst_mov_cartera_cuotas.totalActual	,
			 'ultimoAbono'	,	 mst_mov_cartera_cuotas.ultimoAbono	,
			 'abono',	 mst_mov_cartera_cuotas.abono	
             )
    ) AS cuotas
    FROM mst_mov_cartera_cuotas
    inner join 
    vw_mst_mov_cartera on   _cliente = idTercero  and id_cartera = vw_mst_mov_cartera.id
    WHERE date(fecha_max_pago) BETWEEN  fechaInicio and fechaFin  ) , 
    ArrPrdQry3 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
             'id'	,	mst_mov_cartera_cuotas.id	,
			 'fecha_max_pago'	,	 mst_mov_cartera_cuotas.fecha_max_pago	,
			 'fechaPago'	,	 mst_mov_cartera_cuotas.fechaPago	,
			 'numero_cuota'	,	 mst_mov_cartera_cuotas.numero_cuota	,
			 'id_cartera'	,	 mst_mov_cartera_cuotas.id_cartera	,
			 'usuarioCreador'	,	 mst_mov_cartera_cuotas.usuarioCreador	,
			 'usuarioEdicion'	,	 mst_mov_cartera_cuotas.usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( mst_mov_cartera_cuotas.fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( mst_mov_cartera_cuotas.fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 mst_mov_cartera_cuotas.estado	,
			 'estadoCuota'	,	 mst_mov_cartera_cuotas.estadoCuota	,
			 'valorCuota'	,	 mst_mov_cartera_cuotas.valorCuota	,
			 'totalPagado'	,	 mst_mov_cartera_cuotas.totalPagado	,
			 'totalActual'	,	 mst_mov_cartera_cuotas.totalActual	,
			 'ultimoAbono'	,	 mst_mov_cartera_cuotas.ultimoAbono	,
			 'abono',	 mst_mov_cartera_cuotas.abono	
             )
    ) AS cuotas
    FROM mst_mov_cartera_cuotas 
    inner join 
    vw_mst_mov_cartera on   _cliente = idTercero  and id_cartera = vw_mst_mov_cartera.id
    WHERE date(fecha_max_pago) <=  fechaFin  and estadoCuota in ('OUTTIME' , 'OUTTIME_ABONADO' ))  , 
    ArrPrdQry4 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	mst_mov_cartera_cuotas.id	,
			 'fecha_max_pago'	,	 mst_mov_cartera_cuotas.fecha_max_pago	,
			 'fechaPago'	,	 mst_mov_cartera_cuotas.fechaPago	,
			 'numero_cuota'	,	 mst_mov_cartera_cuotas.numero_cuota	,
			 'id_cartera'	,	 mst_mov_cartera_cuotas.id_cartera	,
			 'usuarioCreador'	,	 mst_mov_cartera_cuotas.usuarioCreador	,
			 'usuarioEdicion'	,	 mst_mov_cartera_cuotas.usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( mst_mov_cartera_cuotas.fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( mst_mov_cartera_cuotas.fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 mst_mov_cartera_cuotas.estado	,
			 'estadoCuota'	,	 mst_mov_cartera_cuotas.estadoCuota	,
			 'valorCuota'	,	 mst_mov_cartera_cuotas.valorCuota	,
			 'totalPagado'	,	 mst_mov_cartera_cuotas.totalPagado	,
			 'totalActual'	,	 mst_mov_cartera_cuotas.totalActual	,
			 'ultimoAbono'	,	 mst_mov_cartera_cuotas.ultimoAbono	,
			 'abono',	 mst_mov_cartera_cuotas.abono	
             )
    ) AS cuotas
    FROM mst_mov_cartera_cuotas  inner join 
    vw_mst_mov_cartera on   _cliente = idTercero  and id_cartera = vw_mst_mov_cartera.id
    WHERE date(fecha_max_pago)    =   _ffin and mst_mov_cartera_cuotas.totalActual > 0 ) 
      
    SELECT   JSON_OBJECT( 
                'descripcion' , _desc , 
                'fechaInicial', fechaInicio   ,   
				'fechaFinal', fechaFin,
				'numCreditos', numCreditos,
				't_valorInicial'	,	t_valorInicial	,
				't_totalActual'	,	 t_totalActual	,
				't_totalAbonos'	,	t_totalAbonos	,
				't_abonoInicial'	,	 t_abonoInicial	,
				't_numero_plazos_vencidos'	,	 t_numero_plazos_vencidos	,
				't_suma_plazos_vencidos' 	,	t_suma_plazos_vencidos ,
                'usuario_generador' , nombreUsuario , 
				'abonos' , ArrPrdQry.abonos ,  
				'cuotas' , ArrPrdQry2.cuotas , 
				'cuotas_vencidas' , ArrPrdQry3.cuotas , 
				'cuotas_a_vencerce' , ArrPrdQry4.cuotas , 
				'creditos' , JSON_ARRAYAGG(
                   JSON_OBJECT(
					'id'	,	vw_mst_mov_cartera.id	,
					'usuario_creacion'	,	 vw_mst_mov_cartera.usuario_creacion	,
					 'usuario_edicion'	,	 vw_mst_mov_cartera.usuario_edicion	,
					 'fecha_creacion'	,	  DATE_FORMAT(  vw_mst_mov_cartera.fecha_creacion , '%Y-%m-%d %H:%i:%s')	 ,
					 'fecha_actualizacion'	,	  DATE_FORMAT(   coalesce( vw_mst_mov_cartera.fecha_actualizacion	, '0000-00-00') , '%Y-%m-%d %H:%i:%s') ,
					 'estado'	,	 vw_mst_mov_cartera.estado	,
					 'valorInicial'	,	 vw_mst_mov_cartera.valorInicial	,
					 'totalActual'	,	 vw_mst_mov_cartera.totalActual	,
					 'totalAbonos'	,	 vw_mst_mov_cartera.totalAbonos	,
					 'abonoInicial'	,	 vw_mst_mov_cartera.abonoInicial	,
					 'idTercero'	,	 vw_mst_mov_cartera.idTercero	,
                     'terceroNombre', vw_mst_mov_cartera.terceroNombre ,
					 'idFacturaVenta'	,	 vw_mst_mov_cartera.idFacturaVenta	,
					 'comprobante'	,	 vw_mst_mov_cartera.comprobante	,
					 'fecha_ultimo_abono'	,	 vw_mst_mov_cartera.fecha_ultimo_abono	,
					 'cuotas'	,	 vw_mst_mov_cartera.cuotas	,
					 'plazos'	,	 vw_mst_mov_cartera.plazos	,
					 'numero_plazos_vencidos'	,	 vw_mst_mov_cartera.numero_plazos_vencidos	,
					 'suma_plazos_vencidos'	,	 vw_mst_mov_cartera.suma_plazos_vencidos	,
					 'descripcion'	,	 vw_mst_mov_cartera.descripcion 
                     )
                     )
                     ) as resumenCreditoPorCobrar
				from 
				vw_mst_mov_cartera 
                inner join ArrPrdQry on ArrPrdQry.idSession = _session_id 
                inner join ArrPrdQry2 on ArrPrdQry2.idSession = _session_id  
                inner join ArrPrdQry3 on ArrPrdQry3.idSession = _session_id   
                inner join ArrPrdQry4 on ArrPrdQry4.idSession = _session_id
                where date(fecha_creacion) BETWEEN  fechaInicio and fechaFin and   _cliente = idTercero ;  
      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumen_cuentas_por_pagar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumen_cuentas_por_pagar`(in _usuario int ,in fechaInicio date , in fechaFin date ,    in _session_id text )
BEGIN
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare numCreditos int;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal, totalMenosV, totalMasV , 
   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial,  t_numero_plazos_vencidos,t_suma_plazos_vencidos  , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de cuentas por pagar.  Desde ' , fechaInicio , ' hasta ' ,fechaFin ) into _desc  ;
     
   SELECT count(0),  coalesce( sum( valorInicial ) , 0 ), 
coalesce( sum(totalActual ), 0 ),
coalesce( sum(totalAbonos ), 0 ), 
coalesce( sum(abonoInicial ), 0 ),  
coalesce( sum(numero_plazos_vencidos ), 0 ),
coalesce( sum(suma_plazos_vencidos  ) , 0 )   
   into numCreditos ,   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial, 
   t_numero_plazos_vencidos,t_suma_plazos_vencidos FROM vw_mst_mov_credito 
   where fecha_creacion between fechaInicio and fechaFin   ;
   -- getIdContadorByName('comprobante_cuentas_por_cobrar')   
   
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
            'id_cartera',id_cartera,
			 'usuario_creacion'	,	 nombre_usuario_creacion	,
			 'usuario_edicion'	,	   nombre_usuario_edicion	,
			 'fecha_creacion'	,	 DATE_FORMAT(fecha_creacion , '%Y-%m-%d %H:%i:%s')	,
			 'fecha_actualizacion'	,	 DATE_FORMAT(coalesce(fecha_actualizacion, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 estado	,
			 'totalAbonos'	,	 totalAbonos	,
			 'comprobante'	,	 comprobante	,
			 'descripcion'	,	 descripcion	 
        )
    ) AS abonos
    FROM vw_mst_mov_credito_abonos
    WHERE fecha_creacion BETWEEN  fechaInicio and fechaFin  ) , 
    ArrPrdQry2 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
			 'fecha_max_pago'	,	 fecha_max_pago	,
			 'fechaPago'	,	 fechaPago	,
			 'numero_cuota'	,	 numero_cuota	,
			 'id_cartera'	,	 id_cartera	,
			 'usuarioCreador'	,	 usuarioCreador	,
			 'usuarioEdicion'	,	 usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 estado	,
			 'estadoCuota'	,	 estadoCuota	,
			 'valorCuota'	,	 valorCuota	,
			 'totalPagado'	,	 totalPagado	,
			 'totalActual'	,	 totalActual	,
			 'ultimoAbono'	,	 ultimoAbono	,
			 'abono',	 abono	
             )
    ) AS cuotas
    FROM mst_mov_credito_cuotas
    WHERE fecha_max_pago BETWEEN  fechaInicio and fechaFin  ) , 
    ArrPrdQry3 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
			 'fecha_max_pago'	,	 fecha_max_pago	,
			 'fechaPago'	,	 fechaPago	,
			 'numero_cuota'	,	 numero_cuota	,
			 'id_cartera'	,	 id_cartera	,
			 'usuarioCreador'	,	 usuarioCreador	,
			 'usuarioEdicion'	,	 usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT(  fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	  DATE_FORMAT(coalesce( fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 estado	,
			 'estadoCuota'	,	 estadoCuota	,
			 'valorCuota'	,	 valorCuota	,
			 'totalPagado'	,	 totalPagado	,
			 'totalActual'	,	 totalActual	,
			 'ultimoAbono'	,	 ultimoAbono	,
			 'abono',	 abono	
             )
    ) AS cuotas
    FROM mst_mov_credito_cuotas
    WHERE fecha_max_pago <=  fechaFin  and estadoCuota in ('OUTTIME' , 'OUTTIME_ABONADO' ))  , 
    ArrPrdQry4 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	id	,
			 'fecha_max_pago'	,	 fecha_max_pago	,
			 'fechaPago'	,	 fechaPago	,
			 'numero_cuota'	,	 numero_cuota	,
			 'id_cartera'	,	 id_cartera	,
			 'usuarioCreador'	,	 usuarioCreador	,
			 'usuarioEdicion'	,	 usuarioEdicion	,
			 'fechaCreacion'	,  DATE_FORMAT(  fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,  DATE_FORMAT(coalesce( fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	, 
			 'estado'	,	 estado	,
			 'estadoCuota'	,	 estadoCuota	,
			 'valorCuota'	,	 valorCuota	,
			 'totalPagado'	,	 totalPagado	,
			 'totalActual'	,	 totalActual	,
			 'ultimoAbono'	,	 ultimoAbono	,
			 'abono',	 abono	
             )
    ) AS cuotas
    FROM mst_mov_credito_cuotas
    WHERE fecha_max_pago  =   fechaFin and totalActual > 0 ) 
      
    SELECT   JSON_OBJECT( 
                'descripcion' , _desc , 
                'fechaInicial', fechaInicio   ,   
				'fechaFinal', fechaFin,
				'numCreditos', numCreditos,
				't_valorInicial'	,	t_valorInicial	,
				't_totalActual'	,	 t_totalActual	,
				't_totalAbonos'	,	t_totalAbonos	,
				't_abonoInicial'	,	 t_abonoInicial	,
				't_numero_plazos_vencidos'	,	 t_numero_plazos_vencidos	,
				't_suma_plazos_vencidos' 	,	t_suma_plazos_vencidos ,
                'usuario_generador' , nombreUsuario , 
				'abonos' , ArrPrdQry.abonos ,  
				'cuotas' , ArrPrdQry2.cuotas , 
				'cuotas_vencidas' , ArrPrdQry3.cuotas , 
				'cuotas_a_vencerce' , ArrPrdQry4.cuotas , 
				'creditos' , JSON_ARRAYAGG(
                   JSON_OBJECT(
					'id'	,	id	,
					'usuario_creacion'	,	 usuario_creacion	,
					 'usuario_edicion'	,	 usuario_edicion	,
					 'fecha_creacion'	,	  DATE_FORMAT(  fecha_creacion , '%Y-%m-%d %H:%i:%s')	 ,
					 'fecha_actualizacion'	,	  DATE_FORMAT(   coalesce( fecha_actualizacion	, '0000-00-00') , '%Y-%m-%d %H:%i:%s') ,
					 'estado'	,	 estado	,
					 'valorInicial'	,	 valorInicial	,
					 'totalActual'	,	 totalActual	,
					 'totalAbonos'	,	 totalAbonos	,
					 'abonoInicial'	,	 abonoInicial	,
					 'idTercero'	,	 idTercero	,
                     'terceroNombre', terceroNombre ,
					 'idFacturaVenta'	,	 idFacturaVenta	,
					 'comprobante'	,	 comprobante	,
					 'fecha_ultimo_abono'	,	 fecha_ultimo_abono	,
					 'cuotas'	,	 vw_mst_mov_credito.cuotas	,
					 'plazos'	,	 plazos	,
					 'numero_plazos_vencidos'	,	 numero_plazos_vencidos	,
					 'suma_plazos_vencidos'	,	 suma_plazos_vencidos	,
					 'descripcion'	,	 descripcion 
                     )
                     )
                     ) as resumenCreditoPorCobrar
				from 
				vw_mst_mov_credito 
                inner join ArrPrdQry on ArrPrdQry.idSession = _session_id 
                inner join ArrPrdQry2 on ArrPrdQry2.idSession = _session_id  
                inner join ArrPrdQry3 on ArrPrdQry3.idSession = _session_id   
                inner join ArrPrdQry4 on ArrPrdQry4.idSession = _session_id
                where fecha_creacion BETWEEN  fechaInicio and fechaFin  ;  
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumen_cuentas_por_pagar_proveedor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumen_cuentas_por_pagar_proveedor`(in _usuario int ,in fechaInicio date , in fechaFin date , in _prov int ,   in _session_id text )
BEGIN
  declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad , _ffin date ;
  declare numCreditos int;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal, totalMenosV, totalMasV , 
   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial,  t_numero_plazos_vencidos,t_suma_plazos_vencidos  , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe  text;
  /*si idPrd es diferente a vacio*/ 
  
     SET SQL_SAFE_UPDATES = 0;
     select concat( 'Reporte de cuentas por pagar.  Desde ' , fechaInicio , ' hasta ' ,fechaFin , ' proveedor : nit ' , numIdentificacion , ' - ' , nombreCompleto ) into _desc
     from mst_per_clientes where mst_per_clientes.id = _prov ;
      set fechaFin = fechaFin;
    if fechaFin = '9999-12-31' then
       set _ffin = curdate();
     end if;
   SELECT count(0),  coalesce( sum( valorInicial ) , 0 ), 
coalesce( sum(totalActual ), 0 ),
coalesce( sum(totalAbonos ), 0 ), 
coalesce( sum(abonoInicial ), 0 ),  
coalesce( sum(numero_plazos_vencidos ), 0 ),
coalesce( sum(suma_plazos_vencidos  ) , 0 )   
   into numCreditos ,   t_valorInicial, t_totalActual,t_totalAbonos, t_abonoInicial, 
   t_numero_plazos_vencidos,t_suma_plazos_vencidos FROM vw_mst_mov_credito 
   where date(fecha_creacion) between fechaInicio and fechaFin and _prov = idTercero  ;
   -- getIdContadorByName('comprobante_cuentas_por_cobrar')   
   
   select nombreCompleto into nombreUsuario from usuarios where ID = _usuario;
   
   
   with ArrPrdQry as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	vw_mst_mov_credito_abonos.id	,
            'id_cartera',vw_mst_mov_credito_abonos.id_cartera,
			 'usuario_creacion'	,	 vw_mst_mov_credito_abonos.nombre_usuario_creacion	,
			 'usuario_edicion'	,	   vw_mst_mov_credito_abonos.nombre_usuario_edicion	,
			 'fecha_creacion'	,	 DATE_FORMAT(vw_mst_mov_credito_abonos.fecha_creacion , '%Y-%m-%d %H:%i:%s')	,
			 'fecha_actualizacion'	,	 DATE_FORMAT(coalesce(vw_mst_mov_credito_abonos.fecha_actualizacion, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 vw_mst_mov_credito_abonos.estado	,
			 'totalAbonos'	,	 vw_mst_mov_credito_abonos.totalAbonos	,
			 'comprobante'	,	 vw_mst_mov_credito_abonos.comprobante	,
			 'descripcion'	,	 vw_mst_mov_credito_abonos.descripcion	 
        )
    ) AS abonos
    FROM vw_mst_mov_credito_abonos inner join 
    vw_mst_mov_credito on   _prov = idTercero  and id_cartera = vw_mst_mov_credito.id 
    where date(vw_mst_mov_credito_abonos.fecha_creacion) between fechaInicio and fechaFin
    ) , 
    ArrPrdQry2 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	mst_mov_credito_cuotas.id	,
			 'fecha_max_pago'	,	 mst_mov_credito_cuotas.fecha_max_pago	,
			 'fechaPago'	,	 mst_mov_credito_cuotas.fechaPago	,
			 'numero_cuota'	,	 mst_mov_credito_cuotas.numero_cuota	,
			 'id_cartera'	,	 mst_mov_credito_cuotas.id_cartera	,
			 'usuarioCreador'	,	 mst_mov_credito_cuotas.usuarioCreador	,
			 'usuarioEdicion'	,	 mst_mov_credito_cuotas.usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( mst_mov_credito_cuotas.fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( mst_mov_credito_cuotas.fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 mst_mov_credito_cuotas.estado	,
			 'estadoCuota'	,	 mst_mov_credito_cuotas.estadoCuota	,
			 'valorCuota'	,	 mst_mov_credito_cuotas.valorCuota	,
			 'totalPagado'	,	 mst_mov_credito_cuotas.totalPagado	,
			 'totalActual'	,	 mst_mov_credito_cuotas.totalActual	,
			 'ultimoAbono'	,	 mst_mov_credito_cuotas.ultimoAbono	,
			 'abono',	 mst_mov_credito_cuotas.abono	
             )
    ) AS cuotas
    FROM mst_mov_credito_cuotas
    inner join 
    vw_mst_mov_credito on   _prov = idTercero  and id_cartera = vw_mst_mov_credito.id
    WHERE date(fecha_max_pago) BETWEEN  fechaInicio and fechaFin  ) , 
    ArrPrdQry3 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
             'id'	,	mst_mov_credito_cuotas.id	,
			 'fecha_max_pago'	,	 mst_mov_credito_cuotas.fecha_max_pago	,
			 'fechaPago'	,	 mst_mov_credito_cuotas.fechaPago	,
			 'numero_cuota'	,	 mst_mov_credito_cuotas.numero_cuota	,
			 'id_cartera'	,	 mst_mov_credito_cuotas.id_cartera	,
			 'usuarioCreador'	,	 mst_mov_credito_cuotas.usuarioCreador	,
			 'usuarioEdicion'	,	 mst_mov_credito_cuotas.usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( mst_mov_credito_cuotas.fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( mst_mov_credito_cuotas.fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 mst_mov_credito_cuotas.estado	,
			 'estadoCuota'	,	 mst_mov_credito_cuotas.estadoCuota	,
			 'valorCuota'	,	 mst_mov_credito_cuotas.valorCuota	,
			 'totalPagado'	,	 mst_mov_credito_cuotas.totalPagado	,
			 'totalActual'	,	 mst_mov_credito_cuotas.totalActual	,
			 'ultimoAbono'	,	 mst_mov_credito_cuotas.ultimoAbono	,
			 'abono',	 mst_mov_credito_cuotas.abono	
             )
    ) AS cuotas
    FROM mst_mov_credito_cuotas 
    inner join 
    vw_mst_mov_credito on   _prov = idTercero  and id_cartera = vw_mst_mov_credito.id
    WHERE date(fecha_max_pago)  <=  fechaFin  and estadoCuota in ('OUTTIME' , 'OUTTIME_ABONADO' ))  , 
    ArrPrdQry4 as (SELECT _session_id as idSession,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id'	,	mst_mov_credito_cuotas.id	,
			 'fecha_max_pago'	,	 mst_mov_credito_cuotas.fecha_max_pago	,
			 'fechaPago'	,	 mst_mov_credito_cuotas.fechaPago	,
			 'numero_cuota'	,	 mst_mov_credito_cuotas.numero_cuota	,
			 'id_cartera'	,	 mst_mov_credito_cuotas.id_cartera	,
			 'usuarioCreador'	,	 mst_mov_credito_cuotas.usuarioCreador	,
			 'usuarioEdicion'	,	 mst_mov_credito_cuotas.usuarioEdicion	,
			 'fechaCreacion'	,	DATE_FORMAT( mst_mov_credito_cuotas.fechaCreacion , '%Y-%m-%d %H:%i:%s')		,
			 'fechaEdicion'	,	 DATE_FORMAT(coalesce( mst_mov_credito_cuotas.fechaEdicion	, '0000-00-00'), '%Y-%m-%d %H:%i:%s')	,
			 'estado'	,	 mst_mov_credito_cuotas.estado	,
			 'estadoCuota'	,	 mst_mov_credito_cuotas.estadoCuota	,
			 'valorCuota'	,	 mst_mov_credito_cuotas.valorCuota	,
			 'totalPagado'	,	 mst_mov_credito_cuotas.totalPagado	,
			 'totalActual'	,	 mst_mov_credito_cuotas.totalActual	,
			 'ultimoAbono'	,	 mst_mov_credito_cuotas.ultimoAbono	,
			 'abono',	 mst_mov_credito_cuotas.abono	
             )
    ) AS cuotas
    FROM mst_mov_credito_cuotas  inner join 
    vw_mst_mov_credito on   _prov = idTercero  and id_cartera = vw_mst_mov_credito.id
    WHERE date(fecha_max_pago)   =   _ffin and mst_mov_credito_cuotas.totalActual > 0 ) 
      
    SELECT   JSON_OBJECT( 
                'descripcion' , _desc , 
                'fechaInicial', fechaInicio   ,   
				'fechaFinal', fechaFin,
				'numCreditos', numCreditos,
				't_valorInicial'	,	t_valorInicial	,
				't_totalActual'	,	 t_totalActual	,
				't_totalAbonos'	,	t_totalAbonos	,
				't_abonoInicial'	,	 t_abonoInicial	,
				't_numero_plazos_vencidos'	,	 t_numero_plazos_vencidos	,
				't_suma_plazos_vencidos' 	,	t_suma_plazos_vencidos ,
                'usuario_generador' , nombreUsuario , 
				'abonos' , ArrPrdQry.abonos ,  
				'cuotas' , ArrPrdQry2.cuotas , 
				'cuotas_vencidas' , ArrPrdQry3.cuotas , 
				'cuotas_a_vencerce' , ArrPrdQry4.cuotas , 
				'creditos' , JSON_ARRAYAGG(
                   JSON_OBJECT(
					'id'	,	vw_mst_mov_credito.id	,
					'usuario_creacion'	,	 vw_mst_mov_credito.usuario_creacion	,
					 'usuario_edicion'	,	 vw_mst_mov_credito.usuario_edicion	,
					 'fecha_creacion'	,	  DATE_FORMAT(  vw_mst_mov_credito.fecha_creacion , '%Y-%m-%d %H:%i:%s')	 ,
					 'fecha_actualizacion'	,	  DATE_FORMAT(   coalesce( vw_mst_mov_credito.fecha_actualizacion	, '0000-00-00') , '%Y-%m-%d %H:%i:%s') ,
					 'estado'	,	 vw_mst_mov_credito.estado	,
					 'valorInicial'	,	 vw_mst_mov_credito.valorInicial	,
					 'totalActual'	,	 vw_mst_mov_credito.totalActual	,
					 'totalAbonos'	,	 vw_mst_mov_credito.totalAbonos	,
					 'abonoInicial'	,	 vw_mst_mov_credito.abonoInicial	,
					 'idTercero'	,	 vw_mst_mov_credito.idTercero	,
                     'terceroNombre', vw_mst_mov_credito.terceroNombre ,
					 'idFacturaVenta'	,	 vw_mst_mov_credito.idFacturaVenta	,
					 'comprobante'	,	 vw_mst_mov_credito.comprobante	,
					 'fecha_ultimo_abono'	,	 vw_mst_mov_credito.fecha_ultimo_abono	,
					 'cuotas'	,	 vw_mst_mov_credito.cuotas	,
					 'plazos'	,	 vw_mst_mov_credito.plazos	,
					 'numero_plazos_vencidos'	,	 vw_mst_mov_credito.numero_plazos_vencidos	,
					 'suma_plazos_vencidos'	,	 vw_mst_mov_credito.suma_plazos_vencidos	,
					 'descripcion'	,	 vw_mst_mov_credito.descripcion 
                     )
                     )
                     ) as resumenCreditoPorCobrar
				from 
				vw_mst_mov_credito 
                inner join ArrPrdQry on ArrPrdQry.idSession = _session_id 
                inner join ArrPrdQry2 on ArrPrdQry2.idSession = _session_id  
                inner join ArrPrdQry3 on ArrPrdQry3.idSession = _session_id   
                inner join ArrPrdQry4 on ArrPrdQry4.idSession = _session_id
                where date(fecha_creacion) BETWEEN  fechaInicio and fechaFin and   _prov = idTercero ;  
      SET SQL_SAFE_UPDATES = 1; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_resumen_movimientos_cuentas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_resumen_movimientos_cuentas`(in _usuario int ,in fechaInicio date , in fechaFin date ,  in idPrd text ,  in _session_id text )
BEGIN
 declare nombreUsuario , _desc
   -- prdMasVendido , prdMenosVendido 
   text;
  declare fechaMenorCantidad , fechaMayorCantidad date ;
  declare menorCantidad, menorValorTotal, mayorCantidad, mayorValorTotal,
  saldoTotal,creditoTotal ,debitoTotal , totalMenosV, totalMasV , numTotal , numMenosV, numMasV  decimal(16,2);
  declare _cantidadVendidaMa , _valorTotalMa , _cantidadVendidaMe , _valorTotalMe decimal(16,2);
  declare _idProductoMa , _nombreProductoMa , _idProductoMe , _nombreProductoMe text;
  
   
     SET SQL_SAFE_UPDATES = 0; 
     select nombreCompleto into nombreUsuario from usuarios where ID = _usuario; 
     SELECT CONCAT('Reporte de movimientos realizadas por la (las) cuenta(s) : ', GROUP_CONCAT(DISTINCT nro_subcuenta SEPARATOR ', ')) into _desc  
     from vw_cnt_transacciones where  FIND_IN_SET (idCuentaAuxiliar , idPrd );
     -- select _desc;
     
    delete from  ventas_del_dia_procedimiento where  session_id     = _session_id ; 
    delete from  movimientos_del_dia_procedimiento where  session_id     = _session_id ;
    
    insert into ventas_del_dia_procedimiento  WITH RECURSIVE date_range AS (
			SELECT fechaInicio AS date
			UNION ALL
			SELECT DATE_ADD(date, INTERVAL 1 DAY)
			FROM date_range
			WHERE DATE_ADD(date, INTERVAL 1 DAY) <= fechaFin )
            SELECT _session_id ,  date , 0 , 0
		FROM date_range ;
        
     insert into movimientos_del_dia_procedimiento   
	SELECT distinct  session_id ,  nro_cuenta ,ventas_del_dia_procedimiento.fecha , 0 ,0, 0, 0    from cnt_cuentas 
	left join ventas_del_dia_procedimiento on 1=1 and session_id = _session_id
	 where  FIND_IN_SET (id_cuenta , idPrd ) order by nro_cuenta   ,  ventas_del_dia_procedimiento.fecha ;  
     
     select   coalesce(sum(valor_debito),0)    , coalesce(sum(valor_credito),0) , 0  ,   count(0)  
     into  debitoTotal , creditoTotal ,   saldoTotal,    numTotal  
     from  vw_cnt_transacciones where  fechaOperacion  between fechaInicio and fechaFin and  FIND_IN_SET (idCuentaAuxiliar , idPrd )  ;
     
     set saldoTotal = debitoTotal - creditoTotal;
   --   SELECT  *   from movimientos_del_dia_procedimiento where session_id = _session_id;
        
    -- session_id, cuenta, fecha, debito, credito, saldo, cnt  
     update movimientos_del_dia_procedimiento inner join 
     ( select fechaOperacion ,  nro_subcuenta as cuenta ,  sum(valor_debito) debito  , sum(valor_credito) credito ,   count(0) numTrn
 from  vw_cnt_transacciones group by fechaOperacion, nro_subcuenta  ) as movimientosDiarios on 
           movimientosDiarios.fechaOperacion = movimientos_del_dia_procedimiento.fecha
           and movimientos_del_dia_procedimiento.cuenta = movimientosDiarios.cuenta
           set movimientos_del_dia_procedimiento.debito =  movimientosDiarios.debito, 
			   movimientos_del_dia_procedimiento.credito =  movimientosDiarios.credito, 
			   movimientos_del_dia_procedimiento.saldo =  movimientosDiarios.debito - movimientosDiarios.credito, 
			   movimientos_del_dia_procedimiento.cnt   =  movimientosDiarios.numTrn 
           where movimientos_del_dia_procedimiento.session_id = _session_id; 
  
        
   -- select * from movimientos_del_dia_procedimiento where session_id = _session_id;  
  WITH resumenCnt AS (
    SELECT 
        cuenta AS nro_cuenta,
        JSON_OBJECT (
        'cuenta' , cuenta , 'saldo' , sum(saldo),
       'movimientos' ,  JSON_ARRAYAGG(movimientos) )  AS movimientos
    FROM (
        SELECT 
            cuenta, m.saldo ,
            JSON_OBJECT(
                'fecha', m.fecha,
                'debito', m.debito,
                'credito', m.credito,
                'saldo', m.saldo,
                'cnt', m.cnt
            ) AS movimientos
        FROM movimientos_del_dia_procedimiento m 
        WHERE session_id = _session_id 
        ORDER BY m.fecha  -- Ordenar por fecha aquí
    ) AS sub
    GROUP BY cuenta
) ,  moviCuenta as (   select   nro_subcuenta, JSON_OBJECT( 
                       'cuenta', nro_subcuenta ,
                         'saldo' , sum(valor_debito - valor_credito),
                       'movimientos',  JSON_ARRAYAGG( JSON_OBJECT(
                       'debito' , valor_debito, 'credito' , valor_credito,  
                     'fecha' ,fechaOperacion ,  'tercero' ,nombreTercero,  'operacion' ,nombre,  'operDescripcion' ,descripcion,   
                     'vendedor' ,nombreVendedor,  'establecimiento' ,establecimiento ))) as movCnt
                    from vw_cnt_transacciones where   FIND_IN_SET (idCuentaAuxiliar ,idPrd ) and 
                    fechaOperacion between fechaInicio and fechaFin group by nro_subcuenta
                    -- fechaInicio date , in fechaFin date ,  in idPrd text , 
     )               
     SELECT   
       JSON_OBJECT( 
       'usuarioGenerador' , nombreUsuario,
       'fechaInicial',fechaInicio ,
       'fechaFinal', fechaFin ,
       'descripcion', _desc ,
       'cantidadMovimientos',numTotal ,
       'saldo', saldoTotal , 
       'debito', debitoTotal , 
       'credito', creditoTotal ,
       'resumen' , JSON_ARRAYAGG(movimientos ) , 
       'movimientos' ,JSON_ARRAYAGG( movCnt )
       ) 
     AS resumenVentas
     from cnt_cuentas  
     inner join resumenCnt on resumenCnt.nro_cuenta = cnt_cuentas.nro_cuenta
     inner join moviCuenta on   moviCuenta.nro_subcuenta = cnt_cuentas.nro_cuenta
	 where  FIND_IN_SET (id_cuenta , idPrd ) order by cnt_cuentas.nro_cuenta ;
    
     
  SET SQL_SAFE_UPDATES = 1 ; 
  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_SET_BANDERA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_SET_BANDERA`(IN `_COD_FLAG` TEXT)
BEGIN
    DECLARE EST  , _id INT;
    declare nomUsu varchar(50);
    declare _f1 , _f2 datetime;
    SELECT id , estado , date(fechaInicio) , date(now()) , nombreCompleto INTO _id , EST , _f1 , _f2 ,nomUsu
    FROM  vw_flags WHERE codigo = _COD_FLAG ;  
    
    if  _f1 < _f2 then 
     update flags 
    set estado = 2
    WHERE id = ( SELECT id   FROM  flags WHERE codigo = 'FLAG_INICIO_ACTUALIZACION' ) ;
    end if;
    
    IF EST = 2 or  EST = 0 then 
     SET EST = 3 ;
     update flags 
     set estado = 1
     WHERE id = _id ;
    END IF;
    
    SELECT EST AS codEstado , nomUsu as nombreUsuario , 100 as _result; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_trasladar_Producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_trasladar_Producto`(
    IN p_id_bodega_origen BIGINT,
    IN p_id_bodega_destino BIGINT,
    IN p_id_producto VARCHAR(10),
    IN p_cantidad DECIMAL(10, 2),
    IN p_id_usuario BIGINT
)
BEGIN
    DECLARE v_cant_actual_origen DECIMAL(10, 2);
    DECLARE v_cant_actual_destino DECIMAL(10, 2);
    DECLARE v_existe_bodega_origen INT;
    DECLARE v_existe_bodega_destino INT;
    DECLARE v_existe_producto_destino INT;
    DECLARE v_errorCode INT;
    DECLARE v_errorMessage VARCHAR(255);
    DECLARE v_resultado VARCHAR(255);

    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Obtener el código de error y el mensaje de error
        GET DIAGNOSTICS CONDITION 1 v_errorCode = MYSQL_ERRNO, v_errorMessage = MESSAGE_TEXT;
        -- Formatear el mensaje de error en JSON
        SET v_resultado = CONCAT('{ "estado" : "error", "codigo" : ', v_errorCode, ', "mensaje" : "', v_errorMessage, '" }');
        SELECT v_resultado AS obj;
    END;

    -- Validación de la existencia de bodegas y producto
    bodega_validacion: BEGIN
        -- Verificar existencia de la bodega de origen
        SELECT COUNT(*) INTO v_existe_bodega_origen
        FROM bodegas
        WHERE id = p_id_bodega_origen;

        IF v_existe_bodega_origen = 0 THEN
            SET v_resultado = '{ "estado" : "error", "codigo" : 102, "mensaje" : "Bodega de origen no existe" }';
            SELECT v_resultado AS obj;
            LEAVE bodega_validacion;
        END IF;

        -- Verificar existencia de la bodega de destino
        SELECT COUNT(*) INTO v_existe_bodega_destino
        FROM bodegas
        WHERE id = p_id_bodega_destino;

        IF v_existe_bodega_destino = 0 THEN
            SET v_resultado = '{ "estado" : "error", "codigo" : 103, "mensaje" : "Bodega de destino no existe" }';
            SELECT v_resultado AS obj;
            LEAVE bodega_validacion;
        END IF;

        -- Verificar existencia suficiente en la bodega de origen
        SELECT cant_actual INTO v_cant_actual_origen
        FROM inv_mst_producto_existencias
        WHERE id_producto = p_id_producto AND id_bodega = p_id_bodega_origen;

        IF v_cant_actual_origen < p_cantidad THEN
            SET v_resultado = '{ "estado" : "error", "codigo" : 101, "mensaje" : "Cantidad insuficiente en bodega de origen" }';
            SELECT v_resultado AS obj;
            LEAVE bodega_validacion;
        END IF;

        -- Actualizar existencias en la bodega de origen (disminuir)
        UPDATE inv_mst_producto_existencias
        SET 
            cant_actual = cant_actual - p_cantidad,
            trasladoOut = trasladoOut + p_cantidad,
            fecha_actualizacion = NOW(),
            usuario_edicion = p_id_usuario
        WHERE id_producto = p_id_producto AND id_bodega = p_id_bodega_origen;

        -- Verificar si el producto ya existe en la bodega de destino
        SELECT COUNT(*) INTO v_existe_producto_destino
        FROM inv_mst_producto_existencias
        WHERE id_producto = p_id_producto AND id_bodega = p_id_bodega_destino;

        IF v_existe_producto_destino > 0 THEN
            -- Si el producto ya existe en la bodega de destino, actualizar las existencias
            UPDATE inv_mst_producto_existencias
            SET 
                cant_actual = cant_actual + p_cantidad,
                trasladoIn = trasladoIn + p_cantidad,
                fecha_actualizacion = NOW(),
                usuario_edicion = p_id_usuario
            WHERE id_producto = p_id_producto AND id_bodega = p_id_bodega_destino;
        ELSE
            -- Si el producto no existe en la bodega de destino, insertarlo
            INSERT INTO inv_mst_producto_existencias (
                id_producto, id_bodega, cant_inicial, compras, ventas, devoluciones, remisiones, cant_actual, stock, usuario_creacion, usuario_edicion, fecha_creacion, fecha_actualizacion, ult_mov, trasladoIn
            ) VALUES (
                p_id_producto, p_id_bodega_destino, 0.00, 0.00, 0.00, 0.00, 0.00, p_cantidad, p_cantidad, p_id_usuario, NULL, NOW(), NOW(), 'Traslado inicial', p_cantidad
            );
        END IF;

        -- Indicar que todo fue correcto
        SET v_resultado = '{ "estado" : "ok", "codigo" : 100, "mensaje" : "Traslado realizado correctamente" }';
        SELECT v_resultado AS obj;
    END bodega_validacion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_update_cliente_documento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_update_cliente_documento`(`ordenDoc` INT, `ordenClient` INT)
BEGIN
     update documentos set cliente = ordenClient where  orden = ordenDoc ;
     select objeto  from vw_obj_documentos where  orden = ordenDoc ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_verificar_usuarios_permisos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `sp_verificar_usuarios_permisos`(IN `_nickname` VARCHAR(150), IN `_pass` VARCHAR(150))
BEGIN
	select * from usuarios where Login = _nickname  and pass = _pass ; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `truncate_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `truncate_table`(IN `nomTable` VARCHAR(150))
BEGIN
	
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		select 'error en la base de datos' AS result LIMIT 1; 
	END; 
DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		select  WARNINGS  AS result LIMIT 1; 
	END;
	if nomTable = '' then
		select '-1' as result;
    else 
        set @sqlExe = concat_ws(' ','DELETE FROM ',nomTable);
				PREPARE stmt1 FROM @sqlExe; 
                -- select @sqlExe;
				SET SQL_SAFE_UPDATES = 0;
                EXECUTE stmt1;              
        
		select '100' as result;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateFechaVentas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_520_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE  PROCEDURE `updateFechaVentas`(IN `_id_venta` TEXT, IN `_fecha_venta` DATE)
BEGIN
	UPDATE `ventastemp` SET  `fecha` =  _fecha_venta WHERE `idVenta` = _id_venta;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24  6:34:14
