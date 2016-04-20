import {Jsonp, URLSearchParams} from 'angular2/http';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Search}           from './search';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class SearchService {
  constructor(private jsonp: Jsonp) {}
  search (term: string) {
    let wikiUrl = 'http://127.0.0.1:8080/story';
    var params = new URLSearchParams();
   // params.set('search', term); // the user's search value
   // params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this.jsonp
               .get(wikiUrl, { search: params })
               .map(request => <string[]> request.json()[1]);
  }}
