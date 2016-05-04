import {bootstrap}        from 'angular2/platform/browser';
import {RequestOptions, RequestMethod, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent}     from './app.component';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,APP_BASE_HREF} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

import 'rxjs/Rx';



bootstrap(AppComponent, 
	[HTTP_PROVIDERS, 
	ROUTER_PROVIDERS, 
	provide(LocationStrategy, {useClass: HashLocationStrategy}),
	provide(APP_BASE_HREF, {useValue: '/'}),
	//provide(RequestOptions, {useClass: MyOptions})
	])
	.catch(err => console.error(err));
	
