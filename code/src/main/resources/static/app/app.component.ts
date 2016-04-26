import {Component,bind} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import {LoginComponent} from './scripts/login/login.component';
import {RegisterComponent} from './scripts/register/register.component';
import {SearchFormComponent} from './scripts/search/search-form.component';
import {ResultComponent} from './scripts/result/result.component';
import {LogStateComponent} from './scripts/logState/logState.component';


    
@Component({
      selector: 'storii-app',
      templateUrl:`app/html/start/start.html`,
      directives: [ROUTER_DIRECTIVES],
      providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
	{ path: '/', name: 'Search', component: SearchFormComponent, useAsDefault: true},
	{ path: '/login', name: 'Login', component: LoginComponent},
    { path: '/register', name: 'Register', component: RegisterComponent},
    { path: '/search', name: 'Result', component: ResultComponent}
    
  ])

export class AppComponent{
 	libelleImageUrl = 'app/assets/files/libelle.jpg';
 	logoImageUrl = 'app/assets/files/logo.jpg';
 	}