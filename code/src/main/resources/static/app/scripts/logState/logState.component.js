System.register(['angular2/core', 'angular2/router', '../login/authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1;
    var LogStateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            LogStateComponent = (function () {
                function LogStateComponent(_router, _authenticationService) {
                    this._router = _router;
                    this._authenticationService = _authenticationService;
                    this.logState = "Login";
                    this.register = "Register";
                    this.user = "User";
                    this.loggedIn = _authenticationService.isLoggedIn();
                    if (this.loggedIn) {
                        this.logState = "Logout";
                        var string = localStorage.getItem("auth_token");
                        var headerParts = atob(string).split(":");
                        this.name = atob(headerParts[0]);
                        this.user = this.name;
                    }
                }
                LogStateComponent.prototype.gotoLogin = function () {
                    if (!this.loggedIn) {
                        this._router.navigate(['Login']);
                    }
                    else {
                        this._authenticationService.logout();
                        this.loggedIn = this._authenticationService.isLoggedIn();
                        this.logState = "Login";
                        this._router.navigate(['Search']);
                    }
                };
                LogStateComponent.prototype.gotoRegister = function () {
                    this._router.navigate(['Register']);
                };
                LogStateComponent.prototype.gotoProfil = function () {
                    this._router.navigate(['Profile', { name: this.name }]);
                };
                LogStateComponent = __decorate([
                    core_1.Component({
                        selector: 'logState',
                        templateUrl: "app/html/logState/logState.html",
                        styles: ['a {cursor: pointer}'],
                        providers: [authentication_service_1.AuthenticationService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
                ], LogStateComponent);
                return LogStateComponent;
            }());
            exports_1("LogStateComponent", LogStateComponent);
        }
    }
});
//# sourceMappingURL=logState.component.js.map