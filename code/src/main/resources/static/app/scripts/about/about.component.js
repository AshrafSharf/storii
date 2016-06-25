System.register(['angular2/core', 'angular2/router', '../logState/logState.component', '../editBar/editBar.component', '../login/authentication.service', './about.service', '../../headerfct', '../editBar/editBar.service'], function(exports_1, context_1) {
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
    var core_1, router_1, logState_component_1, editBar_component_1, authentication_service_1, about_service_1, headerfct_1, editBar_service_1;
    var AboutComponent;
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
            function (editBar_component_1_1) {
                editBar_component_1 = editBar_component_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (about_service_1_1) {
                about_service_1 = about_service_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            },
            function (editBar_service_1_1) {
                editBar_service_1 = editBar_service_1_1;
            }],
        execute: function() {
            AboutComponent = (function () {
                function AboutComponent(_elRef, _router, _routeParams, _authenticationService, _aboutService, _editBarService) {
                    this._elRef = _elRef;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._authenticationService = _authenticationService;
                    this._aboutService = _aboutService;
                    this._editBarService = _editBarService;
                    this.defaultStoryPic = 'app/assets/files/dummyStory.jpg';
                    this.yellowStar = 'app/assets/files/star.png';
                    this.halfStar = 'app/assets/files/halfgreystar.png';
                    this.grayStar = 'app/assets/files/greystar.png';
                    this.details = [];
                    this.rating = [];
                }
                AboutComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.storyName = this._routeParams.get('storyName');
                    this.storyid = this._routeParams.get('id');
                    this.name = this._routeParams.get('name');
                    this.loggedIn = this._authenticationService.isLoggedIn();
                    var self = this;
                    if (this.loggedIn) {
                        this._editBarService.getLoggedInUser()
                            .subscribe(function (loggedInUser) {
                            _this.loggedInUser = loggedInUser;
                            if (_this.loggedInUser['name'] === _this.name) {
                                _this.allowed = true;
                            }
                        }, function (error) { return _this.errorMessage = error; });
                    }
                    this._aboutService.getStoryById(this.storyid)
                        .subscribe(function (result) {
                        if (jQuery.isEmptyObject(result)) {
                            _this._router.navigate(['Error']);
                        }
                        else if (result) {
                            _this._aboutService.getStoryRanking(_this.storyid)
                                .subscribe(function (done) {
                                for (var i = 0; i < parseInt(done['rounded_rating']); i++) {
                                    self.rating[i] = _this.yellowStar;
                                }
                                var comma = done['rounded_rating'].toString().split(".")[1];
                                if (comma != "0" && comma != undefined) {
                                    self.rating[parseInt(done['rounded_rating'])] = _this.halfStar;
                                    for (var j = parseInt(done['rounded_rating']) + 1; j < 5; j++) {
                                        self.rating[j] = _this.grayStar;
                                    }
                                }
                                else {
                                    for (var j = parseInt(done['rounded_rating']); j < 5; j++) {
                                        self.rating[j] = _this.grayStar;
                                    }
                                }
                            }, function (error) { _this._router.navigate(['Error']); });
                            if (result['ratings'].length != 0) {
                                if (result['ratings'].length >= 2) {
                                    result['ratings'].length = 2;
                                }
                                else {
                                    result['ratings'].length = 1;
                                }
                                for (var k = 0; k < result['ratings'].length; k++) {
                                    _this._aboutService.getUserById(result['ratings'][k]['ratingUser'])
                                        .subscribe(function (found) {
                                        for (var user in result['ratings']) {
                                            if (result['ratings'][user]['ratingUser'] == found['id']) {
                                                console.log(found['name']);
                                                result['ratings'][user]['ratingUser'] = found['name'];
                                            }
                                        }
                                    }, function (error) { _this._router.navigate(['Error']); });
                                }
                            }
                            else {
                                result['ratings'] = undefined;
                            }
                            _this.details.push(result);
                        }
                    }, function (error) { _this._router.navigate(['Error']); });
                    //get story by id
                };
                AboutComponent.prototype.gotoProfile = function () {
                    this._router.navigate(['Profile', { name: this.name }]);
                };
                AboutComponent.prototype.gotoPresentation = function () {
                    this._router.navigate(['Presentation', { name: this.name, storyName: this.storyName, id: this.storyid }]);
                };
                AboutComponent.prototype.openComments = function () {
                    this._router.navigate(['Comments', { name: this.name, storyName: this.storyName, id: this.storyid }]);
                };
                AboutComponent = __decorate([
                    core_1.Component({
                        selector: 'about',
                        templateUrl: "app/html/about/about.html",
                        directives: [logState_component_1.LogStateComponent, editBar_component_1.EditBarComponent],
                        styles: ['a {cursor: pointer}'],
                        providers: [editBar_service_1.EditBarService, about_service_1.AboutService, authentication_service_1.AuthenticationService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, router_1.RouteParams, authentication_service_1.AuthenticationService, about_service_1.AboutService, editBar_service_1.EditBarService])
                ], AboutComponent);
                return AboutComponent;
            }());
            exports_1("AboutComponent", AboutComponent);
        }
    }
});
//# sourceMappingURL=about.component.js.map