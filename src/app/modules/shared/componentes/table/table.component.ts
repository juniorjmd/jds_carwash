import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
 
import 'datatables.net-bs5'; 
import { ColumnasTabla } from 'src/app/interfaces/nInterfaces/columnas-tabla';
import { UpdateLineService } from 'src/app/services/nServices/update-line.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , AfterViewInit {
  @Input()
  datosTabla!: any[];
  @Input()
  columnasTabla!:ColumnasTabla[];
  @Input()
  origen!:string; 

  @ViewChild('dataTable', { static: true }) table!: ElementRef;
  dataTable: any;

  datoNuevo:string = ''; 
  showEditCol :any[][] = [] ;

  constructor( private updLinea : UpdateLineService){
   console.log('tableComponent' , this.datosTabla);
  }
  ngOnInit() {
  this.cerrarEdicionAll();
   console.log('inicio tabla')
    console.log(this.datosTabla);
    $(this.table.nativeElement).DataTable(); 
  }
cerrarEdicionAll(){
  this.datosTabla.forEach((dato,  index )=>{
    if (!this.showEditCol[index]) {
      this.showEditCol[index] = [];
    }
    this.columnasTabla.forEach((col , index2)=>{
      if (! this.showEditCol[index][index2]) {
        this.showEditCol[index][index2] = [];
      }
      this.showEditCol[index][index2].showEdit = false;
      this.showEditCol[index][index2].readOnly = false;
    })
  })
}


 
ngAfterViewInit() {
  this.dataTable = $(this.table.nativeElement);
  this.dataTable.DataTable();
}
ngOnDestroy() {
  if (this.dataTable) {
    this.dataTable.DataTable().destroy();
  }
}


enviarDatoNuevo(indexDatosTabla:number , indexItem:number , origen:string){
  this.showEditCol[indexDatosTabla][indexItem].readOnly = true;
  console.log('enviarDatoNuevo', this.datosTabla[indexDatosTabla] , 
  this.columnasTabla[indexItem] , origen  , this.datoNuevo);
  var datolinea = this.datosTabla[indexDatosTabla];
  var nombreCambio:string = this.columnasTabla[indexItem].name;
  datolinea[nombreCambio] =  this.datoNuevo;
  this.updLinea.editRegistro(datolinea.id , datolinea , origen).subscribe(
    { next:(response)=>{
      console.log('editar linea respuesta',response);
      this.showEditCol[indexDatosTabla][indexItem].showEdit = false;
      
    } , 
  
     error:(error)=>{console.error(error)}}
  )

}
eliminarElemento(elementoEliminar:any , index:number){
  console.error('elemento a eliminar' , elementoEliminar);
  Swal.fire({
    title: '¿Realmente desea eliminar este item?',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

  this.updLinea.deleteRegistro(elementoEliminar.id,this.origen).subscribe( { next:(response:any)=>{
    console.log('eliminar linea respuesta',response); 
    Swal.fire('Eliminar Registro',response.message, 'success');
    this.datosTabla.splice(index, 1); 
    if (this.dataTable) this.dataTable.DataTable().destroy();
    this.dataTable.DataTable(); 
  } , 
   error:(error)=>{console.error(error)
    Swal.fire('error', error , 'error');
  }}
)
}})

}
  editarItem(indexDatosTabla:number , indexItem:number , origen:string){
    this.cerrarEdicionAll();
    this.datoNuevo = '';
    console.log('datos de entrada ' , indexDatosTabla,indexItem, origen );
    
  console.log('editarItem' , this.columnasTabla[indexItem]);

    if(origen){
      console.log('origen',origen);
      
      if(this.columnasTabla[indexItem].editabe){ 
        
        this.showEditCol[indexDatosTabla][indexItem].showEdit = true;
        this.showEditCol[indexDatosTabla][indexItem].readOnly = false;
        this.datoNuevo =  this.datosTabla[indexDatosTabla][this.columnasTabla[indexItem].name]
        console.log('this.showEditCol',this.showEditCol);
      }
    }
  }

 
}
