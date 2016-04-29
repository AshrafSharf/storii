import {bootstrap}        from 'angular2/platform/browser';
import {RequestOptions, RequestMethod, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent}     from './app.component';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,APP_BASE_HREF} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

import 'rxjs/Rx';
/*
 class MyOptions extends RequestOptions {
      constructor() {
      	if (localStorage.getItem("auth_token") != null) {
      		var string = localStorage.getItem("auth_token");
      		var headerParts = atob(string).split(":");
      		var name = atob(headerParts[0]);
      		var pw = atob(headerParts[1]);
 			super({ 
          		method: RequestMethod.Get,
         		headers: new Headers({
            	'Content-Type': 'application/json',
            	'header': name+":"+pw
	          	}),
      		});   
      	}  
      }
  }
*/
/*var headerParts = atob(localStorage.getItem("auth_token")).split(':');
      		var name = atob(headerParts[0]);
      		var pw = atob(headerParts[1]);
      		var header = name +':'+pw;*/


bootstrap(AppComponent, 
	[HTTP_PROVIDERS, 
	ROUTER_PROVIDERS, 
	provide(LocationStrategy, {useClass: HashLocationStrategy}),
	provide(APP_BASE_HREF, {useValue: '/'}),
	//provide(RequestOptions, {useClass: MyOptions})
	])
	.catch(err => console.error(err));
	
