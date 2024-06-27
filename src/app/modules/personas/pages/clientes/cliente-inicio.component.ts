import { Component, OnInit } from '@angular/core';

import { ClientesService, cliente } from 'src/app/services/Clientes.services';

import { loading } from 'src/app/models/app.loading';  
import { ClientesModule } from 'src/app/models/clientes/clientes.module';
@Component({
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.css']
})
export class ClienteInicioComponent implements OnInit {
  clientes:ClientesModule[] = [];
  constructor(public loading : loading, private ClienteService:ClientesService) { 
    this.getClientesOdoo() 

  }

  ngOnInit(): void {
   // this.clientes= this.ClienteService.getDatosIniClientes()
  }
  getClientesOdoo(){
    this.loading.show();
    this.ClienteService.getClientes().subscribe( {next:(respuesta:any)=>{ 
       console.log('cerrarDocumento',respuesta); 
       if (respuesta.error === 'ok'){ 
        console.log(respuesta);
        this.clientes = respuesta.data ;  
       }else{
         alert(respuesta.error);
       }
},error:error=>{console.error(error)} ,complete:()=> this.loading.hide()} )
  }
}
