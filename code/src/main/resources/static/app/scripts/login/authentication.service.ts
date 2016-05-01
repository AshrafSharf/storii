import {Jsonp, URLSearchParams} from 'angular2/http';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class AuthenticationService {
  	private loggedIn = false;
  
  	constructor (private http: Http) {
   		this.loggedIn = !!localStorage.getItem('auth_token');
   	}

 
  login (username,password) {
  
  	let headers = new Headers();  
    var _resultUrl = '/user/login'; 
    var string = username +":"+ password; 
    var token = "Basic " + btoa(string);
    
    headers.append('Authorization',token);
    console.log(token);

    return this.http.get(_resultUrl, { headers })
    				.map(res => res.json())
    				.map((res) => {
					        if (res.login) {		 
					          localStorage.setItem('auth_token',token);
					          this.loggedIn = true;
			        		}
			        		 return res.login;
					});
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }
  
  isLoggedIn() {
  	return !!localStorage.getItem("auth_token");
  }
  
}
