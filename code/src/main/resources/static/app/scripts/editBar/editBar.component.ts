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
         this.storyid = this._routeParams.get('id');    
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
    
    changeValues(key, value){
        this._editBarService.updateValues(key,value,this.details[0]['id'])
                             .subscribe(
                               update => {    
                                this.update = update;
                                vex.close();
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
                                                <label>NAME</label><br>
                                                <input class="inputField loadData name" type="text" name="userName" required="">
                                                <div class="buttonFrameContainer"><input id="name" class="button" type="button" value="CHANGE NAME"></div>
                                        </form>
                                        
                                        <form id="changeEmail" class="change" name="changeEmail" class="handledAjaxForm">
                                                <label>EMAIL</label><br>
                                                <input class="inputField loadData email" type="email" name="userMail" required="">
                                                <div class="buttonFrameContainer"><input id="email" class="button" type="button" value="CHANGE E-MAIL"></div>
                                        </form>
                                        
                                        <form id="changePassword" class="change" name="changePassword" class="handledAjaxForm">
                                                <p>
                                                <label>PASSWORD</label><br>
                                                <input class="inputField" type="password" placeholder="Enter new password" name="userPassword" required=""><br>
                                                </p>  
                                                <br>
                                                <label class="confirm">CONFIRM PASSWORD</label><br>
                                                <input class="inputField" type="password" placeholder="Repeat new password" name="userPasswordAgain" required=""> 
                                                <div class="buttonFrameContainer"><input id="password" class="button" type="button" value="CHANGE PASSWORD"></div>
                                        </form>
                                        
                                         <form id="changeAboutMe" class="change" name="changeAboutMe" class="handledAjaxForm">
                                                <label>ABOUT ME</label><br>
                                                <textarea class="inputField loadData" type="text" name="userAboutme" required="" ></textarea>
                                                <div class="buttonFrameContainer"><input id="aboutMe" class="button" type="button" value="CHANGE ABOUT ME"></div>
                                         </form>
                                         
                                         <form id="changeMyInspiration" class="change" name="changeMyInpiration" class="handledAjaxForm">
                                                <label>MY INSPIRATION</label><br>
                                                <textarea class="inputField loadData" type="text" name="userMyInspiration" required=""></textarea>
                                                <div class="buttonFrameContainer"><input id="myInspiration" class="button" type="button" value="CHANGE MY INSPIRATION"></div>
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
            
            jQuery('.change input:button').on('click', function(event) {
                var id = jQuery(this).attr('id');
                var value; 
                if(id == 'password'){
                    var field1 = jQuery(this).parent().parent().find('.inputField').first().val();
                    var field2 = jQuery(this).parent().parent().find('.inputField').last().val();
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
                        self.changeValues(id,value);
                    }
                }else{
                    value = jQuery(this).parent().parent().find('.inputField').val();
                    if(value != self.details[0][id]){
                        self.changeValues(id,value);        
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
                                                <label>TITLE</label><br>
                                                <input class="inputField loadData title" type="text" name="title" required="">
                                                <div class="buttonFrameContainer"><input id="title" class="button" type="button" value="CHANGE TITLE"></div>
                                        </form>
                                        
                                        <form id="changeAuthor" class="change" name="changeAuthor" class="handledAjaxForm">
                                                <label>AUTHOR</label><br>
                                                <input class="inputField loadData author" type="text" name="author" required="">
                                                <div class="buttonFrameContainer"><input id="author" class="button" type="button" value="CHANGE AUTHOR"></div>
                                        </form>

                                        <form id="changeCoAuthor" class="change" name="changeCoAuthor" class="handledAjaxForm">
                                                <label>CO-AUTHOR</label><br>
                                                <input class="inputField loadData coauthor" type="text" name="coauthor" required="">
                                                <div class="buttonFrameContainer"><input id="coauthor" class="button" type="button" value="CHANGE CO-AUTHOR"></div>
                                        </form>

                                         <form id="changeDescription" class="change" name="changeDescription" class="handledAjaxForm">
                                                <label>SHORT DESCRIPTION</label><br>
                                                <textarea class="inputField loadData" type="text" name="shortdescription" required="" ></textarea>
                                                <div class="buttonFrameContainer"><input id="shortdescription" class="button" type="button" value="CHANGE DESCRIPTION"></div>
                                         </form>

                                         <form id="changePublished" class="change" name="changePublished" class="handledAjaxForm">
                                                <label>PUBLISHED</label>
                                                <input class="loadData" name="published" type="checkbox" required="">
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
        
    }
    
    openPageEditor(){
    this._editBarService.getPageById(this.actualPage['id'])
                        .subscribe(
                               actualPage => { 
                                this.actualPage = actualPage;
                                      let self = this;
            vex.open({
                showCloseButton: true,
                content:`<div class="pageEditorFrameContainer"><div class="h1bgPageEditor"><h1>PAGE-EDITOR</h1></div></div>
                          <div id="links">
                            <div class="center">
                             <div class="buttonFrameContainerUserStoryContentModule"><div class="buttonSizeDelete"><a class="buttonLookLink" id="edit" >EDIT</a></div></div>
                             <div class="buttonFrameContainerUserStoryContentModule"><div class="buttonSizeDelete"><a class="buttonLookLink disableButton" id="floatUp">FLOAT UP</a></div></div>
                             <div class="buttonFrameContainerUserStoryContentModule"><div class="buttonSizeDelete"><a class="buttonLookLink disableButton" id="reset">RESET</a></div></div>
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
                                        <div class="link grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">ADD LINK</a></div></div></div>
                                    </div>
                                        <div class="trash"><div>DELETE</div></div>
                                </div>
                            </div>       
                           <div id="outer">
                                        <div class="grid-stack" id="inner">
                                        </div>
                        </div>
                        
                        </div>`
                
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
        float: true,
        staticGrid:true,
        removable: '.trash',
        removeTimeout: 100,
        acceptWidgets: '.grid-stack-item'
    };
    var gridStack = jQuery('.grid-stack');
    var makeEditable;
    gridStack.gridstack(options);


    new function () {
        
        this.images = [
            {x: 3, y: 1, width: 6, height: 6}
        ];
        this.texts = [
            {x: 3, y: 0, width: 6, height: 1, content:"defaultTitle"},
            {x: 3, y: 7, width: 6, height: 2, content:"defaultText"}
        ];
        this.links = [];
        /*this.links = [
            {x: 2, y: 9, width: 4, height: 1, content:"default"},
            {x: 6, y: 9, width: 4, height: 1, content:"default"},
            {x: 2, y: 10, width: 4, height: 1, content:"default"},
            {x: 6, y: 10, width: 4, height: 1, content:"default"}
        ];*/
        
        
        

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
                    var l = jQuery(this).text();
                    jQuery(this).find('a').addClass('hidden');
                    jQuery(this).append('<input type="text" value="'+l+'">');
                }
            });
        }.bind(this);
       
        this.edit = function(){
            jQuery('.sidebar').slideToggle('fast');
            if(editButton.text() == 'EDIT'){
                makeEditable();
                jQuery('#inner').data('gridstack').setStatic(false);
                resetButton.removeClass('disableButton');
                floatUp.removeClass('disableButton');
               
                editButton.text('SAVE');
               jQuery("#outer").animate({backgroundColor: "#eeeeee"}, 'slow');
            }else if(editButton.text() == 'SAVE'){
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

                editButton.text('EDIT');
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
                  var deserializedContent = atob(self.actualPage['serializedContent']);
                  var object = JSON.parse(deserializedContent);
                  console.log(object);
               
            this.images = object['images'];
            this.texts = object['texts'];
            this.links = object['links'];
                 this.setUpLinks(); 
           }else{
              this.setUpLinks(); 
           }
         
            
       }.bind(this);
        
         
        this.setUpLinks = function(){
            if(self.actualPage['outgoingInternLinks'].length == 4){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default"},
                    {x: 6, y: 9, width: 4, height: 1, content:"default"},
                    {x: 2, y: 10, width: 4, height: 1, content:"default"},
                    {x: 6, y: 10, width: 4, height: 1, content:"default"}
                ];
            }else if(self.actualPage['outgoingInternLinks'].length == 3){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default"},
                    {x: 6, y: 9, width: 4, height: 1, content:"default"},
                    {x: 2, y: 10, width: 4, height: 1, content:"default"}
                ];
            } else if(self.actualPage['outgoingInternLinks'].length == 2){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default"},
                    {x: 6, y: 9, width: 4, height: 1, content:"default"}
                ];
            }else if(self.actualPage['outgoingInternLinks'].length == 1){
               this.links = [
                    {x: 2, y: 9, width: 4, height: 1, content:"default"}
                ];
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
            self._editBarService.saveData(this.images,this.texts,this.links,self.actualPage['id'])
            .subscribe( update => {    
                                   console.log("saved");
                                
                               },
                               error =>  self.errorMessage = <any>error);
        }.bind(this);

        this.loadImages = function () {
            var images = GridStackUI.Utils.sort(this.images);
            _.each(images, function (node) {
               grid.locked(grid.addWidget(jQuery('<div class="image"><button class="delete hidden">X</button><div class="grid-stack-item-content"><img src=""><div/><div/>'),
                    node.x, node.y, node.width, node.height),true);
               
            }, this);
            return false;
        }.bind(this);

        this.loadText = function () {
            var texts = GridStackUI.Utils.sort(this.texts);
            _.each(texts, function (node) {
                grid.locked(grid.addWidget(jQuery('<div class="text"><button class="delete hidden">X</button><div class="grid-stack-item-content">'+node.content+'<div/><div/>'),
                    node.x, node.y, node.width, node.height),true);
            }, this);
            return false;
        }.bind(this);

        this.loadLinks = function () {
            var links = GridStackUI.Utils.sort(this.links);
            _.each(links, function (node) {
                grid.locked(grid.addWidget(jQuery('<div class="link"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">'+node.content+'</a></div><div/><div/>'),
                    node.x, node.y, node.width, node.height),true);
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
                    content: el.find('a').text()
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
                  grid.move((this),jQuery(this).attr('data-gs-x'),0);
              });
             
             
              
            // grid.locked(el,false);
           
            console.log("DONE");
        
        }.bind(this);

        jQuery('#save-grid').click(this.saveGrid);
        jQuery('#reset').click(this.reloadGrid);
        jQuery('#clear-grid').click(this.clearGrid);
        jQuery('#floatUp').click(this.floatUp);
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