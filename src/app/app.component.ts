import { Component } from '@angular/core';
import { Globals } from 'src/globales';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ Globals ] 
})
export class AppComponent {
  

  llaveIncio:string; 
  constructor( private globals: Globals, private titleService: Title   ){
   
    this.llaveIncio = '';
    this.titleService.setTitle('Control Total 2.0');
    
  }
 
}