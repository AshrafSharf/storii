import {Component,OnInit} from 'angular2/core';
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
  directives: [LogStateComponent],
  providers:[SearchService]
})

export class SearchFormComponent{
	title = 'Search:';
  	errorMessage: string;
	
	constructor (private _searchService: SearchService) {}
	
	
	  items:Search[];
  
  search(term) {
    this._searchService.search(term)
                     .subscribe(
                       items => this.items = items,
                       error =>  this.errorMessage = <any>error);
  	}
	
	/*private _searchTermStream = new Subject<string>();

  	search(term:string) { this._searchTermStream.next(term); }

  items:Observable<Search[]> = this._searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term:string) =>  this._searchService.search(term)
    );
		*/						 

}
