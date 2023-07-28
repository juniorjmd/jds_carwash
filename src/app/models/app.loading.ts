export class loading {
     idLoadin:string = 'contenedor_pantalla_loading';
     classOculto:string = 'oculto';

    show(){
        let cont: HTMLElement = document.getElementById(this.idLoadin);
        cont.classList.remove(this.classOculto);
    }
    hide(){
        let cont: HTMLElement = document.getElementById(this.idLoadin);
        cont.classList.add(this.classOculto);
    }
    
}