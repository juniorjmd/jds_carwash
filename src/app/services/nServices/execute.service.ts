import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ExecuteService {
  public crearNuevoDocumento$ = new BehaviorSubject<boolean>(false);
  public optenerListadoInventarios$ = new BehaviorSubject<boolean>(false);
  public cerrarModalInventario$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}
