import {Component,OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import {NodeEditorService} from './nodeEditor.service';
import {EditBarComponent} from '../editBar/editBar.component';
import { EditBarService }    from '../editBar/editBar.service';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';

declare var $: any;
declare var Konva:any;

@Component({
  selector: 'nodeEditor',
  templateUrl: `app/html/nodeEditor/nodeEditor.html`,
  directives: [LogStateComponent,EditBarComponent],
  providers: [NodeEditorService,HttpClient,AuthenticationService,EditBarService]
})

export class NodeEditorComponent implements OnInit{
    title = 'Tree-Editor:';   
    width;
    height = window.innerHeight;
    buttonColor='#96c4cd';
    buttonColorHover='#6b878c';
    buttonColorDisabled='white';
    levelY = 100;
    levelX;
    startY = 0;
    offset = 0.0;
    isDragging; 
    xDrag;
    yDrag; 
    xDrop;
    yDrop;
    over;
    movementStyle = null; 
    selectedNode = null;
    dropStyle = null; 
    pause = false; 
    allowed;
    popUpShown=false;
    stage; 
    maxHeight;
    toolTipText="";
    tooltip;
    found = false;
    previousShape;
    addRect; 
    delRect; 
    deleteButton; 
    addButton; 
    addText; 
    hasChildren;
    delText; 
    actualPage;
    action = null;
    firstNode;
    button1;
    button2;
    button3;
    button4;
    movingGroup;
    popUp;
    popUpRect;
    button1Rect;
    popText;
    isMobile;
    initFontSize;
    dropText = "Do you want replace this page with the dragged one, OR do you want to add the moving page as sub-page to this page " +
            "OR do you want to connect this two pages to reunite the branches?";
    moveText = "Do you want to move only this page or all sub-pages as well?";
    deleteText = "ATTENTION:\n All sub-pages will be deleted as well.\nDo you really want to delete this page?";
    emptyLayer;
    backgroundLayer
    levelTextLayer;
    layerConn;
    layer;
    name;
    initVar = true; 
    ownStory;
    loggedIn;
    tempLayer;
    interfaceLayer;
    layerTEXT;
                
    
    
    storyID; 
    errorMessage; 
   
   
    dottedLineAdd = new Konva.Line({
            points: [5, 5, 175, 5, 175, 45, 5, 45,5,5],
            stroke: 'black',
            strokeWidth: 1,
            lineJoin: 'round',
            dash: [4, 2]
        });
    dottedLineDel = this.dottedLineAdd.clone();
    dottedLinePopUp=  this.dottedLineAdd.clone({
        points: [10, 10, 390, 10, 390, 240, 10,240,10,10],
        strokeWidth: 2
    });

    debugText = new Konva.Text({
            fill: 'black',
            fontSize: 20,
            y: 25,
            align: 'center',
            fontFamily: "Architects Daughter"
        });
       
       
      
    
        
    constructor(
    private _router: Router,
    private _routeParams:RouteParams,
    private _nodeEditorService: NodeEditorService,
    private _authenticationService: AuthenticationService,
    private _editBarService: EditBarService) {
        this.allowed = [];
    }
    
    
      ngOnInit():any {
         
          let self = this;
          this.name = this._routeParams.get('name');  
          this.loggedIn = this._authenticationService.isLoggedIn();
        
          if(this.loggedIn){
              
            this._editBarService.getLoggedInUser()
                                 .subscribe(
                                   loggedInUser => {    
                                    this.ownStory = false;
                                       for(var i = 0; i < loggedInUser['stories'].length; i++){
                                           if(loggedInUser['stories'][i]['id'] == this._routeParams.get('id')){
                                               this.ownStory = true;
                                           }
                                       }
                                   
                                    if(!this.ownStory ){
                                         this._router.navigate(['Error']);
                                    }else{  
                                       // this.initVar = true;
                                        $('#nodeEditorPage').removeClass('hidden');
                                        this.init();
                                           
                                      
                                    }
        
                                   },
                                   error =>  this.errorMessage = <any>error);
          }else{
             this._router.navigate(['Error']);
          }
          
          var doit;
           //refresh page on browser resize
           $(window).bind('resize', function(e)
            {    
           
               console.log("resize");
            //nur wenn vex NICHT offn !! 
           /*     clearTimeout(doit);
                doit = setTimeout(self.init(), 500);*/
         
            });

          
      }
    
    init(){
       this.setVariables();
       this.buildCanvas();
       this.mouseEvents();
       this.dragEvents();
       this.buttonEvents(); 
    }
    
    setVariables(){
               this.storyID = this._routeParams.get('id');  
               this.stage = new Konva.Stage({
                    container: 'container',
                    width: this.width,
                    height:this.height,
                    draggable:false,
                    id: "stage"
        
                });
               this.width = $('#container').width();
               this.stage.setAttr('width',this.width);
               this.levelX = this.width/2;
                 this.addRect = new Konva.Rect({
                    x: 0,
                    y: 0,
                    width: 180,
                    height: 50,
                    id: "addRect",
                    fill: this.buttonColorDisabled
                });
                 this.delRect = this.addRect.clone({
                    id: "delRect"
                });
              this.button1Rect = this.addRect.clone({
                fill: this.buttonColor,
                id: "button1Rect"
                });
                
                  this.deleteButton= new Konva.Group({
                        x: this.width*0.05,
                        y: 80,
                        id: "deleteButton"
                    });
                this.addButton = this.deleteButton.clone({
                    x: this.width*0.05,
                    y: 20,
                    id: "addButton"
                });
                 this.addText = new Konva.Text({
                    fill: 'black',
                    fontSize:  16,
                    x: 18,
                    y: 18,
                    id: "addText",
                    text: "ADD NEW PAGE",
                    align: 'center',
                    fontFamily: "Architects Daughter"
                });
            
                 this.delText = this.addText.clone({
                    id: "delText",
                    x:26,
                    text: "DELETE PAGE"
                });
                 this.button1 = this.deleteButton.clone({
                    y: 130,
                    id: "button1"
                });
        
               this.movingGroup = new Konva.Group({
                    id: "movingGroup",
                    draggable: true
                });
        
                this.button2 = this.button1.clone({id: "button2"});
                this.button3 = this.button1.clone({x: 335,id: "button3"});
                this.button4 = this.button1.clone({id: "button4"});
                this.popUpRect= new Konva.Rect({
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 250,
                    id: "popUpRect",
                    fill:  this.buttonColorDisabled
                });
                 this.popUp = new Konva.Group({
                    x:  this.width/2-200,
                    y:  this.height/2-125,
                    id: "popUp",
                    draggable:true
                });
                this.popText = this.addText.clone({
                    fontSize: 16,
                    align: 'center',
                    lineHeight: 1.5
                });
        
             this.backgroundLayer = new Konva.Layer({
                width: this.width,
                height:this.height,
                scale:{
                    x: 1,
                    y: 1
                }
            });
            this.layer  = this.backgroundLayer.clone();
            this.layerConn =this.backgroundLayer.clone();
            this.layerTEXT = this.backgroundLayer.clone();
            this.levelTextLayer= this.backgroundLayer.clone();
            this.tempLayer = new Konva.Layer({
                width: this.width,
                height: this.height
            });
            this.emptyLayer = this.tempLayer.clone();
            this.interfaceLayer = this.tempLayer.clone();
                
    }
    
    buildCanvas(){    
                this.debugText.setAttr('x', this.width/2-30);
                this.interfaceLayer.add(this.debugText);

                //ADD NEW PAGE BUTTON
            /*    this.addButton.add(this.addRect);
                this.addButton.add(this.addText);
                this.addButton.add(this.dottedLineAdd);
                this.interfaceLayer.add(this.addButton);
        
                //DELETE PAGE BUTTON
                this.deleteButton.add(this.delRect);
                this.deleteButton.add(this.delText);
                this.deleteButton.add(this.dottedLineDel);
                this.interfaceLayer.add(this.deleteButton);*/
        
                 //DELETE POPUP
             /*    this.popUp.add( this.popUpRect);
                 this.popUp.add( this.popText);
        
                 this.button1.add( this.button1Rect);
                 this.button1.add( this.dottedLineAdd.clone({id:'button1dotted'}));
                 this.button1.add( this.delText.clone({id:'button1Text'}));
                 this.popUp.add( this.button1);
        
                 this.button2.add( this.button1Rect.clone({id:'button2Rect'}));
                 this.button2.add( this.dottedLineAdd.clone({id:'button2dotted'}));
                 this.button2.add( this.delText.clone({id:'button2Text'}));
                 this.popUp.add( this.button2);
        
                 this.button3.add( this.button1Rect.clone({id:'button3Rect'}));
                 this.button3.add( this.dottedLineAdd.clone({id:'button3dotted'}));
                 this.button3.add( this.delText.clone({id:'button3Text'}));
                 this.popUp.add( this.button3);
        
                 this.button4.add( this.button1Rect.clone({id:'button4Rect'}));
                 this.button4.add( this.dottedLineAdd.clone({id:'button4dotted'}));
                 this.button4.add( this.delText.clone({id:'button4Text'}));
                 this.popUp.add( this.button4);
        
                 this.popUp.add( this.dottedLinePopUp);
                 this.interfaceLayer.add( this.popUp);
        
                 this.interfaceLayer.find('#popUp')[0].hide();*/

                
               this.stage.add(this.emptyLayer);
                this.stage.add(this.backgroundLayer);
                this.stage.add(this.levelTextLayer);
                this.stage.add(this.layerConn);
                this.stage.add(this.layer);
        
                this.stage.add(this.tempLayer);
                this.stage.add(this.interfaceLayer);
                this.stage.add(this.layerTEXT);
                
                
                this.startDrawLines(this.storyID);
                this.startDrawNodes(this.storyID,"first");
        
                this.isMobile = false;
               // this.initFontSize = this.stage.find('#button1Text')[0].getAttr('fontSize');
    }
    
    mouseEvents(){
        let self = this;
               //mouse EVENTS
          
          this.layer.off('click tap').on('click tap', function (e) { 

            if(self.movementStyle == null) {
                self.nodeSelection(e.target);
                self.disable(e.target.id()); //check if add node is allowed
            }else if(self.movementStyle != null && self.movementStyle != 'one'){ console.log("CLICK");
                self.layer.find('#movingGroup')[0].getChildren(function (n) {
                    return n.getClassName() === "Circle";
                }).each(function (shape, n) {
                    var x = shape.getAttr('x');
                    var y = shape.getAttr('y');
                    shape.moveTo(self.layer);
                    shape.setAttr('x', x);
                    shape.setAttr('y', y);
                    shape.setAttr('fill', self.buttonColorHover);
                   // self.setDraggable(true);
                });
                self.layer.draw();
                self.tempLayer.draw();
                self.dropStyle = null;
                self.movementStyle = null;
                self.allowed[0]= false;
                self.allowed[1] = false;
                self.allowed[2] = false;
                $("#wrapper").trigger( "click" );
            }
        });
        
         this.stage.on("mouseout", function (e) {
            self.tooltip.hide();
            self.toolTipText="";
            self.layerTEXT.draw();
        });
          
           this.layer.on("mouseover", function (e) {
            var fill = e.target.fill() == 'yellow' ? 'yellow' : 'orange';
            e.target.fill(fill);
               self.debugText.text(e.target.getAttr('id'));
               self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);
              
               
            //highLight = null;
            self.layer.draw();
            self.interfaceLayer.draw();
        });
          
          this.layer.on("mouseout", function (e) {
            var fill = e.target.fill() == 'yellow' ? 'yellow' : self.buttonColorHover;
            e.target.fill(fill);
            self.layer.draw();
            self.tooltip.hide();
            self.layerTEXT.draw();
            if(self.selectedNode == null){
                self.debugText.text('Select a node');
                self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);

                self.interfaceLayer.draw();
            }

           //self.tooltip.show();
            //self.layerTEXT.draw();
            self.toolTipText="";
        });
        
        this.layer.on("mouseover", function(e) {
            if(!self.popUpShown){
                self.tooltip.position({
                    x : e.target.getAttr('x')-40,
                    y :  e.target.getAttr('y')-50*(1+(1-self.layer.getAttr('scale').x))
                });
    
                if(self.toolTipText == ""){
                        self._nodeEditorService.getPageById(e.target.getAttr('id'))
                                        .subscribe(
                                               actualPage => { 
                                                self.setToolTip(actualPage['title'],e);
                                               },
                                               error =>  self.errorMessage = <any>error);
                        //service get title of page with id
                         
                       
                }else{
                    self.setToolTip(self.toolTipText,e);
                }
            }

        }); 
    }
    
   dragEvents(){
       let self = this; 
          //dragEVENTS
       
         self.layer.on("dragstart", function (e) {
      /*    if (!self.pause && self.movementStyle == null) {
             self.pause = true;
             // self.zoomOut();
              if(e.target.id() != self.selectedNode){
                  self.nodeSelection(e.target);
              }
              self.popUpShown = true;
              self.setDraggable(false);
              $.when(self.checkAdditionalNode(e.target.id()), self.checkDeleteNode(e.target.id())).done(function (a1, a2) {
                  self.tooltip.hide();
                  self.layerTEXT.draw();
                 self.toolTipText="";
                  self.moveQuestion(e);
              });
              e.target.fill('yellow');
              self.interfaceLayer.draw();
          } else*/ 
             if (/*!self.pause && */self.movementStyle == "one") {
              self.xDrag = e.target.getAttr('x');
              self.yDrag = e.target.getAttr('y');

              e.target.moveTo(self.tempLayer);
              e.target.fill('yellow');
              self.layer.draw();
        } else if (/*!self.pause && */self.movementStyle != "one" && self.movementStyle != null) {               
    
              self.movingGroup.moveTo(self.tempLayer); 
              self.layer.draw();
              self.tempLayer.draw();
          }

        
      });

  
       
         this.stage.on("dragmove", function (evt) {
          //  if(!self.pause) {
                var pos = self.stage.getPointerPosition();
                var shape = self.layer.getIntersection(pos);
            
                if (self.previousShape && shape) {
                    if (self.previousShape !== shape) {
                        // leave from old target
                        self.previousShape.fire('dragleave', {
                            type: 'dragleave',
                            target: self.previousShape,
                            evt: evt.evt
                        }, true);

                        // enter new target
                        shape.fire('dragenter', {
                            type: 'dragenter',
                            target: shape,
                            evt: evt.evt
                        }, true);
                        self.previousShape = shape;
                    } else {
                        self.previousShape.fire('dragover', {
                            type: 'dragover',
                            target: self.previousShape,
                            evt: evt.evt
                        }, true);
                    }
                } else if (!self.previousShape && shape) {
                    self.previousShape = shape;
                    shape.fire('dragenter', {
                        type: 'dragenter',
                        target: shape,
                        evt: evt.evt
                    }, true);
                } else if (self.previousShape && !shape) {
                    self.previousShape.fire('dragleave', {
                        type: 'dragleave',
                        target: self.previousShape,
                        evt: evt.evt
                    }, true);
                    self.previousShape = undefined;
                }
                self.tempLayer.draw();
         //   }
        });

        
            
            this.stage.on("dragend", function (e) { 
           

            //wieder wegmachen 
              //  e.target.setAttr("x", self.xDrag);
              //  e.target.setAttr("y", self.yDrag);
                if(/*!self.pause &&*/ e.target.id() != 'stage') { 
                    
                    var pos = self.stage.getPointerPosition();
                    var overlapping = self.layer.getIntersection(pos); 
                 
                  if (overlapping) { 
                        if (self.dropStyle == null) {
                            self.checkAdditionalNode(self.previousShape.id());
                            self.tooltip.hide();
                            self.layerTEXT.draw();
                            self.toolTipText="";
                            self.dropQuestion(e);
                        }
                    } else {
                        if (self.movementStyle == "one") {
                            e.target.setAttr("x", self.xDrag);
                            e.target.setAttr("y", self.yDrag);
                            e.target.fill(self.buttonColorHover);
                        } else {
                            if(e.target.id() != "popUp") {
                                e.target.setAttr("x", self.xDrag);
                                e.target.setAttr("y", self.yDrag);
    
                            }
                        }
                       self.dropReset(e);
                    }
                            
          
                    }
                });  
       
       this.stage.on("dragenter", function (e) {
           /*if(!pause) {
               debugText.setAttr('fontSize','20');
                debugText.text('Drag over' + toolTipText);
                layer.draw();
                interfaceLayer.draw();
           }*/
        });

        this.stage.on("dragleave", function (e) {
           // if(!self.pause) {
                self.over = false;
                e.target.fill(self.buttonColorHover);
                self.debugText.setAttr('fontSize','20');
                self.debugText.text('');
                self.layer.draw();
                self.interfaceLayer.draw();
           // }
        });
       
        this.stage.on("dragover", function (e) {
           // if(!self.pause) {
                
                self.over = true;
                e.target.fill('green');
                self.xDrop = e.target.getAbsolutePosition().x;
                self.yDrop = e.target.getAbsolutePosition().y;
                self.debugText.setAttr('fontSize','20');
                self.debugText.text('Drag over ' + e.target.id());
                self.layer.draw();
                self.interfaceLayer.draw();
           // }
        });

        this.stage.on("drop", function (e) {
           // if(!self.pause) {
                e.target.setAttr("x", self.xDrag);
               e.target.setAttr("y", self.yDrag);

                e.target.fill('green');
                self.debugText.setAttr('fontSize','20');
                self.debugText.text('Drop ' + e.target.id());
                self.layer.draw();
                self.interfaceLayer.draw();
           // }
        });


    }
        //BUTTON EVENTS
   onAdded(added: boolean) {      
       if(added){
               this.addNewNode();
       }
  }
    onDeleted(deleted: boolean) {
        if(deleted){
                this.deleteNode();
        }  
  }
     onDeleteBranch(deleted: boolean) {
        if(deleted){
                this.deleteBranch();
        }  
  }
    onSwapNode(swap: boolean) {      
       if(swap){
             this.debugText.text("Start Dragging");
             this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
             this.interfaceLayer.draw();
             this.layer.find('#'+this.selectedNode).draggable(true);
             this.movementStyle = "one"; 
             this.action="one";  
       }
  }
    onSwapBranch(swap: boolean) {      
       if(swap){
             this.debugText.text("Start Dragging");
             this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
             this.interfaceLayer.draw();
           
             this._nodeEditorService.getChildren(this.selectedNode)
                            .subscribe(
                               data => {    
                                    this.movementStyle = data;
                                    this.movingGroup.setAttr('x', 0);
                                    this.movingGroup.setAttr('y', 0);

                                    for (var i = 0; i < this.movementStyle.length; i++) {
                                        //this.layer.find('#'+this.movementStyle[i]['id']).draggable(true);
                                        var node = this.layer.find('#' + this.movementStyle[i]['id']);
                                        node.fill('yellow');
                                        node.moveTo(this.movingGroup);
                                    }
                                 this.layer.add(this.movingGroup);
                                 this.xDrag =  this.layer.find('#'+this.selectedNode)[0].getAttr('x');
                                 this.yDrag =  this.layer.find('#'+this.selectedNode)[0].getAttr('y');
                                 this.layer.draw();
                                 this.interfaceLayer.draw();
                                 this.action="branch";  
                                  
                               },
                               error =>  this.errorMessage = <any>error); 
       }
  }
    
     onAppend(append: boolean) {      
       if(append){
             this.debugText.text("Start Dragging");
             this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
             this.interfaceLayer.draw();
           
             this._nodeEditorService.getChildren(this.selectedNode)
                            .subscribe(
                               data => {    
                                    this.movementStyle = data;
                                    this.action = "append";
                                    this.movingGroup.setAttr('x', 0);
                                    this.movingGroup.setAttr('y', 0);

                                    for (var i = 0; i < this.movementStyle.length; i++) {
                                        //this.layer.find('#'+this.movementStyle[i]['id']).draggable(true);
                                        var node = this.layer.find('#' + this.movementStyle[i]['id']);
                                        node.fill('yellow');
                                        node.moveTo(this.movingGroup);
                                    }
                                 this.layer.add(this.movingGroup);
                                 this.xDrag =  this.layer.find('#'+this.selectedNode)[0].getAttr('x');
                                 this.yDrag =  this.layer.find('#'+this.selectedNode)[0].getAttr('y');
                                 this.layer.draw();
                                 this.interfaceLayer.draw();
                           
                               },
                               error =>  this.errorMessage = <any>error); 
       }
  }
    
    
    buttonEvents(){
       let self = this; 
     
        
         //add new page
    /*    this.stage.find('#addButton')[0].off('click tap').on('click tap',function(e){
            var rect =  self.stage.find('#addRect')[0];
            var fill = rect.fill() == self.buttonColorDisabled ? self.buttonColorDisabled : self.buttonColorHover;
            if(fill != self.buttonColorDisabled){
                self.addNewNode();
            }
        });

        this.hoverInterfaceButtons('#addRect','#addText');


       //delete page
        this.stage.find('#deleteButton')[0].off('click tap').on('click tap',function(e){
            var rect =  self.stage.find('#delRect')[0];
            var fill = rect.fill() == self.buttonColorDisabled ? self.buttonColorDisabled: self.buttonColorHover;
            if(fill != self.buttonColorDisabled){
               self.deleteNode();
            }
        });

        this.hoverInterfaceButtons('#delRect','#delText');*/
    }
    
    
       //###### TRIGGER FUNCTIONS ######
      startDrawLines(id){
        this._nodeEditorService.startDrawLines(id)
                            .subscribe(
                               maxLevel => {    
                               // this.maxLevel = maxLevel;
                               //plus minus eins fehler
                                this.drawLines(maxLevel['max_level']-1);
    
                               },
                               error =>  this.errorMessage = <any>error);
      }
      
      startDrawNodes(id,first){
        this._nodeEditorService.startDrawNodes(id)
                            .subscribe(
                               pages => {   
                                pages.sort(function(a, b) {
                                    return parseFloat(a.level) - parseFloat(b.level);
                                });
                                  // console.log(pages);
                                for(var i = 0; i < pages.length; i++){
                                    if(pages[i]['outgoingInternLinks']){
                                        for(var j = 0;j < pages[i]['outgoingInternLinks'].length;j++){
                                            var target = this.findID(pages, pages[i]['outgoingInternLinks'][j]['nextPage']);
                                            //console.log(target);
                                            pages[i]['outgoingInternLinks'][j]['position'] = pages[target]['position'];
                                        }
                                      pages[i]['outgoingInternLinks'].sort(function(a, b) {
                                                return parseFloat(a.position) - parseFloat(b.position);
                                            });
                                    }  
                                }
                                   
                                console.log(pages);
                               this.drawNodes(pages, first);
    
                               },
                               error =>  this.errorMessage = <any>error);
      }
    
        addNewNode(){
            var selected = this.selectedNode;
            
             this._nodeEditorService.getPageById(this.selectedNode)
                                        .subscribe(
                                               actualPage => { 
                                                this.actualPage = actualPage;
                                                this._nodeEditorService.addNewNode(this.storyID,selected,this.actualPage['level']+1,this.actualPage['outgoingInternLinks'].length+1)
                                                    .subscribe( 
                                                       result => {   
                                                        console.log("DONE");
                                                        this.startDrawLines(this.storyID);
                                                        this.startDrawNodes(this.storyID,"");
                                                        this.debugText.text("Successfully added");
                                                        this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);

                                                            this.checkAdditionalNode(this.selectedNode);
                                                           
                                                         this.interfaceLayer.draw();
                                                       },
                                                       error =>  this.errorMessage = <any>error);
                                               },
                                               error =>  this.errorMessage = <any>error);
            
           
            
        }
    
    deleteBranch(){
        var id = this.selectedNode;
        let self = this;
        self._nodeEditorService.deleteBranch(id)
                            .subscribe(
                               result => {                                 
                                console.log("deleted");    
                                /* self.interfaceLayer.find('#button1Rect')[0].fill(self.buttonColor);
                                 self.popUp.hide();
                                 self.pause = false;
                                 self.popUpShown = false;
                                 self.setDraggable(true);*/
                                 if(self.layer.getAttr('scale') < 1.0){
                                   //  self.resetScale();
                                 }
                                 self.startDrawLines(self.storyID);
                                 self.startDrawNodes(self.storyID,"");
                                 self.debugText.text("Successfully deleted");
                                 self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);
                                 this.selectedNode = null;
                               
                                this.allowed[0]= false;
                                this.allowed[1] = false;
                                this.allowed[2] = false;
                                this.allowed[3] = false;
                                $("#wrapper").trigger( "click" );
        
                                 //self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                                 //debugText.setAttr('fontSize','25');
                                 self.interfaceLayer.draw();
                        },
                   error =>  self.errorMessage = <any>error);  
    }
    
     deleteNode(){
       var id = this.selectedNode;
       /*  this.popUpShown = true;
        this.pause = true;
        this.setDraggable(false);
        this.button3.hide();
        this.button4.hide();


        this.interfaceLayer.find('#button1Text')[0].setAttr('text','DELETE');
        this.interfaceLayer.find('#button1Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button1Text')[0].getAttr('width')/2);

        this.interfaceLayer.find('#button2Text')[0].setAttr('text','CANCEL');
        this.interfaceLayer.find('#button2Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button2Text')[0].getAttr('width')/2);

        this.popUpRect.setAttr('width',this.addRect.getAttr('width')*2+80);
        this.popText.setAttr('text',this.deleteText);
        this.popText.setAttr('width',(this.addRect.getAttr('width')*2+80)-20);
        this.popText.setAttr('x',this.popUpRect.getAttr('width')/2-this.popText.getAttr('width')/2);
        this.popText.setAttr('y',25);

        this.popUp.setAttr('x',this.width/2-((this.addRect.getAttr('width')*2+80)/2));
        this.popUp.setAttr('y',this.height/2-((this.addRect.getAttr('height')*2+80)/2));
        if(this.isMobile){
            this.popUpRect.setAttr('height',(this.addRect.getAttr('height')*2+100+this.popText.getAttr('height'))-20);
        }else{
            this.popUpRect.setAttr('height',250);
        }

        this.dottedLinePopUp.setAttr('points',[10, 10, this.popUpRect.getAttr('width')-10, 10, this.popUpRect.getAttr('width')-10, this.popUpRect.getAttr('height')-10, 10,this.popUpRect.getAttr('height')-10,10,10]);
        if(!this.isMobile){
            this.button1.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')-10);
            this.button1.setAttr('y',130);
            this.button2.setAttr('x',this.button1.getAttr('x')+this.button1Rect.getAttr('width')+20);
            this.button2.setAttr('y',130);
        }else{
            this.button1.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button1.setAttr('y',this.popText.getAttr('y')+ this.popText.getAttr('height')+10);
            this.button2.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button2.setAttr('y',this.button1.getAttr('y')+this.button1Rect.getAttr('height')+10);
        }

       // button2.setAttr('id','button2');

        this.popUp.show();
        this.interfaceLayer.draw();
        let self = this;

       this.button2.off('click tap').on('click tap',function(e){
           self.interfaceLayer.find('#button2Rect')[0].fill(self.buttonColor);
            self.popUp.hide();
            self.setDraggable(true);
           self.pause = false;
           self.popUpShown = false;
           self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
           self.interfaceLayer.draw();
        });*/


      //  this.button1.off('click tap').on('click tap',function(e){
             
     let self = this;
           self._nodeEditorService.deletePageById(id)
                            .subscribe(
                               result => {  
                               console.log(result); 
                               if(result['deleted'] == 'false'){
                                   self.debugText.text("Delete is not possible - choose DELETE BRANCH");
                                
                               } else{
                                   self.debugText.text("Successfully deleted"); 
                               }                             
                               
                                /* self.interfaceLayer.find('#button1Rect')[0].fill(self.buttonColor);
                                 self.popUp.hide();
                                 self.pause = false;
                                 self.popUpShown = false;
                                 self.setDraggable(true);*/
                                 if(self.layer.getAttr('scale') < 1.0){
                                   //  self.resetScale();
                                 }
                                 self.startDrawLines(self.storyID);
                                 self.startDrawNodes(self.storyID,"");
                               
                                 self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);
                                 self.selectedNode = null;
                                 
                                 self.allowed[0]= false;
                                 self.allowed[1] = false;
                                 self.allowed[2] = false;
                                 self.allowed[3] = false;
                                 $("#wrapper").trigger( "click" );
        
                                 //self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                                 //debugText.setAttr('fontSize','25');
                                 self.interfaceLayer.draw();
                              
                        },
                   error =>  self.errorMessage = <any>error); 

       // });


        //this.hoverPopUpButtons(['#button1Rect','#button1Text'],this.buttonColorHover,this.buttonColor);
        //this.hoverPopUpButtons(['#button2Rect','#button2Text'],this.buttonColorHover,this.buttonColor);

    };
    
        checkAdditionalNode(id){          
                  this._nodeEditorService.getPageById(id)
                            .subscribe(
                               actualPage => {
                                 
                                this.actualPage = actualPage;
                                   console.log("DONE");  
                                 this.hasChildren = false;
                                 this.allowed[3] = actualPage;
                                // this.stage.find('#addRect')[0].setAttr('fill', this.buttonColor);//WIEDER WEGMACHEN--> diese zeile
                               if(actualPage['outgoingInternLinks'].length > 0){
                                    this.hasChildren = true;
                                }
                                if(actualPage['outgoingInternLinks'].length < 4){
                                    this.allowed[0] = true;
                                     $("#wrapper").trigger( "click" );
                                    console.log("IS ALLOWED"); 
                                    if(!this.popUpShown) {
                                       // this.stage.find('#addRect')[0].setAttr('fill', this.buttonColor);
                                    }
                                } else {
                                     this.allowed[0] = false;
                                     $("#wrapper").trigger( "click" );
                                    console.log("NOT ALLOWED");
                                    if(this.movementStyle != null) {
                                        this.button1.off('click tap');
                                        this.hoverPopUpButtons(['#button1Rect', '#button1Text'], this.buttonColorDisabled, this.buttonColorDisabled);
                                    }
                                    if(!this.popUpShown) {
                                       // this.stage.find('#addRect')[0].setAttr('fill', this.buttonColorDisabled);
                                    }
                                }
                                this.interfaceLayer.draw();    
                               },
                               error =>  this.errorMessage = <any>error); 

        };
    
         checkDeleteNode(id) {  
             this._nodeEditorService.getPageById(id)
                            .subscribe(
                               actualPage => {
                                 
                                this.actualPage = actualPage;
                                   console.log("DONE");
                                  //  this.stage.find('#delRect')[0].setAttr('fill', this.buttonColor);//wieder wegmachen!!!
                                 if (actualPage['level'] == 0) {
                                     
                                    this.allowed[1] = false;
                                      $("#wrapper").trigger( "click" );
                                    if(!this.popUpShown) {
                                      //  this.stage.find('#delRect')[0].setAttr('fill', this.buttonColorDisabled);
                                    }
                                } else {
                                     this.allowed[1] = true; 
                                      $("#wrapper").trigger( "click" );
                                 
                                    if(!this.popUpShown) {
                                        //this.stage.find('#delRect')[0].setAttr('fill', this.buttonColor);
                                    }
                                }
                                
                                this.interfaceLayer.draw();    
                               },
                               error =>  this.errorMessage = <any>error);
   
        };
    
        reorderNodes(ID01, ID02) {
              this._nodeEditorService.reorderNodes(ID01, ID02)
                            .subscribe(
                               result => {
                                     this.startDrawLines(this.storyID);
                                     this.startDrawNodes(this.storyID,"");
                                     this.debugText.text("Successfully reordered");
                                     this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
                                     this.selectedNode = null;
                                     this.allowed[0]= false;
                                     this.allowed[1] = false;
                                     this.allowed[2] = false;
                                     this.allowed[3] = false;
                                     $("#wrapper").trigger( "click" );
                                    
                                    //debugText.setAttr('fontSize','25');
                                    this.interfaceLayer.draw();
                                   },
                               error =>  this.errorMessage = <any>error);
   
                  
               
        };
    
        reorderBranches(ID01, ID02) {
              this._nodeEditorService.reorderBranches(ID01, ID02)
                            .subscribe(
                               result => {
                                    this.startDrawLines(this.storyID); 
                               
                                     this.startDrawNodes(this.storyID,"");
                                    this.debugText.text("Successfully reordered");
                                    this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
                                    this.selectedNode = null;
                                     this.allowed[0]= false;
                                     this.allowed[1] = false;
                                     this.allowed[2] = false;
                                     this.allowed[3] = false;
                                     $("#wrapper").trigger( "click" );
                                    //debugText.setAttr('fontSize','25');
                                    this.interfaceLayer.draw();
                                   },
                               error =>  this.errorMessage = <any>error);
        };
    
    
        appendBranch(ID01, ID02) {
          this._nodeEditorService.appendBranch(ID02, ID01)
                        .subscribe(
                           result => {
                                 this.startDrawLines(this.storyID);
                               this.startDrawNodes(this.storyID,"");
                                this.debugText.text("Successfully appended");
                                this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
                                     this.selectedNode = null;
                                     this.allowed[0]= false;
                                     this.allowed[1] = false;
                                     this.allowed[2] = false;
                                     this.allowed[3] = false;
                                     $("#wrapper").trigger( "click" );
                                //debugText.setAttr('fontSize','25');
                                this.interfaceLayer.draw();
                               },
                           error =>  this.errorMessage = <any>error);
   
                  
               
        };
      //###### TRIGGER FUNCTIONS END ######
      //###### DRAW FUNCTIONS ######
      
      drawLines(levelNumb) {
            this.backgroundLayer.destroyChildren();
            this.levelTextLayer.destroyChildren();
            var line;
            var levelText;
            var h = this.levelY;
            for (var j = 0; j <= levelNumb; j++) {
                line = new Konva.Line({
                    points: [-this.stage.getWidth()*10, this.startY+h, this.stage.getWidth()*10, this.startY+h],
                    stroke: 'grey',
                    strokeWidth: 1,
                    lineCap: 'round',
                    lineJoin: 'round'
                });

                levelText = new Konva.Text({
                    fill: 'black',
                    fontSize:20,
                    fontFamily: "Architects Daughter",
                    text: j,
                    x: 10,
                    y: (this.startY+h)-20
                });

                this.levelTextLayer.add(levelText);
                this.backgroundLayer.add(line);

                h += this.levelY;
            }

            this.maxHeight = h;

            this.backgroundLayer.draw();
            this.levelTextLayer.draw();
        };


   drawNodes(data,first) {
        this.layer.destroyChildren();
        this.layerTEXT.destroyChildren();
        this.layerConn.destroyChildren();

      // this.stage.find('#addRect')[0].setAttr('fill',this.buttonColorDisabled);
      // this.stage.find('#delRect')[0].setAttr('fill',this.buttonColorDisabled);
       this.interfaceLayer.draw();

        //this.selectedNode = null;
       // resetInputFields();

        var star;
        var multiple = this.levelX;
        var center = 0;
        var distance = 70;
        var numb = 0;
        var toBig = false; 
        var points = [];
        var IDs = []; 
        var z = 0;
        var nodeCounter = 0;
        var color = this.buttonColorHover;
        var h = this.startY;

        if(this.layer.getAttr('scale').x < 1.0){
            distance = distance * (1+(1-this.layer.getAttr('scale').x));
        }

        for (var i = 0; i < data.length; i++) {
            var nextPageIDinData;
            var nextID;
            var scaleFactor = 1.0;
            if(this.layer.getAttr('scale').x <=1){
                scaleFactor = this.layer.getAttr('scale').x;
            }
            //first node
            if (i == 0) {
            
                this.firstNode = data[i]['id'];
                if(this.firstNode == this.selectedNode){
                    color = 'yellow';
                }else{
                   color = this.buttonColorHover; 
                }
                star = new Konva.Circle({
                    x: ((multiple - center)*scaleFactor)-this.offset,
                    y: h+(parseInt(data[i]['level']) + 1) * (this.levelY),
                    fill: color,
                    radius: 20,
                    draggable: false,
                    name: 'star ' + data[i]['id'],
                    id: data[i]['id'],
                    stroke: 'black',
                    strokeWidth: 2
                });

                this.layer.add(star);
                
                 var idText = new Konva.Text({
                             x: star.getAttr('x') - (6),
                             y: star.getAttr('y') - 6,
                             text: star.getAttr('id'),
                             fontSize: 20,
                             fill: 'black'
                             });
                             this.layerTEXT.add(idText);


                //connection saving
                if (data[i]['outgoingInternLinks'][0]) {
                    points[z] = [];
                    points[z]['pointX'] = star.getAttr('x');
                    points[z]['pointY'] = star.getAttr('y');
                    points[z][0] = data[i]['outgoingInternLinks'][0]['nextPage'];
                    if (data[i]['outgoingInternLinks'][1]) {
                        points[z][1] = data[i]['outgoingInternLinks'][1]['nextPage'];
                    }
                    if (data[i]['outgoingInternLinks'][2]) {
                        points[z][2] = data[i]['outgoingInternLinks'][2]['nextPage'];
                    }
                    if (data[i]['outgoingInternLinks'][3]) {
                        points[z][3] = data[i]['outgoingInternLinks'][3]['nextPage'];
                    }
                    z++;
                }

            }

           // console.log("POINTS");
           // console.log(points);
            var sh = IDs.shift();
           // console.log("IDs");
           // console.log(IDs);
 
       
     if(data[i]['outgoingInternLinks']){ //umändern auf 
            //get next node id
            for (var q = 0; q < 4; q++) {
                if (i != 0) {
                   if(data[sh]['outgoingInternLinks'][q]){  
                        nextPageIDinData = this.findID(data, data[sh]['outgoingInternLinks'][q]['nextPage']);
                        nextID = nextPageIDinData;
                    }else{
                        nextPageIDinData = 0;
                        nextID = nextPageIDinData; 
                    }


                } else {
                    
                 if(data[i]['outgoingInternLinks'][q]){  
                       nextPageIDinData = this.findID(data, data[i]['outgoingInternLinks'][q]['nextPage']); 
                       nextID = nextPageIDinData;
                }else{
                    nextPageIDinData = 0;
                    nextID = nextPageIDinData; 
                 }
                  
                    
                }
                console.log(nextID);//0
                
                if(this.layer.find('#'+data[nextPageIDinData]['id'])[0] == undefined) {
                    if (nextID != 0) {
                        IDs.push(nextID);
                        numb = this.count(data, nextPageIDinData);

                        nodeCounter++;


                        if (numb > 1) {
                            center = (((numb * (distance)) / 2) + distance / 2);
                            multiple += distance;
                        } else {
                            center = 0;
                            multiple = this.levelX;
                        }

                        //HIGHLIGHTED NODES
                      /*  if (this.highLight != null && highLight.indexOf(data[nextPageIDinData]['id']) != -1) {
                            color = '#e2b0b3';
                        } else {
                            color = buttonColorHover;
                        }*/

                        if(data[nextPageIDinData]['id'] == this.selectedNode){
                            color = 'yellow';
                        }else{
                           color = this.buttonColorHover; 
                        }

                        star = new Konva.Circle({
                            x: ((multiple - center) * scaleFactor) - this.offset,
                            y: h + ((parseInt(data[nextPageIDinData]['level']) + 1) * this.levelY),
                            fill: color,
                            radius: 20,
                            draggable: false,
                            name: 'star ' + data[nextPageIDinData]['id'],
                            id: data[nextPageIDinData]['id'],
                            stroke: 'black',
                            strokeWidth: 2

                        });
                        this.layer.add(star);


                       /* if ((star.getAbsolutePosition().x < 20 || star.getAbsolutePosition().x > width - 20 || star.getAbsolutePosition().y > height - 20) && layer.getAttr('scale').x <= 1) {
                            toBig = true;
                            startScale = layer.scaleX().toFixed(2) - 0.02;
                            if (window.innerWidth < 850) {
                                offset = 50;
                            }
                           if(layer.getAttr('scale').y < 1.0){
                                startY = 10 *(1+(1-layer.getAttr('scale').y));
                                offset = -10 *(1+(1-layer.getAttr('scale').x));
                            }
                            //offset weiter rechts
                            //offset= -10*(1+(1-layer.getAttr('scale').x));

                            layer.scale({
                                x: startScale,
                                y: startScale
                            });
                            layerConn.scale({
                                x: startScale,
                                y: startScale
                            });
                            backgroundLayer.scale({
                                x: 1.0,
                                y: startScale
                            });
                            levelTextLayer.scale({
                                x: startScale,
                                y: startScale
                            });
                            layerTEXT.scale({
                                x: startScale,
                                y: startScale
                            });
                            tempLayer.scale({
                                x: startScale,
                                y: startScale
                            });

                            layerConn.offset({
                                x: layer.offsetX() - 20,
                                y: 0
                            });
                            layerTEXT.offset({
                                x: layer.offsetX() - 20,
                                y: 0
                            });

                            tempLayer.offset({
                                x: layer.offsetX() - 20,
                                y: 0
                            });
                            layer.offset({
                                x: layer.offsetX() - 20,
                                y: 0
                            });


                            startOffsetX = layer.offsetX();

                            startDrawLines();
                            startDrawNodes();
                        } else {*/
                            //TITLE
                            toBig = false;
                            idText = new Konva.Text({
                             x: star.getAttr('x') - (6),
                             y: star.getAttr('y') - 6,
                             text: star.getAttr('id'),
                             fontSize: 20,
                             fill: 'black'
                             });
                             this.layerTEXT.add(idText);


                             //connection saving
                            if (data[nextPageIDinData]['outgoingInternLinks'][0]) {
                                points[z] = [];
                                points[z]['pointX'] = star.getAttr('x');
                                points[z]['pointY'] = star.getAttr('y');
                                points[z][0] = data[nextPageIDinData]['outgoingInternLinks'][0]['nextPage'];
                                if (data[nextPageIDinData]['outgoingInternLinks'][1]) {
                                    points[z][1] = data[nextPageIDinData]['outgoingInternLinks'][1]['nextPage'];
                                }
                                if (data[nextPageIDinData]['outgoingInternLinks'][2]) {
                                    points[z][2] = data[nextPageIDinData]['outgoingInternLinks'][2]['nextPage'];
                                }
                                if (data[nextPageIDinData]['outgoingInternLinks'][3]) {
                                    points[z][3] = data[nextPageIDinData]['outgoingInternLinks'][3]['nextPage'];
                                }
                                z++;
                            }


                            //connection drawing
                            for (var j = 0; j < points.length; j++) {
                                for (var k = 0; k < 4; k++) {
                                    if (points[j][k] == data[nextPageIDinData]['id']) {
                                        this.drawConnection(points[j][k], data[i]['id'], points[j]['pointX'], points[j]['pointY'], star.getAttr('x'), star.getAttr('y'));
                                    }
                                }
                            }

                        }

                    }

                    if (nodeCounter == numb) {
                        nodeCounter = 0;
                        center = 0;
                        multiple = this.levelX;
                    }
                    // }
               
                }
            }

            //}
        }
        if (toBig == false) {
            this.layer.draw();
            this.layerConn.draw();
            this.layerTEXT.draw();
            this.emptyLayer.draw();
            if(first == "first"){
                this.nodeSelection(this.layer.find('#'+ this.firstNode)[0]);          
                this.checkAdditionalNode(this.firstNode);
            }
           
            
            
        }
        this.drawToolTip();
 
    };
    
     drawConnection(id0, id1, x0, y0, x1, y1) {
        var line;
        line = new Konva.Line({
            points: [x0, y0, x1, y1],
            stroke: 'black',
            name: 'Line' + id0 + id1,
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round'
        });

        this.layerConn.add(line);
    };
    
    //###### DRAW FUNCTIONS END ######


   //###### NODE FUNCTIONS ######
    
    nodeSelection(elem) {
        if (!this.popUpShown) {
            var fill = elem.fill() == 'yellow' ? this.buttonColorHover : 'yellow';
            elem.fill(fill);
           this.debugText.setAttr('fontSize','20');
            if(this.selectedNode != null){
                this.layer.find('#'+this.selectedNode).fill(this.buttonColorHover);
            }

            if (fill == 'yellow') {
                this.allowed[2] = true;
                $("#wrapper").trigger( "click" );
                this.debugText.text('Choose the action');
                this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
                this.selectedNode = elem.id();
                /*if(zoomStyle == "zoomJump") {
                    zoomIn(e, null);
                }*/
                //HIER geklickter node in die session
            

            } else if (fill == this.buttonColorHover) {
                this.allowed[0]= false;
                this.allowed[1] = false;
                this.allowed[2] = false;
                this.allowed[3] = false;
                $("#wrapper").trigger( "click" );
            
                this.debugText.text("Select a node");
                this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
                this.interfaceLayer.draw();

                this.selectedNode = null;
               /* if(zoomStyle == "zoomJump"){
                    zoomOut();
                }*/
       

            }
            this.interfaceLayer.draw();
            this.layer.draw();
            this.backgroundLayer.draw();
            this.levelTextLayer.draw();
        }
    };
    
     dropReset(e){
         
     
        this.previousShape = undefined;
        let self = this;  
        if (this.movementStyle == "one") {
            e.target.moveTo(this.layer);
            if (e.target.id() == this.selectedNode) {
                this.selectedNode = null;
                this.disable(e.target.id());
            }
            
            this.setDraggable(false);
        } else {
            e.target.getChildren(function (n) {
                return n.getClassName() === "Circle";
            }).each(function (shape, n) {
                var x = shape.getAttr('x');
                var y = shape.getAttr('y');
                shape.moveTo(self.layer);
                shape.setAttr('x', x);
                shape.setAttr('y', y);
                shape.setAttr('fill', self.buttonColorHover);
                self.setDraggable(false);
            });
               
        }  

        this.allowed[0]= false;
        this.allowed[1] = false;
        this.allowed[2] = false;
        $("#wrapper").trigger( "click" );
        this.debugText.text("Select a node");
        this.debugText.setAttr('x', (this.width/2)-this.debugText.getAttr('width')/2);
        this.interfaceLayer.draw();
        this.layer.draw();
        this.tempLayer.draw();
        this.dropStyle = null;
        this.movementStyle = null;
    };
    
    setDraggable(bool){
        this.layer.getChildren(function(node){
            return node.getClassName() === 'Circle';
        }).each(function(shape, n) {
            shape.setAttr('draggable',bool);
        });
    };
   
    
      //###### NODE FUNCTIONS END ######
    
      //###### BUTTONS ######
     disable(id) {    
         if(this.popUpShown == false){
            if (this.selectedNode == null) {
               // this.stage.find('#addRect')[0].setAttr('fill',this.buttonColorDisabled);
             //  this.stage.find('#delRect')[0].setAttr('fill',this.buttonColorDisabled);
             //   this.interfaceLayer.draw();
    
            } else {
                if (this.selectedNode == id ) {
                    this.checkAdditionalNode(id);
                    this.checkDeleteNode(id);
                }
            }
        }
    };
    
      //###### BUTTONS END ######
    
    //###### TOOLTIP ######
    setToolTip(toolText,e){
        var textToolT;
        let self = this;
        this.toolTipText = toolText;
        this.tooltip.getChildren(function (n) {
            return n.getClassName() === "Text";
        }).each(function (text, n) {
            textToolT = text;
            textToolT.text('"'+toolText+'"');
            if(self.layerTEXT.getAttr('scale').x <= 1.0){
                textToolT.setAttr('fontSize', 20*(1+(1-self.layerTEXT.getAttr('scale').x)*1.5));
            }
           // alert(layerTEXT.getAttr('scale').x);
        });
        this.tooltip.getChildren(function (n) {
            return n.getClassName() === "Rect";
        }).each(function (rect, n) {
            rect.setAttr('width',textToolT.getAttr('width'));
            rect.setAttr('height',textToolT.getAttr('height'));
        });

        this.tooltip.setAttr('x', e.target.getAttr('x')-this.stage.find('#tooltext')[0].getAttr('width')/2);

        if(this.selectedNode == null) {
            this.debugText.setAttr('x', (this.width/2)-this.stage.find('#tooltext')[0].getAttr('width')/2);
            this.debugText.setAttr('fontSize','20');
            this.debugText.text('"'+toolText+'"');
            this.interfaceLayer.draw();
        }
        this.tooltip.show();
        this.layerTEXT.draw();

    };
    
    drawToolTip(){
        this.tooltip = new Konva.Group({
            visible: false
        });
        var tooltext = new Konva.Text({
            text: "",
            fontFamily:  "Architects Daughter",
            fontSize: 20,
            id: "tooltext",
            padding: 8,
            fill: "black",
            opacity: 1.0,
            textFill: "white"
        });

        var rect = new Konva.Rect({
            /*  stroke: 'black',
             strokeWidth: 1,*/
            fill: '#F3E0E1',
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: [10, 10],
            shadowOpacity: 0.5
            //cornerRadius: 10
        });
        rect.moveTo(this.tooltip);
        tooltext.moveTo(this.tooltip);
        this.layerTEXT.add(this.tooltip);
        this.layerTEXT.draw();
    };
    //###### TOOLTIP END ######
    
    //###### BUTTON HOVER #####
    hoverInterfaceButtons(rect, text){
     /*   let self = this; 
        this.stage.find(rect)[0].on('mouseover',function(e){
            var fill = e.target.fill() == self.buttonColorDisabled ? self.buttonColorDisabled : self.buttonColor;
            if(fill != self.buttonColorDisabled){
                e.target.fill(self.buttonColorHover);
                self.interfaceLayer.draw();
            }
        });
        this.stage.find(rect)[0].on('mouseout',function(e){
            var fill = e.target.fill() ==  self.buttonColorDisabled ?  self.buttonColorDisabled :  self.buttonColorHover;
            if(fill !=  self.buttonColorDisabled) {
                e.target.fill( self.buttonColor);
                 self.interfaceLayer.draw();
            }
        });
         this.stage.find(text)[0].on('mouseover',function(e){
            var rec =   self.stage.find(rect)[0];
            var fill = rec.fill() ==  self.buttonColorDisabled ?  self.buttonColorDisabled :  self.buttonColor;
            if(fill !=  self.buttonColorDisabled){
                rec.fill( self.buttonColorHover);
                 self.interfaceLayer.draw();
            }
        });
*/
    };
    
    hoverPopUpButtons(element,colorHover, colorOut){
        let self = this;
        self.interfaceLayer.find(element[0])[0].setAttr('fill',colorOut);
        self.interfaceLayer.draw();

        self.interfaceLayer.find(element[0])[0].off('mouseover').on('mouseover',function(e){
            e.target.fill(colorHover);
            self.interfaceLayer.draw();
        });
        self.interfaceLayer.find(element[1])[0].off('mouseover').on('mouseover',function(e){
            self.interfaceLayer.find(element[0])[0].fill(colorHover);
            self.interfaceLayer.draw();
        });
        self.interfaceLayer.find(element[0])[0].off('mouseout').on('mouseout',function(e){
            e.target.fill(colorOut);
            self.interfaceLayer.draw();
        });

    };
    
    //####### BUTTON HOVER END #######
    
    //####### HELPER FUNCTIONS #######
     findID(data, id){
        var idNEW = 0;
        if(id != 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]['id'] == id) {
                    idNEW = i;
                }
            }
        }
        return idNEW;
    };
    
     count(data, level) {
        var count = 0;
        for (var j = 0; j < data.length; j++) {
            if (parseInt(data[level]['level']) == parseInt(data[j]['level'])) {
                count++;
            }
        }
        return count;
    };
    
    reorder(e){
        this.popUp.hide();
        this.interfaceLayer.draw();
        this.pause = false;
        this.dropStyle = "reorder";
        this.popUpShown = false;
        if (this.movementStyle == "one") { 
            e.target.setAttr("x", this.xDrop);
            e.target.setAttr("y", this.yDrop);
            this.reorderNodes(this.previousShape.id(), e.target.id());
            this.previousShape.fire('drop', {
                type: 'drop',
                target: this.previousShape,
                evt: e.evt
            }, true);
            e.target.fill('green');

        } else {
            console.log("previousshape"+this.previousShape.id()+"selectednode"+this.selectedNode);
            this.reorderBranches(this.previousShape.id(), this.selectedNode);
            this.previousShape.fire('drop', {
                type: 'drop',
                target: this.previousShape,
                evt: e.evt
            }, true);
        }
      this.dropReset(e);
    };
    
    append(e){
         console.log("previousshape"+this.previousShape.id()+"selectednode"+this.selectedNode);
        this.appendBranch(this.previousShape.id(), this.selectedNode);
        this.previousShape.fire('drop', {
            type: 'drop',
            target: this.previousShape,
            evt: e.evt
        }, true);
        
      this.dropReset(e);
    };
    
    firstBy=(function(){function e(f){f.thenBy=t;return f}function t(y,x){x=this;return e(function(a,b){return x(a,b)||y(a,b)})}return e})();
    //######## HELPER FUNCTIONS END ########
    
    //######## POPUPS ########
      moveQuestion(evt){
       /* this.popText.setAttr('text',this.moveText);
        this.popText.setAttr('x',10);
        this.popText.setAttr('y',65);
        this.button3.show();
        this.button4.hide();
        if(!this.isMobile){
            this.popText.setAttr('width',(this.addRect.getAttr('width')*3+80)-30);
        }else{
            this.popText.setAttr('width',(this.addRect.getAttr('width')*2+80)-30);
        }


        this.interfaceLayer.find('#button1Text')[0].setAttr('text','MOVE BRANCH');
        this.interfaceLayer.find('#button1Text')[0].setAttr('fontSize',this.initFontSize);
        this.interfaceLayer.find('#button1Text')[0].setAttr('x', this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button1Text')[0].getAttr('width')/2);


        this.interfaceLayer.find('#button2Text')[0].setAttr('text','MOVE PAGE');
        this.interfaceLayer.find('#button2Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button2Text')[0].getAttr('width')/2);

        if(!this.isMobile){
            this.popUpRect.setAttr('width',this.addRect.getAttr('width')*3+80);
            this.popUp.setAttr('x',this.width/2-((this.addRect.getAttr('width')*3+80)/2));
            this.popUp.setAttr('y',this.height/2-((this.addRect.getAttr('height')*2+80)/2));
            this.popUpRect.setAttr('height',250);
        }else{
            this.popUpRect.setAttr('width',this.addRect.getAttr('width')*2+80);
            this.popUp.setAttr('x',this.width/2-((this.addRect.getAttr('width')*2+80)/2));
            this.popUpRect.setAttr('height',(this.addRect.getAttr('height')*3+150+this.popText.getAttr('height'))-20);
            this.popUp.setAttr('y',this.height/2- this.popUpRect.getAttr('height')/2);

        }

        this.dottedLinePopUp.setAttr('points',[10, 10, this.popUpRect.getAttr('width')-10, 10, this.popUpRect.getAttr('width')-10, this.popUpRect.getAttr('height')-10, 10,this.popUpRect.getAttr('height')-10,10,10]);


      // button2.setAttr('id','button2Move');


        if(!this.isMobile){
            this.button1.setAttr('x',15);
            this.button1.setAttr('y',130);
            this.button2.setAttr('x', this.button1.getAttr('x')+this.button1Rect.getAttr('width')+20);
            this.button2.setAttr('y',130);
            this.button3.setAttr('x',this.button2.getAttr('x')+this.button1Rect.getAttr('width')+20);
            this.button3.setAttr('y',130);
        }else{
            this.button1.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button1.setAttr('y',this.popText.getAttr('y')+ this.popText.getAttr('height')+10);
            this.button2.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button2.setAttr('y',this.button1.getAttr('y')+this.button1Rect.getAttr('height')+10);
            this.button3.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button3.setAttr('y',this.button2.getAttr('y')+this.button1Rect.getAttr('height')+10);
        }



        this.interfaceLayer.find('#button3Text')[0].setAttr('text','CANCEL');
        this.interfaceLayer.find('#button3Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button3Text')[0].getAttr('width')/2);
        this.interfaceLayer.find('#button3Text')[0].setAttr('id','button3Text');

        this.interfaceLayer.find('#button3Rect')[0].setAttr('id','button3Rect');

        this.popUp.show();
        this.interfaceLayer.draw();

        this.hoverPopUpButtons(['#button2Rect','#button2Text'],this.buttonColorHover,this.buttonColor);
        this.hoverPopUpButtons(['#button3Rect','#button3Text'],this.buttonColorHover,this.buttonColor);
        
        let self = this;
        this.button3.off('click tap').on('click tap',function(e){
            self.interfaceLayer.find('#button3Rect')[0].fill(self.buttonColor);
            self.button3.hide();
            self.popUp.hide();
            self.interfaceLayer.draw();
            self.pause = false;
            self.movementStyle = null;
            evt.target.fill(self.buttonColorHover);
            self.layer.draw();
            self.selectedNode = null;
            self.setDraggable(true);
           // startDrawNodes();
            self.popUpShown = false;
            self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
            //debugText.setAttr('fontSize','25');
            self.interfaceLayer.draw();
        });


        if(this.hasChildren == false) {
            this.button1.off('click tap');
            this.hoverPopUpButtons(['#button1Rect','#button1Text'],this.buttonColorDisabled,this.buttonColorDisabled);
        }else {
            this.hoverPopUpButtons(['#button1Rect', '#button1Text'], this.buttonColorHover, this.buttonColor);
            this.button1.off('click tap').on('click tap', function (e) {
             //MOVE BRANCH check ob kinder 
                 /*       self.interfaceLayer.find('#button1Rect')[0].fill(self.buttonColor);
                        self.button3.hide();
                        self.popUp.hide();
                        self.interfaceLayer.draw();
                        self.pause = false;
                        self.movementStyle = data;
                        self.movementStyle = movementStyle.replace(/"/g, "");
                        self.movementStyle = movementStyle.split(",");

                        self.movingGroup.setAttr('x', 0);
                        self.movingGroup.setAttr('y', 0);

                        for (var i = 0; i < self.movementStyle.length; i++) {
                            var node = layer.find('#' + self.movementStyle[i]);
                            node.fill('yellow');
                            node.moveTo(self.movingGroup);
                        }
                        self.layer.add(self.movingGroup);
                        self.xDrag = evt.target.getAbsolutePosition().x;
                        self.yDrag = evt.target.getAbsolutePosition().y;
                        self.layer.draw();
                        self.popUpShown = false;
                        self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                        self.interfaceLayer.draw();
                   
                    
            });
        }

       this.button2.off('click tap').on('click tap',function(e){
           //MOVE ONE
           self.interfaceLayer.find('#button2Rect')[0].fill(self.buttonColor);
            self.button3.hide();
            self.popUp.hide();
           self.interfaceLayer.draw();
            self.pause = false;
            self.movementStyle = "one";
            self.layer.find('#'+evt.target.id()).draggable(true);
           self.popUpShown = false;
           self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
           self.interfaceLayer.draw();
        });*/

    };
    
    dropQuestion(evt){
        
        if(this.action == "one"){
             this.reorder(evt);
        }else if(this.action == "append"){
            this.append(evt);
        }else if(this.action = "branch"){
           this.reorder(evt); 
        } 

     /*   this.pause = true;
        this.popUpShown = true;
        this.button3.show();
        this.button4.show();
        this.setDraggable(false);
        evt.target.moveDown();

        this.popText.setAttr('text',this.dropText);
        this.popText.setAttr('y',55);
        if(!this.isMobile){
            this.popText.setAttr('width',(this.addRect.getAttr('width')*4+80)-30);
        }else{
            this.popText.setAttr('width',(this.addRect.getAttr('width')*2+80)-30);
        }

        this.interfaceLayer.find('#button1Text')[0].setAttr('text','ADD AS SUB-PAGE');
        this.interfaceLayer.find('#button1Text')[0].setAttr('fontSize',this.initFontSize-1);
        this.interfaceLayer.find('#button1Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button1Text')[0].getAttr('width')/2);


        this.interfaceLayer.find('#button2Text')[0].setAttr('text','REPLACE PAGES');
        this.interfaceLayer.find('#button2Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button2Text')[0].getAttr('width')/2);

        if(!this.isMobile){
            this.popUpRect.setAttr('width',this.addRect.getAttr('width')*4+100);
            this.popUp.setAttr('x',this.width/2-((this.addRect.getAttr('width')*4+80)/2));
            this.popUp.setAttr('y',this.height/2-((this.addRect.getAttr('height')*2+80)/2));
            this.popUpRect.setAttr('height',250);
        }else{
            this.popUpRect.setAttr('width',this.addRect.getAttr('width')*2+80);
            this.popUp.setAttr('x',this.width/2-((this.addRect.getAttr('width')*2+80)/2));
            this.popUpRect.setAttr('height',(this.addRect.getAttr('height')*4+150+this.popText.getAttr('height'))-20);
            this.popUp.setAttr('y',this.height/2- this.popUpRect.getAttr('height')/2);

        }
        this.popText.setAttr('x',this.popUpRect.getAttr('width')/2 - this.popText.getAttr('width')/2);

        this.dottedLinePopUp.setAttr('points',[10, 10, this.popUpRect.getAttr('width')-10, 10, this.popUpRect.getAttr('width')-10, this.popUpRect.getAttr('height')-10, 10,this.popUpRect.getAttr('height')-10,10,10]);

        if(!this.isMobile){
            this.button1.setAttr('x',15);
            this.button1.setAttr('y',this.popText.getAttr('y')+ this.popText.getAttr('height')+10);
            this.button2.setAttr('x', this.button1.getAttr('x')+this.button1Rect.getAttr('width')+20);
            this.button2.setAttr('y',this.popText.getAttr('y')+ this.popText.getAttr('height')+10);
            this.button4.setAttr('x',this.button2.getAttr('x')+this.button1Rect.getAttr('width')+20);
            this.button4.setAttr('y',this.popText.getAttr('y')+ this.popText.getAttr('height')+10);
            this.button3.setAttr('x',this.button4.getAttr('x')+this.button1Rect.getAttr('width')+20);
            this.button3.setAttr('y',this.popText.getAttr('y')+ this.popText.getAttr('height')+10);

        }else{
            this.button1.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button1.setAttr('y',this.popText.getAttr('y')+ this.popText.getAttr('height')+10);
            this.button2.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button2.setAttr('y',this.button1.getAttr('y')+this.button1Rect.getAttr('height')+10);
            this.button4.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button4.setAttr('y',this.button2.getAttr('y')+this.button1Rect.getAttr('height')+10);
            this.button3.setAttr('x',(this.popUpRect.getAttr('width')/2)-this.button1Rect.getAttr('width')/2);
            this.button3.setAttr('y',this.button4.getAttr('y')+this.button1Rect.getAttr('height')+10);
        }


        this.interfaceLayer.find('#button3Text')[0].setAttr('text','CANCEL');
        this.interfaceLayer.find('#button3Text')[0].setAttr('id','button3Text');
        this.interfaceLayer.find('#button3Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button3Text')[0].getAttr('width')/2);

        this.interfaceLayer.find('#button4Text')[0].setAttr('text','ADD CONNECTION');
        this.interfaceLayer.find('#button4Text')[0].setAttr('fontSize',this.initFontSize-1);
        this.interfaceLayer.find('#button4Text')[0].setAttr('id','button4Text');
        this.interfaceLayer.find('#button4Text')[0].setAttr('x',this.addRect.getAttr('width')/2-this.interfaceLayer.find('#button4Text')[0].getAttr('width')/2);


        this.interfaceLayer.find('#button3Rect')[0].setAttr('id','button3Rect');
        this.interfaceLayer.find('#button4Rect')[0].setAttr('id','button4Rect');

        this.popUp.show();
        this.interfaceLayer.draw();

        this.hoverPopUpButtons(['#button1Rect','#button1Text'],this.buttonColorHover,this.buttonColor);
        this.hoverPopUpButtons(['#button2Rect','#button2Text'],this.buttonColorHover,this.buttonColor);
        this.hoverPopUpButtons(['#button3Rect','#button3Text'],this.buttonColorHover,this.buttonColor);
        this.hoverPopUpButtons(['#button4Rect','#button4Text'],this.buttonColorHover,this.buttonColor);

        let self = this;
        this.button3.off('click tap').on('click tap',function(e){
            self.interfaceLayer.find('#button3Rect')[0].fill(self.buttonColor);
            self.button3.hide();
            self.popUp.hide();
            self.interfaceLayer.draw();
            self.pause = false;
            self.selectedNode = null;
            self.setDraggable(true);
            if (self.movementStyle == "one") {
                evt.target.setAttr("x", self.xDrag);
                evt.target.setAttr("y", self.yDrag);
                evt.target.fill(self.buttonColorHover);
            } else {
                evt.target.setAttr("x", self.xDrag);
                evt.target.setAttr("y", self.yDrag);
            }
            self.dropReset(evt);
            self.startDrawNodes(self.storyID);
            self.popUpShown = false;
            self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
            self.interfaceLayer.draw();
        });


        if(this.movementStyle == 'one'){
            this.button4.off('click tap').on('click tap',function(e){
              //ADD CONNECTION
                    /*    self.interfaceLayer.find('#button4Rect')[0].fill(self.buttonColor);
                        self.button3.hide();
                        self.button4.hide();
                        self.popUp.hide();
                        self.pause = false;
                        self.dropStyle = "connection";
                        self.dropReset(evt);
                        self.popUpShown = false;
                        self.startDrawLines(self.storyID);
                        self.startDrawNodes(self.storyID);
                        self.debugText.text(data);
                        self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);

                        self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                        self.interfaceLayer.draw();

                 
            });

        }else{
            this.button4.off('click tap');
            this.hoverPopUpButtons(['#button4Rect', '#button4Text'], this.buttonColorDisabled, this.buttonColorDisabled);
        }


        if(this.hasChildren && this.movementStyle == "one") {
            this.button1.off('click tap');
            this.hoverPopUpButtons(['#button1Rect','#button1Text'],this.buttonColorDisabled,this.buttonColorDisabled);
        }else{
            this.hoverPopUpButtons(['#button1Rect','#button1Text'],this.buttonColorHover,this.buttonColor);
            this.button1.off('click tap').on('click tap', function (e) {
                if(self.movementStyle == "one") {
                //ADD NODE AS CHILD
                       /*     self.interfaceLayer.find('#button2Rect')[0].fill(self.buttonColor);
                            self.button3.hide();
                            self.button4.hide();
                            self.popUp.hide();
                            self.pause = false;
                            self.dropStyle = "child";
                            self.dropReset(evt);
                            self.popUpShown = false;
                            self.startDrawLines(self.storyID);
                            self.startDrawNodes(self.storyID);
                            self.debugText.text(data);
                            self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);

                            self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                            self.interfaceLayer.draw();
                    
                }else{
                   //ADD BRANCH AS CHILD
                        /*    self.interfaceLayer.find('#button2Rect')[0].fill(self.buttonColor);
                            self.button3.hide();
                            self.button4.hide();
                            self.popUp.hide();
                            self.pause = false;
                            self.dropStyle = "child";
                            self.dropReset(evt);
                            self.popUpShown = false;
                            self.startDrawLines(self.storyID);
                            self.startDrawNodes(self.storyID);
                            self.debugText.text(data);
                            self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);

                            self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                            self.interfaceLayer.draw();
                       
                }
            });
        }

        this.button2.off('click tap').on('click tap',function(e){
            if(self.movementStyle != "one") {
               //CHECK IF PARENT
                  /*    if(data == 'false'){
                          self.found = false;
                          self.interfaceLayer.find('#button2Rect')[0].fill(self.buttonColor);
                          self.button3.hide();
                          self.button4.hide();
                          self.reorder(evt);
                       }else{
                          self.found = true;
                          self.interfaceLayer.find('#button2Rect')[0].fill(self.buttonColor);
                          self.button3.hide();
                          self.button4.hide();
                          self.popUp.hide();
                          self.interfaceLayer.draw();
                          self.pause = false;
                          self.dropStyle = "reorder";
                          self.popUpShown = false;
                          self.dropQuestion2(evt);
                      }
                        //interfaceLayer.find('#button1Text')[0].setAttr('text','');
                        self.interfaceLayer.draw();

            }else{
                self.interfaceLayer.find('#button2Rect')[0].fill(self.buttonColor);
                self.button3.hide();
                self.button4.hide();
                self.reorder(evt);
            }
        });
*/
    };


    //######## POPUPS END #######
}
