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
    headers.append('Content-Type', 'application/json');
    var _resultUrl = ''; 
    var string = btoa(username)+":"+btoa(password); 
    var token =btoa(string);
    localStorage.setItem('auth_token',token);

    /*return this.http.post(_resultUrl, JSON.stringify({ username, password }), { headers })
    				.map(res => res.json())
    				.map((res) => {
					        if (res.success) {
					          var token =btoa(btoa(username) + ":" + btoa(password))
					          localStorage.setItem('auth_token',token);
					          this.loggedIn = true;
			        		}
        					return res.success;
					});*/
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
 
    /*
    return this.http.get(this.config.serverUrl + '/auth/logout', {
      headers: new Headers({
        'x-security-token': this.token
      })
    })
    .map((res : any) => {
      this.token = undefined;
      localStorage.removeItem('token');
    });
     */
  }
  
  isLoggedIn() {
  	return !!localStorage.getItem("auth_token");
  }
  
}
