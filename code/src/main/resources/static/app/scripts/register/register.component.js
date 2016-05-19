System.register(['angular2/core', 'angular2/router', 'angular2/common', './register.service', '../login/authentication.service', '../../headerfct'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, register_service_1, authentication_service_1, headerfct_1;
    var RegisterComponent;
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
            function (register_service_1_1) {
                register_service_1 = register_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(fb, _router, _authenticationService, _registerService, _routeParams) {
                    this.fb = fb;
                    this._router = _router;
                    this._authenticationService = _authenticationService;
                    this._registerService = _registerService;
                    this._routeParams = _routeParams;
                    this.title = 'Registration';
                    this.userName = 'Username';
                    this.eMail = 'E-mail';
                    this.passWord = 'Password';
                    this.confirmPassWord = 'Confirm Password';
                    this.errorPW = false;
                    this.error = false;
                    this.form = fb.group({
                        username: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.required],
                        password: ['', common_1.Validators.required],
                        confirmPassword: ['', common_1.Validators.required]
                    });
                }
                RegisterComponent.prototype.register = function (username, email, pw, conPw) {
                    var _this = this;
                    if (pw != conPw) {
                        this.errorPW = true;
                    }
                    else {
                        this._registerService.register(username, email, pw)
                            .subscribe(function (result) {
                            console.log(result);
                            if (result) {
                                _this._authenticationService.login(username, pw)
                                    .subscribe(function (result) {
                                    console.log(result);
                                    if (result) {
                                        _this._router.navigate(['Search']);
                                    }
                                    else {
                                        _this.error = true;
                                    }
                                }, function () {
                                    _this.error = true;
                                });
                            }
                            else {
                                _this.error = true;
                            }
                        }, function () { _this.error = true; });
                    }
                };
                RegisterComponent.prototype.goHome = function () {
                    this._router.navigate(['Search']);
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register',
                        templateUrl: "app/html/register/register.html",
                        styles: ['a {cursor: pointer}'],
                        providers: [register_service_1.RegisterService, authentication_service_1.AuthenticationService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, authentication_service_1.AuthenticationService, register_service_1.RegisterService, router_1.RouteParams])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map