System.register(['angular2/core', 'angular2/router', '../login/authentication.service', '../profile/profile.service', './editBar.service', '../../headerfct'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, authentication_service_1, profile_service_1, editBar_service_1, headerfct_1;
    var EditBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (profile_service_1_1) {
                profile_service_1 = profile_service_1_1;
            },
            function (editBar_service_1_1) {
                editBar_service_1 = editBar_service_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            }],
        execute: function() {
            EditBarComponent = (function () {
                function EditBarComponent(_elRef, _router, _routeParams, _authenticationService, _editBarService) {
                    var _this = this;
                    this._elRef = _elRef;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._authenticationService = _authenticationService;
                    this._editBarService = _editBarService;
                    this.editProfile = "Edit Profile";
                    this.editPages = "Edit Pages";
                    this.editStory = "Edit Story";
                    this.loggedIn = _authenticationService.isLoggedIn();
                    this.name = this._routeParams.get('name');
                    if (this.loggedIn) {
                        this._editBarService.getLoggedInUser()
                            .subscribe(function (loggedInUser) {
                            _this.loggedInUser = loggedInUser;
                            if (_this.loggedInUser['name'] === _this.name) {
                                _this.allowed = true;
                            }
                        }, function (error) { return _this.errorMessage = error; });
                    }
                }
                EditBarComponent.prototype.changeValues = function (key, value) {
                    var _this = this;
                    //console.log(key+":"+value+":"+this.details[0]['id']);
                    this._editBarService.updateValues(key, value, this.details[0]['id'])
                        .subscribe(function (update) {
                        _this.update = update;
                        //change token and url wenn name geändert wird
                    }, function (error) { return _this.errorMessage = error; });
                };
                EditBarComponent.prototype.openVex = function () {
                    console.log(this.details[0]['aboutMe']);
                    var self = this;
                    vex.open({
                        showCloseButton: true,
                        content: "<div id=\"userEditPage\">\n\t\t\t\t\t\t    <div class=\"userEditFrameContainer\">\n\t\t\t\t\t\t        <div class=\"userEditContainer\">\n\t\t\t\t\t\t            <div id=\"content\">\n\t\t\t\t\t\t                <div class=\"h1bgUserEdit\"><h1>EDIT MY INFO</h1></div>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <form id=\"changeName\" class=\"change\" name=\"changeName\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                        <label>NAME</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField loadData name\" type=\"text\" name=\"userName\" required=\"\">\n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input id=\"name\" class=\"button\" type=\"button\" value=\"CHANGE NAME\"></div>\n\t\t\t\t\t\t                </form>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <form id=\"changeEmail\" class=\"change\" name=\"changeEmail\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                        <label>EMAIL</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField loadData email\" type=\"email\" name=\"userMail\" required=\"\">\n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input id=\"email\" class=\"button\" type=\"button\" value=\"CHANGE E-MAIL\"></div>\n\t\t\t\t\t\t                </form>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <form id=\"changePassword\" class=\"change\" name=\"changePassword\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                \t\t<p>\n\t\t\t\t\t\t                        <label>PASSWORD</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField\" type=\"password\" placeholder=\"Enter new password\" name=\"userPassword\" required=\"\"><br>\n\t\t\t\t\t\t                        </p>  \n\t\t\t\t\t\t                        <br>\n\t\t\t\t\t\t                        <label>CONFIRM PASSWORD</label><br>\n\t\t\t\t\t\t                        <input class=\"inputField\" type=\"password\" placeholder=\"Repeat new password\" name=\"userPasswordAgain\" required=\"\"> \n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input id=\"password\" class=\"button\" type=\"button\" value=\"CHANGE PASSWORD\"></div>\n\t\t\t\t\t\t                </form>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                 <form id=\"changeAboutMe\" class=\"change\" name=\"changeAboutMe\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                        <label>ABOUT ME</label><br>\n\t\t\t\t\t\t                        <textarea class=\"inputField loadData\" type=\"text\" name=\"userAboutme\" required=\"\" ></textarea>\n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input id=\"aboutMe\" class=\"button\" type=\"button\" value=\"CHANGE ABOUT ME\"></div>\n\t\t\t\t\t\t               \t </form>\n\t\t\t\t\t\t               \t \n\t\t\t\t\t\t               \t <form id=\"changeMyInspiration\" class=\"change\" name=\"changeMyInpiration\" class=\"handledAjaxForm\">\n\t\t\t\t\t\t                        <label>MY INSPIRATION</label><br>\n\t\t\t\t\t\t                        <textarea class=\"inputField loadData\" type=\"text\" name=\"userMyInspiration\" required=\"\"></textarea>\n\t\t\t\t\t\t                        <div class=\"buttonFrameContainer\"><input id=\"myInspiration\" class=\"button\" type=\"button\" value=\"CHANGE MY INSPIRATION\"></div>\n\t\t\t\t\t\t               \t </form>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t                <div class=\"currPicDiv\"><img src=\"\" alt=\"CurrentPicture\" id=\"currentPicture\" class=\"currentUserPicture\"></div>\n\t\t\t\t\t\t                <div class=\"buttonFrameContainer\" id=\"pictureHandling\">\n\t\t\t\t\t\t                <input class=\"button ajaxFormTrigger userPicture\" type=\"button\" id=\"changePictureButton\" value=\"CHANGE PICTURE\"><br>\n\t\t\t\t\t\t\t\t</div>         \n\t\t\t\t\t\t                <div class=\"closeFancyBox\"><input onclick=\"vex.close();\"  class=\"button\" type=\"button\" value=\"CLOSE\"></div>\n\t\t\t\t\t\t                \n\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t        </div>\n\t\t\t\t\t\t    </div>\n\t\t\t\t\t\t</div>"
                    });
                    jQuery('#changeName input:text').attr("value", self.details[0]['name']);
                    jQuery('#changeEmail .inputField').attr("value", self.details[0]['email']);
                    jQuery('#changeAboutMe textarea').text(self.details[0]['aboutMe']);
                    jQuery('#changeMyInspiration textarea').text(self.details[0]['myInspiration']);
                    jQuery('.change input:button').on('click', function (event) {
                        var id = jQuery(this).attr('id');
                        var value;
                        /*if(id == 'password'){
                            var fields = jQuery(this).parent().parent().find('.inputField');
                            if(fields[0].val() != fields[1].val()){
                                wrongPassword = true;
                            }else{
                                value = fields[0].val();
                            }
                        }else{
                            value = jQuery(this).parent().parent().find('.inputField').val();
                        }*/
                        if (value != self.details[0][id]) {
                            self.changeValues(id, value);
                        }
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
                        inputs: ['details'],
                        templateUrl: "app/html/editBar/editBar.html",
                        styles: ['a {cursor: pointer}'],
                        providers: [editBar_service_1.EditBarService, authentication_service_1.AuthenticationService, profile_service_1.ProfileService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_2.Router, router_1.RouteParams, authentication_service_1.AuthenticationService, editBar_service_1.EditBarService])
                ], EditBarComponent);
                return EditBarComponent;
            }());
            exports_1("EditBarComponent", EditBarComponent);
        }
    }
});
//# sourceMappingURL=editBar.component.js.map