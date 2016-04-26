import {Jsonp, URLSearchParams} from 'angular2/http';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Search}           from './search';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class SearchService {
  constructor (private http: Http) {}

 
  searchStory (term): Observable<Search[]> {
	var _resultUrl = '/story/findByName/'; // URL to JSON file
    return this.http.get(_resultUrl+term)
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
  }
  
   searchUser (term): Observable<Search[]> {
	var _resultUrl = '/user/findByName/'; // URL to JSON file
    return this.http.get(_resultUrl+term)
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
  }
  
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
 
  
}
