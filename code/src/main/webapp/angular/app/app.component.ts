import {Component,bind} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {SearchFormComponent} from './search-form.component';
import {LogStateComponent} from './logState.component';

    
@Component({
      selector: 'storii-app',
      templateUrl:`app/start/start.html`,
      directives: [ROUTER_DIRECTIVES],
      providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
	{ path: '/', name: 'Search', component: SearchFormComponent, useAsDefault: true},
	{ path: '/login', name: 'Login', component: LoginComponent},
    { path: '/register', name: 'Register', component: RegisterComponent}
  ])

export class AppComponent {
 	libelleImageUrl = '../../assets/files/libelle.jpg';
 	logoImageUrl = '../../assets/files/logo.jpg';
}