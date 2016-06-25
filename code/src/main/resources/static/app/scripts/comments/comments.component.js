System.register(['angular2/core', 'angular2/router', '../logState/logState.component', '../editBar/editBar.component', '../login/authentication.service', '../about/about.service', '../../headerfct', '../editBar/editBar.service'], function(exports_1, context_1) {
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
    var CommentsComponent;
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
            CommentsComponent = (function () {
                function CommentsComponent(_elRef, _router, _routeParams, _authenticationService, _aboutService, _editBarService) {
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
                    this.ratings = [];
                }
                CommentsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.storyName = this._routeParams.get('storyName');
                    this.storyid = this._routeParams.get('id');
                    this.name = this._routeParams.get('name');
                    this.loggedIn = this._authenticationService.isLoggedIn();
                    var self = this;
                    this._aboutService.getStoryById(this.storyid)
                        .subscribe(function (result) {
                        if (jQuery.isEmptyObject(result)) {
                            _this._router.navigate(['Error']);
                        }
                        else if (result) {
                            var rating = [];
                            console.log(result['ratings'].length);
                            for (var i = 0; i < result['ratings'].length; i++) {
                                rating = [];
                                for (var j = 0; j < result['ratings'][i]['value']; j++) {
                                    rating[j] = _this.yellowStar;
                                }
                                for (var k = result['ratings'][i]['value']; k < 5; k++) {
                                    rating[k] = _this.grayStar;
                                }
                                result['ratings'][i]['stars'] = rating;
                            }
                            console.log(result);
                            for (var key in result['ratings']) {
                                _this._aboutService.getUserById(result['ratings'][key]['ratingUser'])
                                    .subscribe(function (found) {
                                    for (var user in result['ratings']) {
                                        if (result['ratings'][user]['ratingUser'] == found['id']) {
                                            console.log(found['name']);
                                            result['ratings'][user]['ratingUser'] = found['name'];
                                        }
                                    }
                                }, function (error) { _this._router.navigate(['Error']); });
                            }
                            _this.ratings = result['ratings'];
                        }
                    }, function (error) { _this._router.navigate(['Error']); });
                    //get story by id
                };
                CommentsComponent = __decorate([
                    core_1.Component({
                        selector: 'comments',
                        templateUrl: "app/html/comments/comments.html",
                        directives: [logState_component_1.LogStateComponent, editBar_component_1.EditBarComponent],
                        styles: ['a {cursor: pointer}'],
                        providers: [editBar_service_1.EditBarService, about_service_1.AboutService, authentication_service_1.AuthenticationService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, router_1.RouteParams, authentication_service_1.AuthenticationService, about_service_1.AboutService, editBar_service_1.EditBarService])
                ], CommentsComponent);
                return CommentsComponent;
            }());
            exports_1("CommentsComponent", CommentsComponent);
        }
    }
});
//# sourceMappingURL=comments.component.js.map