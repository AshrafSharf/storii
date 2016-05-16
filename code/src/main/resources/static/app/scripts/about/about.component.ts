import {Component,OnInit,ElementRef } from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import {EditBarComponent} from '../editBar/editBar.component';
import { AuthenticationService }    from '../login/authentication.service';
import {HttpClient}           from '../../headerfct';

declare var jQuery: any;
declare var vex: any;

@Component({
  selector: 'about',
  templateUrl: `app/html/about/about.html`,
  directives: [LogStateComponent, EditBarComponent],
  styles:['a {cursor: pointer}'],
  providers:[AuthenticationService,HttpClient]
  
})

export class AboutComponent implements OnInit {
	defaultStoryPic = 'app/assets/files/dummyStory.jpg';
	storyName;
	name; 
	loggedIn; 
	coAuthor; 
	
	constructor(private _elRef: ElementRef, private _router: Router,private _routeParams:RouteParams,private _authenticationService: AuthenticationService) {}
	
	  ngOnInit():any {
	  	this.storyName = this._routeParams.get('storyName');	
	  	this.name = this._routeParams.get('name');
	 	this.loggedIn = this._authenticationService.isLoggedIn();
	 	
	 	
	  }
	  
	  gotoProfile(){
	   	this._router.navigate(['Profile', { name: this.name }]);
	  }
 
}
