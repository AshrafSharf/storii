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
    var NodeEditorService;
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
            NodeEditorService = (function () {
                function NodeEditorService(http, httpClient, _authenticationService) {
                    this.http = http;
                    this.httpClient = httpClient;
                    this._authenticationService = _authenticationService;
                }
                NodeEditorService.prototype.reorderNodes = function (id1, id2) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/page/' + id1 + "/swapWith/" + id2;
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.reorderBranches = function (id1, id2) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/page/' + id1 + "/swapWithBranch/" + id2;
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.appendBranch = function (id1, id2) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/page/' + id1 + "/appendToBranch/" + id2;
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.getChildren = function (id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/page/' + id + "/getAllOutgoing/";
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.addNewNode = function (storyID, selectedID, level, position) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/story/' + storyID + '/addPage/' + selectedID;
                    return this.http.post(_resultUrl, JSON.stringify({ "title": "defaultTitle", "description": "defaultDescription", "level": level, "position": position, "serializedContent": "" }), { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.deletePageById = function (id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    // var _resultUrl = '/page/'+id;
                    //  return this.http.delete(_resultUrl,{ headers })
                    var _resultUrl = '/page/' + id + '/deleteSingle';
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.deleteBranch = function (id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/page/' + id + '/deleteBranch';
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.getPageById = function (id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/page/';
                    return this.http.get(_resultUrl + id, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.startDrawLines = function (id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/story/' + id + '/getMaxLevel';
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.startDrawNodes = function (id) {
                    var headers = new http_2.Headers();
                    if (this._authenticationService.isLoggedIn()) {
                        headers = this.httpClient.createHeader(headers);
                        headers.append('Content-Type', 'application/json');
                    }
                    else {
                        headers.delete('Authorization');
                        headers.append('Authorization', "");
                    }
                    var _resultUrl = '/story/' + id + '/getPages';
                    return this.http.get(_resultUrl, { headers: headers })
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                NodeEditorService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body.data || {};
                };
                NodeEditorService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                NodeEditorService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, headerfct_1.HttpClient, authentication_service_1.AuthenticationService])
                ], NodeEditorService);
                return NodeEditorService;
            }());
            exports_1("NodeEditorService", NodeEditorService);
        }
    }
});
//# sourceMappingURL=nodeEditor.service.js.map