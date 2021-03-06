System.register(['angular2/core', 'angular2/router', './scripts/login/login.component', './scripts/register/register.component', './scripts/search/search-form.component', './scripts/result/result.component', './scripts/nodeEditor/nodeEditor.component', './scripts/profile/profile.component', './scripts/about/about.component', './scripts/error/error.component', './scripts/mobile/mobile.component', './scripts/presentation/presentation.component', './scripts/comments/comments.component'], function(exports_1, context_1) {
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
    var core_1, router_1, login_component_1, register_component_1, search_form_component_1, result_component_1, nodeEditor_component_1, profile_component_1, about_component_1, error_component_1, mobile_component_1, presentation_component_1, comments_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (search_form_component_1_1) {
                search_form_component_1 = search_form_component_1_1;
            },
            function (result_component_1_1) {
                result_component_1 = result_component_1_1;
            },
            function (nodeEditor_component_1_1) {
                nodeEditor_component_1 = nodeEditor_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (error_component_1_1) {
                error_component_1 = error_component_1_1;
            },
            function (mobile_component_1_1) {
                mobile_component_1 = mobile_component_1_1;
            },
            function (presentation_component_1_1) {
                presentation_component_1 = presentation_component_1_1;
            },
            function (comments_component_1_1) {
                comments_component_1 = comments_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.libelleImageUrl = 'app/assets/files/libelle.jpg';
                    this.logoImageUrl = 'app/assets/files/logo.jpg';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'storii-app',
                        templateUrl: "app/html/start/start.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Search', component: search_form_component_1.SearchFormComponent },
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/register', name: 'Register', component: register_component_1.RegisterComponent },
                        { path: '/error', name: 'Error', component: error_component_1.ErrorComponent },
                        { path: '/mobile', name: 'Mobile', component: mobile_component_1.MobileComponent },
                        { path: '/search', name: 'Result', component: result_component_1.ResultComponent },
                        { path: '/users/:name/:storyName/node/edit', name: 'NodeEditor', component: nodeEditor_component_1.NodeEditorComponent },
                        { path: '/users/:name', name: 'Profile', component: profile_component_1.ProfileComponent },
                        { path: '/users/:name/:storyName', name: 'About', component: about_component_1.AboutComponent },
                        { path: '/users/:name/:storyName/comments', name: 'Comments', component: comments_component_1.CommentsComponent },
                        { path: '/users/:name/:storyName/published', name: 'Presentation', component: presentation_component_1.PresentationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map