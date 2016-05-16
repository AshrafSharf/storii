import {Component,Input,OnInit} from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import { SearchService }    from '../search/search.service';
import { Search}    from '../search/search';
import {LogStateComponent} from '../logState/logState.component';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';


@Component({
  selector: 'result',
  templateUrl: `app/html/result/result.html`,
  styles:['a {cursor: pointer}'],
  directives: [LogStateComponent],
  providers:[AuthenticationService,SearchService,HttpClient]
})

export class ResultComponent implements OnInit{
	title = 'Search:';
	resValue; 
	resultsUsers = 'Users:';	
	resultsStories = 'Stories:';
  	errorMessage: string;
  	stories: Search[];
  	targetName; 
  	users: Search[];
  	defaultUserPic = 'app/assets/files/dummyProfile.jpg';
	defaultStoryPic = 'app/assets/files/dummyStory.jpg';
	
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
  	
  	gotoStory(storyname) {	
  		var user_id = storyname['parentUser'];
  		this._searchService.searchUserById(user_id)
		                     .subscribe((targetName) => {
	      							if (targetName) {
	      							   this.targetName = targetName;
	      						       this._router.navigate(['About', { name: this.targetName['name'] , storyName: storyname['name'] }]);
	      							}},
                       				error =>  this.errorMessage = <any>error);
		
   	}
   	
   	gotoUser(user) {	
  		 this._router.navigate(['Profile', { name: user['name'] }]);	
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
