import {Jsonp, URLSearchParams} from 'angular2/http';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Search}           from './search';
import {Observable}     from 'rxjs/Observable';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';


@Injectable()
export class SearchService {
  constructor (private http: Http, private httpClient: HttpClient, private _authenticationService: AuthenticationService) {}
  
  searchStory (term): Observable<Search[]> {
  	var headers = new Headers();
  	if (this._authenticationService.isLoggedIn()) {
  		headers = this.httpClient.createHeader(headers);
  	}else{
  		headers.delete('Authorization');
  		headers.append('Authorization',"");
  	}
	var _resultUrl = '/story/findByName/'; 
    return this.http.get(_resultUrl+term,{headers})
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
  }
  
  searchUserById(user_id): Observable<Search[]> {
   	var headers = new Headers();
   	if (this._authenticationService.isLoggedIn()) {
  		headers = this.httpClient.createHeader(headers);
  	}else{
  		headers.delete('Authorization');
  		headers.append('Authorization',"");
  	}
	var _resultUrl = '/user/'; // URL to JSON file
    return this.http.get(_resultUrl+user_id,{headers})
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
  }
  
   searchUser (term): Observable<Search[]> {
   	var headers = new Headers();
   	if (this._authenticationService.isLoggedIn()) {
  		headers = this.httpClient.createHeader(headers);
  	}else{
  		console.log("FFFFALSCH");
  		headers.delete('Authorization');
  		headers.append('Authorization',"");
  	}
	var _resultUrl = '/user/findByName/'; // URL to JSON file
    return this.http.get(_resultUrl+term,{headers})
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
