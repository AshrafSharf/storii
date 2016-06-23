import {Component,OnInit,ElementRef } from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import { AuthenticationService }    from '../login/authentication.service';
import {NgForm, FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgIf} from 'angular2/common';
import {HttpClient}           from '../../headerfct';
import { AboutService }    from '../about/about.service';
import { EditBarService }    from '../editBar/editBar.service';
import { PresentationService }    from './presentation.service';

declare var jQuery: any;
declare var vex: any;
declare var GridStackUI: any;
declare var _: any;

@Component({
  selector: 'presentation',
  templateUrl: `app/html/presentation/presentation.html`,
  directives: [LogStateComponent],
  styles:['a {cursor: pointer}'],
  providers:[AboutService,EditBarService,PresentationService, AuthenticationService,HttpClient]
  
})

export class PresentationComponent implements OnInit {
   
    storyName;
    storyid;
    name; 
    rating; 
    loggedIn;
    firstPage;
    actualPage;
    allowed;
    rateAllowed;
    loggedInUser; 
    errorMessage;
    notSent = true; 
    form: ControlGroup;
    
    constructor(
    private fb: FormBuilder, 
    private _elRef: ElementRef,
    private _router: Router,
    private _routeParams:RouteParams,
    private _authenticationService: AuthenticationService,
     private _editBarService: EditBarService,
    private _aboutService: AboutService,
    private _presentationService: PresentationService) {  
    this.form = fb.group({
          comment:  ['', Validators.required]
        });
    }
    
      ngOnInit():any {
        this.storyName = this._routeParams.get('storyName');    
        this.storyid = this._routeParams.get('id'); 
        this.name = this._routeParams.get('name');
        this.loggedIn = this._authenticationService.isLoggedIn();
    
        if(this.loggedIn){
            this._editBarService.getLoggedInUser()
                             .subscribe(
                               loggedInUser => {    
                                this.loggedInUser = loggedInUser;
                                if(this.loggedInUser['name'] === this.name){
                                    this.allowed = false; 
                                }else{
                                     this.allowed = true; 
                                }
                               
    
                               },
                               error =>  this.errorMessage = <any>error);
        }
        this._aboutService.getStoryById(this.storyid)
                            .subscribe((result) => {
                                    if (result) {
                                     this.firstPage = result['firstPage']['id'];
                                     this._editBarService.getPageById(this.firstPage)
                                            .subscribe(
                                                   actualPage => { 
                                                   this.actualPage = actualPage;
                                                   this.loadPageEditor();
                                               
                                                       
                                                   },error =>  this.errorMessage = <any>error);
                                      // console.log(this.details);
                                    }
                                    if(!result['data']){
                                       // this._router.navigate(['Error']);
                                    }
                                    },
                                    error =>  this.errorMessage = <any>error);
    
        
        
      }
    
    goToRate(){
        this.rating = true;
        this.rateAllowed = false; 
    }
    
    goBackToStory(){ 
         this._router.navigate(['About', { name: this.name, storyName: this.storyName, id: this.storyid}]);

    }
    
    saveComment(comment){
         this._presentationService.saveComment(this.storyid,comment)
                            .subscribe((result) => {
                                    if (result) {
                                        this.notSent = false; 
                                    }
                                 
                                    },
                                    error =>  this.errorMessage = <any>error);
    }
    
     loadPageEditor(){
       let self = this;
       var options = {
        float: true,
        staticGrid:true,
        acceptWidgets: '.grid-stack-item'
    };
    var gridStack = jQuery('.grid-stack');
    gridStack.gridstack(options);
        


    new function () {
        
        this.texts = [];
        this.images = [];
        this.links = [];
        this.externLinks = [];
        
        
        let self2 = this;

        var grid = jQuery('#inner').data('gridstack');

        this.setUpArrays = function(){
             this.images = [
                {x: 3, y: 1, width: 6, height: 6}
            ];
            this.texts = [
                {x: 3, y: 0, width: 6, height: 1, content:"defaultTitle"},
                {x: 3, y: 7, width: 6, height: 2, content:"defaultText"}
            ];
            
            this.links = [];
            this.externLinks = [];
        }
       
      


        this.loadGrid = function () {
          if(self.actualPage['outgoingInternLinks'].length == 0){
              self.rateAllowed = true;                                        
            }
            this.loadData();
            this.clearGrid();
            this.loadText();
            this.loadImages();
            this.loadLinks();     
            jQuery('.link').on('click',function(){
               
                      self2.loadNextPage(jQuery(this).find('span').text()); 
           
            }); 
            
     
            return false;
        }.bind(this);

        
       this.loadData = function(){
           if(self.actualPage['serializedContent'] != ''){
                   self.actualPage['outgoingInternLinks'].sort(function(a, b) {
                                    return parseFloat(a.id) - parseFloat(b.id);
                   });
                  var deserializedContent = atob(self.actualPage['serializedContent']);
                  var object = JSON.parse(deserializedContent);
           
               
            this.images = object['images'];
            this.texts = object['texts'];
            this.links = object['links'];
               //if new link was added
            if(this.links.length < self.actualPage['outgoingInternLinks'].length){
                if(this.links.length == 0){
                    this.setUpLinks(); 
                }else if(this.links.length == 1){
                    if(self.actualPage['outgoingInternLinks'].length >= 2){
                        this.links.push({x: 6, y: 9, width: 4, height: 1, content:'default', id: self.actualPage['outgoingInternLinks'][1]['nextPage']});
                    }
                    if(self.actualPage['outgoingInternLinks'].length >= 3){
                        this.links.push({x: 2, y: 10, width: 4, height: 1, content:'default', id: self.actualPage['outgoingInternLinks'][2]['nextPage']});  
                    }
                    if(self.actualPage['outgoingInternLinks'].length == 4){
                        this.links.push({x: 6, y: 10, width: 4, height: 1, content:'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage']});  
                    }
                   
                }else if(this.links.length == 2){
                    if(self.actualPage['outgoingInternLinks'].length >= 3){
                        this.links.push({x: 2, y: 10, width: 4, height: 1, content:'default', id: self.actualPage['outgoingInternLinks'][2]['nextPage']});  
                    }
                    if(self.actualPage['outgoingInternLinks'].length == 4){
                        this.links.push({x: 6, y: 10, width: 4, height: 1, content:'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage']});  
                    }              
                }else if(this.links.length == 3){
                    if(self.actualPage['outgoingInternLinks'].length == 4){
                        this.links.push({x: 6, y: 10, width: 4, height: 1, content:'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage']});  
                    }
                   
                }
            }else if(this.links.length > self.actualPage['outgoingInternLinks'].length){ //if link was deleted
                 if(self.actualPage['outgoingInternLinks'].length == 0){
                    this.links = []; 
                 }else{
                    for(var i = 0; i < this.links.length;i++){
                        if(!this.contained(this.links[i]['id'])){
                           this.links.splice(i,1); 
                        }
                    }
                 }
            }   
               
           // this.externLinks = object['externLinks'];          
           }else{
              this.setUpArrays();
              this.setUpLinks(); 
           }
         
            
       }.bind(this);
        
          this.clearGrid = function () {
            grid.removeAll();
            return false;
        }.bind(this);
        
            this.contained = function(id){
                var found = false; 
                for(var i = 0; i < self.actualPage['outgoingInternLinks'].length; i++){
                    if(id == self.actualPage['outgoingInternLinks'][i]['nextPage']){
                       found = true;  
                    }
                }
                return found; 
            }.bind(this);
        
        this.loadNextPage = function(id){
              self._editBarService.getPageById(id)
                                        .subscribe(
                                               actualPage => { 
                                                self.actualPage = actualPage; 
                                                self2.loadGrid();                                            
                                               },
                                               error =>  self.errorMessage = <any>error);
         
        
        }.bind(this);
        
        
        
         
         
        this.setUpLinks = function(){
            if(self.actualPage['outgoingInternLinks'].length == 4){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][0]['nextPage']},
                    {x: 6, y: 9, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][1]['nextPage']},
                    {x: 2, y: 10, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][2]['nextPage']},
                    {x: 6, y: 10, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][3]['nextPage']}
                ];
            }else if(self.actualPage['outgoingInternLinks'].length == 3){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][0]['nextPage']},
                    {x: 6, y: 9, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][1]['nextPage']},
                    {x: 2, y: 10, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][2]['nextPage']}
                ];
            } else if(self.actualPage['outgoingInternLinks'].length == 2){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][0]['nextPage']},
                    {x: 6, y: 9, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][1]['nextPage']}
                ];
            }else if(self.actualPage['outgoingInternLinks'].length == 1){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default", id: self.actualPage['outgoingInternLinks'][0]['nextPage']}
                ];
            }else{
               this.links = []; 
            }
        }.bind(this);

        this.loadImages = function () {
            var images = GridStackUI.Utils.sort(this.images);
            _.each(images, function (node) {
               var el = grid.addWidget(jQuery('<div class="image"><button class="delete hidden">X</button><div class="grid-stack-item-content"><img src=""><div/><div/>'),
                    node.x, node.y, node.width, node.height);
                grid.locked(el,true);
                grid.move(el,node.x,node.y);
               
            }, this);
            return false;
        }.bind(this);
 
        this.loadText = function () {
            var texts = GridStackUI.Utils.sort(this.texts);
       
            
            _.each(texts, function (node) {
                console.log(node);
                if(node == 0){
                   var el = grid.addWidget(jQuery('<div class="text"><div class="grid-stack-item-content">'+node.content+'<div/><div/>'),
                     node.x, node.y, node.width, node.height);
                     grid.locked(el,true);
                     grid.move(el,node.x,node.y); 
                }else if(node.content != ""){
                     var el = grid.addWidget(jQuery('<div class="text"><button class="delete hidden">X</button><div class="grid-stack-item-content">'+node.content+'<div/><div/>'),
                     node.x, node.y, node.width, node.height);
                     grid.locked(el,true);
                     grid.move(el,node.x,node.y);
                }
               
            }, this);
            return false;
        }.bind(this);

        this.loadLinks = function () {
            var links = GridStackUI.Utils.sort(this.links);
            _.each(links, function (node) {
                var el = grid.addWidget(jQuery('<div class="link"><!--<button class="delete hidden">X</button>--><div class="grid-stack-item-content"><div><span style="display:none; visibility:hidden;">'+node.id+'</span><a>'+node.content+'</a></div><div/><div/>'),
                    node.x, node.y, node.width, node.height);
                grid.locked(el,true);
                grid.move(el,node.x,node.y);
            }, this);
            return false;
        }.bind(this);


            this.loadGrid();



    };
    }
 
 
}
