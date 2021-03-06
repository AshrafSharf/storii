System.register(['angular2/core', 'angular2/router', '../logState/logState.component', './nodeEditor.service', '../editBar/editBar.component', '../editBar/editBar.service', '../../headerfct', '../login/authentication.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, logState_component_1, nodeEditor_service_1, editBar_component_1, editBar_service_1, headerfct_1, authentication_service_1;
    var NodeEditorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (logState_component_1_1) {
                logState_component_1 = logState_component_1_1;
            },
            function (nodeEditor_service_1_1) {
                nodeEditor_service_1 = nodeEditor_service_1_1;
            },
            function (editBar_component_1_1) {
                editBar_component_1 = editBar_component_1_1;
            },
            function (editBar_service_1_1) {
                editBar_service_1 = editBar_service_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            NodeEditorComponent = (function () {
                function NodeEditorComponent(_router, _routeParams, _nodeEditorService, _authenticationService, _editBarService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._nodeEditorService = _nodeEditorService;
                    this._authenticationService = _authenticationService;
                    this._editBarService = _editBarService;
                    this.title = 'Tree-Editor:';
                    this.height = window.innerHeight;
                    this.buttonColor = '#96c4cd';
                    this.buttonColorHover = '#6b878c';
                    this.buttonColorDisabled = 'white';
                    this.levelY = 100;
                    this.zoom = 1.8;
                    this.startY = 0;
                    this.offset = 0.0;
                    this.movementStyle = null;
                    this.selectedNode = null;
                    this.dropStyle = null;
                    this.pause = false;
                    this.startScale = 1.0;
                    this.startOffsetX = 0.0;
                    this.startOffsetY = 0.0;
                    this.popUpShown = false;
                    this.toolTipText = "";
                    this.found = false;
                    this.editing = false;
                    this.action = null;
                    this.zooming = false;
                    this.dropText = "Do you want replace this page with the dragged one, OR do you want to add the moving page as sub-page to this page " +
                        "OR do you want to connect this two pages to reunite the branches?";
                    this.moveText = "Do you want to move only this page or all sub-pages as well?";
                    this.deleteText = "ATTENTION:\n All sub-pages will be deleted as well.\nDo you really want to delete this page?";
                    this.initVar = true;
                    this.dottedLineAdd = new Konva.Line({
                        points: [5, 5, 175, 5, 175, 45, 5, 45, 5, 5],
                        stroke: 'black',
                        strokeWidth: 1,
                        lineJoin: 'round',
                        dash: [4, 2]
                    });
                    this.dottedLineDel = this.dottedLineAdd.clone();
                    this.dottedLinePopUp = this.dottedLineAdd.clone({
                        points: [10, 10, 390, 10, 390, 240, 10, 240, 10, 10],
                        strokeWidth: 2
                    });
                    this.debugText = new Konva.Text({
                        fill: 'black',
                        fontSize: 20,
                        y: 25,
                        align: 'center',
                        fontFamily: "Architects Daughter"
                    });
                    this.firstBy = (function () { function e(f) { f.thenBy = t; return f; } function t(y, x) { x = this; return e(function (a, b) { return x(a, b) || y(a, b); }); } return e; })();
                    this.allowed = [];
                }
                NodeEditorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var self = this;
                    this.name = this._routeParams.get('name');
                    this.loggedIn = this._authenticationService.isLoggedIn();
                    if (this.loggedIn) {
                        this._editBarService.getLoggedInUser()
                            .subscribe(function (loggedInUser) {
                            _this.ownStory = false;
                            for (var i = 0; i < loggedInUser['stories'].length; i++) {
                                if (loggedInUser['stories'][i]['id'] == _this._routeParams.get('id')) {
                                    _this.ownStory = true;
                                }
                            }
                            if ($(window).width() <= 900) {
                                _this._router.navigate(['Mobile']);
                            }
                            if (!_this.ownStory) {
                                _this._router.navigate(['Error']);
                            }
                            else {
                                $('#nodeEditorPage').removeClass('hidden');
                                _this.init();
                            }
                        }, function (error) { _this._router.navigate(['Error']); });
                    }
                    else {
                        this._router.navigate(['Error']);
                    }
                    var doit;
                    //refresh page on browser resize
                    $(window).bind('resize', function (e) {
                        clearTimeout(doit);
                        doit = setTimeout(self.init(), 500);
                    });
                };
                NodeEditorComponent.prototype.init = function () {
                    if (this.editing == false) {
                        this.setVariables();
                        this.buildCanvas();
                        this.mouseEvents();
                        this.dragEvents();
                        this.buttonEvents();
                    }
                };
                NodeEditorComponent.prototype.setVariables = function () {
                    this.storyID = this._routeParams.get('id');
                    this.stage = new Konva.Stage({
                        container: 'container',
                        width: this.width,
                        height: this.height,
                        draggable: false,
                        id: "stage"
                    });
                    this.width = $('#container').width();
                    this.stage.setAttr('width', this.width);
                    this.levelX = this.width / 2;
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
                    this.deleteButton = new Konva.Group({
                        x: this.width * 0.05,
                        y: 80,
                        id: "deleteButton"
                    });
                    this.addButton = this.deleteButton.clone({
                        x: this.width * 0.05,
                        y: 20,
                        id: "addButton"
                    });
                    this.addText = new Konva.Text({
                        fill: 'black',
                        fontSize: 16,
                        x: 18,
                        y: 18,
                        id: "addText",
                        text: "ADD NEW PAGE",
                        align: 'center',
                        fontFamily: "Architects Daughter"
                    });
                    this.delText = this.addText.clone({
                        id: "delText",
                        x: 26,
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
                    this.button2 = this.button1.clone({ id: "button2" });
                    this.button3 = this.button1.clone({ x: 335, id: "button3" });
                    this.button4 = this.button1.clone({ id: "button4" });
                    this.popUpRect = new Konva.Rect({
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 250,
                        id: "popUpRect",
                        fill: this.buttonColorDisabled
                    });
                    this.popUp = new Konva.Group({
                        x: this.width / 2 - 200,
                        y: this.height / 2 - 125,
                        id: "popUp",
                        draggable: true
                    });
                    this.popText = this.addText.clone({
                        fontSize: 16,
                        align: 'center',
                        lineHeight: 1.5
                    });
                    this.backgroundLayer = new Konva.Layer({
                        width: this.width,
                        height: this.height,
                        scale: {
                            x: 1,
                            y: 1
                        }
                    });
                    this.layer = this.backgroundLayer.clone();
                    this.layerConn = this.backgroundLayer.clone();
                    this.layerTEXT = this.backgroundLayer.clone();
                    this.levelTextLayer = this.backgroundLayer.clone();
                    this.tempLayer = new Konva.Layer({
                        width: this.width,
                        height: this.height
                    });
                    this.emptyLayer = this.tempLayer.clone();
                    this.interfaceLayer = this.tempLayer.clone();
                    this.emptyRectangle = new Konva.Rect({
                        x: 0,
                        y: 0,
                        width: this.stage.getAttr('width') * 100,
                        height: this.stage.getAttr('height') * 100,
                        id: "emptyRectangle",
                        fill: 'green',
                        opacity: 0
                    });
                    this.emptyLayer.add(this.emptyRectangle);
                    this.emptyRectangle.moveToBottom();
                };
                NodeEditorComponent.prototype.buildCanvas = function () {
                    this.debugText.setAttr('x', this.width / 2 - 30);
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
                    this.startDrawNodes(this.storyID, "first");
                    this.isMobile = false;
                    // this.initFontSize = this.stage.find('#button1Text')[0].getAttr('fontSize');
                };
                NodeEditorComponent.prototype.mouseEvents = function () {
                    var self = this;
                    //mouse EVENTS
                    this.layer.off('click tap').on('click tap', function (e) {
                        if (self.movementStyle == null) {
                            self.nodeSelection(e.target);
                            self.disable(e.target.id()); //check if add node is allowed
                        }
                        else if (self.movementStyle != null && self.movementStyle != 'one') {
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
                            self.allowed[0] = false;
                            self.allowed[1] = false;
                            self.allowed[2] = false;
                            $("#wrapper").trigger("click");
                        }
                    });
                    this.stage.on("mouseout", function (e) {
                        self.tooltip.hide();
                        self.toolTipText = "";
                        self.layerTEXT.draw();
                    });
                    this.layer.on("mouseover", function (e) {
                        var fill = e.target.fill() == 'yellow' ? 'yellow' : 'orange';
                        e.target.fill(fill);
                        //self.debugText.text(e.target.getAttr('id'));
                        //self.debugText.setAttr('x', (self.width/2)-self.debugText.getAttr('width')/2);
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
                        if (self.selectedNode == null) {
                            self.debugText.text('Select a node');
                            self.debugText.setAttr('x', (self.width / 2) - self.debugText.getAttr('width') / 2);
                            self.interfaceLayer.draw();
                        }
                        //self.tooltip.show();
                        //self.layerTEXT.draw();
                        self.toolTipText = "";
                    });
                    this.layer.on("mouseover", function (e) {
                        if (!self.popUpShown) {
                            self.tooltip.position({
                                x: e.target.getAttr('x') - 40,
                                y: e.target.getAttr('y') - 50 * (1 + (1 - self.layer.getAttr('scale').x))
                            });
                            if (self.toolTipText == "") {
                                self._nodeEditorService.getPageById(e.target.getAttr('id'))
                                    .subscribe(function (actualPage) {
                                    self.setToolTip(actualPage['title'], e);
                                }, function (error) { return self.errorMessage = error; });
                            }
                            else {
                                self.setToolTip(self.toolTipText, e);
                            }
                        }
                    });
                    /*  this.emptyRectangle.on('click tap', function(e) {
                           self.zoomOut();
                    });
                    
                   this.stage.off('mousewheel').on('mousewheel', function(e) {
                        self.disableScroll();
            
                        var deltaY = e.evt.deltaY;
                        if (deltaY != undefined) {
                            if (deltaY > 0) {
                              self.zoomOut();
                            } else {
                               
                                    self.zoomIn(e,self.layer.scaleX()+0.1);
                                
                            }
                        }
            
                    });
                    
                     this.emptyRectangle.on("mouseout", function (e) {
                            self.enableScroll();
                    });
                    this.emptyRectangle.on("mouseenter", function (e) {
                        self.disableScroll();
                    });*/
                };
                NodeEditorComponent.prototype.dragEvents = function () {
                    var self = this;
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
                        if (self.movementStyle == "one") {
                            self.xDrag = e.target.getAttr('x');
                            self.yDrag = e.target.getAttr('y');
                            e.target.moveTo(self.tempLayer);
                            e.target.fill('yellow');
                            self.layer.draw();
                        }
                        else if (self.movementStyle != "one" && self.movementStyle != null) {
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
                            }
                            else {
                                self.previousShape.fire('dragover', {
                                    type: 'dragover',
                                    target: self.previousShape,
                                    evt: evt.evt
                                }, true);
                            }
                        }
                        else if (!self.previousShape && shape) {
                            self.previousShape = shape;
                            shape.fire('dragenter', {
                                type: 'dragenter',
                                target: shape,
                                evt: evt.evt
                            }, true);
                        }
                        else if (self.previousShape && !shape) {
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
                        if (e.target.id() != 'stage') {
                            var pos = self.stage.getPointerPosition();
                            var overlapping = self.layer.getIntersection(pos);
                            if (overlapping) {
                                if (self.dropStyle == null) {
                                    self.checkAdditionalNode(self.previousShape.id());
                                    self.tooltip.hide();
                                    self.layerTEXT.draw();
                                    self.toolTipText = "";
                                    self.dropQuestion(e);
                                }
                            }
                            else {
                                if (self.movementStyle == "one") {
                                    e.target.setAttr("x", self.xDrag);
                                    e.target.setAttr("y", self.yDrag);
                                    e.target.fill(self.buttonColorHover);
                                }
                                else {
                                    if (e.target.id() != "popUp") {
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
                        self.debugText.setAttr('fontSize', '20');
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
                        self.debugText.setAttr('fontSize', '20');
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
                        self.debugText.setAttr('fontSize', '20');
                        self.debugText.text('Drop ' + e.target.id());
                        self.layer.draw();
                        self.interfaceLayer.draw();
                        // }
                    });
                };
                //BUTTON EVENTS
                NodeEditorComponent.prototype.onAdded = function (added) {
                    if (added) {
                        this.addNewNode();
                    }
                };
                NodeEditorComponent.prototype.onEditing = function (editing) {
                    if (editing) {
                        this.editing = true;
                    }
                    else {
                        this.editing = false;
                    }
                };
                NodeEditorComponent.prototype.onDeleted = function (deleted) {
                    if (deleted) {
                        this.deleteNode();
                    }
                };
                NodeEditorComponent.prototype.onDeleteBranch = function (deleted) {
                    if (deleted) {
                        this.deleteBranch();
                    }
                };
                NodeEditorComponent.prototype.onSwapNode = function (swap) {
                    if (swap) {
                        this.debugText.text("Start Dragging");
                        this.debugText.setAttr('x', (this.width / 2) - this.debugText.getAttr('width') / 2);
                        this.interfaceLayer.draw();
                        this.layer.find('#' + this.selectedNode).draggable(true);
                        this.movementStyle = "one";
                        this.action = "one";
                    }
                };
                NodeEditorComponent.prototype.onSwapBranch = function (swap) {
                    var _this = this;
                    if (swap) {
                        this.debugText.text("Start Dragging");
                        this.debugText.setAttr('x', (this.width / 2) - this.debugText.getAttr('width') / 2);
                        this.interfaceLayer.draw();
                        this._nodeEditorService.getChildren(this.selectedNode)
                            .subscribe(function (data) {
                            _this.movementStyle = data;
                            _this.movingGroup.setAttr('x', 0);
                            _this.movingGroup.setAttr('y', 0);
                            for (var i = 0; i < _this.movementStyle.length; i++) {
                                //this.layer.find('#'+this.movementStyle[i]['id']).draggable(true);
                                var node = _this.layer.find('#' + _this.movementStyle[i]['id']);
                                node.fill('yellow');
                                node.moveTo(_this.movingGroup);
                            }
                            _this.layer.add(_this.movingGroup);
                            _this.xDrag = _this.layer.find('#' + _this.selectedNode)[0].getAttr('x');
                            _this.yDrag = _this.layer.find('#' + _this.selectedNode)[0].getAttr('y');
                            _this.layer.draw();
                            _this.interfaceLayer.draw();
                            _this.action = "branch";
                        }, function (error) { return _this.errorMessage = error; });
                    }
                };
                NodeEditorComponent.prototype.onAppend = function (append) {
                    var _this = this;
                    if (append) {
                        this.debugText.text("Start Dragging");
                        this.debugText.setAttr('x', (this.width / 2) - this.debugText.getAttr('width') / 2);
                        this.interfaceLayer.draw();
                        this._nodeEditorService.getChildren(this.selectedNode)
                            .subscribe(function (data) {
                            _this.movementStyle = data;
                            _this.action = "append";
                            _this.movingGroup.setAttr('x', 0);
                            _this.movingGroup.setAttr('y', 0);
                            for (var i = 0; i < _this.movementStyle.length; i++) {
                                //this.layer.find('#'+this.movementStyle[i]['id']).draggable(true);
                                var node = _this.layer.find('#' + _this.movementStyle[i]['id']);
                                node.fill('yellow');
                                node.moveTo(_this.movingGroup);
                            }
                            _this.layer.add(_this.movingGroup);
                            _this.xDrag = _this.layer.find('#' + _this.selectedNode)[0].getAttr('x');
                            _this.yDrag = _this.layer.find('#' + _this.selectedNode)[0].getAttr('y');
                            _this.layer.draw();
                            _this.interfaceLayer.draw();
                        }, function (error) { return _this.errorMessage = error; });
                    }
                };
                NodeEditorComponent.prototype.buttonEvents = function () {
                    var self = this;
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
                };
                //###### TRIGGER FUNCTIONS ######
                NodeEditorComponent.prototype.startDrawLines = function (id) {
                    var _this = this;
                    this._nodeEditorService.startDrawLines(id)
                        .subscribe(function (maxLevel) {
                        // this.maxLevel = maxLevel;
                        //plus minus eins fehler
                        _this.drawLines(maxLevel['max_level'] - 1);
                    }, function (error) { return _this.errorMessage = error; });
                };
                NodeEditorComponent.prototype.startDrawNodes = function (id, first) {
                    var _this = this;
                    this._nodeEditorService.startDrawNodes(id)
                        .subscribe(function (pages) {
                        pages.sort(function (a, b) {
                            return parseFloat(a.level) - parseFloat(b.level);
                        });
                        // console.log(pages);
                        for (var i = 0; i < pages.length; i++) {
                            if (pages[i]['outgoingInternLinks']) {
                                for (var j = 0; j < pages[i]['outgoingInternLinks'].length; j++) {
                                    var target = _this.findID(pages, pages[i]['outgoingInternLinks'][j]['nextPage']);
                                    //console.log(target);
                                    pages[i]['outgoingInternLinks'][j]['position'] = pages[target]['position'];
                                }
                                pages[i]['outgoingInternLinks'].sort(function (a, b) {
                                    return parseFloat(a.position) - parseFloat(b.position);
                                });
                            }
                        }
                        _this.drawNodes(pages, first);
                    }, function (error) { return _this.errorMessage = error; });
                };
                NodeEditorComponent.prototype.addNewNode = function () {
                    var _this = this;
                    var selected = this.selectedNode;
                    this._nodeEditorService.getPageById(this.selectedNode)
                        .subscribe(function (actualPage) {
                        _this.actualPage = actualPage;
                        _this._nodeEditorService.addNewNode(_this.storyID, selected, _this.actualPage['level'] + 1, _this.actualPage['outgoingInternLinks'].length + 1)
                            .subscribe(function (result) {
                            _this.startDrawLines(_this.storyID);
                            _this.startDrawNodes(_this.storyID, "");
                            _this.debugText.text("Successfully added");
                            _this.debugText.setAttr('x', (_this.width / 2) - _this.debugText.getAttr('width') / 2);
                            _this.checkAdditionalNode(_this.selectedNode);
                            _this.interfaceLayer.draw();
                        }, function (error) { return _this.errorMessage = error; });
                    }, function (error) { return _this.errorMessage = error; });
                };
                NodeEditorComponent.prototype.deleteBranch = function () {
                    var _this = this;
                    var id = this.selectedNode;
                    var self = this;
                    self._nodeEditorService.deleteBranch(id)
                        .subscribe(function (result) {
                        /* self.interfaceLayer.find('#button1Rect')[0].fill(self.buttonColor);
                         self.popUp.hide();
                         self.pause = false;
                         self.popUpShown = false;
                         self.setDraggable(true);*/
                        if (self.layer.getAttr('scale') < 1.0) {
                            self.resetScale();
                        }
                        self.startDrawLines(self.storyID);
                        self.startDrawNodes(self.storyID, "");
                        self.debugText.text("Successfully deleted");
                        self.debugText.setAttr('x', (self.width / 2) - self.debugText.getAttr('width') / 2);
                        _this.selectedNode = null;
                        _this.allowed[0] = false;
                        _this.allowed[1] = false;
                        _this.allowed[2] = false;
                        _this.allowed[3] = false;
                        $("#wrapper").trigger("click");
                        //self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                        //debugText.setAttr('fontSize','25');
                        self.interfaceLayer.draw();
                    }, function (error) { return self.errorMessage = error; });
                };
                NodeEditorComponent.prototype.deleteNode = function () {
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
                    var self = this;
                    self._nodeEditorService.deletePageById(id)
                        .subscribe(function (result) {
                        if (result['deleted'] == 'false') {
                            self.debugText.text("Delete is not possible - choose DELETE BRANCH");
                        }
                        else {
                            self.debugText.text("Successfully deleted");
                        }
                        /* self.interfaceLayer.find('#button1Rect')[0].fill(self.buttonColor);
                         self.popUp.hide();
                         self.pause = false;
                         self.popUpShown = false;
                         self.setDraggable(true);*/
                        if (self.layer.getAttr('scale') < 1.0) {
                            self.resetScale();
                        }
                        self.startDrawLines(self.storyID);
                        self.startDrawNodes(self.storyID, "");
                        self.debugText.setAttr('x', (self.width / 2) - self.debugText.getAttr('width') / 2);
                        self.selectedNode = null;
                        self.allowed[0] = false;
                        self.allowed[1] = false;
                        self.allowed[2] = false;
                        self.allowed[3] = false;
                        $("#wrapper").trigger("click");
                        //self.interfaceLayer.find('#button1Text')[0].setAttr('text','');
                        //debugText.setAttr('fontSize','25');
                        self.interfaceLayer.draw();
                    }, function (error) { return self.errorMessage = error; });
                    // });
                    //this.hoverPopUpButtons(['#button1Rect','#button1Text'],this.buttonColorHover,this.buttonColor);
                    //this.hoverPopUpButtons(['#button2Rect','#button2Text'],this.buttonColorHover,this.buttonColor);
                };
                ;
                NodeEditorComponent.prototype.checkAdditionalNode = function (id) {
                    var _this = this;
                    this._nodeEditorService.getPageById(id)
                        .subscribe(function (actualPage) {
                        _this.actualPage = actualPage;
                        _this.hasChildren = false;
                        _this.allowed[3] = actualPage;
                        // this.stage.find('#addRect')[0].setAttr('fill', this.buttonColor);//WIEDER WEGMACHEN--> diese zeile
                        if (actualPage['outgoingInternLinks'].length > 0) {
                            _this.hasChildren = true;
                        }
                        if (actualPage['outgoingInternLinks'].length < 4) {
                            _this.allowed[0] = true;
                            $("#wrapper").trigger("click");
                            if (!_this.popUpShown) {
                            }
                        }
                        else {
                            _this.allowed[0] = false;
                            $("#wrapper").trigger("click");
                            if (_this.movementStyle != null) {
                                _this.button1.off('click tap');
                            }
                        }
                        _this.interfaceLayer.draw();
                    }, function (error) { return _this.errorMessage = error; });
                };
                ;
                NodeEditorComponent.prototype.checkDeleteNode = function (id) {
                    var _this = this;
                    this._nodeEditorService.getPageById(id)
                        .subscribe(function (actualPage) {
                        _this.actualPage = actualPage;
                        //  this.stage.find('#delRect')[0].setAttr('fill', this.buttonColor);//wieder wegmachen!!!
                        if (actualPage['level'] == 0) {
                            _this.allowed[1] = false;
                            $("#wrapper").trigger("click");
                            if (!_this.popUpShown) {
                            }
                        }
                        else {
                            _this.allowed[1] = true;
                            $("#wrapper").trigger("click");
                            if (!_this.popUpShown) {
                            }
                        }
                        _this.interfaceLayer.draw();
                    }, function (error) { return _this.errorMessage = error; });
                };
                ;
                NodeEditorComponent.prototype.reorderNodes = function (ID01, ID02) {
                    var _this = this;
                    this._nodeEditorService.reorderNodes(ID01, ID02)
                        .subscribe(function (result) {
                        _this.startDrawLines(_this.storyID);
                        _this.startDrawNodes(_this.storyID, "");
                        _this.debugText.text("Successfully reordered");
                        _this.debugText.setAttr('x', (_this.width / 2) - _this.debugText.getAttr('width') / 2);
                        _this.selectedNode = null;
                        _this.allowed[0] = false;
                        _this.allowed[1] = false;
                        _this.allowed[2] = false;
                        _this.allowed[3] = false;
                        $("#wrapper").trigger("click");
                        //debugText.setAttr('fontSize','25');
                        _this.interfaceLayer.draw();
                    }, function (error) { return _this.errorMessage = error; });
                };
                ;
                NodeEditorComponent.prototype.reorderBranches = function (ID01, ID02) {
                    var _this = this;
                    this._nodeEditorService.reorderBranches(ID01, ID02)
                        .subscribe(function (result) {
                        _this.debugText.text("Successfully reordered");
                        _this.startDrawLines(_this.storyID);
                        _this.startDrawNodes(_this.storyID, "");
                        _this.debugText.setAttr('x', (_this.width / 2) - _this.debugText.getAttr('width') / 2);
                        _this.selectedNode = null;
                        _this.allowed[0] = false;
                        _this.allowed[1] = false;
                        _this.allowed[2] = false;
                        _this.allowed[3] = false;
                        $("#wrapper").trigger("click");
                        //debugText.setAttr('fontSize','25');
                        _this.interfaceLayer.draw();
                    }, function (error) {
                        _this.debugText.text("REORDER not possible - change another option");
                        _this.startDrawLines(_this.storyID);
                        _this.startDrawNodes(_this.storyID, "");
                        _this.debugText.setAttr('x', (_this.width / 2) - _this.debugText.getAttr('width') / 2);
                        _this.selectedNode = null;
                        _this.allowed[0] = false;
                        _this.allowed[1] = false;
                        _this.allowed[2] = false;
                        _this.allowed[3] = false;
                        $("#wrapper").trigger("click");
                        _this.interfaceLayer.draw();
                        _this.errorMessage = error;
                    });
                };
                ;
                NodeEditorComponent.prototype.appendBranch = function (ID01, ID02) {
                    var _this = this;
                    this._nodeEditorService.appendBranch(ID02, ID01)
                        .subscribe(function (result) {
                        _this.startDrawLines(_this.storyID);
                        _this.startDrawNodes(_this.storyID, "");
                        _this.debugText.text("Successfully appended");
                        _this.debugText.setAttr('x', (_this.width / 2) - _this.debugText.getAttr('width') / 2);
                        _this.selectedNode = null;
                        _this.allowed[0] = false;
                        _this.allowed[1] = false;
                        _this.allowed[2] = false;
                        _this.allowed[3] = false;
                        $("#wrapper").trigger("click");
                        //debugText.setAttr('fontSize','25');
                        _this.interfaceLayer.draw();
                    }, function (error) { return _this.errorMessage = error; });
                };
                ;
                //###### TRIGGER FUNCTIONS END ######
                //###### DRAW FUNCTIONS ######
                NodeEditorComponent.prototype.drawLines = function (levelNumb) {
                    this.backgroundLayer.destroyChildren();
                    this.levelTextLayer.destroyChildren();
                    var line;
                    var levelText;
                    var h = this.levelY;
                    for (var j = 0; j <= levelNumb; j++) {
                        line = new Konva.Line({
                            points: [-this.stage.getWidth() * 10, this.startY + h, this.stage.getWidth() * 10, this.startY + h],
                            stroke: 'grey',
                            strokeWidth: 1,
                            lineCap: 'round',
                            lineJoin: 'round'
                        });
                        levelText = new Konva.Text({
                            fill: 'black',
                            fontSize: 20,
                            fontFamily: "Architects Daughter",
                            text: j,
                            x: 10,
                            y: (this.startY + h) - 20
                        });
                        this.levelTextLayer.add(levelText);
                        this.backgroundLayer.add(line);
                        h += this.levelY;
                    }
                    this.maxHeight = h;
                    this.backgroundLayer.draw();
                    this.levelTextLayer.draw();
                };
                ;
                NodeEditorComponent.prototype.drawNodes = function (data, first) {
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
                    if (this.layer.getAttr('scale').x < 1.0) {
                        distance = distance * (1 + (1 - this.layer.getAttr('scale').x));
                    }
                    for (var i = 0; i < data.length; i++) {
                        var nextPageIDinData;
                        var nextID;
                        var scaleFactor = 1.0;
                        if (this.layer.getAttr('scale').x <= 1) {
                            scaleFactor = this.layer.getAttr('scale').x;
                        }
                        //first node
                        if (i == 0) {
                            this.firstNode = data[i]['id'];
                            if (this.firstNode == this.selectedNode) {
                                color = 'yellow';
                            }
                            else {
                                color = this.buttonColorHover;
                            }
                            star = new Konva.Circle({
                                x: ((multiple - center) * scaleFactor) - this.offset,
                                y: h + (parseInt(data[i]['level']) + 1) * (this.levelY),
                                fill: color,
                                radius: 20,
                                draggable: false,
                                name: 'star ' + data[i]['id'],
                                id: data[i]['id'],
                                stroke: 'black',
                                strokeWidth: 2
                            });
                            this.layer.add(star);
                            /* var idText = new Konva.Text({
                                         x: star.getAttr('x') - (6),
                                         y: star.getAttr('y') - 6,
                                         text: star.getAttr('id'),
                                         fontSize: 20,
                                         fill: 'black'
                                         });
                                         this.layerTEXT.add(idText);*/
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
                        if (data[i]['outgoingInternLinks']) {
                            //get next node id
                            for (var q = 0; q < 4; q++) {
                                if (i != 0) {
                                    if (data[sh]['outgoingInternLinks'][q]) {
                                        nextPageIDinData = this.findID(data, data[sh]['outgoingInternLinks'][q]['nextPage']);
                                        nextID = nextPageIDinData;
                                    }
                                    else {
                                        nextPageIDinData = 0;
                                        nextID = nextPageIDinData;
                                    }
                                }
                                else {
                                    if (data[i]['outgoingInternLinks'][q]) {
                                        nextPageIDinData = this.findID(data, data[i]['outgoingInternLinks'][q]['nextPage']);
                                        nextID = nextPageIDinData;
                                    }
                                    else {
                                        nextPageIDinData = 0;
                                        nextID = nextPageIDinData;
                                    }
                                }
                                if (this.layer.find('#' + data[nextPageIDinData]['id'])[0] == undefined) {
                                    if (nextID != 0) {
                                        IDs.push(nextID);
                                        numb = this.count(data, nextPageIDinData);
                                        nodeCounter++;
                                        if (numb > 1) {
                                            center = (((numb * (distance)) / 2) + distance / 2);
                                            multiple += distance;
                                        }
                                        else {
                                            center = 0;
                                            multiple = this.levelX;
                                        }
                                        //HIGHLIGHTED NODES
                                        /*  if (this.highLight != null && highLight.indexOf(data[nextPageIDinData]['id']) != -1) {
                                              color = '#e2b0b3';
                                          } else {
                                              color = buttonColorHover;
                                          }*/
                                        if (data[nextPageIDinData]['id'] == this.selectedNode) {
                                            color = 'yellow';
                                        }
                                        else {
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
                                        if ((star.getAbsolutePosition().x < 20 || star.getAbsolutePosition().x > this.width - 20 || star.getAbsolutePosition().y > this.height - 20) && this.layer.getAttr('scale').x <= 1) {
                                            toBig = true;
                                            this.startScale = this.layer.scaleX().toFixed(2) - 0.02;
                                            if (window.innerWidth < 850) {
                                                this.offset = 50;
                                            }
                                            if (this.layer.getAttr('scale').y < 1.0) {
                                                this.startY = 10 * (1 + (1 - this.layer.getAttr('scale').y));
                                                this.offset = -10 * (1 + (1 - this.layer.getAttr('scale').x));
                                            }
                                            //offset weiter rechts
                                            //offset= -10*(1+(1-layer.getAttr('scale').x));
                                            this.layer.scale({
                                                x: this.startScale,
                                                y: this.startScale
                                            });
                                            this.layerConn.scale({
                                                x: this.startScale,
                                                y: this.startScale
                                            });
                                            this.backgroundLayer.scale({
                                                x: 1.0,
                                                y: this.startScale
                                            });
                                            this.levelTextLayer.scale({
                                                x: this.startScale,
                                                y: this.startScale
                                            });
                                            this.layerTEXT.scale({
                                                x: this.startScale,
                                                y: this.startScale
                                            });
                                            this.tempLayer.scale({
                                                x: this.startScale,
                                                y: this.startScale
                                            });
                                            this.layerConn.offset({
                                                x: this.layer.offsetX() - 20,
                                                y: 0
                                            });
                                            this.layerTEXT.offset({
                                                x: this.layer.offsetX() - 20,
                                                y: 0
                                            });
                                            this.tempLayer.offset({
                                                x: this.layer.offsetX() - 20,
                                                y: 0
                                            });
                                            this.layer.offset({
                                                x: this.layer.offsetX() - 20,
                                                y: 0
                                            });
                                            this.startOffsetX = this.layer.offsetX();
                                            this.startDrawLines(this.storyID);
                                            this.startDrawNodes(this.storyID, "first");
                                        }
                                        else {
                                            //TITLE
                                            toBig = false;
                                            /*idText = new Konva.Text({
                                             x: star.getAttr('x') - (6),
                                             y: star.getAttr('y') - 6,
                                             text: star.getAttr('id'),
                                             fontSize: 20,
                                             fill: 'black'
                                             });
                                             this.layerTEXT.add(idText);*/
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
                                }
                            }
                        }
                    }
                    if (toBig == false) {
                        this.layer.draw();
                        this.layerConn.draw();
                        this.layerTEXT.draw();
                        this.emptyLayer.draw();
                        if (first == "first") {
                            this.nodeSelection(this.layer.find('#' + this.firstNode)[0]);
                            this.checkAdditionalNode(this.firstNode);
                        }
                    }
                    this.drawToolTip();
                };
                ;
                NodeEditorComponent.prototype.drawConnection = function (id0, id1, x0, y0, x1, y1) {
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
                ;
                //###### DRAW FUNCTIONS END ######
                //###### NODE FUNCTIONS ######
                NodeEditorComponent.prototype.nodeSelection = function (elem) {
                    if (!this.popUpShown) {
                        var fill = elem.fill() == 'yellow' ? this.buttonColorHover : 'yellow';
                        elem.fill(fill);
                        this.debugText.setAttr('fontSize', '20');
                        if (this.selectedNode != null) {
                            this.layer.find('#' + this.selectedNode).fill(this.buttonColorHover);
                        }
                        if (fill == 'yellow') {
                            this.allowed[2] = true;
                            $("#wrapper").trigger("click");
                            this.debugText.text('Choose the action');
                            this.debugText.setAttr('x', (this.width / 2) - this.debugText.getAttr('width') / 2);
                            this.selectedNode = elem.id();
                        }
                        else if (fill == this.buttonColorHover && this.errorMessage == undefined) {
                            this.allowed[0] = false;
                            this.allowed[1] = false;
                            this.allowed[2] = false;
                            this.allowed[3] = false;
                            $("#wrapper").trigger("click");
                            this.debugText.text("Select a node");
                            this.debugText.setAttr('x', (this.width / 2) - this.debugText.getAttr('width') / 2);
                            this.interfaceLayer.draw();
                            this.selectedNode = null;
                        }
                        this.errorMessage = undefined;
                        this.interfaceLayer.draw();
                        this.layer.draw();
                        this.backgroundLayer.draw();
                        this.levelTextLayer.draw();
                    }
                };
                ;
                NodeEditorComponent.prototype.dropReset = function (e) {
                    this.previousShape = undefined;
                    var self = this;
                    if (this.movementStyle == "one") {
                        e.target.moveTo(this.layer);
                        if (e.target.id() == this.selectedNode) {
                            this.selectedNode = null;
                            this.disable(e.target.id());
                        }
                        this.setDraggable(false);
                    }
                    else {
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
                    this.allowed[0] = false;
                    this.allowed[1] = false;
                    this.allowed[2] = false;
                    $("#wrapper").trigger("click");
                    this.debugText.text("Select a node");
                    this.debugText.setAttr('x', (this.width / 2) - this.debugText.getAttr('width') / 2);
                    this.interfaceLayer.draw();
                    this.layer.draw();
                    this.tempLayer.draw();
                    this.dropStyle = null;
                    this.movementStyle = null;
                };
                ;
                NodeEditorComponent.prototype.setDraggable = function (bool) {
                    this.layer.getChildren(function (node) {
                        return node.getClassName() === 'Circle';
                    }).each(function (shape, n) {
                        shape.setAttr('draggable', bool);
                    });
                };
                ;
                //###### NODE FUNCTIONS END ######
                //###### BUTTONS ######
                NodeEditorComponent.prototype.disable = function (id) {
                    if (this.popUpShown == false) {
                        if (this.selectedNode == null) {
                        }
                        else {
                            if (this.selectedNode == id) {
                                this.checkAdditionalNode(id);
                                this.checkDeleteNode(id);
                            }
                        }
                    }
                };
                ;
                //###### BUTTONS END ######
                //###### TOOLTIP ######
                NodeEditorComponent.prototype.setToolTip = function (toolText, e) {
                    var textToolT;
                    var self = this;
                    this.toolTipText = toolText;
                    this.tooltip.getChildren(function (n) {
                        return n.getClassName() === "Text";
                    }).each(function (text, n) {
                        textToolT = text;
                        textToolT.text('"' + toolText + '"');
                        if (self.layerTEXT.getAttr('scale').x <= 1.0) {
                            textToolT.setAttr('fontSize', 20 * (1 + (1 - self.layerTEXT.getAttr('scale').x) * 1.5));
                        }
                        // alert(layerTEXT.getAttr('scale').x);
                    });
                    this.tooltip.getChildren(function (n) {
                        return n.getClassName() === "Rect";
                    }).each(function (rect, n) {
                        rect.setAttr('width', textToolT.getAttr('width'));
                        rect.setAttr('height', textToolT.getAttr('height'));
                    });
                    this.tooltip.setAttr('x', e.target.getAttr('x') - this.stage.find('#tooltext')[0].getAttr('width') / 2);
                    if (this.selectedNode == null) {
                        this.debugText.setAttr('x', (this.width / 2) - this.stage.find('#tooltext')[0].getAttr('width') / 2);
                        this.debugText.setAttr('fontSize', '20');
                        //this.debugText.text('"'+toolText+'"');
                        this.interfaceLayer.draw();
                    }
                    this.tooltip.show();
                    this.layerTEXT.draw();
                };
                ;
                NodeEditorComponent.prototype.drawToolTip = function () {
                    this.tooltip = new Konva.Group({
                        visible: false
                    });
                    var tooltext = new Konva.Text({
                        text: "",
                        fontFamily: "Architects Daughter",
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
                    });
                    rect.moveTo(this.tooltip);
                    tooltext.moveTo(this.tooltip);
                    this.layerTEXT.add(this.tooltip);
                    this.layerTEXT.draw();
                };
                ;
                //###### TOOLTIP END ######
                //####### HELPER FUNCTIONS #######
                NodeEditorComponent.prototype.findID = function (data, id) {
                    var idNEW = 0;
                    if (id != 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i]['id'] == id) {
                                idNEW = i;
                            }
                        }
                    }
                    return idNEW;
                };
                ;
                NodeEditorComponent.prototype.count = function (data, level) {
                    var count = 0;
                    for (var j = 0; j < data.length; j++) {
                        if (parseInt(data[level]['level']) == parseInt(data[j]['level'])) {
                            count++;
                        }
                    }
                    return count;
                };
                ;
                NodeEditorComponent.prototype.reorder = function (e) {
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
                    }
                    else {
                        this.reorderBranches(this.previousShape.id(), this.selectedNode);
                        this.previousShape.fire('drop', {
                            type: 'drop',
                            target: this.previousShape,
                            evt: e.evt
                        }, true);
                    }
                    this.dropReset(e);
                };
                ;
                NodeEditorComponent.prototype.resetScale = function () {
                    this.offset = 0;
                    this.startY = 0;
                    this.startScale = 1.0;
                    var scale = 1;
                    var offset = 0.0;
                    this.layer.scale({
                        x: scale,
                        y: scale
                    });
                    this.layerConn.scale({
                        x: scale,
                        y: scale
                    });
                    this.backgroundLayer.scale({
                        x: scale,
                        y: scale
                    });
                    this.levelTextLayer.scale({
                        x: scale,
                        y: scale
                    });
                    this.layerTEXT.scale({
                        x: scale,
                        y: scale
                    });
                    this.tempLayer.scale({
                        x: scale,
                        y: scale
                    });
                    this.layerConn.offset({
                        x: offset,
                        y: offset
                    });
                    this.layerTEXT.offset({
                        x: offset,
                        y: offset
                    });
                    this.tempLayer.offset({
                        x: offset,
                        y: offset
                    });
                    this.layer.offset({
                        x: offset,
                        y: offset
                    });
                    this.startOffsetX = offset;
                    this.startOffsetY = offset;
                };
                ;
                NodeEditorComponent.prototype.zoomOut = function () {
                    this.stage.setAttr('draggable', false);
                    this.interfaceLayer.setAttr('x', 0);
                    this.interfaceLayer.setAttr('y', 0);
                    this.stage.setAttr('x', 0);
                    this.stage.setAttr('y', 0);
                    var zoomout = this.startScale;
                    this.zooming = false;
                    var zoomin = this.layer.scaleX().toFixed(2);
                    this.diffX = (this.startOffsetX - this.layer.offsetX().toFixed(2)) * -1;
                    this.diffY = (this.startOffsetY - this.layer.offsetY().toFixed(2)) * -1;
                    var self = this;
                    var anim = new Konva.Animation(function (frame) {
                        var scale = 0;
                        var diff = 0;
                        if (self.layer.scaleX().toFixed(2) > zoomout) {
                            diff = 0.02;
                            scale = self.layer.scaleX().toFixed(2) - diff;
                            self.layer.scale({
                                x: scale,
                                y: scale
                            });
                            self.layerConn.scale({
                                x: scale,
                                y: scale
                            });
                            self.backgroundLayer.scale({
                                x: 1.0,
                                y: scale
                            });
                            self.levelTextLayer.scale({
                                x: scale,
                                y: scale
                            });
                            self.layerTEXT.scale({
                                x: scale,
                                y: scale
                            });
                        }
                        var moveX = 0;
                        if (self.layer.offsetX().toFixed(2) != self.startOffsetX.toFixed(2)) {
                            moveX = self.layer.offsetX().toFixed(2) - (self.diffX / ((zoomin - zoomout) / diff));
                            self.layer.offsetX(moveX);
                            self.layerConn.offsetX(moveX);
                            // backgroundLayer.offsetX(moveX);
                            self.layerTEXT.offsetX(moveX);
                        }
                        var moveY = 0;
                        if (self.layer.offsetY().toFixed(2) != self.startOffsetY.toFixed(2)) {
                            moveY = self.layer.offsetY().toFixed(2) - (self.diffY / ((zoomin - zoomout) / diff));
                            self.layer.offsetY(moveY);
                            self.layerConn.offsetY(moveY);
                            self.backgroundLayer.offsetY(moveY);
                            self.levelTextLayer.offsetY(moveY);
                            self.layerTEXT.offsetY(moveY);
                        }
                        if (self.layer.scaleX().toFixed(2) <= zoomout || self.zooming == true) {
                            anim.stop();
                            //  alert(startScale + "....."+ startOffsetX + "....."+startOffsetY );
                            var offset = 0;
                            if (self.startScale != 1.0) {
                                offset = 20;
                            }
                            else {
                                offset = 0;
                            }
                            self.layer.offsetX(self.startOffsetX);
                            self.layer.offsetY(self.startOffsetY);
                            self.layerConn.offsetX(self.startOffsetX);
                            self.layerConn.offsetY(self.startOffsetY);
                            self.layerTEXT.offsetX(self.startOffsetX);
                            self.layerTEXT.offsetY(self.startOffsetY);
                            //   backgroundLayer.offsetX(this.startOffsetX);
                            self.backgroundLayer.offsetY(self.startOffsetY);
                        }
                    }, [self.layer, self.layerConn, self.layerTEXT, self.backgroundLayer, self.levelTextLayer]);
                    anim.start();
                };
                ;
                NodeEditorComponent.prototype.zoomIn = function (e, zoomin) {
                    this.stage.setAttr('draggable', true);
                    this.zooming = true;
                    var zoomInit = zoomin;
                    if (zoomin == null) {
                        zoomin = this.zoom;
                    }
                    else if (zoomin == 'default') {
                        zoomin = this.layer.scaleX() + 0.05;
                    }
                    this.zoomSc = zoomin;
                    var clickX;
                    var clickY;
                    if (zoomInit == null) {
                        clickX = e.target.x();
                        clickY = e.target.y();
                    }
                    else if (zoomInit == 'default') {
                        clickX = this.stage.getAttr('width') / 2;
                        clickY = this.stage.getAttr('height') / 2;
                    }
                    else {
                        clickX = this.stage.getPointerPosition().x;
                        clickY = this.stage.getPointerPosition().y;
                    }
                    var distX = (this.width / 2) - clickX;
                    var distY = (this.height / 2) - clickY;
                    var oldWidth = this.layer.width() * this.layer.getAttr('scale').x;
                    var oldHeight = this.layer.height() * this.layer.getAttr('scale').y;
                    var newWidth = this.layer.width() * zoomin;
                    var newHeight = this.layer.height() * zoomin;
                    this.diffX = ((newWidth - oldWidth) / 3) - distX;
                    this.diffY = ((newHeight - oldHeight) / 3) - distY;
                    var self = this;
                    var anim = new Konva.Animation(function (frame) {
                        var scale = 0;
                        var diff = 0;
                        if (self.layer.scaleX().toFixed(2) < zoomin && self.layer.scaleX().toFixed(2) < self.zoom) {
                            diff = 0.01;
                            scale = self.layer.scaleX() + diff;
                            self.layer.scale({
                                x: scale,
                                y: scale
                            });
                            self.layerConn.scale({
                                x: scale,
                                y: scale
                            });
                            self.backgroundLayer.scale({
                                x: 1.0,
                                y: scale
                            });
                            self.levelTextLayer.scale({
                                x: scale,
                                y: scale
                            });
                            self.layerTEXT.scale({
                                x: scale,
                                y: scale
                            });
                        }
                        var moveX = 0;
                        if (self.layer.offsetX().toFixed(2) != self.diffX.toFixed(2) && self.layer.scaleX().toFixed(2) < self.zoom) {
                            moveX = self.layer.offsetX() + self.diffX / ((zoomin - self.startScale) / diff);
                            self.layer.offsetX(moveX);
                            self.layerConn.offsetX(moveX);
                            // backgroundLayer.offsetX(moveX);
                            self.layerTEXT.offsetX(moveX);
                        }
                        var moveY = 0;
                        if (self.layer.offsetY().toFixed(2) != self.diffY.toFixed(2) && self.layer.scaleX().toFixed(2) < self.zoom) {
                            moveY = self.layer.offsetY() + self.diffY / ((zoomin - self.startScale) / diff);
                            self.layer.offsetY(moveY);
                            self.layerConn.offsetY(moveY);
                            self.backgroundLayer.offsetY(moveY);
                            self.levelTextLayer.offsetY(moveY);
                            self.layerTEXT.offsetY(moveY);
                        }
                        if (self.layer.scaleX().toFixed(2) >= zoomin || self.layer.scaleX().toFixed(2) >= self.zoom) {
                            anim.stop();
                        }
                    }, [self.layer, self.layerConn, self.layerTEXT, self.backgroundLayer, self.levelTextLayer]);
                    anim.start();
                };
                ;
                NodeEditorComponent.prototype.append = function (e) {
                    this.appendBranch(this.previousShape.id(), this.selectedNode);
                    this.previousShape.fire('drop', {
                        type: 'drop',
                        target: this.previousShape,
                        evt: e.evt
                    }, true);
                    this.dropReset(e);
                };
                ;
                NodeEditorComponent.prototype.preventDefault = function (e) {
                    e = e || window.event;
                    if (e.preventDefault)
                        e.preventDefault();
                    e.returnValue = false;
                };
                ;
                NodeEditorComponent.prototype.disableScroll = function () {
                    if (window.addEventListener)
                        window.addEventListener('DOMMouseScroll', this.preventDefault, false);
                    window.onwheel = this.preventDefault; // modern standard
                    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
                };
                ;
                NodeEditorComponent.prototype.enableScroll = function () {
                    if (window.removeEventListener)
                        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
                    window.onmousewheel = document.onmousewheel = null;
                    window.onwheel = null;
                };
                ;
                //######## HELPER FUNCTIONS END ########
                //######## POPUPS ########
                NodeEditorComponent.prototype.dropQuestion = function (evt) {
                    if (this.action == "one") {
                        this.reorder(evt);
                    }
                    else if (this.action == "append") {
                        this.append(evt);
                    }
                    else if (this.action = "branch") {
                        this.reorder(evt);
                    }
                };
                ;
                NodeEditorComponent = __decorate([
                    core_1.Component({
                        selector: 'nodeEditor',
                        templateUrl: "app/html/nodeEditor/nodeEditor.html",
                        directives: [logState_component_1.LogStateComponent, editBar_component_1.EditBarComponent],
                        providers: [nodeEditor_service_1.NodeEditorService, headerfct_1.HttpClient, authentication_service_1.AuthenticationService, editBar_service_1.EditBarService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, nodeEditor_service_1.NodeEditorService, authentication_service_1.AuthenticationService, editBar_service_1.EditBarService])
                ], NodeEditorComponent);
                return NodeEditorComponent;
            }());
            exports_1("NodeEditorComponent", NodeEditorComponent);
        }
    }
});
//# sourceMappingURL=nodeEditor.component.js.map