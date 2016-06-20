import {Component,OnInit,ElementRef } from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import {EditBarComponent} from '../editBar/editBar.component';
import { AuthenticationService }    from '../login/authentication.service';
import { AboutService }    from '../about/about.service';
import {HttpClient}           from '../../headerfct';
import { EditBarService }    from '../editBar/editBar.service';

declare var jQuery: any;
declare var vex: any;

@Component({
  selector: 'comments',
  templateUrl: `app/html/comments/comments.html`,
  directives: [LogStateComponent, EditBarComponent],
  styles:['a {cursor: pointer}'],
  providers:[EditBarService, AboutService,AuthenticationService,HttpClient]
  
})

export class CommentsComponent implements OnInit {
    defaultStoryPic = 'app/assets/files/dummyStory.jpg';
    yellowStar = 'app/assets/files/star.png';
    halfStar = 'app/assets/files/halfstar.png';
    grayStar = 'app/assets/files/star2.png';
    storyName;
    name; 
    loggedIn; 
    storyid; 
    errorMessage;
    loggedInUser;
    ratings;
    
    constructor(
    private _elRef: ElementRef,
    private _router: Router,
    private _routeParams:RouteParams,
    private _authenticationService: AuthenticationService,
    private _aboutService: AboutService,
    private _editBarService: EditBarService) {  
    this.ratings = [];
    }
    
      ngOnInit():any {
        this.storyName = this._routeParams.get('storyName');    
        this.storyid = this._routeParams.get('id'); 
        this.name = this._routeParams.get('name');
        this.loggedIn = this._authenticationService.isLoggedIn();
        let self = this; 

        this._aboutService.getStoryById(this.storyid)
                            .subscribe((result) => {    
                                    if(jQuery.isEmptyObject(result)){
                                     this._router.navigate(['Error']);
                                    }else if(result) { 
                  
                                     for(var key in result['ratings']){
                                        this._aboutService.getUserById(result['ratings'][key]['ratingUser'])
                                            .subscribe((found) => {
                                             for(var user in result['ratings']){
                                                if(result['ratings'][user]['ratingUser'] == found['id']){
                                                    console.log(found['name']);
                                                    result['ratings'][user]['ratingUser'] = found['name'];
                                                }
                                             }
                                                
                                            },
                                            error => { this._router.navigate(['Error']);}); 
                                     }
                                     
                                     this.ratings = result['ratings'];
                                    }
                                    
                                    },
                                    error => { this._router.navigate(['Error']);});
                               
        
        
        //get story by id
        
        
      }
      

}
