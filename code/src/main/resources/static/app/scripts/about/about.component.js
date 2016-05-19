System.register(['angular2/core', 'angular2/router', '../logState/logState.component', '../editBar/editBar.component', '../login/authentication.service', '../../headerfct'], function(exports_1, context_1) {
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
    var core_1, router_1, logState_component_1, editBar_component_1, authentication_service_1, headerfct_1;
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
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            }],
        execute: function() {
            AboutComponent = (function () {
                function AboutComponent(_elRef, _router, _routeParams, _authenticationService) {
                    this._elRef = _elRef;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._authenticationService = _authenticationService;
                    this.defaultStoryPic = 'app/assets/files/dummyStory.jpg';
                }
                AboutComponent.prototype.ngOnInit = function () {
                    this.storyid = this._routeParams.get('storyid');
                    this.name = this._routeParams.get('name');
                    this.loggedIn = this._authenticationService.isLoggedIn();
                };
                AboutComponent.prototype.gotoProfile = function () {
                    this._router.navigate(['Profile', { name: this.name }]);
                };
                AboutComponent = __decorate([
                    core_1.Component({
                        selector: 'about',
                        templateUrl: "app/html/about/about.html",
                        directives: [logState_component_1.LogStateComponent, editBar_component_1.EditBarComponent],
                        styles: ['a {cursor: pointer}'],
                        providers: [authentication_service_1.AuthenticationService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, router_1.RouteParams, authentication_service_1.AuthenticationService])
                ], AboutComponent);
                return AboutComponent;
            }());
            exports_1("AboutComponent", AboutComponent);
        }
    }
});
//# sourceMappingURL=about.component.js.map