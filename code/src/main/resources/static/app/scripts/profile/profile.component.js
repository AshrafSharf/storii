System.register(['angular2/core', 'angular2/router', '../logState/logState.component', '../login/authentication.service', './profile.service', '../../headerfct'], function(exports_1, context_1) {
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
    var core_1, router_1, logState_component_1, authentication_service_1, profile_service_1, headerfct_1;
    var ProfileComponent;
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
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (profile_service_1_1) {
                profile_service_1 = profile_service_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            }],
        execute: function() {
            ProfileComponent = (function () {
                function ProfileComponent(_elRef, _router, _routeParams, _authenticationService, _profileService) {
                    this._elRef = _elRef;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._authenticationService = _authenticationService;
                    this._profileService = _profileService;
                    this.newStoryIcon = 'app/assets/files/dummyNewStory.jpg';
                    this.title = "Profile";
                    this.myinfo = "My Info";
                    this.username = "Username:";
                    this.email = "E-Mail:";
                    this.aboutme = "About me:";
                    this.edit = "Edit Profile";
                    this.myinspiration = "My Inspiration:";
                    this.profilepic = "Profile Pic:";
                    this.mystories = "My Strories";
                }
                ProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.name = this._routeParams.get('name');
                    if (!this._authenticationService.isLoggedIn()) {
                        this._router.navigate(['Search']);
                    }
                    else {
                        this._profileService.getUserInfo(this.name)
                            .subscribe(function (details) { return _this.details = details; }, function (error) { return _this.errorMessage = error; });
                    }
                    jQuery(this._elRef.nativeElement).find('#editProfile').on('click', function () {
                        vex.dialog.prompt({
                            message: 'Edit Profile?',
                            placeholder: 'Planet name',
                            callback: function (value) {
                                return console.log(value);
                            }
                        });
                    });
                    jQuery(this._elRef.nativeElement).find('#createNewStory').on('click', function () {
                        vex.open({
                            showCloseButton: false,
                            content: "<div id=\"newStoryPage\">\n\t\t\t\t\t    <div class=\"newStoryFrameContainer\">\n\t\t\t\t\t        <div class=\"newStoryContainer\">\n\t\t\t\t\t            <div id=\"content\">\n\t\t\t\t\t                <div class=\"h1bgNewStory\"><h1>NEW STORY</h1></div>\n\t\t\t\t\t                \n\t\t\t\t\t                <form id=\"changeName\" name=\"changeName\">\n\t\t\t\t\t                        <label>WHAT IS THE NAME OF YOUR STORY?</label><br>\n\t\t\t\t\t                 \t\t<input class=\"inputField\" name=\"storyName\" required=\"\" type=\"text\">\n\t\t\t\t\t                        <div class=\"buttonFrameContainer fullWidth\"><input class=\"button\" value=\"CREATE STORY\" type=\"submit\"></div>\n\t\t\t\t\t                </form>\n\t\t\t\t\t              \n\t\t\t\t\t                <div class=\"closeFancyBox\"><input onclick=\"vex.close();\" class=\"button\" value=\"CLOSE\" type=\"button\"></div>\n\t\t\t\t\t                \n\t\t\t\t\t            </div>\n\t\t\t\t\t        </div>\n\t\t\t\t\t    </div>\n\t\t\t\t\t</div>"
                        });
                    });
                };
                ProfileComponent.prototype.createNewStory = function () {
                };
                ProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: "app/html/profile/profile.html",
                        directives: [logState_component_1.LogStateComponent],
                        styles: ['a {cursor: pointer}'],
                        providers: [authentication_service_1.AuthenticationService, profile_service_1.ProfileService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, router_1.RouteParams, authentication_service_1.AuthenticationService, profile_service_1.ProfileService])
                ], ProfileComponent);
                return ProfileComponent;
            }());
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
//# sourceMappingURL=profile.component.js.map