import {Component,Input,OnInit} from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import { SearchService }    from '../search/search.service';
import { Search}    from '../search/search';
import {LogStateComponent} from '../logState/logState.component';
import {HttpClient}           from '../../headerfct';


@Component({
  selector: 'result',
  templateUrl: `app/html/result/result.html`,
  styles:['a {cursor: pointer}'],
  directives: [LogStateComponent],
  providers:[SearchService,HttpClient]
})

export class ResultComponent implements OnInit{
	title = 'Search:';
	resValue; 
	resultsUsers = 'Users:';	
	resultsStories = 'Stories:';
  	errorMessage: string;
  	stories: Search[];
  	users: Search[];
	
	constructor (private _router: Router, private _searchService: SearchService, private _routeParams: RouteParams) {}
	
	 ngOnInit() {
	  		let cell = document.getElementById('inputField');
        	cell.focus();
      		var value = this._routeParams.get('key');
      		this.resValue = value;
     		this.doSearch(value);     		
  	}
  	
  	search(term){
  	 this._router.navigate(['Result', { key: term }]);        
  	} 
  	
  	doSearch(term){
  		if(term != ""){
		  	  this._searchService.searchStory(term)
		                     .subscribe(
		                       stories => this.stories = stories,
		                       error =>  this.errorMessage = <any>error);
		                       
		     this._searchService.searchUser(term)
		                     .subscribe(
		                       users => this.users = users,
		                       error =>  this.errorMessage = <any>error);  
		         
     	} 
     	
  	}

}
