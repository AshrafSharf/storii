import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Injectable}     from 'angular2/core';

@Injectable()
export class HttpClient {
  constructor(http: Http) {
  }
 
  createHeader(headers:Headers) {
  	var string = localStorage.getItem("auth_token");
	var headerParts = string.split(" ");
	var token = atob(headerParts[1]).split(":");
	var name = headerParts[0];
	var pw = headerParts[1];
    headers.append('Authorization',name+':'+pw); 
    return headers; 
  }
  
  }