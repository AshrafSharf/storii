import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';


@Injectable()
export class ProfileService {
  constructor (private http: Http, private httpClient: HttpClient, private _authenticationService: AuthenticationService) {}
  
  getUserInfo(name){
    var headers = new Headers();
  	if (this._authenticationService.isLoggedIn()) {
  		headers = this.httpClient.createHeader(headers);
  	}else{
  		headers.delete('Authorization');
  		headers.append('Authorization',"");
  	}
	var _resultUrl = '/user/findByName/'; 
    return this.http.get(_resultUrl+name,{headers})
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
  
  }
  
  getStoriesOfUser(name){
   	var headers = new Headers();
  	if (this._authenticationService.isLoggedIn()) {
  		headers = this.httpClient.createHeader(headers);
  	}else{
  		headers.delete('Authorization');
  		headers.append('Authorization',"");
  	}
  	var _resultUrl = '/user/'; 
    return this.http.get(_resultUrl+name+"/getStories",{headers})
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
  }
  
  createNewStory(name,author_name,co_author_name,is_published){
    var headers = new Headers();
  	if (this._authenticationService.isLoggedIn()) {
  		headers = this.httpClient.createHeader(headers);
  		headers.append('Content-Type', 'application/json');
  	}else{
  		headers.delete('Authorization');
  		headers.delete('Content-Type');
  		headers.append('Authorization',"");
  	}
	var _resultUrl = '/story/'; 
    return this.http.post(_resultUrl, JSON.stringify({ "name": name ,"authorName": author_name ,"coAuthorName": "","published":false}),{headers})
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
