import { Pipe, PipeTransform } from "@angular/core";
import { CustomConsole } from "src/app/models/CustomConsole";

@Pipe({
    name:'booleanP' ,
})


export class booleanpPipe implements PipeTransform {
    transform(srcImg:number| string | boolean ) {
        CustomConsole.log(srcImg)
        if (  srcImg  === '0' ){
            return  'No' ;
        }else{
            return  'Si' ; }
         
    }
}