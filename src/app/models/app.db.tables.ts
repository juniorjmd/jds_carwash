 const DATOS_SUCURSAL = 'vw_estudiante';
 

 export const TABLA = {
  empleados_pagos_anticipos : 'empleados_pagos_anticipos',
   PARAMETROS:'parametros',
   empleados:'empleados',
   personas:'mst_per_clientes',
   vehiculos_servicios_costos:'inv_mst_servicios_costos',
   TiposServicios : 'inv_mst_tipos_servicios',// vehiculos_servicios_tipos
   vehiculos_servicios :'inv_mst_servicios',
    SUCURSAL : DATOS_SUCURSAL ,
    ciudades : "mst_per_clientes_ciudades" ,
    departamento: "mst_per_clientes_deptos" ,
    pais : "mst_per_clientes_paises",
    caja : "cajas",
    usuarios:"usuarios",
    perfiles:"perfiles",
    establecimiento:"establecimiento",
    medios:"documentos_medios_de_pago",
    documentos:"documentos",
    tipoEstablecimiento:"tipo_establecimiento",
    contador:"contadores" , 
    tiposVehiculos:"inv_mst_tipos_vehiculos",
    inv_inventario_ingreso_auxiliar:'inv_inventario_ingreso_auxiliar'

 }

 export const PROCEDURE = { 
   insertaContador : 'sp_inserta_nuevo_contador',
   getProductoConExistencia : 'getProductoCompletoExistencia',
   sp_cerrar_inventario : 'sp_cerrar_inventario'

}