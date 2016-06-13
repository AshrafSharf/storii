import {Component,bind,Input,EventEmitter, Output,OnInit,ElementRef} from 'angular2/core';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS} from 'angular2/router';
import { Router, Location} from 'angular2/router';
import { AuthenticationService }    from '../login/authentication.service';
import { ProfileService }    from '../profile/profile.service';
import { EditBarService }    from './editBar.service';
import { Hover }    from './hover';
import {HttpClient}           from '../../headerfct';
  
declare var jQuery: any;
declare var vex: any;
declare var GridStackUI: any;
declare var _: any;
    
@Component({
      selector: 'editBar',
      inputs:['details'],
      templateUrl:`app/html/editBar/editBar.html`,
      directives: [Hover],
      styles:['a {cursor: pointer}'],
      providers:[EditBarService,AuthenticationService,ProfileService,HttpClient]
})


export class EditBarComponent implements OnInit {

    editProfile = "Edit Profile";
    editPages = "Edit Pages";
    editPage = "Edit Page";
    editStory = "Edit Story";
    addDelete = "Add/Delete";
    addPage = "Add new page";
    delete = "Delete";
    deletePage="Delete Page";
    deleteBranch="Delete Branch";
    actions="Actions";
    swapNode="Swap node";
    swapBranch="Swap branch";
    append="Append";

    name; 
    profilePage;
    aboutPage;
    nodeEditorPage;
    details;
    storyid; 
    allowed:boolean;
    story;
    notTheSamePW;
    addAllowed;
    actualPage;
    savePage; 
    deleteAllowed;
    moveAllowed;

    loggedIn;
    loggedInUser
    errorMessage;
    update: string[];
    
     @Output() onAdded = new EventEmitter<boolean>();
     @Output() onAppend = new EventEmitter<boolean>();
     @Output() onDeleted = new EventEmitter<boolean>();
     @Output() onDeleteBranch = new EventEmitter<boolean>();
     @Output() onSwapNode = new EventEmitter<boolean>();
     @Output() onSwapBranch = new EventEmitter<boolean>();


    constructor(private _elRef: ElementRef, private httpClient: HttpClient, private _router: Router,private _routeParams:RouteParams,private _authenticationService: AuthenticationService,private _editBarService: EditBarService) {
    this.loggedIn=_authenticationService.isLoggedIn();
    this.name = this._routeParams.get('name');  
    this.storyid = this._routeParams.get('id');    
    
        if(this.loggedIn){
        this._editBarService.getLoggedInUser()
                             .subscribe(
                               loggedInUser => {    
                                this.loggedInUser = loggedInUser;
                                if(this.loggedInUser['name'] === this.name){
                                    this.allowed = true; 
                                }
    
                               },
                               error =>  this.errorMessage = <any>error);
        }
 
    
    }
    
    startSwapNode(swapNode:boolean){
        this.onSwapNode.emit(swapNode);
    }
    startSwapBranch(swap:boolean){
        this.onSwapBranch.emit(swap);
    }
    
    startAppend(append:boolean){
        this.onAppend.emit(append);
    }
    
    addNewNode(newNode:boolean){
        this.onAdded.emit(newNode);
    }
    
    deleteNode(deleteNode:boolean){
        this.onDeleted.emit(deleteNode);
    }
    
    startDeleteBranch(deleteNode:boolean){
        this.onDeleteBranch.emit(deleteNode);
    }
    
    
    goToNodeEditor(){
         this._router.navigate(['NodeEditor',{ name: this.name, storyName: this.details[0]['name'] , id: this.storyid}]);
    }
    
    
    invert(element){
        jQuery('.'+element['nextElementSibling']['className']).slideToggle('fast');
        var arrow = jQuery('.'+element['className']).find('i');
        var classes = arrow.attr('class');
        if(classes == 'fa fa-angle-up'){
            arrow.removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
        }else if(classes == 'fa fa-angle-down'){
            arrow.removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
        }
    }
    
    changeUserValues(key, value){
        this._editBarService.updateUserValues(key,value,this.details[0]['id'])
                             .subscribe(
                               update => {    
                                this.update = update;
                                jQuery('.'+key).append('<span class="updated">SAVED</span>');
                                if(key == 'name'){
                                    var getToken = this.httpClient.getTokenSplitted();
                                    var pw = getToken[1];
                                    this.httpClient.changeUserNameInToken(value,pw);
                                    this._router.navigate(['Profile', { name: value }]);
                                }else if(key == 'password'){
                                    //here send sinnlos get request!
                                    this._authenticationService.resetUser()
                                                .subscribe((result) => {
                                                    var getToken = this.httpClient.getTokenSplitted();
                                                    var user = getToken[0];
                                                    this.httpClient.changePasswordInToken(user,value);      
                                                });
                                    
                                }else{
                                    this.details[0][key] = value; 
                                }
                                
                               },
                               error =>  this.errorMessage = <any>error);
    
    }
    
    publishStory(key,value){
         this._editBarService.publishStory(this.details[0]['id'])
                             .subscribe(
                               update => {    
                                this.update = update;
                                jQuery('.'+key).append('<span class="updated">SAVED</span>');
                                this.details[0][key] = value; 
                               },
                               error =>  this.errorMessage = <any>error);
    
    }
    
    unpublishStory(key,value){
         this._editBarService.unpublishStory(this.details[0]['id'])
                             .subscribe(
                               update => {    
                                this.update = update;
                                jQuery('.'+key).append('<span class="updated">SAVED</span>');
                                this.details[0][key] = value; 
                               },
                               error =>  this.errorMessage = <any>error);
    
    }
    
    changeStoryValues(key, value){
        this._editBarService.updateStoryValues(key,value,this.details[0]['id'])
                             .subscribe(
                               update => {    
                                this.update = update;
                                jQuery('.'+key).append('<span class="updated">SAVED</span>');
                                this.details[0][key] = value; 
                                if(key == 'name'){
                                   this._router.navigate(['About', { name: this.name, storyName: value, id: this.storyid}]); 
                                }
                               },
                               error =>  this.errorMessage = <any>error);
    
    }
    
    openVex(){
        let self = this;
            vex.open({
                showCloseButton: true,
                content: `<div id="userEditPage">
                            <div class="userEditFrameContainer">
                                <div class="userEditContainer">
                                    <div id="content">
                                        <div class="h1bgUserEdit"><h1>EDIT MY INFO</h1></div>
                                        
                                        <form id="changeName" class="change" name="changeName" class="handledAjaxForm">
                                                <label class="name">NAME</label><br>
                                                <input id="name" class="inputField saveData name" type="text" name="userName" required="">
                                                <!--<div class="buttonFrameContainer"><input id="name" class="button" type="button" value="CHANGE NAME"></div>-->
                                        </form>
                                        
                                        <form id="changeEmail" class="change" name="changeEmail" class="handledAjaxForm">
                                                <label class="email">EMAIL</label><br>
                                                <input id="email" class="inputField saveData email" type="email" name="userMail" required="">
                                                 <!--<div class="buttonFrameContainer"><input id="email" class="button" type="button" value="CHANGE E-MAIL"></div>-->
                                        </form>
                                        
                                        <form id="changePassword" class="change" name="changePassword" class="handledAjaxForm">
                                                <p>
                                                <label class="password">PASSWORD</label><br>
                                                <input id="password" class="inputField" type="password" placeholder="Enter new password" name="userPassword" required=""><br>
                                                </p>  
                                                <br>
                                                <label class="confirm">CONFIRM PASSWORD</label><br>
                                                <input id="password" class="inputField saveData" type="password" placeholder="Repeat new password" name="userPasswordAgain" required=""> 
                                                 <!--<div class="buttonFrameContainer"><input id="password" class="button" type="button" value="CHANGE PASSWORD"></div>-->
                                        </form>
                                        
                                         <form id="changeAboutMe" class="change" name="changeAboutMe" class="handledAjaxForm">
                                                <label class="aboutMe">ABOUT ME</label><br>
                                                <textarea id="aboutMe" class="inputField saveData" type="text" name="userAboutme" required="" ></textarea>
                                                 <!--<div class="buttonFrameContainer"><input id="aboutMe" class="button" type="button" value="CHANGE ABOUT ME"></div>-->
                                         </form>
                                         
                                         <form id="changeMyInspiration" class="change" name="changeMyInpiration" class="handledAjaxForm">
                                                <label class="myInspiration">MY INSPIRATION</label><br>
                                                <textarea id="myInspiration" class="inputField saveData" type="text" name="userMyInspiration" required=""></textarea>
                                                 <!--<div class="buttonFrameContainer"><input id="myInspiration" class="button" type="button" value="CHANGE MY INSPIRATION"></div>-->
                                         </form>
                                        
                                        <div class="currPicDiv"><img src="" alt="CurrentPicture" id="currentPicture" class="currentUserPicture"></div>
                                        <div class="buttonFrameContainer" id="pictureHandling">
                                        <input class="button ajaxFormTrigger userPicture" type="button" id="changePictureButton" value="CHANGE PICTURE"><br>
                                </div>         
                                        <div class="closeFancyBox"><input onclick="vex.close();"  class="button" type="button" value="CLOSE"></div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>`
                    
            }); 
            
            jQuery('#changeName input:text').attr("value", self.details[0]['name']);
            jQuery('#changeEmail .inputField').attr("value", self.details[0]['email']);
            jQuery('#changeAboutMe textarea').text(self.details[0]['aboutMe']);
            jQuery('#changeMyInspiration textarea').text(self.details[0]['myInspiration']);
        
            jQuery('.saveData').on('focus', function(event) {
                 jQuery('.updated').remove();
            });
            
            jQuery('.saveData').on('focusout', function(event) {
                var id = jQuery(this).attr('id');
                var value; 
                if(id == 'password'){
                    var field1 = jQuery(this).parent().find('.inputField').first().val();
                    var field2 = jQuery(this).parent().find('.inputField').last().val();
                    console.log(field1);
                    if(field1 != field2){
                        if(!this.notTheSamePW){ //not working 
                            jQuery('.confirm').append('<div class="errorPW">Passwords are not equal</div>');
                            this.notTheSamePW = true; 
                        }
                    }else{
                        jQuery('.errorPW').remove();
                        this.notTheSamePW = false; 
                        value = field1;
                        self.changeUserValues(id,value);
                    }
                }else{
                    value = jQuery(this).parent().find('.inputField').val();
                    if(value != self.details[0][id]){
                        self.changeUserValues(id,value);        
                    }
                }               
            });
    }
    
    openStoryEditor(){
         let self = this;
            vex.open({
                showCloseButton: true,
                content: `<div id="userEditPage">
                            <div class="userEditFrameContainer">
                                <div class="userEditContainer">
                                    <div id="content">
                                        <div class="h1bgUserEdit"><h1>EDIT STORY</h1></div>
                                        
                                        <form id="changeTitle" class="change" name="changeTitle" class="handledAjaxForm">
                                                <label class="name">TITLE</label><br>
                                                <input id="name" class="inputField saveData" type="text" name="title" required="">
                                                <!--<div class="buttonFrameContainer"><input id="title" class="button" type="button" value="CHANGE TITLE"></div>-->
                                        </form>
                                        
                                        <form id="changeAuthor" class="change" name="changeAuthor" class="handledAjaxForm">
                                                <label class="authorName">AUTHOR</label><br>
                                                <input id="authorName" class="inputField saveData" type="text" name="author" required="">
                                                <!--<div class="buttonFrameContainer"><input id="author" class="button" type="button" value="CHANGE AUTHOR"></div>-->
                                        </form>

                                        <form id="changeCoAuthor" class="change" name="changeCoAuthor" class="handledAjaxForm">
                                                <label class="coAuthorName">CO-AUTHOR</label><br>
                                                <input id="coAuthorName" class="inputField saveData" type="text" name="coAuthor" required="">
                                                <!--<div class="buttonFrameContainer"><input id="coAuthor" class="button" type="button" value="CHANGE CO-AUTHOR"></div>-->
                                        </form>

                                         <form id="changeDescription" class="change" name="changeDescription" class="handledAjaxForm">
                                                <label class="description">SHORT DESCRIPTION</label><br>
                                                <textarea <!--id="description"--> class="inputField saveData" type="text" name="description" required="" ></textarea>
                                                <!--<div class="buttonFrameContainer"><input id="description" class="button" type="button" value="CHANGE DESCRIPTION"></div>-->
                                         </form>

                                         <form id="changePublished" class="change" name="changePublished" class="handledAjaxForm">
                                                <label class="published">PUBLISHED</label>
                                                <input class="saveData" id="published" name="isPublished" type="checkbox" required="">
                                         </form>

                                         <div class="currPicDiv"><img src="" alt="CurrentStoryPicture" id="currentStoryPicture" class="currentStoryPicture"></div>
                                         <div class="buttonFrameContainer" id="pictureHandling">
                                         <input class="button ajaxFormTrigger userStoryPicture" type="button" id="changeStoryPictureButton" value="CHANGE PICTURE"><br>                                       
                                       
                                </div>         
                                        <div class="closeFancyBox"><input onclick="vex.close();"  class="button" type="button" value="CLOSE"></div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>`
                    
            }); 
        
         jQuery('#userEditPage .userEditFrameContainer').css('background-color','#D3E2D8');
         jQuery('#userEditPage .h1bgUserEdit').css('background-color','#D3E2D8');
         jQuery('#userEditPage .userEditContainer').css('background-color','#D3E2D8');
         jQuery('#userEditPage .buttonFrameContainer').css('background','#879D8E');
         jQuery('#userEditPage input.button').css('background','#879D8E');
        
         jQuery('#changeTitle .inputField').attr("value", self.details[0]['name']);
         jQuery('#changeAuthor .inputField').attr("value", self.details[0]['authorName']);
         jQuery('#changeCoAuthor .inputField').attr("value",self.details[0]['coAuthorName']);
         jQuery('#changeDescription textarea').text("self.details[0]['description']");
         jQuery('#changePublished #published').prop("checked",self.details[0]['published']);
        
         jQuery('.saveData').on('focus', function(event) {
                 jQuery('.updated').remove();
            });
            
            jQuery('.saveData').on('focusout', function(event) {
                var id = jQuery(this).attr('id');
                var value; 
                value = jQuery(this).parent().find('.inputField').val();
                if(id == "published"){
                    value = jQuery(this).is(':checked');
                    if(value){
                        self.publishStory(id,value);
                    }else{
                        self.unpublishStory(id,value);
                    }
                }else{
                    if(value != self.details[0][id]){
                            self.changeStoryValues(id,value);        
                    } 
                }
                       
                
                               
            });
        
    }
    
    openPageEditor(){
    this._editBarService.getPageById(this.actualPage['id'])
                        .subscribe(
                               actualPage => { 
                                this.actualPage = actualPage;
                                this.savePage = actualPage;
                                   
                                      let self = this;
            vex.open({
                showCloseButton: true,
                content:`<div class="pageEditorFrameContainer"><div class="h1bgPageEditor"><h1>PAGE-EDITOR</h1></div></div>
                          <div id="links">
                            <div class="center">
                             <div id="edit" class="buttonFrameContainerUserStoryContentModule"><div class="buttonSizeDelete"><a class="buttonLookLink"  >EDIT</a></div></div>
                             <div id="floatUp" class="disableButton buttonFrameContainerUserStoryContentModule"><div class="buttonSizeDelete"><a class="buttonLookLink" >FLOAT UP</a></div></div>
                             <div id="reset" class="disableButton buttonFrameContainerUserStoryContentModule"><div class="buttonSizeDelete"><a class="buttonLookLink" >RESET</a></div></div>
                            </div>         
                          </div>
                            <!--<textarea id="saved-data" cols="100" rows="20" readonly="readonly"></textarea>-->
                        
                            <div class="sidebar">
                                <div>
                                    <div class="widgets" id="imageWidget">
                                        <div class="image grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content">ADD IMAGE</div></div>
                                    </div>
                                    <div class="widgets" id="textWidget">
                                        <div class="text grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content">ADD TEXT</div></div>
                                    </div>
                                    <div class="widgets" id="linkWidget">
                                        <div class="link grid-stack-item disableButton"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">EXTERN LINK</a></div></div></div>
                                    </div>
                                        <!--<div class="trash"><div>DELETE</div></div>-->
                                </div>
                            </div>       
                           <div id="outer">
                                        <div class="grid-stack" id="inner">
                                        </div>
                        </div>
                        
                        </div>`,
                
                 afterClose: function() {
                    self.actualPage = self.savePage;
                  }
                
                }); 
                                   
                                   
        
         this.loadPageEditor();
        
       
        jQuery('.vex.vex-theme-os .vex-content').css('width','100%');
        jQuery('.vex.vex-theme-os .vex-content').css('padding','10px');
        jQuery('.vex.vex-theme-os .vex-content').css('background','white');
        jQuery('.vex.vex-theme-os .vex-content').css('box-shadow','unset');
                                   
                         },
                               error =>  this.errorMessage = <any>error);
            
       
    }
    
    loadPageEditor(){
       let self = this;
       var options = {
        float: false,
        staticGrid:true,
        removable: '.trash',
        removeTimeout: 100,
        acceptWidgets: '.grid-stack-item'
    };
    var gridStack = jQuery('.grid-stack');
    var makeEditable;
    gridStack.gridstack(options);
    var editing = false; 
        


    new function () {
        
        this.texts = [];
        this.images = [];
        this.links = [];
        this.externLinks = [];
        
        
        let self2 = this;

        var grid = jQuery('#inner').data('gridstack');
        var editButton = jQuery('#edit');
        var resetButton = jQuery('#reset');
        var floatUp = jQuery('#floatUp');

        this.newTextWidget = function(){
            var el = '<div class="text grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content">ADD TEXT</div></div>';
            jQuery('#textWidget').append(el);
            grid.locked(el,true);
            jQuery('#textWidget .text').draggable({
                revert: 'invalid',
                handle: '.grid-stack-item-content',
                scroll: false,
                appendTo: '#inner'
            });
            jQuery('#textWidget .text').on('remove',this.newTextWidget);
        }.bind(this);

        this.newLinkWidget = function(){
            var el = '<div class="link grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">ADD LINK</a></div></div></div>';
            jQuery('#linkWidget').append(el);
             grid.locked(el,true);
            jQuery('#linkWidget .link').draggable({
                revert: 'invalid',
                handle: '.grid-stack-item-content',
                scroll: false,
                appendTo: '#inner'
            });
            jQuery('#linkWidget .link').on('remove',this.newLinkWidget);
        }.bind(this);

         makeEditable = function(){
              jQuery('.grid-stack .grid-stack-item-content').addClass('editingMode');
             jQuery('.grid-stack .delete').on('click',this.deleteWidget);
            jQuery('.grid-stack .delete').each(function(){
                if(jQuery('.grid-stack .delete').hasClass('hidden')){
                    jQuery(this).removeClass('hidden');
                }
            });
            jQuery('.grid-stack .text .grid-stack-item-content').each(function() {
                if(jQuery(this).find('textarea').length == 0){
                    var t = jQuery(this).text();
                    jQuery(this).text('');
                    jQuery(this).append('<textarea>'+t+'</textarea>');
                }
            });
            jQuery('.grid-stack .link .grid-stack-item-content div:first-of-type').each(function() {
                if(jQuery(this).find('input').length == 0){
                    var l = jQuery(this).find('a').text();
                    jQuery(this).find('a').addClass('hidden');
                    jQuery(this).append('<input type="text" value="'+l+'">');
                }
            });
        }.bind(this);
        
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
       
        this.edit = function(){
            jQuery('.sidebar').slideToggle('fast');
            if(editButton.text() == 'EDIT'){
                editing = true; 
                makeEditable();
                jQuery('#inner').data('gridstack').setStatic(false);
                resetButton.removeClass('disableButton');
                floatUp.removeClass('disableButton');
                jQuery('.grid-stack-item-content').css('cursor','move');
               
                jQuery('#edit .buttonLookLink').text('SAVE');
               jQuery("#outer").animate({backgroundColor: "#eeeeee"}, 'slow');
            }else if(editButton.text() == 'SAVE'){
                editing = false;
                jQuery('.grid-stack .delete').addClass('hidden');
                resetButton.addClass('disableButton');
                floatUp.addClass('disableButton');
                jQuery('.grid-stack .grid-stack-item-content').removeClass('editingMode');
                jQuery('.grid-stack .text .grid-stack-item-content textarea').each(function() {
                    var t = jQuery(this).val();
                    jQuery(this).parent().text(t);
                    jQuery(this).remove();
                });
                jQuery('.grid-stack .link .grid-stack-item-content input').each(function() {
                    var l = jQuery(this).val();
                    jQuery(this).parent().find('a').text(l);
                    jQuery(this).parent().find('a').removeClass('hidden');
                    jQuery(this).remove();
                });
                this.saveGrid();

                    jQuery('#inner').data('gridstack').setStatic(true);

                jQuery('#edit .buttonLookLink').text('EDIT');
                jQuery("#outer").animate({backgroundColor: "white"}, 'slow');
            }
            return false;
        }.bind(this);


        this.deleteWidget = function (e) {
            grid.removeWidget(e.currentTarget.offsetParent);
        }.bind(this);
 


        this.loadGrid = function () {
            this.loadData();
            this.clearGrid();
            this.loadText();
            this.loadImages();
            this.loadLinks();     
            jQuery('.link').on('click',function(){
                if(!editing){
                      self2.loadNextPage(jQuery(this).find('span').text()); 
                }
            }); 
            
            console.log("loadgrid");
            return false;
        }.bind(this);
        
        this.reloadGrid = function () {
            this.loadData();
            this.clearGrid();
            this.loadText();
            this.loadImages();
            this.loadLinks();
            makeEditable();
            return false;
        }.bind(this);
        
       this.loadData = function(){
           if(self.actualPage['serializedContent'] != ''){
                   self.actualPage['outgoingInternLinks'].sort(function(a, b) {
                                    return parseFloat(a.id) - parseFloat(b.id);
                   });
                  var deserializedContent = atob(self.actualPage['serializedContent']);
                  var object = JSON.parse(deserializedContent);
                  console.log(object);
               
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
                                                console.log("DONE");
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


        
          this.saveGrid = function () {
            this.saveImages();
            this.saveTexts();
            this.saveLinks();
            this.save();
            return false;
        }.bind(this);

        this.save = function(){
            self._editBarService.saveData(this.images,this.texts,this.links,self.actualPage)
            .subscribe( update => {    
                                   console.log("saved");
                                
                               },
                               error =>  self.errorMessage = <any>error);
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
                var el = grid.addWidget(jQuery('<div class="text"><button class="delete hidden">X</button><div class="grid-stack-item-content">'+node.content+'<div/><div/>'),
                    node.x, node.y, node.width, node.height);
                grid.locked(el,true);
                grid.move(el,node.x,node.y);
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

        this.saveImages= function () {
            this.images = _.map(jQuery('.grid-stack > .image:visible'), function (el) {
                el = jQuery(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height
                };
            }, this);
            jQuery('#saved-data').val(JSON.stringify(this.images, null, '    '));
            return false;
        }.bind(this);

        this.saveTexts = function () {
            this.texts = _.map(jQuery('.grid-stack > .text:visible'), function (el) {
                el = jQuery(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    content: el.find('.grid-stack-item-content').text()
                };
            }, this);
            jQuery('#saved-data').val(jQuery('#saved-data').val()+JSON.stringify(this.texts, null, '    '));
            return false;
        }.bind(this);

        this.saveLinks = function () {
            this.links = _.map(jQuery('.grid-stack > .link:visible'), function (el) {
                el = jQuery(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    content: el.find('a').text(),
                    id: el.find('span').text()
                };
            }, this);
            jQuery('#saved-data').val( jQuery('#saved-data').val()+JSON.stringify(this.links, null, '    '));
            return false;
        }.bind(this);


        this.clearGrid = function () {
            grid.removeAll();
            return false;
        }.bind(this);

        this.floatUp = function(){
         
              jQuery('.grid-stack-item').each(function() {
                  grid.locked((this),false);
                  grid.move((this),jQuery(this).attr('data-gs-x'),jQuery(this).attr('data-gs-y')-1);
              });
        
        }.bind(this);

        jQuery('#save-grid').click(this.saveGrid);
        jQuery('#reset').click(this.reloadGrid);
        jQuery('#clear-grid').click(this.clearGrid);
        jQuery('#floatUp').click(this.floatUp);
        //this.loadNextPage(jQuery(this).find('span').text())
        editButton.click(this.edit);
        jQuery('#textWidget .text').on('remove',this.newTextWidget);
        jQuery('#linkWidget .link').on('remove',this.newLinkWidget);
      


            this.loadGrid();

            jQuery('.sidebar .grid-stack-item').draggable({
                revert: 'invalid',
                handle: '.grid-stack-item-content',
                scroll: false,
                appendTo: '#inner'
            });


    };

    //ausschaltn wenns nur geladen wird

    gridStack.on('change',function(){
        if(jQuery('#edit').text() == 'SAVE'){
            makeEditable();
        }

    }); 
    }
    
    ngOnInit():any {
        if(document.getElementById("profilePage")){
            this.profilePage = true;
        }
        if(document.getElementById("userStoryPage")){
            this.aboutPage = true;
        }
        if(document.getElementById("nodeEditorPage")){
            this.nodeEditorPage = true; 
    
            this.addAllowed = this.details[0];
            this.deleteAllowed = this.details[1]; 
            this.moveAllowed = this.details[2]; 
            this.actualPage = this.details[3];
    
            
            let self = this;
            document.getElementById("wrapper").addEventListener('click', function(event) {
                self.addAllowed = self.details[0];
                self.deleteAllowed = self.details[1]; 
                self.moveAllowed = self.details[2]; 
                self.actualPage = self.details[3];
    
            });
        }
        
        
        }
  
  
}