System.register(['angular2/core', 'angular2/router', '../logState/logState.component', './nodeEditor.service', '../../headerfct', '../login/authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, logState_component_1, nodeEditor_service_1, headerfct_1, authentication_service_1;
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
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            NodeEditorComponent = (function () {
                function NodeEditorComponent(_router, _routeParams, _nodeEditorService) {
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._nodeEditorService = _nodeEditorService;
                    this.title = 'NodeEditor:';
                    this.width = $('#container').width();
                    this.height = window.innerHeight;
                    this.buttonColorHover = '#6b878c';
                    this.levelY = 100;
                    this.startY = 0;
                    this.offset = 0.0;
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
                }
                NodeEditorComponent.prototype.ngOnInit = function () {
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
                    this.stage.add(this.emptyLayer);
                    this.stage.add(this.backgroundLayer);
                    this.stage.add(this.levelTextLayer);
                    this.stage.add(this.layerConn);
                    this.stage.add(this.layer);
                    this.stage.add(this.tempLayer);
                    this.stage.add(this.interfaceLayer);
                    this.stage.add(this.layerTEXT);
                    this.startDrawLines(this.storyID);
                    this.startDrawNodes(this.storyID);
                    //dragEVENTS
                    this.layer.on("dragstart", function (e) {
                        //wieder weg machen wenn question asked-->
                        this.xDrag = e.target.getAttr('x');
                        this.yDrag = e.target.getAttr('y');
                        if (!this.pause && this.movementStyle == null) {
                            this.pause = true;
                            //zoomOut();
                            if (e.target.id() != this.selectedNode) {
                            }
                            //popUpShown = true;
                            this.setDraggable(false);
                            /* $.when(checkAdditionalNode(e.target.id()), checkDeleteNode(e.target.id())).done(function (a1, a2) {
                                 tooltip.hide();
                                 layerTEXT.draw();
                                 toolTipText="";
                                 moveQuestion(e);
                             });*/
                            e.target.fill('yellow');
                            this.interfaceLayer.draw();
                        }
                        else if (!this.pause && this.movementStyle == "one") {
                            this.xDrag = e.target.getAttr('x');
                            this.yDrag = e.target.getAttr('y');
                            e.target.moveTo(this.tempLayer);
                            e.target.fill('yellow');
                            this.layer.draw();
                        }
                        else if (!this.pause && this.movementStyle != "one" && this.movementStyle != null) {
                            this.selectedNode = e.target.find('#' + this.movementStyle[0])[0].getAttr('id');
                            this.movingGroup.moveTo(this.tempLayer);
                            this.layer.draw();
                            this.tempLayer.draw();
                        }
                    });
                    this.stage.on("dragend", function (e) {
                        if (!this.pause && e.target.id() != 'stage') {
                            var pos = this.stage.getPointerPosition();
                            var overlapping = this.layer.getIntersection(pos);
                            if (overlapping) {
                                if (this.dropStyle == null) {
                                }
                            }
                            else {
                                if (this.movementStyle == "one") {
                                    e.target.setAttr("x", this.xDrag);
                                    e.target.setAttr("y", this.yDrag);
                                    e.target.fill(this.buttonColorHover);
                                }
                                else {
                                    if (e.target.id() != "popUp") {
                                        e.target.setAttr("x", this.xDrag);
                                        e.target.setAttr("y", this.yDrag);
                                    }
                                }
                                console.log("ENDE");
                                this.dropReset(e);
                            }
                        }
                    });
                };
                NodeEditorComponent.prototype.startDrawLines = function (id) {
                    var _this = this;
                    this._nodeEditorService.startDrawLines(id)
                        .subscribe(function (maxLevel) {
                        // this.maxLevel = maxLevel;
                        //plus minus eins fehler
                        _this.drawLines(maxLevel['max_level'] - 1);
                    }, function (error) { return _this.errorMessage = error; });
                };
                NodeEditorComponent.prototype.startDrawNodes = function (id) {
                    var _this = this;
                    this._nodeEditorService.startDrawNodes(id)
                        .subscribe(function (pages) {
                        //falsche lvl und position 
                        // this.pages = pages;
                        _this.drawNodes(pages, "first");
                    }, function (error) { return _this.errorMessage = error; });
                };
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
                    // stage.find('#addRect')[0].setAttr('fill',buttonColorDisabled);
                    // stage.find('#delRect')[0].setAttr('fill',buttonColorDisabled);
                    // interfaceLayer.draw();
                    //selectedNode = null;
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
                            //firstNode = data[i]['id'];
                            star = new Konva.Circle({
                                x: ((multiple - center) * scaleFactor) - this.offset,
                                y: h + (parseInt(data[i]['level']) + 1) * (this.levelY),
                                fill: this.buttonColorHover,
                                radius: 20,
                                draggable: true,
                                name: 'star ' + data[i]['id'],
                                id: data[i]['id'],
                                stroke: 'black',
                                strokeWidth: 2
                            });
                            this.layer.add(star);
                        }
                    }
                    if (toBig == false) {
                        this.layer.draw();
                        this.layerConn.draw();
                        this.layerTEXT.draw();
                        this.emptyLayer.draw();
                        if (first) {
                        }
                    }
                    //drawToolTip();
                };
                ;
                NodeEditorComponent.prototype.dropReset = function (e) {
                    this.previousShape = undefined;
                    if (this.movementStyle == "one") {
                    }
                    else {
                        e.target.getChildren(function (n) {
                            return n.getClassName() === "Circle";
                        }).each(function (shape, n) {
                            var x = shape.getAttr('x');
                            var y = shape.getAttr('y');
                            shape.moveTo(this.layer);
                            shape.setAttr('x', x);
                            shape.setAttr('y', y);
                            shape.setAttr('fill', this.buttonColorHover);
                            this.setDraggable(true);
                        });
                    }
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
                NodeEditorComponent = __decorate([
                    core_1.Component({
                        selector: 'nodeEditor',
                        templateUrl: "app/html/nodeEditor/nodeEditor.html",
                        directives: [logState_component_1.LogStateComponent],
                        providers: [nodeEditor_service_1.NodeEditorService, headerfct_1.HttpClient, authentication_service_1.AuthenticationService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, nodeEditor_service_1.NodeEditorService])
                ], NodeEditorComponent);
                return NodeEditorComponent;
            }());
            exports_1("NodeEditorComponent", NodeEditorComponent);
        }
    }
});
//# sourceMappingURL=nodeEditor.component.js.map