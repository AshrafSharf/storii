import {Component,ElementRef,OnInit } from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {Observable}       from 'rxjs/Observable';
import {Subject}          from 'rxjs/Subject';
import { Router } from 'angular2/router';
import {NgForm}    from 'angular2/common';
import { SearchService }    from './search.service';
import { Search}    from './search';
import {LogStateComponent} from '../logState/logState.component';
declare var jQuery: any;
declare var vex: any;

@Component({
  selector: 'search-form',
  templateUrl: `app/html/search/search.html`,
  directives: [LogStateComponent]
 
 })

export class SearchFormComponent implements OnInit{
	title = 'Search:';	
	constructor(private _elRef: ElementRef, private _router: Router) {    console.log(localStorage.getItem('auth_token'));}
  		
  	search(term) {
     this._router.navigate(['Result', { key: term }]);
    }	
    
    createNewStory(storyName){
    	console.log(storyName);
    }
    
 ngOnInit():any{   
       /* let _this = this;  
    	jQuery(this._elRef.nativeElement).find('#editProfile').on('click', function(){    		
    		vex.open({
    			showCloseButton: true,
    		 	content: `<div id="newStoryPage">
					    <div class="newStoryFrameContainer">
					        <div class="newStoryContainer">
					            <div id="content">
					                <div class="h1bgNewStory"><h1>NEW STORY</h1></div>
					                
					                <form id="changeName" name="changeName">
					                        <label>WHAT IS THE NAME OF YOUR STORY?</label><br>
					                 		<input id="storyName" class="inputField" name="storyName" required="" type="text">
					                        <div class="buttonFrameContainer fullWidth"><input id="create" class="button" value="CREATE STORY" type="button"></div>
					                </form>
					              
					                <div class="closeFancyBox"><input onclick="vex.close();" class="button" value="CLOSE" type="button"></div>
					                
					            </div>
					        </div>
					    </div>
					</div>`				
			});	
			
			document.getElementById("create").addEventListener('click', function(event) {
				_this.createNewStory((<HTMLInputElement>document.getElementById("storyName")).value);			
			});
			
    	});*/
    }			 
}
