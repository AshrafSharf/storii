import {Component} from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import { Router } from 'angular2/router';
import {NgForm}    from 'angular2/common';
import { SearchService }    from './search.service';
import { Search}    from './search';
import {LogStateComponent} from '../logState/logState.component';

@Component({
  selector: 'search-form',
  templateUrl: `app/html/search/search.html`,
  directives: [LogStateComponent]
 
 })

export class SearchFormComponent{
	title = 'Search:';
			
	constructor(private _router: Router) {    console.log(localStorage.getItem('auth_token'));}
  		
  	search(term) {
     this._router.navigate(['Result', { key: term }]);
    }				 

}
