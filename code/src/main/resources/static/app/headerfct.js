System.register(['angular2/http', 'angular2/core'], function(exports_1, context_1) {
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
    var http_1, core_1;
    var HttpClient;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HttpClient = (function () {
                function HttpClient(http) {
                }
                HttpClient.prototype.createHeader = function (headers) {
                    var string = localStorage.getItem("auth_token");
                    headers.append('Authorization', string);
                    return headers;
                };
                HttpClient.prototype.changePasswordInToken = function (pw) {
                    var string = localStorage.getItem("auth_token");
                    var headerParts = string.split(" ");
                    var getToken = atob(headerParts[1]).split(":");
                    var user = getToken[0];
                    localStorage.removeItem('auth_token');
                    var s = user + ":" + pw;
                    var setToken = "Basic " + btoa(s);
                    localStorage.setItem('auth_token', setToken);
                };
                HttpClient = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HttpClient);
                return HttpClient;
            }());
            exports_1("HttpClient", HttpClient);
        }
    }
});
//# sourceMappingURL=headerfct.js.map