import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Injectable}     from 'angular2/core';

@Injectable()
export class HttpClient {
  constructor(http: Http) {
  }
 
  createHeader(headers:Headers) {
  	var string = localStorage.getItem("auth_token");
    headers.append('Authorization', string); 
    return headers; 
  }
  
  }