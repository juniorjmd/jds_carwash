import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ul-link',
  templateUrl: './ul-link.component.html',
  styleUrls: ['./ul-link.component.css']
})
export class UlLinkComponent  {
@Input() menu:any ;

constructor(){ 
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 

}
}
