import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, of, tap } from 'rxjs';
import { DocumentoCierreRequest } from 'src/app/interfaces/producto-request';
import { ValuesFormuGasto } from 'src/app/interfaces/valuesFormularios';
import { loading } from 'src/app/models/app.loading';
import { DocumentosModel } from 'src/app/models/ventas/documento.model';
import { DocumentoService } from 'src/app/services/documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-new-gasto',
  templateUrl: './new-gasto.component.html',
  styleUrls: ['./new-gasto.component.css']
})
export class NewGastoComponent {


  gastoForm?: FormGroup;
  private fb = inject(FormBuilder);
  private documentoService = inject(DocumentoService);
  private loading = inject(loading); 
  private dialogo=inject( MatDialogRef<NewGastoComponent>);
  private newGasto?:ValuesFormuGasto;
  private response = {result : false , documento : new DocumentosModel()} ;
  ngOnInit(): void {
    this.gastoForm = this.fb.group({
      nombre: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      descripcion: ['', Validators.required]
    });
  }
  crearDocumento() {
    if(this.newGasto != undefined){
    this.loading.show();
    this.documentoService.crearDocumentoGasto  
    (this.newGasto).pipe(
      tap((respuesta: DocumentoCierreRequest) => {
        console.log('crearDocumento', respuesta); 
        if (respuesta.error == 'ok') {
          this.response.result = true;
          this.response.documento = respuesta.data.documentoFinal
          this.dialogo.close(this.response);
        } else {
          try {
            Swal.fire(respuesta.error, '', 'error');
           } catch (error : any) {
            Swal.fire('error en el servidor', '', 'error');
           }
        }
        this.loading.hide(); 
      }),
      catchError((error: any) => {
        this.loading.hide(); 
        try {
          Swal.fire(error.error.error, '', 'error');
         } catch (error : any) {
          Swal.fire('error en el servidor', '', 'error');
         }
        return of(null);
      })
    ).subscribe({
      next: () => {},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('crearDocumento completo')
    });}
  }

  onSubmit(): void {
    if (this.gastoForm?.valid) {
      console.log(this.gastoForm.value);
      this.newGasto = this.gastoForm.value;
      this.crearDocumento();
    }


  }
}
