import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';


@Injectable()
export class EditBarService {
  constructor (private http: Http, private httpClient: HttpClient, private _authenticationService: AuthenticationService) {}

	updateValues(key, value ,user_id){
	    var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
	 		headers.append('Content-Type', 'application/json');
  		}else{
  			headers.delete('Authorization');
  			headers.delete('Content-Type');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/user/updateMe'; 
	    return this.http.put(_resultUrl, JSON.stringify(new function(){ this[key] = value; }),{headers})
	            .map(this.extractData)
	            //.do(data => console.log(data))
	            .catch(this.handleError);
	  	
	}

	getLoggedInUser(){
		var headers = new Headers();
	    if (this._authenticationService.isLoggedIn()) {
	  		headers = this.httpClient.createHeader(headers);
  		}else{
  			headers.delete('Authorization');
  			headers.append('Authorization',"");
  		}
		var _resultUrl = '/user/'; 
	 	return this.http.get(_resultUrl+"me",{headers})
            .map(this.extractData)
           // .do(data => console.log(data))
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
