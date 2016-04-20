import {Jsonp, URLSearchParams} from 'angular2/http';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Search}           from './search';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class SearchService {
  constructor (private http: Http) {}

  private _resultUrl = '../../../results.json'; // URL to JSON file

  search (term): Observable<Search[]> {
  		var params = new URLSearchParams();
		params.set('search', term);
		
    return this.http.get(this._resultUrl + '?search=' + term )
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