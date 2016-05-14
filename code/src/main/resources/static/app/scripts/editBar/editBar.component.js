System.register(['angular2/core', 'angular2/router', '../login/authentication.service', '../profile/profile.service', '../../headerfct'], function(exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1, profile_service_1, headerfct_1;
    var EditBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            EditBarComponent = (function () {
                function EditBarComponent(_elRef, _router, _authenticationService) {
                    this._elRef = _elRef;
                    this._router = _router;
                    this._authenticationService = _authenticationService;
                    this.editProfile = "Edit Profile";
                    this.lookAtIt = "Look at it";
                    this.edit = "Edit";
                    this.loggedIn = _authenticationService.isLoggedIn();
                }
                EditBarComponent.prototype.openVex = function () {
                    var self = this;
                    vex.open({
                        showCloseButton: true,
                        content: "<div id=\"userEditPage\">\n\t\t\t\t\t\t    <div class=\"userEditFrameContainer\">\n\t\t\t\t\t\t        <div class=\"userEditContainer\">\n\t\t\t\t\t\t            <div id=\"content\">\n\t\t\t\t\t\t                <div class=\"h1bgUserEdit\"><h1>EDIT MY INFO</h1></div>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <form method=\"POST\" id=\"changeName\" name=\"changeName\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                        <label>NAME</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField loadData\" placeholder=\"username\" type=\"text\" name=\"userName\" required=\"\">\n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input class=\"button\" type=\"submit\" value=\"CHANGE NAME\"></div>\n\t\t\t\t\t\t                </form>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <form method=\"POST\" id=\"changeEmail\" name=\"changeEmail\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                        <label>EMAIL</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField loadData\" type=\"email\" name=\"userMail\" required=\"\" placeholder=\"email\">\n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input class=\"button\" type=\"submit\" value=\"CHANGE E-MAIL\"></div>\n\t\t\t\t\t\t                </form>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <form method=\"POST\" id=\"changePassword\" name=\"changePassword\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                        <label>PASSWORD</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField\" type=\"password\" name=\"userPassword\" required=\"\">\n\t\t\t\t\t\t                        <label>CONFIRM PASSWORD</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField\" type=\"password\" name=\"userPasswordAgain\" required=\"\">\n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input class=\"button\" type=\"submit\" value=\"CHANGE PASSWORD\"></div>\n\t\t\t\t\t\t                </form>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <div class=\"currPicDiv\"><img src=\"\" alt=\"CurrentPicture\" id=\"currentPicture\" class=\"currentUserPicture\"></div>\n\t\t\t\t\t\t                <div class=\"buttonFrameContainer\" id=\"pictureHandling\">\n\t\t\t\t\t\t                <input class=\"button ajaxFormTrigger userPicture\" type=\"button\" id=\"changePictureButton\" value=\"CHANGE PICTURE\"><br>\n\t\t\t\t\t\t\t\t</div>         \n\t\t\t\t\t\t                <div class=\"closeFancyBox\"><input onclick=\"vex.close();\"  class=\"button\" type=\"button\" value=\"CLOSE\"></div>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t        </div>\n\t\t\t\t\t\t    </div>\n\t\t\t\t\t\t</div>"
                    });
                };
                EditBarComponent.prototype.ngOnInit = function () {
                    if (document.getElementById("profilePage")) {
                        this.profilePage = true;
                    }
                    if (document.getElementById("userStoryPage")) {
                        this.aboutPage = true;
                    }
                };
                EditBarComponent = __decorate([
                    core_1.Component({
                        selector: 'editBar',
                        templateUrl: "app/html/editBar/editBar.html",
                        styles: ['a {cursor: pointer}'],
                        providers: [authentication_service_1.AuthenticationService, profile_service_1.ProfileService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, authentication_service_1.AuthenticationService])
                ], EditBarComponent);
                return EditBarComponent;
            }());
            exports_1("EditBarComponent", EditBarComponent);
        }
    }
});
//# sourceMappingURL=editBar.component.js.map