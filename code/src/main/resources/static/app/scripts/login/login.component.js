System.register(['angular2/core', 'angular2/router', 'angular2/common', './authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, authentication_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(fb, _router, _authenticationService, _routeParams) {
                    this.fb = fb;
                    this._router = _router;
                    this._authenticationService = _authenticationService;
                    this._routeParams = _routeParams;
                    this.title = 'Login:';
                    this.loginname = 'Username';
                    this.pw = 'Password';
                    this.register = 'Register';
                    this.error = false;
                    this.form = fb.group({
                        username: ['', common_1.Validators.required],
                        password: ['', common_1.Validators.required]
                    });
                }
                LoginComponent.prototype.login = function (username, password) {
                    var _this = this;
                    if (username != "" && password != "") {
                        this._authenticationService.login(username, password)
                            .subscribe(function (result) {
                            if (result) {
                                _this._router.navigate(['Search']);
                            }
                        }, function () { _this.error = true; });
                    }
                };
                LoginComponent.prototype.gotoRegister = function () {
                    this._router.navigate(['Register']);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: "app/html/login/login.html",
                        styles: ['a {cursor: pointer}'],
                        providers: [authentication_service_1.AuthenticationService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, authentication_service_1.AuthenticationService, router_1.RouteParams])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map