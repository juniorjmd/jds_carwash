import { Component, OnInit } from '@angular/core';
import { cajaModel } from 'src/app/models/cajas.model';
import { establecimientoModel } from 'src/app/models/establecimientos.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { loading } from 'src/app/models/app.loading';
import { select } from 'src/app/interfaces/generales.interface';
import { Establecimientos } from 'src/app/interfaces/establecimientos.interface';
import { caja } from 'src/app/interfaces/caja.interface';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { Contador } from 'src/app/interfaces/contador';

@Component({
  selector: 'app-contadores',
  templateUrl: './contadores.component.html',
  styleUrls: ['./contadores.component.css']
})
export class ContadoresComponent implements OnInit {
  tipContadores :TipoDocumento [] = [];
  contadores :Contador [] = [] ;
  cajas :cajaModel[]  = []; 
  newContador :  Contador;
  esta : establecimientoModel[];
  constructor( private serviceCaja : cajasServices ,    
    private loading : loading ) { 
      this.Cancelar();
      this.getTiposDocumentosConContadores();
     this.getEstablecimiento();
     this.getContadores();
      }
      ngOnInit(): void {
      }
      Cancelar(){
        this.newContador={
          tipoContador:0,
                id : 0,
                codContador :'',
                establecimiento : 0, 
                contador:0, 
                contador_real_establecimiento:0, 
                estado:0,
                nombreEstablecimiento:'',
                nombre_estado :'',    
                desde :1    ,
                hasta : 1000      };
        
         
      }
      getTiposDocumentosConContadores(){
        this.tipContadores= [];
        this.serviceCaja.getTiposDocumentosConContadores()
         .subscribe(
          (datos:select)=>{
             console.log(datos);
             this.esta = [];   
        if (datos.numdata > 0 ){ 
          
          datos.data.forEach((dato:TipoDocumento , index )=>{
            this.tipContadores[index] = dato;
          })  
        }
    
            this.loading.hide()
          } ,
          error => {this.loading.hide();
            
            this.tipContadores = [];
            alert( error.error.error);
          }
          );
      }
      getEstablecimiento(){
        this.newContador.establecimiento = 0;
        this.serviceCaja.getEstablecimientos()
         .subscribe(
          (datos:select)=>{
             console.log('datos establecimientos',datos);
             this.esta = [];   
        if (datos.numdata > 0 ){ 
          
          datos.data.forEach((dato:Establecimientos , index )=>{
            this.esta[index] =  dato ;
          }) 
          console.log(this.esta);
        }
    
            this.loading.hide()
          } ,
          error => {this.loading.hide();
            
        this.esta = [];
            alert( error.error.error);
          }
          );
      }
      setActualizaCaja(cajaActualizar : Contador){
        this.newContador = cajaActualizar ; 
      }
    getContadores(){ 
      this.contadores = [];
      this.loading.show()
      this.serviceCaja.getContadores()
         .subscribe(
          (datos:select)=>{
             console.log(datos);
             
        if (datos.numdata > 0 ){ 
          datos.data.forEach((dato:Contador  , index )=>{ 
            this.contadores[index] = dato ;
          }) 
          console.log(this.contadores);
        }else{
          this.contadores = [];
        }
    
            this.loading.hide()
          } ,
          error => {this.loading.hide();
            alert( error.error.error);
          }
          );
    }
    
    
     
       guardarContador(){ 
       if (typeof(this.newContador.codContador) === 'undefined'){
        this.loading.hide();
        alert('Debe ingresar el codigo para el contador');
        return;
       } 
       if (this.newContador.establecimiento === 0){
        this.loading.hide();
        alert('Debe escoger el establecimiento');
        return;
       }
       if (this.newContador.tipoContador === 0){
        this.loading.hide();
        alert('Debe escoger el tipo de contador');
        return;
       }
       
       this.loading.show(); 
       this.serviceCaja.setConsecutivo(this.newContador).subscribe(
        (respuesta:any)=>{console.log(respuesta)
         
        if (respuesta.error === 'ok'){
          alert('datos ingresados con exito');  
          this.Cancelar();
          this.getContadores();
        }else{
          alert(respuesta.error);
          this.loading.hide();
        }
        },
        error => {this.loading.hide();
          alert( error.error.error);
          this.loading.hide();
        }
    
       )
      }
     
    
    }