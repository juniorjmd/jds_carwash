import { Injectable } from '@angular/core'; 
import { ciudad, datosMaestros, departamento, maestros, maestroSelect, pais } from '../interfaces/maestros.interface';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { HttpClient } from '@angular/common/http';
import { TABLA } from '../models/app.db.tables';
import { DepartamentoModel, PaisModel , CiudadModel } from '../models/maestros.model';
import { select } from '../interfaces/generales.interface';

import { loading } from 'src/app/models/app.loading';  


@Injectable({
    providedIn: 'root'
})
export class MaestroClienteServices {
    private MaestrosCliente:maestros[] =[] ;
    ciudades: ciudad[]=[];
    departamentos: departamento[]=[];
    paises: pais[]=[]; 
    finP1 : boolean = false ;


    constructor(private http: HttpClient ,
        private loading : loading ){ 
        console.log('servicios datos iniciales inicializado');  
    }
    getCiudades(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.ciudades
                    };
        console.log('servicios de maestro - ciudades ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getCiudadesPorDepartamento(id:number){
        
        let where =   [{"columna" : "cod_departamento" , "tipocomp" : "=" , "dato" : id }];
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.ciudades ,
                     "_where" : where
                    };
        console.log('servicios de maestro - ciudad ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getCiudadesPorDepartamentoOdoo(id:number){
        let datos = {"action": actions.actionBuscarCiudadOdoo ,"_state_id" : id};
        console.log('getCiudadesPorDepartamentoOdoo' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ; 
    }
    setCiudades( ciudad:CiudadModel){
        let  arraydatos = { "cod_pais" : ciudad.cod_pais , "nombre" : ciudad.nombre ,
        "cod_departamento" : ciudad.cod_departamento,
        "cod_ciudad" : ciudad.cod_ciudad, 
        "cod_dane" : ciudad.cod_dane }


        let datos = {"action": actions.actionInsert ,
        "_tabla" : TABLA.ciudades,
        "_arraydatos" : arraydatos
       };
       console.log(datos);
       
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    actualizarCiudades(ciudad:CiudadModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : ciudad.id }]
        let  arraydatos = { "cod_pais" : ciudad.cod_pais , "nombre" : ciudad.nombre ,
        "cod_departamento" : ciudad.cod_departamento,
        "cod_ciudad" : ciudad.cod_ciudad, 
        "cod_dane" : ciudad.cod_dane }
        let datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.ciudades,
        "_where" : where ,
        "_arraydatos" : arraydatos
       };
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    
    eliminarCiudades(ciudad:CiudadModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : ciudad.id }];
        let datos = {"action": actions.actionDelete ,
        "_tabla" : TABLA.ciudades,
        "_where" : where  
       };
        return this.http.post(url.action , datos, httpOptions()) ;
    }
/////////////////////////////////////////////////

 PadLeft(value:any, length:number):string {
    return (value.toString().length < length) ? this.PadLeft("0" + value, length) : 
    value;
}

    getDepartamentos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.departamento
                    };
        console.log('servicios de maestro - departamento ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getDepartamentosPorPais(id:any){
        
        let where =   [{"columna" : "cod_pais" , "tipocomp" : "=" , "dato" : id[0] }];
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.departamento ,
                     "_where" : where
                    };
        console.log('servicios de maestro - departamento ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getPaises(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : TABLA.pais
                    };
        console.log('servicios de maestro - paises ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }


    getPaisesOdoo(){
        let datos = {"action": actions.actionBuscarPaisesOdoo};
        console.log('servicios de maestro - paises ' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    getDepartamentosPorPaisOdoo(pais_id:any){

        let datos = {"action": actions.actionBuscarStatesOdoo ,
                     "_id_pais" : pais_id};
        console.log('getDepartamentosPorPaisOdoo' ,url.action , datos, httpOptions());
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    setPaises( pais:PaisModel){
        let  arraydatos = {   "cod_pais" : pais.cod_pais.toUpperCase() , "nombre" : pais.nombre }
        let datos = {"action": actions.actionInsert ,
        "_tabla" : TABLA.pais,
        "_arraydatos" : arraydatos
       };
       console.log(datos);
       
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    actualizarPaises(pais:PaisModel){ 
        let where =   [{"columna" : "ID" , "tipocomp" : "=" , "dato" : pais.id }]
        let  arraydatos = { "cod_pais" : pais.cod_pais , "nombre" : pais.nombre }
        let datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.pais,
        "_where" : where ,
        "_arraydatos" : arraydatos
       };
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    
    eliminarPaises(pais:PaisModel){ 
        let where =   [{"columna" : "ID" , "tipocomp" : "=" , "dato" : pais.id }];
        let datos = {"action": actions.actionDelete ,
        "_tabla" : TABLA.pais,
        "_where" : where  
       };
        return this.http.post(url.action , datos, httpOptions()) ;
    }
    ///departamentos
    
    setDepartamentos( dep:DepartamentoModel){
        let  arraydatos = { "id":dep.id,
          "cod_pais" : dep.cod_pais , "nombre" : dep.nombre }
        let datos = {"action": actions.actionInsert ,
        "_tabla" : TABLA.departamento,
        "_arraydatos" : arraydatos
       };
       console.log(datos);
       
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    actualizarDepartamentos( dep:DepartamentoModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : dep.id }];
        let  arraydatos = { "id": dep.id,
        "cod_pais" : dep.cod_pais , "nombre" : dep.nombre }
        let datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.departamento,
        "_where" : where ,
        "_arraydatos" : arraydatos
       };
        return this.http.post(url.action , datos, httpOptions()) ;
    }

    eliminarDepartamento(dep:DepartamentoModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : dep.id }];
        let datos = {"action": actions.actionDelete ,
        "_tabla" : TABLA.departamento,
        "_where" : where  
       };
        return this.http.post(url.action , datos, httpOptions()) ;
    } 

    async  setMaestrosClientes_new(){
            let datos = {"action": actions.actionSelect ,
            "_tabla" : vistas.maestros
           };
          console.log('servicios maestro Cliente - maestros ' ,url.action , datos, httpOptions());
          return await    this.http.post(url.action , datos, httpOptions()).toPromise() ;
        }

        async  setTipoDocumentoOdoo(){
            let datos = {"action": actions.actionTipDoc  
           };
          console.log('servicios maestro Cliente - getTipoDoc ' ,url.action , datos, httpOptions());
          return await    this.http.post(url.action , datos, httpOptions()).toPromise() ;
        }
   
    private setMaestrosClientes(){
        let datos = {"action": actions.actionSelect ,
        "_tabla" : vistas.maestros
       };
      console.log('servicios maestro Cliente - maestros ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }

     setTiposDocumentos(){
        let datos = {"action": actions.actionTipDoc  };
      console.log('servicios maestro Cliente - setTiposDocumentos ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }
    setTitulos(){
        let datos = {"action": actions.actionTitulosOdoo  };
      console.log('servicios maestro Cliente - actionTitulosOdoo ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }
    
    setCategorias(){
        let datos = {"action": actions.actionCategoriasOdoo  };
      console.log('servicios maestro Cliente - actionCategoriasOdoo  ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }
    setCategoriasPrd(){
        let datos = {"action": actions.actionSelect ,  "_tabla" : vistas.categorias  };
      console.log('servicios maestro Cliente - actionCategoriasOdoo  ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }
    setMarcas(){
        let datos = {"action": actions.actionSelect ,  "_tabla" : vistas.marcas   };
      console.log('servicios maestro Cliente - actionBuscarMarcas  ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }
    setMarcasCatego(categoId:number){
        let datos = {"action": actions.actionBuscarMarcas ,
       "_categ":true ,
       "_data" : categoId };
      console.log('servicios maestro Cliente - actionBuscarMarcas  ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }
 setEmpresas(){
        let datos = {"action": actions.actionEmpresasOdoo  };
      console.log('servicios maestro Cliente - setTiposDocumentos ' ,url.action , datos, httpOptions());
       return this.http.post(url.action , datos, httpOptions()) ;
    }
    async getTipoDoc(){
        try {
            const maestroService = await  this.setTipoDocumentoOdoo();
            const retorno = await maestroService 
            console.log('retorno - getTipoDoc', retorno); 
            this.crearMaestrosDatos(retorno ,'asdfasdf');
           console.log('estoy en getTipoDoc',this.MaestrosCliente);
        } catch (error : any) {
            throw new Error(`Error al leer getTipoDoc : ${error}`);
          }}
          
    async getMaestrosClientes(){
        try {
            const maestroService = await  this.setMaestrosClientes_new();
            const retorno = await maestroService 
            console.log('retorno', retorno); 
            this.crearMaestrosDatos(retorno);
           console.log('estoy en pruebaget',this.MaestrosCliente);
        } catch (error : any) {
            throw new Error(`Error al leer maestros : ${error}`);
          }}

    crearMaestrosDatos(datos:any , tipo:any = null){ 
        this.finP1 = true; 
        this.MaestrosCliente = [];
         console.log('crearMaestrosDatos',datos);
         let idActual = 0;
         datos.data!.forEach((datoMaestro:maestroSelect)=>{
            if (idActual !== datoMaestro.id){
                idActual = datoMaestro.id;
                if ( tipo  !== null){
                    this.MaestrosCliente.push(
                        {
                            "id" :  this.MaestrosCliente.length ,
                            "nombre" : 'tipo_doc',
                            "descripcion" : datoMaestro.display_name!  ,
                            "datos" :[]
                        }
                    )

                }else{
                this.MaestrosCliente.push(
                    {
                        "id" : datoMaestro.id ,
                        "nombre" : datoMaestro.id_maestro! ,
                        "descripcion" : datoMaestro.descripcion  ,
                        "datos" :[]
                    }
                ) }
            }
            const isLargeNumber = (element:any) => element.id === datoMaestro.id ; 
            if (typeof(datoMaestro.id_maestro) === 'undefined'){

                this.MaestrosCliente[this.MaestrosCliente.findIndex(isLargeNumber)].datos!.push({ "dato" :datoMaestro.id , "label" : datoMaestro.display_name!} )

            }else{
            this.MaestrosCliente[this.MaestrosCliente.findIndex(isLargeNumber)].datos!.push({ "dato" :datoMaestro.dato ,
            "label" : datoMaestro.label} )}


         })
         
        console.log('esto es maestro cliente ' , this.MaestrosCliente);
        
            this.loading.hide(); 
            return true;
     };

    
        /*
        this.MaestrosCliente =[
            {
            id : 1 ,
            nombre : "tipo_direccion" ,
            descripcion : "tipos de direccion"   ,
            datos:[
                {dato : 'contact' ,
                    label : 'Contacto' } ,
                    {dato : 'invoice' ,
                        label : 'Direccion de Factura' },
                        {dato : 'delivery' ,
                            label : 'Direcion de entrega' },
                            {dato : 'other' ,
                                label : 'Otra direccion' },
                                {dato : 'private' ,
                                    label : 'Direccion Privada' }]
        },
        {
            id : 2 ,
            nombre : "compania" ,
            descripcion : "Compañia padre"   ,
            datos:[
                {dato : 1 ,
                    label : 'compañia 1' } ,
                    {dato : 2 ,
                        label : 'compañia 2' },
                        {dato : 3 ,
                            label : 'Compañia 3' },
                            {dato : 4 ,
                                label : 'Compañia 4' },
                                {dato : 5 ,
                                    label : 'Compañia 5' }]
        },
        {
            id : 3 ,
            nombre : "provincias" ,
            descripcion : "provincias"   ,
            datos:[
                {dato : 1 ,
                    label : 'provincia 1' } ,
                    {dato : 2 ,
                        label : 'provincia 2' },
                        {dato : 3 ,
                            label : 'provincia 3' },
                            {dato : 4 ,
                                label : 'provincia 4' },
                                {dato : 5 ,
                                    label : 'provincia 5' }]
        },
        {
            id : 4 ,
            nombre : "titulos" ,
            descripcion : "titulos"   ,
            datos:[
                {dato : 1 ,
                    label : 'titulos 1' } ,
                    {dato : 2 ,
                        label : 'titulos 2' },
                        {dato : 3 ,
                            label : 'titulos 3' },
                            {dato : 4 ,
                                label : 'titulos 4' },
                                {dato : 5 ,
                                    label : 'titulos 5' }]
        },
        {
            id : 5 ,
            nombre : "categorias" ,
            descripcion : "categorias"   ,
            datos:[
                {dato : 1 ,
                    label : 'categorias 1' } ,
                    {dato : 2 ,
                        label : 'categorias 2' },
                        {dato : 3 ,
                            label : 'categorias 3' },
                            {dato : 4 ,
                                label : 'categorias 4' },
                                {dato : 5 ,
                                    label : 'categorias 5' }]
        },
        {
            id : 6 ,
            nombre : "tipo_identificacion" ,
            descripcion : "tipo de identificacion"   ,
            datos:[
                {dato : 'CC',
                    label : 'Cedula' } ,
                    {dato : 'NIT' ,
                        label : 'NIT' },
                        {dato : 'TI' ,
                            label : 'Tarj. Ident.' },
                            {dato : 'PP' ,
                                label : 'Pasaporte' }]
        }


    
    
    ];*/ 
      
    

 
       getMaestroClientes(nomMaestro:string):any{ 
         console.log('getMaestroClientes ',this.MaestrosCliente, nomMaestro);
         let datosRetorno:any = []; 
            this.MaestrosCliente!.forEach(
                (value )=>{
                console.log('getMaestroClientes',value ,value.nombre, nomMaestro);
                 if(value.nombre === nomMaestro){   
                    console.log('envio' , value);  
                    datosRetorno =  value.datos;
                }
                
            });
            return datosRetorno ; 
    }
}
 
