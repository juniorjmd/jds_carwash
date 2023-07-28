import { Component, OnInit } from '@angular/core';
import { MaestroClienteServices } from '../../services/MaestroCliente.services';


@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {

  tipo_direccion:any[];
  companias:any[] ;
  Provincias:any[];
  titulos:any[];
  categorias:any[];
  tipo_identificacion:any[];
  constructor( private MaestroClienteServices :MaestroClienteServices ) {  
  }


  ngOnInit(): void {
  }

}
