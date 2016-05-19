System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../../headerfct'], function(exports_1, context_1) {
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
    var core_1, http_1, http_2, Observable_1, headerfct_1;
    var AuthenticationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            }],
        execute: function() {
            AuthenticationService = (function () {
                function AuthenticationService(http, httpClient) {
                    this.http = http;
                    this.httpClient = httpClient;
                    this.loggedIn = false;
                    this.loggedIn = !!localStorage.getItem('auth_token');
                }
                AuthenticationService.prototype.login = function (username, password) {
                    var _this = this;
                    var headers = new http_2.Headers();
                    var _resultUrl = '/user/login';
                    var string = username + ":" + password;
                    var token = "Basic " + btoa(string);
                    headers.append('Authorization', token);
                    console.log(token);
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .map(function (res) {
                        if (res.login) {
                            localStorage.setItem('auth_token', token);
                            _this.loggedIn = true;
                        }
                        return res.login;
                    });
                };
                AuthenticationService.prototype.logout = function () {
                    localStorage.removeItem("auth_token");
                    this.loggedIn = false;
                };
                AuthenticationService.prototype.isLoggedIn = function () {
                    return !!localStorage.getItem("auth_token");
                };
                AuthenticationService.prototype.hashCode2 = function (str) {
                    var hash = 0;
                    if (str.length == 0)
                        return hash;
                    for (var i = 0; i < str.length; i++) {
                        var char = str.charCodeAt(i);
                        hash = ((hash << 5) - hash) + char;
                        hash = hash & hash; // Convert to 32bit integer
                    }
                    return hash;
                };
                AuthenticationService.prototype.resetUser = function () {
                    var headers = new http_2.Headers();
                    var tokens = this.httpClient.getTokenSplitted();
                    var hash = this.hashCode2(tokens[0]);
                    console.log(hash);
                    var _resultUrl = '/user/findByName/';
                    var string = "Basic " + hash + ":" + "xxx";
                    headers.append('Authorization', string);
                    return this.http.get(_resultUrl + hash, { headers: headers })
                        .map(this.extractData)
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                AuthenticationService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body.data || {};
                };
                AuthenticationService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, headerfct_1.HttpClient])
                ], AuthenticationService);
                return AuthenticationService;
            }());
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map