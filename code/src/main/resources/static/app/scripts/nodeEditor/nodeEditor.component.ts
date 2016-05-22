import {Component,OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {LogStateComponent} from '../logState/logState.component';
import {NodeEditorService} from './nodeEditor.service';
import {HttpClient}           from '../../headerfct';
import { AuthenticationService }    from '../login/authentication.service';

declare var $: any;
declare var Konva:any;

@Component({
  selector: 'nodeEditor',
  templateUrl: `app/html/nodeEditor/nodeEditor.html`,
  directives: [LogStateComponent],
  providers: [NodeEditorService,HttpClient,AuthenticationService]
})

export class NodeEditorComponent implements OnInit{
    title = 'NodeEditor:';   
    width = $('#container').width();
    height = window.innerHeight;
    buttonColorHover='#6b878c';
    levelY = 100;
    levelX;
    startY = 0;
    offset = 0.0;
    xDrag;
    yDrag; 
    movementStyle; 
    dropStyle; 
    pause; 
    stage; 
    maxHeight;
    previousShape;
    
    
    storyID; 
    errorMessage; 


       
        backgroundLayer = new Konva.Layer({
            width: this.width,
            height:this.height,
            scale:{
                x: 1,
                y: 1
            }
        });
        layer  = this.backgroundLayer.clone();
        layerConn =this.backgroundLayer.clone();
        layerTEXT = this.backgroundLayer.clone();
        levelTextLayer= this.backgroundLayer.clone();
        tempLayer = new Konva.Layer({
            width: this.width,
            height: this.height
        });
        emptyLayer = this.tempLayer.clone();
        interfaceLayer = this.tempLayer.clone();
    
        
    constructor(
    private _router: Router,
    private _routeParams:RouteParams,
    private _nodeEditorService: NodeEditorService) {}
    
    
      ngOnInit():any {
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
              if(e.target.id() != this.selectedNode){
                 // nodeSelection(e.target);
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
          } else if (!this.pause && this.movementStyle == "one") {
              this.xDrag = e.target.getAttr('x');
              this.yDrag = e.target.getAttr('y');

              e.target.moveTo(this.tempLayer);
              e.target.fill('yellow');
              this.layer.draw();
          } else if (!this.pause && this.movementStyle != "one" && this.movementStyle != null) {
              this.selectedNode = e.target.find('#' + this.movementStyle[0])[0].getAttr('id');
              this.movingGroup.moveTo(this.tempLayer);
              this.layer.draw();
              this.tempLayer.draw();
          }


      });

    
    this.stage.on("dragend", function (e) {
            if(!this.pause && e.target.id() != 'stage') {
                var pos = this.stage.getPointerPosition();
                var overlapping = this.layer.getIntersection(pos);
                if (overlapping) {
                    if (this.dropStyle == null) {
                       /*checkAdditionalNode(previousShape.id());
                        tooltip.hide();
                        layerTEXT.draw();
                        toolTipText="";
                        dropQuestion(e);*/
                    }
                } else {
                    if (this.movementStyle == "one") {
                        e.target.setAttr("x", this.xDrag);
                        e.target.setAttr("y", this.yDrag);
                        e.target.fill(this.buttonColorHover);
                    } else {
                        if(e.target.id() != "popUp") {   console.log("ENDE");
                            e.target.setAttr("x", this.xDrag);
                            e.target.setAttr("y", this.yDrag);

                        }
                    }
                 
                   this.dropReset(e);
                }
            }
        });  
          
      }
      
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
      
      startDrawNodes(id){
        this._nodeEditorService.startDrawNodes(id)
                            .subscribe(
                               pages => {   
                               //falsche lvl und position 
                               // this.pages = pages;
                                this.drawNodes(pages, "first");
    
                               },
                               error =>  this.errorMessage = <any>error);
      }
      
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
            
                //firstNode = data[i]['id'];
                star = new Konva.Circle({
                    x: ((multiple - center)*scaleFactor)-this.offset,
                    y: h+(parseInt(data[i]['level']) + 1) * (this.levelY),
                    fill: this.buttonColorHover,
                    radius: 20,
                    draggable: true,
                    name: 'star ' + data[i]['id'],
                    id: data[i]['id'],
                    stroke: 'black',
                    strokeWidth: 2
                });

                this.layer.add(star);


            /*    //connection saving
                if (data[i]['NextPageID1']) {
                    points[z] = [];
                    points[z]['pointX'] = star.getAttr('x');
                    points[z]['pointY'] = star.getAttr('y');
                    points[z][0] = data[i]['NextPageID1'];
                    if (data[i]['NextPageID2']) {
                        points[z][1] = data[i]['NextPageID2'];
                    }
                    if (data[i]['NextPageID3']) {
                        points[z][2] = data[i]['NextPageID3'];
                    }
                    if (data[i]['NextPageID4']) {
                        points[z][3] = data[i]['NextPageID4'];
                    }
                    z++;
                }*/

            }

           /* var sh = IDs.shift();

            //get next node id
            for (var q = 1; q < 5; q++) {
                if (i != 0) {
                    nextPageIDinData = findID(data, data[sh]["NextPageID" + q]);
                    nextID = nextPageIDinData;


                } else {
                    nextPageIDinData = findID(data, data[i]["NextPageID" + q]);
                    nextID = nextPageIDinData;
                }
                if(layer.find('#'+data[nextPageIDinData]['id'])[0] == undefined) {
                    if (nextID != 0) {
                        IDs.push(nextID);
                        numb = count(data, nextPageIDinData);

                        nodeCounter++;


                        if (numb > 1) {
                            center = (((numb * (distance)) / 2) + distance / 2);
                            multiple += distance;
                        } else {
                            center = 0;
                            multiple = levelX;
                        }

                        if (highLight != null && highLight.indexOf(data[nextPageIDinData]['id']) != -1) {
                            color = '#e2b0b3';
                        } else {
                            color = buttonColorHover;
                        }



                        star = new Konva.Circle({
                            x: ((multiple - center) * scaleFactor) - offset,
                            y: h + ((parseInt(data[nextPageIDinData]['level']) + 1) * levelY),
                            fill: color,
                            radius: 20,
                            draggable: true,
                            name: 'star ' + data[nextPageIDinData]['id'],
                            id: data[nextPageIDinData]['id'],
                            stroke: 'black',
                            strokeWidth: 2

                        });
                        layer.add(star);


                        if ((star.getAbsolutePosition().x < 20 || star.getAbsolutePosition().x > width - 20 || star.getAbsolutePosition().y > height - 20) && layer.getAttr('scale').x <= 1) {
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
                        } else {
                            //TITLE
                            toBig = false;
                            idText = new Konva.Text({
                             x: star.getAttr('x') - (6),
                             y: star.getAttr('y') - 6,
                             text: star.getAttr('id'),
                             fontSize: 20,
                             fill: 'black'
                             });
                             layerTEXT.add(idText);


                            //connection saving

                            if (data[nextPageIDinData]['NextPageID1']) {
                                points[z] = [];
                                points[z]['pointX'] = star.getAttr('x');
                                points[z]['pointY'] = star.getAttr('y');
                                points[z][0] = data[nextPageIDinData]['NextPageID1'];
                                if (data[nextPageIDinData]['NextPageID2']) {
                                    points[z][1] = data[nextPageIDinData]['NextPageID2'];
                                }
                                if (data[nextPageIDinData]['NextPageID3']) {
                                    points[z][2] = data[nextPageIDinData]['NextPageID3'];
                                }
                                if (data[nextPageIDinData]['NextPageID4']) {
                                    points[z][3] = data[nextPageIDinData]['NextPageID4'];
                                }
                                z++;
                            }

                            //connection drawing
                            for (var j = 0; j < points.length; j++) {
                                for (var k = 0; k < 4; k++) {
                                    if (points[j][k] == data[nextPageIDinData]['id']) {
                                       // drawConnection(points[j][k], data[i]['id'], points[j]['pointX'], points[j]['pointY'], star.getAttr('x'), star.getAttr('y'));
                                    }
                                }
                            }

                        }

                    }

                    if (nodeCounter == numb) {
                        nodeCounter = 0;
                        center = 0;
                        multiple = levelX;
                    }
                    // }
                }

            }*/
        }
        if (toBig == false) {
            this.layer.draw();
            this.layerConn.draw();
            this.layerTEXT.draw();
            this.emptyLayer.draw();
            if(first){
              //  nodeSelection(layer.find('#'+ firstNode)[0]);
            }
           // checkAdditionalNode(firstNode);
        }
        //drawToolTip();
 
    };
   
     dropReset(e){
        this.previousShape = undefined;
        if (this.movementStyle == "one") {
           /* e.target.moveTo(this.layer);
            if (e.target.id() == this.selectedNode) {
                this.selectedNode = null;
            }
            disable(e.target.id());
            setDraggable(true);*/
        } else {
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
    
    setDraggable(bool){
        this.layer.getChildren(function(node){
            return node.getClassName() === 'Circle';
        }).each(function(shape, n) {
            shape.setAttr('draggable',bool);
        });
    };
}
