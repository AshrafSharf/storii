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
    
  getTokenSplitted(){
  	var string = localStorage.getItem("auth_token");
	var headerParts = string.split(" ");
	var getToken = atob(headerParts[1]).split(":");
	return getToken;
  }
  
  changePasswordInToken(user,pw){
  	localStorage.removeItem('auth_token');
	 var s = user +":"+ pw; 
	 var setToken = "Basic " + btoa(s);
	 localStorage.setItem('auth_token',setToken);
  }
  
  changeUserNameInToken(username,pw){
  	localStorage.removeItem('auth_token');
	 var s = username +":"+ pw; 
	 var setToken = "Basic " + btoa(s);
	 localStorage.setItem('auth_token',setToken);
  }
  
  
  }