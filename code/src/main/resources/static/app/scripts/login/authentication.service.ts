import {Jsonp, URLSearchParams} from 'angular2/http';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {HttpClient}           from '../../headerfct';


@Injectable()
export class AuthenticationService {
  	private loggedIn = false;
  
  	constructor (private http: Http, private httpClient: HttpClient) {
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
      localStorage.removeItem("auth_token");
	 this.loggedIn = false;

  }
  
  isLoggedIn() {
  	return !!localStorage.getItem("auth_token");
  }
  
  hashCode2(str){
	var hash = 0;
	if (str.length == 0) return hash;
	for (var i = 0; i < str.length; i++) {
		var char = str.charCodeAt(i);		hash = ((hash<<5)-hash)+char;		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
  
  resetUser(){
  	let headers = new Headers();  
  	var tokens = this.httpClient.getTokenSplitted();
  	var hash = this.hashCode2(tokens[0]);
  	console.log(hash);
  	
    var _resultUrl = '/user/findByName/'; 
    var string = "Basic " + hash +":"+ "xxx"; 

    headers.append('Authorization',string);

    return this.http.get(_resultUrl+hash, { headers })
    				.map(this.extractData)
		            .do(data => console.log(data))
		            .catch(this.handleError);
  }
  
    
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    
    return body.data || {};
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  
}
