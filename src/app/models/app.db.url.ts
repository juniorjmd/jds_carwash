import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { firstValueFrom } from 'rxjs';

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
export let url:any = { }

export let printer :any= {  
}



export async function loadConfig(http: HttpClient) {
  const config = await firstValueFrom(http.get<any>('assets/config.json'));
  
  const baseURL = config.baseURL;
  const endpoints = config.endpoints;

  // Reemplazar las constantes con los valores del JSON 
    url = { 
        'httpOptionsSinAutorizacion':httpOptionsSinAutorizacion,
        'action':  baseURL + endpoints.action,
        'actionDocumentos': baseURL + endpoints.actionDocumentos,
        'actionAdmin':baseURL + endpoints.admin,
        'actionVentas':  baseURL + endpoints.actionVentas ,
        'brand': baseURL + endpoints.brand,
        'datosIniciales':baseURL + endpoints.datosIniciales,
        'login': baseURL + endpoints.login,
        'inventario': baseURL + endpoints.inventario
      };
      printer = config.printer ;
}

