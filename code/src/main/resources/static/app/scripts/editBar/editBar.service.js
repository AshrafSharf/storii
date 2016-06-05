System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../../headerfct', '../login/authentication.service'], function(exports_1, context_1) {
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
    var core_1, http_1, http_2, Observable_1, headerfct_1, authentication_service_1;
    var EditBarService;
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
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            EditBarService = (function () {
                function EditBarService(http, httpClient, _authenticationService) {
                    this.http = http;
                    this.httpClient = httpClient;
                    this._authenticationService = _authenticationService;
                }
                EditBarService.prototype.updateValues = function (key, value, user_id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.delete('Content-Type');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/user/updateMe';
                    return this.http.put(_resultUrl, JSON.stringify(new function () { this[key] = value; }), { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                EditBarService.prototype.saveData = function (images, texts, links, id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.delete('Content-Type');
                        headers.append('Authorization', "");
                    }
                    var object = {};
                    object['images'] = images;
                    object['texts'] = texts;
                    object['links'] = links;
                    var serializedContent = btoa(JSON.stringify(object));
                    var _resultUrl = '/page/' + id;
                    return this.http.put(_resultUrl, JSON.stringify({ 'serializedContent': serializedContent, 'title': texts[0]['content'], 'description': texts[1]['content'] }), { headers: headers })
                        .map(this.extractData)
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                EditBarService.prototype.getLoggedInUser = function () {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/user/';
                    return this.http.get(_resultUrl + "me", { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                EditBarService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body.data || {};
                };
                EditBarService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                EditBarService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, headerfct_1.HttpClient, authentication_service_1.AuthenticationService])
                ], EditBarService);
                return EditBarService;
            }());
            exports_1("EditBarService", EditBarService);
        }
    }
});
//# sourceMappingURL=editBar.service.js.map