
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { loading } from 'src/app/models/app.loading';

@Component({
  selector: 'app-modal-update-producto-venta', 
  templateUrl: './ModalUpdateProductoVenta.component.html',
  styleUrls: ['./ModalUpdateProductoVenta.component.css'], 
})
export class ModalUpdateProductoVentaComponent { 

  
  constructor(public loading : loading,
     public dialogo: MatDialogRef<ModalUpdateProductoVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public item:DocumentoListado ){}
}
