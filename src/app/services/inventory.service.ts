import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpFileOptions, httpOptions, url } from '../models/app.db.url';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly validateUrl = url.csv_manager; 

  private readonly inventarioUrl = url.inventario; 
  constructor(private readonly http: HttpClient) {}
//url.action , datos, httpOptions()
  validateFile(formData: FormData): Observable<string[]> {  
    formData.append('action', 'VALIDACION_ARCHIVO_PRODUCTOS'); // Añadir el campo 'action'
    console.log(formData , this.validateUrl); 
    return this.http.post<string[]>(this.validateUrl, formData ,httpFileOptions() );
  }

  processFile(formData: FormData): Observable<void> { 
    formData.append('action', 'VALIDACION_ARCHIVO_PRODUCTOS'); // Añadir el campo 'action'
    return this.http.post<void>(this.inventarioUrl, formData ,httpOptions() );
  }

}
