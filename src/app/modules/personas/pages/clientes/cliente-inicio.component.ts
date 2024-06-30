import { Component, OnInit } from '@angular/core';

import { ClientesService, cliente } from 'src/app/services/Clientes.services';

import { loading } from 'src/app/models/app.loading';  
import { ClientesModule } from 'src/app/models/clientes/clientes.module';
import { FndClienteComponent } from './fnd-cliente/fnd-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
@Component({
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.css']
})
export class ClienteInicioComponent implements OnInit {
  clientes:ClientesModule[] = [];
  constructor(public loading : loading, private ClienteService:ClientesService,   private newAbrirDialog: MatDialog,) { 
    this.getClientesOdoo() 

  }
  mostrarCliente(cliente:ClientesModule){
    this.newAbrirDialog.open(FndClienteComponent,{data: { clienteIngreso : cliente , invoker:'clienteListado' } })
    .afterClosed()
    .pipe(
      tap((confirmado: Boolean)=>{
        if (confirmado) {  
           
        }
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('buscarCliente completo')
    }); 
  }
  ngOnInit(): void {
    this.ClienteService.currentUsuario.subscribe((usuario) => { let cliente = usuario ; 
      if(cliente)   this.getClientesOdoo();
    });
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
