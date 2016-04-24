import {Component,Input,OnInit} from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import { SearchService }    from '../search/search.service';
import { Search}    from '../search/search';
import {LogStateComponent} from '../logState/logState.component';


@Component({
  selector: 'result',
  templateUrl: `app/html/result/result.html`,
  styles:['a {cursor: pointer}'],
  directives: [LogStateComponent],
  providers:[SearchService]
})

export class ResultComponent implements OnInit{
	title = 'Search:';
	resValue; 
	resultsUsers = 'Users:';	
	resultsStories = 'Stories:';
  	errorMessage: string;
  	@Input() items: Search[];
	
	constructor (private _router: Router, private _searchService: SearchService, private _routeParams: RouteParams) {}
	
	 ngOnInit() {
   		 if (!this.items) {
      		var value = this._routeParams.get('value');
      		this.resValue = value;
     		this.search(value);
    	}
  	}
  	
  	search(term){
  	 this._searchService.search(term)
                     .subscribe(
                       items => this.items = items,
                       error =>  this.errorMessage = <any>error);
  	} 

}
