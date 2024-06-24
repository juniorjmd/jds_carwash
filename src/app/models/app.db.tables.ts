 const DATOS_SUCURSAL = 'vw_estudiante';
 

 export const TABLA = {
  empleados_pagos_anticipos : 'empleados_pagos_anticipos',
   PARAMETROS:'parametros',
   empleados:'empleados',
   vehiculos_servicios_costos:'vehiculos_servicios_costos',
   TiposServicios : 'inv_mst_tipos_servicios',// vehiculos_servicios_tipos
   vehiculos_servicios :'inv_mst_servicios',
    SUCURSAL : DATOS_SUCURSAL ,
    ciudades : "ciudades" ,
    departamento: "departamento" ,
    pais : "paises",
    caja : "cajas",
    usuarios:"usuarios",
    perfiles:"perfiles",
    establecimiento:"establecimiento",
    medios:"documentos_medios_de_pago",
    tipoEstablecimiento:"tipo_establecimiento",
    contador:"contadores" , 
    tiposVehiculos:"inv_mst_tipos_vehiculos",
    inv_inventario_ingreso_auxiliar:'inv_inventario_ingreso_auxiliar'

 }

 export const PROCEDURE = { 
   insertaContador : 'sp_inserta_nuevo_contador',
   getProductoConExistencia : 'getProductoConExistencia',
   sp_cerrar_inventario : 'sp_cerrar_inventario'

}