import {Component,bind} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import {LoginComponent} from './login.component';
import { Router } from 'angular2/router';
import {RegisterComponent} from './register.component';
    
@Component({
      selector: 'logState',
      templateUrl:`app/logState.html`,
      styles:['a {cursor: pointer}']
})


export class LogStateComponent {

 constructor(private _router: Router) { }

  gotoLogin() {
    this._router.navigate(['Login']);
  }
  
  gotoRegister() {
    this._router.navigate(['Register']);
  }
 
}