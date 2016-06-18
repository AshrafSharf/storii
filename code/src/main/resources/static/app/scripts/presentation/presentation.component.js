System.register(['angular2/core', 'angular2/router', '../logState/logState.component', '../login/authentication.service', '../../headerfct', '../about/about.service', '../editBar/editBar.service'], function(exports_1, context_1) {
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
    var core_1, router_1, logState_component_1, authentication_service_1, headerfct_1, about_service_1, editBar_service_1;
    var PresentationComponent;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            },
            function (about_service_1_1) {
                about_service_1 = about_service_1_1;
            },
            function (editBar_service_1_1) {
                editBar_service_1 = editBar_service_1_1;
            }],
        execute: function() {
            PresentationComponent = (function () {
                function PresentationComponent(_elRef, _router, _routeParams, _authenticationService, _editBarService, _aboutService) {
                    this._elRef = _elRef;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._authenticationService = _authenticationService;
                    this._editBarService = _editBarService;
                    this._aboutService = _aboutService;
                }
                PresentationComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.storyName = this._routeParams.get('storyName');
                    this.storyid = this._routeParams.get('id');
                    this.name = this._routeParams.get('name');
                    this.loggedIn = this._authenticationService.isLoggedIn();
                    if (this.loggedIn) {
                    }
                    this._aboutService.getStoryById(this.storyid)
                        .subscribe(function (result) {
                        if (result) {
                            _this.firstPage = result['firstPage']['id'];
                            _this._editBarService.getPageById(_this.firstPage)
                                .subscribe(function (actualPage) {
                                _this.actualPage = actualPage;
                                _this.loadPageEditor();
                            }, function (error) { return _this.errorMessage = error; });
                        }
                        if (!result['data']) {
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                PresentationComponent.prototype.loadPageEditor = function () {
                    var self = this;
                    var options = {
                        float: true,
                        staticGrid: true,
                        acceptWidgets: '.grid-stack-item'
                    };
                    var gridStack = jQuery('.grid-stack');
                    gridStack.gridstack(options);
                    new function () {
                        this.texts = [];
                        this.images = [];
                        this.links = [];
                        this.externLinks = [];
                        var self2 = this;
                        var grid = jQuery('#inner').data('gridstack');
                        this.setUpArrays = function () {
                            this.images = [
                                { x: 3, y: 1, width: 6, height: 6 }
                            ];
                            this.texts = [
                                { x: 3, y: 0, width: 6, height: 1, content: "defaultTitle" },
                                { x: 3, y: 7, width: 6, height: 2, content: "defaultText" }
                            ];
                            this.links = [];
                            this.externLinks = [];
                        };
                        this.loadGrid = function () {
                            this.loadData();
                            this.clearGrid();
                            this.loadText();
                            this.loadImages();
                            this.loadLinks();
                            jQuery('.link').on('click', function () {
                                self2.loadNextPage(jQuery(this).find('span').text());
                            });
                            return false;
                        }.bind(this);
                        this.loadData = function () {
                            if (self.actualPage['serializedContent'] != '') {
                                self.actualPage['outgoingInternLinks'].sort(function (a, b) {
                                    return parseFloat(a.id) - parseFloat(b.id);
                                });
                                var deserializedContent = atob(self.actualPage['serializedContent']);
                                var object = JSON.parse(deserializedContent);
                                this.images = object['images'];
                                this.texts = object['texts'];
                                this.links = object['links'];
                                //if new link was added
                                if (this.links.length < self.actualPage['outgoingInternLinks'].length) {
                                    if (this.links.length == 0) {
                                        this.setUpLinks();
                                    }
                                    else if (this.links.length == 1) {
                                        if (self.actualPage['outgoingInternLinks'].length >= 2) {
                                            this.links.push({ x: 6, y: 9, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][1]['nextPage'] });
                                        }
                                        if (self.actualPage['outgoingInternLinks'].length >= 3) {
                                            this.links.push({ x: 2, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][2]['nextPage'] });
                                        }
                                        if (self.actualPage['outgoingInternLinks'].length == 4) {
                                            this.links.push({ x: 6, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage'] });
                                        }
                                    }
                                    else if (this.links.length == 2) {
                                        if (self.actualPage['outgoingInternLinks'].length >= 3) {
                                            this.links.push({ x: 2, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][2]['nextPage'] });
                                        }
                                        if (self.actualPage['outgoingInternLinks'].length == 4) {
                                            this.links.push({ x: 6, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage'] });
                                        }
                                    }
                                    else if (this.links.length == 3) {
                                        if (self.actualPage['outgoingInternLinks'].length == 4) {
                                            this.links.push({ x: 6, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage'] });
                                        }
                                    }
                                }
                                else if (this.links.length > self.actualPage['outgoingInternLinks'].length) {
                                    if (self.actualPage['outgoingInternLinks'].length == 0) {
                                        this.links = [];
                                    }
                                    else {
                                        for (var i = 0; i < this.links.length; i++) {
                                            if (!this.contained(this.links[i]['id'])) {
                                                this.links.splice(i, 1);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                this.setUpArrays();
                                this.setUpLinks();
                            }
                        }.bind(this);
                        this.clearGrid = function () {
                            grid.removeAll();
                            return false;
                        }.bind(this);
                        this.contained = function (id) {
                            var found = false;
                            for (var i = 0; i < self.actualPage['outgoingInternLinks'].length; i++) {
                                if (id == self.actualPage['outgoingInternLinks'][i]['nextPage']) {
                                    found = true;
                                }
                            }
                            return found;
                        }.bind(this);
                        this.loadNextPage = function (id) {
                            self._editBarService.getPageById(id)
                                .subscribe(function (actualPage) {
                                self.actualPage = actualPage;
                                self2.loadGrid();
                            }, function (error) { return self.errorMessage = error; });
                        }.bind(this);
                        this.setUpLinks = function () {
                            if (self.actualPage['outgoingInternLinks'].length == 4) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][1]['nextPage'] },
                                    { x: 2, y: 10, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][2]['nextPage'] },
                                    { x: 6, y: 10, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][3]['nextPage'] }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 3) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][1]['nextPage'] },
                                    { x: 2, y: 10, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][2]['nextPage'] }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 2) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][1]['nextPage'] }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 1) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] }
                                ];
                            }
                            else {
                                this.links = [];
                            }
                        }.bind(this);
                        this.loadImages = function () {
                            var images = GridStackUI.Utils.sort(this.images);
                            _.each(images, function (node) {
                                var el = grid.addWidget(jQuery('<div class="image"><button class="delete hidden">X</button><div class="grid-stack-item-content"><img src=""><div/><div/>'), node.x, node.y, node.width, node.height);
                                grid.locked(el, true);
                                grid.move(el, node.x, node.y);
                            }, this);
                            return false;
                        }.bind(this);
                        this.loadText = function () {
                            var texts = GridStackUI.Utils.sort(this.texts);
                            _.each(texts, function (node) {
                                console.log(node);
                                if (node == 0) {
                                    var el = grid.addWidget(jQuery('<div class="text"><div class="grid-stack-item-content">' + node.content + '<div/><div/>'), node.x, node.y, node.width, node.height);
                                    grid.locked(el, true);
                                    grid.move(el, node.x, node.y);
                                }
                                else if (node.content != "") {
                                    var el = grid.addWidget(jQuery('<div class="text"><button class="delete hidden">X</button><div class="grid-stack-item-content">' + node.content + '<div/><div/>'), node.x, node.y, node.width, node.height);
                                    grid.locked(el, true);
                                    grid.move(el, node.x, node.y);
                                }
                            }, this);
                            return false;
                        }.bind(this);
                        this.loadLinks = function () {
                            var links = GridStackUI.Utils.sort(this.links);
                            _.each(links, function (node) {
                                var el = grid.addWidget(jQuery('<div class="link"><!--<button class="delete hidden">X</button>--><div class="grid-stack-item-content"><div><span style="display:none; visibility:hidden;">' + node.id + '</span><a>' + node.content + '</a></div><div/><div/>'), node.x, node.y, node.width, node.height);
                                grid.locked(el, true);
                                grid.move(el, node.x, node.y);
                            }, this);
                            return false;
                        }.bind(this);
                        this.loadGrid();
                    };
                };
                PresentationComponent = __decorate([
                    core_1.Component({
                        selector: 'presentation',
                        templateUrl: "app/html/presentation/presentation.html",
                        directives: [logState_component_1.LogStateComponent],
                        styles: ['a {cursor: pointer}'],
                        providers: [about_service_1.AboutService, editBar_service_1.EditBarService, authentication_service_1.AuthenticationService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, router_1.RouteParams, authentication_service_1.AuthenticationService, editBar_service_1.EditBarService, about_service_1.AboutService])
                ], PresentationComponent);
                return PresentationComponent;
            }());
            exports_1("PresentationComponent", PresentationComponent);
        }
    }
});
//# sourceMappingURL=presentation.component.js.map