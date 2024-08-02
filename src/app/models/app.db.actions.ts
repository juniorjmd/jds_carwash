
// actions para servicio crud

 const actionDelete = 'DATABASE_GENERIC_CONTRUCT_DELETE';
 const actionUpdate = 'DATABASE_GENERIC_CONTRUCT_UPDATE';
 const actionAsignarCajas = 'qwer12356yhn7ujm8ik';
 const actionInsert = 'DATABASE_GENERIC_CONTRUCT_INSERT';
 const actionInsertSelect = 'DATABASE_GENERIC_CONTRUCT_INSERT_SELECT';
 const actionProcedure = 'DATABASE_GENERIC_CONTRUCT_PROCEDURE';
 const actionSelect = 'DATABASE_GENERIC_CONTRUCT_SELECT';
 const actionSelects = 'e06c06e7e4ef58bdb0kieujfñ541b3017fdd35473';
 const actionSelectCajasPorUsuario = 'mnbvcxzxcxcxasdfewq15616'; 



 const actionlogin = 'ef2e1d89937fba9f888516293ab1e19e7ed789a5';
 const actionSelectPorUsuario = 'DATABASE_GENERIC_CONTRUCT_SELECT_BY_USER_LOGGED';
 const actionTipDocOdoo = 'BUSCAR_ODOO_TIPO_ID' ;
 const actionEmpresasOdoo = 'BUSCAR_ODOO_TIPO_COMPANIA';

 const actionAbrirCaja = 'ABRIR_CAJA_ACTIVA';
 const actionCerarCaja = 'CERRAR_CAJA_ACTIVA';
 
 const actionConfirmar = '54cf0ad78873b07d7756976e37b6ed1e659a573f';
 const actionUsuario = '781e41a4c6237dbaecab19579643041de310c041';
 const insert_orden_pregunta = '99c505a66a9d8a984059baf1b99bb9e6456ae4bb';
 const generarPDF = '23929870008e23007350be74a708ab3a806dce13';
 const resultadoSimulacro = '8e9ae038c37d3b59fc1eed456c77aefb5eadffea';
 const cambioContrasena = '52444d9072f7ec12a26cb2879ebb4ab0bf5aa553';
 const datosInicialesSucursal = 'GET_SUCURSAL_PRINCIPAL_DATA'
 const validarLlave = '16770d92a6a82ee846f7ff23b4c8ad05b69fba03';
 const actionResumenCaja = 'OBTENER_RESUMEN_CAJA';
 const actionInsertPerfilUsuario = 'INSERT_PERFIL_USUARIO'; 


 const actionCrearDocumentos = 'CREAR_DOCUMENTO_POR_USUARIO' ; 
 const actionCrearDocumentoGasto = 'CREAR_DOCUMENTO_GASTO_POR_USUARIO' ; 
 const actionCerarDocumentos = 'CERRAR_DOCUMENTO_FACTURA' ; 
 const actionChangeDocumentos = 'CAMBIAR_DOCUMENTO_ACTIVO_POR_USUARIO' ; 
 const actionCancelarDocumentos = 'CANCELAR_DOCUMENTO_POR_USUARIO' ; 
 const actionCambioCajaDocumento = 'CAMBIAR_DOCUMENTO_POR_CAJA';
 const actionBuscarProducto = 'BUSCAR_PRODUCTO';
 const actionCategoriasdoo = 'BUSCAR_ODOO_CATEGORIAS';
 const actionCategoriasPrddoo = 'BUSCAR_ODOO_CATEGORIAS_PRD'
 const actionAsignarPagosDoc = 'ASIGNAR_PAGOS_DOCUMENTOS';
 const actionAsignarPagosDocCredito = 'ASIGNAR_PAGOS_DOCUMENTOS_CREDITO';



 const STOCK_MOVE = 'STOCK_MOVE';
 const action_insertar_producto_venta = 'insertar_producto_venta';
 const STOCK_MOVE_DEVOLUCION = 'STOCK_MOVE_DEVOLUCION';
 const actionBuscarMarcas = 'BUSCAR_MARCAS';
 const actionCerarCajaParcial = 'CERRAR_CAJA_PARCIAL';
 const actionCambiarDocADomicilio = 'CAMBIAR_DOCUMENTO_A_ENVIO'; 
 const actionInsertarDocumentoPorServicioIngresado = 'CREAR_DOCUMENTO_POR_SERVICIO_VEHICULO';
 const actionInsertCostoServicio = 'INGRESAR_COSTO_SERVICIO';
 const devolver_producto_venta = 'devolver_producto_venta';
 const INSERTAR_PAGO_EMPLEADO = 'INSERTAR_PAGO_EMPLEADO';
 const action_update_producto = 'ACTULIZAR_PRODUCTO';
 const action_insertar_new_producto = 'INSERTAR_NUEVO_PRODUCTO';
 const action_cancelar_inventario = 'BORRAR_DATOS_INGRESO_AUX_INVENTARIO';
 const action_ingreso_precargue = 'INGRESO_DATOS_DATOS_AUX_INVENTARIO';


 export const actions = {
  'action_update_producto':action_update_producto,
  'get_categorias' : 'GET_CATEGORIAS',
  'set_actividad_descuento' : 'SET_ACTIVIDAD_DESCUENTO',
  'get_all_products_by_name' : 'BUSCAR_TODOS_LOS_PRODUCTOS_POR_NOMBRE',
  'get_all_products_by_brand' : 'BUSCAR_TODOS_LOS_PRODUCTOS_POR_MARCA',
  'get_all_products_by_category' : 'BUSCAR_TODOS_LOS_PRODUCTOS_POR_CATEGORIA',
  'get_all_products' : 'BUSCAR_TODOS_LOS_PRODUCTOS',
  'get_product' : 'BUSCAR_TODOS_LOS_PRODUCTOS',
  'action_get_documentos_usuario':'GET_DOCUMENTOS_USUARIO_ACTUAL',
  'action_get_documentos_caja':'GET_DOCUMENTOS_USUARIO_ACTUAL_CAJA_ACTIVA',
  'action_insertar_pagos':INSERTAR_PAGO_EMPLEADO,
  'action_ingreso_precargue' : action_ingreso_precargue,
  'action_cancelar_inventario':action_cancelar_inventario,
  'devolver_producto_venta' : devolver_producto_venta,
  'action_insertar_producto_venta' : action_insertar_producto_venta,
  'action_insertar_new_producto' : action_insertar_new_producto,
  'actionInsertCostoServicio' :actionInsertCostoServicio,
    'actionCambiarDocADomicilio' : actionCambiarDocADomicilio,
    'actionInsertarDocumentoPorServicioIngresado' : actionInsertarDocumentoPorServicioIngresado,
  'actionCancelarDocumentos' : actionCancelarDocumentos,
  'actionCerarCajaParcial' : actionCerarCajaParcial,
  'actionCambiarDocumentosACotizacion' : 'CREAR_DOCUMENTO_COTIZACION_POR_USUARIO',
   'actionAbrirCaja': actionAbrirCaja,
   'actionCrearDocumentos' : actionCrearDocumentos,
   'actionCrearNewGasto' : actionCrearDocumentoGasto,
   'actionCrearNewAbono' : 'ASIGNAR_ABONO_DOCUMENTOS_CREDITO',
   'actionCrearNewDevolucion' : 'GENERAR_DOCUMENTOS_DEVOLUCION',
   'actionResumenCaja': actionResumenCaja,
    'actionCerarCaja': actionCerarCaja, 
    'actionCerarDocumentos':actionCerarDocumentos,
    'datosInicialesSucursal' : datosInicialesSucursal,
    'actionAsignarDocumentosPagos':actionAsignarPagosDoc , 
    'actionAsignarNewCredito':actionAsignarPagosDocCredito , 
    'actionBuscarMarcas' : actionBuscarMarcas,
    'actionAsignarCajas':actionAsignarCajas,
    'actionDelete' :actionDelete ,
    'actionUpdate' :actionUpdate ,
    'actionInsert' :actionInsert ,
    'actionInsertSelect' :actionInsertSelect,
    'actionProcedure' :actionProcedure,
    'actionSelect' :actionSelect ,
    'actionSelects' :actionSelects ,
    'MAESTROS_CLIENTES' :'GET_MAESTROS_CLIENTES',
    'actionBuscarPaisesOdoo' : 'BUSCAR_ODOO_PAIS',
    'actionBuscarStatesOdoo' : 'BUSCAR_ODOO_DEP',
    'actionBuscarCiudadOdoo' : 'BUSCAR_ODOO_CIUDAD',
    'actionTipDoc' :actionTipDocOdoo,
    'actionCategoriasOdoo' :actionCategoriasdoo,
    'actionCategoriasPrdOdoo' :actionCategoriasPrddoo,
    'actionEmpresasOdoo' :actionEmpresasOdoo,
    'actionTitulosOdoo' :'BUSCAR_ODOO_TITULO_PERSONA',
    'actionBuscarLocacionesExternas' : 'BUSCAR_STOCK_LOCATION',
    'actionInsertPerfilUsuario' : actionInsertPerfilUsuario,
    'actionSelectPorUsuario' :actionSelectPorUsuario,
    'actionlogin' :actionlogin ,
    'actionValidarKeylogin' :validarLlave,
    'actionSelCajaXuser' :actionSelectCajasPorUsuario, 
    'actionCambioCajaDocumento' :actionCambioCajaDocumento, 
    'actionConfirmar' :actionConfirmar ,
    'actionUsuario' :actionUsuario ,
    'insert_orden_pregunta' :insert_orden_pregunta ,
    'generarPDF' :generarPDF ,
    'resultadoSimulacro' :resultadoSimulacro ,
    'cambioContrasena' :cambioContrasena     ,
    'buscarProducto' :actionBuscarProducto    ,
    'actionChangeDocumentos' : actionChangeDocumentos , 
    'actionStockMove' : STOCK_MOVE ,
    'actionStockMoveDevolucion' : STOCK_MOVE_DEVOLUCION ,





    'actionSelectClienteOdoo' : 'BUSCAR_ODOO_CLIENTES' ,
    'actionCrearClienteOdoo' : 'CREAR_CLIENTE_NUEVO_ODOO',
    'actionCrearClienteOdooPlusDoc' : 'CREAR_CLIENTE_NUEVO_ODOO_PLUS_DOC',
    'actionActualizarClienteOdoo' : 'ACTUALIZAR_CLIENTE_ODOO',
    'actionPasarClienteAControl' : 'CREAR_CLIENTE_ODOO_A_CONTROL'
    }