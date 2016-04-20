System.register(['angular2/core', 'angular2/http', 'rxjs/Subject', './search.service', '../logState/logState.component'], function(exports_1, context_1) {
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
    var core_1, http_1, Subject_1, search_service_1, logState_component_1;
    var SearchFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (logState_component_1_1) {
                logState_component_1 = logState_component_1_1;
            }],
        execute: function() {
            SearchFormComponent = (function () {
                function SearchFormComponent(_searchService) {
                    var _this = this;
                    this._searchService = _searchService;
                    this._searchTermStream = new Subject_1.Subject();
                    this.items = this._searchTermStream
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(function (term) { return _this._searchService.search(term); });
                }
                SearchFormComponent.prototype.search = function (term) { this._searchTermStream.next(term); };
                SearchFormComponent = __decorate([
                    core_1.Component({
                        selector: 'search-form',
                        templateUrl: "app/html/search/search.html",
                        directives: [logState_component_1.LogStateComponent],
                        providers: [http_1.JSONP_PROVIDERS, search_service_1.SearchService]
                    }), 
                    __metadata('design:paramtypes', [search_service_1.SearchService])
                ], SearchFormComponent);
                return SearchFormComponent;
            }());
            exports_1("SearchFormComponent", SearchFormComponent);
        }
    }
});
//# sourceMappingURL=search-form.component.js.map