import { HttpHeaders } from '@angular/common/http'; 

const action = 'https://services.carwash.sofdla.com.co/services/view/action/';
const inventario = 'https://services.carwash.sofdla.com.co/services/view/action/inventario/';
const actionDoc = 'https://services.carwash.sofdla.com.co/services/view/action/documentos/';
const actionVentas = 'https://services.carwash.sofdla.com.co/services/view/action/ventas/';
const admin  = 'https://services.carwash.sofdla.com.co/services/view/action/admin/';
const login = 'https://services.carwash.sofdla.com.co/services/view/action/login/';
const datosIniciales = 'https://services.carwash.sofdla.com.co/services/view/action/datosiniciales/';
const brand = 'https://services.carwash.sofdla.com.co/services/view/action/brand/';

const httpOptionsSinAutorizacion = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'  
})
}; 

export let httpOptions = ()=>{
  return {
    headers: new HttpHeaders({
      'Content-type': 'application/json' ,
      'Authorization' : 'Bearer ' + localStorage.getItem('sis41254#2@')! 
  }) 
  }
}
export const url = { 
    'httpOptionsSinAutorizacion':httpOptionsSinAutorizacion,
    'action': action,
    'actionDocumentos': actionDoc,
    'actionAdmin':admin,
    'actionVentas':  actionVentas ,
    'brand': brand,
    'datosIniciales':datosIniciales,
    'login': login,
    'inventario': inventario
    
}

export const printer = { 
  'namePrinterGenerico': 'impresora_punto_de_venta' 
}

