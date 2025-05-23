import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FndClienteComponent } from '../../../shared/modals/fnd-cliente/fnd-cliente.component';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { CustomConsole } from 'src/app/models/CustomConsole';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  constructor(
        private newAbrirDialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  buscaCliente(evento:Event , texto : string){
    evento.preventDefault();
    CustomConsole.log(texto);
  }

  abrirBuscarCliente(){
    this.newAbrirDialog.open(FndClienteComponent,{data:{} })
    .afterClosed()
    .pipe(
      tap((confirmado: Boolean)=>{
        if (confirmado) {  
           
        }
      })
    ).subscribe({
      next: () => {},
      error: (error) => Swal.fire(JSON.stringify(error)),
      complete: () => CustomConsole.log('buscarCliente completo')
    });   
  }
  abrirCrearCliente(){
    this.newAbrirDialog.open(FndClienteComponent,{data:{invoker : 'nuevoCliente'} })
    .afterClosed()
    .pipe(
      tap((confirmado: Boolean)=>{
        if (confirmado) {  
           
        }
      })
    ).subscribe({
      next: () => {},
      error: (error) => Swal.fire(JSON.stringify(error)),
      complete: () => CustomConsole.log('buscarCliente completo')
    });   
  }
}
