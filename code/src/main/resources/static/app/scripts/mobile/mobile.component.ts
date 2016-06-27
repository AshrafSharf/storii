import {Component } from 'angular2/core';
import { Router} from 'angular2/router';

@Component({
  selector: 'mobile',
  templateUrl: `app/html/mobile/mobile.html`,
  styles:['a {cursor: pointer}']
  
})

export class MobileComponent {
   
    
    constructor(
    private _router: Router) {}

    goToSearch(){
       this._router.navigate(['Search']); 
    }
      
     
 
}
