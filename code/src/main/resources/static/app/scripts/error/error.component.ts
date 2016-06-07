import {Component } from 'angular2/core';
import { Router} from 'angular2/router';


declare var jQuery: any;
declare var vex: any;

@Component({
  selector: 'error',
  templateUrl: `app/html/error/error.html`,
  styles:['a {cursor: pointer}']
  
})

export class ErrorComponent {
   
    
    constructor(
    private _router: Router) {}

    goToSearch(){
       this._router.navigate(['Search']); 
    }
      
     
 
}
