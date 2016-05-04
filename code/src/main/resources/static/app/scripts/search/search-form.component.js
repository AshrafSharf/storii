System.register(['angular2/core', 'angular2/router', '../logState/logState.component'], function(exports_1, context_1) {
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
    var core_1, router_1, logState_component_1;
    var SearchFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (logState_component_1_1) {
                logState_component_1 = logState_component_1_1;
            }],
        execute: function() {
            SearchFormComponent = (function () {
                function SearchFormComponent(_elRef, _router) {
                    this._elRef = _elRef;
                    this._router = _router;
                    this.title = 'Search:';
                    console.log(localStorage.getItem('auth_token'));
                }
                SearchFormComponent.prototype.search = function (term) {
                    this._router.navigate(['Result', { key: term }]);
                };
                SearchFormComponent.prototype.createNewStory = function () {
                    console.log("JJJJJJJ");
                };
                SearchFormComponent.prototype.ngOnInit = function () {
                    jQuery(this._elRef.nativeElement).find('#editProfile').on('click', function () {
                        vex.open({
                            showCloseButton: false,
                            content: "<div id=\"newStoryPage\">\n\t\t\t\t\t    <div class=\"newStoryFrameContainer\">\n\t\t\t\t\t        <div class=\"newStoryContainer\">\n\t\t\t\t\t            <div id=\"content\">\n\t\t\t\t\t                <div class=\"h1bgNewStory\"><h1>NEW STORY</h1></div>\n\t\t\t\t\t                \n\t\t\t\t\t                <form id=\"changeName\" name=\"changeName\">\n\t\t\t\t\t                        <label>WHAT IS THE NAME OF YOUR STORY?</label><br>\n\t\t\t\t\t                 \t\t<input class=\"inputField\" name=\"storyName\" required=\"\" type=\"text\">\n\t\t\t\t\t                        <div class=\"buttonFrameContainer fullWidth\"><input (click)=\"createNewStory()\" class=\"button\" value=\"CREATE STORY\" type=\"button\"></div>\n\t\t\t\t\t                </form>\n\t\t\t\t\t              \n\t\t\t\t\t                <div class=\"closeFancyBox\"><input onclick=\"vex.close();\" class=\"button\" value=\"CLOSE\" type=\"button\"></div>\n\t\t\t\t\t                \n\t\t\t\t\t            </div>\n\t\t\t\t\t        </div>\n\t\t\t\t\t    </div>\n\t\t\t\t\t</div>"
                        });
                    });
                };
                SearchFormComponent = __decorate([
                    core_1.Component({
                        selector: 'search-form',
                        templateUrl: "app/html/search/search.html",
                        directives: [logState_component_1.LogStateComponent]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router])
                ], SearchFormComponent);
                return SearchFormComponent;
            }());
            exports_1("SearchFormComponent", SearchFormComponent);
        }
    }
});
//# sourceMappingURL=search-form.component.js.map