System.register(['angular2/core', 'angular2/router', '../search/search.service', '../logState/logState.component'], function(exports_1, context_1) {
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
    var core_1, router_1, search_service_1, logState_component_1;
    var ResultComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (logState_component_1_1) {
                logState_component_1 = logState_component_1_1;
            }],
        execute: function() {
            ResultComponent = (function () {
                function ResultComponent(_router, _searchService, _routeParams) {
                    this._router = _router;
                    this._searchService = _searchService;
                    this._routeParams = _routeParams;
                    this.title = 'Search:';
                    this.resultsUsers = 'Users:';
                    this.resultsStories = 'Stories:';
                }
                ResultComponent.prototype.ngOnInit = function () {
                    var cell = document.getElementById('inputField');
                    cell.focus();
                    var value = this._routeParams.get('value');
                    this.resValue = value;
                    this.doSearch(value);
                };
                ResultComponent.prototype.search = function (term) {
                    this._router.navigate(['Result', { value: term }]);
                };
                ResultComponent.prototype.doSearch = function (term) {
                    var _this = this;
                    if (term != "") {
                        this._searchService.searchStory(term)
                            .subscribe(function (stories) { return _this.stories = stories; }, function (error) { return _this.errorMessage = error; });
                        this._searchService.searchUser(term)
                            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ResultComponent.prototype, "stories", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ResultComponent.prototype, "users", void 0);
                ResultComponent = __decorate([
                    core_1.Component({
                        selector: 'result',
                        templateUrl: "app/html/result/result.html",
                        styles: ['a {cursor: pointer}'],
                        directives: [logState_component_1.LogStateComponent],
                        providers: [search_service_1.SearchService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, search_service_1.SearchService, router_1.RouteParams])
                ], ResultComponent);
                return ResultComponent;
            }());
            exports_1("ResultComponent", ResultComponent);
        }
    }
});
//# sourceMappingURL=result.component.js.map