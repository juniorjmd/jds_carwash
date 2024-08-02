 const DATOS_SUCURSAL = 'vw_estudiante';
 

 export const TABLA = {
   actividad_det_tmp :'inv_descuentos_actividad_detalle_tmp',
  categorias : 'inv_categorias',
   subCuentasContables : 'cnt_cuentas',
  empleados_pagos_anticipos : 'mov_empleado_pagos_anticipos',
  empleados_acumulados : 'mov_empleado_acumulados',
  presentacionProducto : 'inv_mst_producto_presentacion',
   PARAMETROS:'parametros',
   empleados:'mst_per_empleados',
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
    inv_descuentos:"inv_descuentos",
    inv_inventario_ingreso_auxiliar:'inv_inventario_ingreso_auxiliar',
    transacciones_tmp:'cnt_transacciones_tmp'

 }

 export const PROCEDURE = { 
   insertaContador : 'sp_inserta_nuevo_contador',
   getProductoConExistencia : 'getProductoCompletoExistencia',
   sp_cerrar_inventario : 'sp_cerrar_inventario'

}