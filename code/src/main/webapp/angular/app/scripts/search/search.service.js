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
    var SearchService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SearchService = (function () {
                function SearchService(jsonp) {
                    this.jsonp = jsonp;
                }
                SearchService.prototype.search = function (term) {
                    var wikiUrl = 'http://127.0.0.1:8080/story';
                    var params = new http_1.URLSearchParams();
                    // params.set('search', term); // the user's search value
                    // params.set('action', 'opensearch');
                    params.set('format', 'json');
                    params.set('callback', 'JSONP_CALLBACK');
                    // TODO: Add error handling
                    return this.jsonp
                        .get(wikiUrl, { search: params })
                        .map(function (request) { return request.json()[1]; });
                };
                SearchService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Jsonp])
                ], SearchService);
                return SearchService;
            }());
            exports_1("SearchService", SearchService);
        }
    }
});
//# sourceMappingURL=search.service.js.map