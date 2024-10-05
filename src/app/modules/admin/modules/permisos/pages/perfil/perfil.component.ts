import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { DocumentoRequest, recursoRequest } from 'src/app/interfaces/producto-request';
import { Recurso } from 'src/app/interfaces/recurso';
import { Perfil } from 'src/app/interfaces/usuario.interface';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil', 
  templateUrl:'./perfil.component.html', 
  styleUrls: ['./perfil.component.css'], 
})
export class PerfilComponent implements OnInit  { 
  perfiles:Perfil[] = [];
  recursos:Recurso[]=[];
  constructor(
    private perfilService:usuarioService
  ){
  }
  ngOnInit(): void { 
this.perfilService.getArrayRecursos().subscribe({next:(value:recursoRequest)=>{
   
   

   for(let i= 0 ; i< value.numdata ; i++ )  {
    console.log('recursos ' + i , value.data[i]) 
    this.recursos.push(value.data[i]) 
   }  
   console.log('recursos' , this.recursos , Array.isArray(this.recursos));
    
}, error:e=>Swal.fire(JSON.stringify(e))
}
)
  }
  buscarRecursos(){}
}
