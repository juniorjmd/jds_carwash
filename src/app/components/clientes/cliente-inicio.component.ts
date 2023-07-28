import { Component, OnInit } from '@angular/core';
import { ClientesService, cliente } from '../../services/Clientes.services';

import { loading } from 'src/app/models/app.loading';
import { select } from 'src/app/interfaces/generales.interface';
import { ClientesOdoo } from 'src/app/interfaces/clientes-odoo';
@Component({
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.css']
})
export class ClienteInicioComponent implements OnInit {
  clientes:ClientesOdoo[];
  constructor(public loading : loading, private ClienteService:ClientesService) { 
    this.getClientesOdoo() 

  }

  ngOnInit(): void {
   // this.clientes= this.ClienteService.getDatosIniClientes()
  }
  getClientesOdoo(){
    this.loading.show();
    this.ClienteService.getClientesOdoo().subscribe((respuesta:select)=>{
      let cont = 0;
      
       console.log('cerrarDocumento',respuesta); 
       if (respuesta.error === 'ok'){ 
        console.log(respuesta);
        this.clientes = respuesta.data ; 
       
       }else{
         alert(respuesta.error);
       }
       this.loading.hide();
       

} )
  }
}
