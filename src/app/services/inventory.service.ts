import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpFileOptions, httpOptions, url } from '../models/app.db.url';
import { fileProcessResponse } from '../interfaces/file_procces_response.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly validateUrl = url.csv_manager; 

  private readonly inventarioUrl = url.inventario; 
  constructor(private readonly http: HttpClient) {}
//url.action , datos, httpOptions()
  validateFile(formData: FormData): Observable<fileProcessResponse> {  
    formData.append('action', 'VALIDACION_ARCHIVO_PRODUCTOS'); // Añadir el campo 'action'
    console.log(formData , this.validateUrl); 
    return this.http.post<fileProcessResponse>(this.validateUrl, formData ,httpFileOptions() );
  }

  processFile(_llave_de_carga: string|null): Observable<void> {
    let formData: FormData = new FormData();  
    formData.append('action', 'CARGUE_PRODUCTOS_POR_CSV'); // Añadir el campo 'action'
    formData.append('_llave_de_carga', _llave_de_carga!); // Añadir el campo 'action'
    console.log(formData , this.validateUrl); 
    return this.http.post<void>(this.validateUrl, formData ,httpFileOptions() );
  }

}
