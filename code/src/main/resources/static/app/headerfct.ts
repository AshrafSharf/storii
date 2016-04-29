import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Injectable}     from 'angular2/core';

@Injectable()
export class HttpClient {
  constructor(http: Http) {
  }
 
  createHeader(headers:Headers) {
  	var string = localStorage.getItem("auth_token");
	var headerParts = atob(string).split(":");
	var name = atob(headerParts[0]);
	var pw = atob(headerParts[1]);
    headers.append('Authorization',name+':'+pw); 
    return headers; 
  }
  
  }