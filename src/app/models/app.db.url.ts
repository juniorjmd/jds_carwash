import { HttpHeaders } from '@angular/common/http'; 

const action = 'https://jdscw.services.sofdla.com.co/';
const login = 'https://jdscw.services.sofdla.com.co/login/';
const datosIniciales = 'https://jdscw.services.sofdla.com.co/datosiniciales/';
const brand = 'https://jdscw.services.sofdla.com.co/brand/';


const httpOptionsSinAutorizacion = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'  
})
}; 

export let httpOptions = ()=>{
  return {
    headers: new HttpHeaders({
      'Content-type': 'application/json' ,
      'Authorization' : localStorage.getItem('sis41254#2@')!
  })
  }
}
export const url = { 
    'httpOptionsSinAutorizacion':httpOptionsSinAutorizacion,
    'action': action,
    'brand': brand,
    'datosIniciales':datosIniciales,
    'login': login
    
}

export const printer = { 
  'namePrinterGenerico': 'impresora_punto_de_venta' 
}

