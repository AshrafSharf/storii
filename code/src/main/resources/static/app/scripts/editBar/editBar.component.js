System.register(['angular2/core', 'angular2/router', '../login/authentication.service', '../profile/profile.service', './editBar.service', './hover', '../../headerfct'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, authentication_service_1, profile_service_1, editBar_service_1, hover_1, headerfct_1;
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
            function (hover_1_1) {
                hover_1 = hover_1_1;
            },
            function (headerfct_1_1) {
                headerfct_1 = headerfct_1_1;
            }],
        execute: function() {
            EditBarComponent = (function () {
                function EditBarComponent(_elRef, httpClient, _router, _routeParams, _authenticationService, _editBarService) {
                    var _this = this;
                    this._elRef = _elRef;
                    this.httpClient = httpClient;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this._authenticationService = _authenticationService;
                    this._editBarService = _editBarService;
                    this.editProfile = "Edit Profile";
                    this.editPages = "Edit Pages";
                    this.editPage = "Edit Page";
                    this.editStory = "Edit Story";
                    this.addDelete = "Add/Delete";
                    this.addPage = "Add new page";
                    this.delete = "Delete";
                    this.deletePage = "Delete Page";
                    this.deleteBranch = "Delete Branch";
                    this.actions = "Actions";
                    this.swapNode = "Swap node";
                    this.swapBranch = "Swap branch";
                    this.append = "Append";
                    this.mobile = false;
                    this.onAdded = new core_1.EventEmitter();
                    this.onAppend = new core_1.EventEmitter();
                    this.onDeleted = new core_1.EventEmitter();
                    this.onDeleteBranch = new core_1.EventEmitter();
                    this.onSwapNode = new core_1.EventEmitter();
                    this.onSwapBranch = new core_1.EventEmitter();
                    this.onEditing = new core_1.EventEmitter();
                    this.loggedIn = _authenticationService.isLoggedIn();
                    this.name = this._routeParams.get('name');
                    this.storyid = this._routeParams.get('id');
                    this.storyName = this._routeParams.get('storyName');
                    this.data = {};
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
                EditBarComponent.prototype.gotoStory = function () {
                    this._router.navigate(['About', { name: this.name, storyName: this.storyName, id: this.storyid }]);
                };
                EditBarComponent.prototype.startSwapNode = function (swapNode) {
                    this.onSwapNode.emit(swapNode);
                };
                EditBarComponent.prototype.startSwapBranch = function (swap) {
                    this.onSwapBranch.emit(swap);
                };
                EditBarComponent.prototype.startAppend = function (append) {
                    this.onAppend.emit(append);
                };
                EditBarComponent.prototype.addNewNode = function (newNode) {
                    this.onAdded.emit(newNode);
                };
                EditBarComponent.prototype.deleteNode = function (deleteNode) {
                    this.onDeleted.emit(deleteNode);
                };
                EditBarComponent.prototype.startDeleteBranch = function (deleteNode) {
                    this.onDeleteBranch.emit(deleteNode);
                };
                EditBarComponent.prototype.goToNodeEditor = function () {
                    this._router.navigate(['NodeEditor', { name: this.name, storyName: this.details[0]['name'], id: this.storyid }]);
                };
                EditBarComponent.prototype.invert = function (element) {
                    jQuery('.' + element['nextElementSibling']['className']).slideToggle('fast');
                    var arrow = jQuery('.' + element['className']).find('i');
                    var classes = arrow.attr('class');
                    if (classes == 'fa fa-angle-up') {
                        arrow.removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
                    }
                    else if (classes == 'fa fa-angle-down') {
                        arrow.removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
                    }
                };
                EditBarComponent.prototype.changeUserValues = function (key, value) {
                    var _this = this;
                    this._editBarService.updateUserValues(key, value, this.details[0]['id'])
                        .subscribe(function (update) {
                        _this.update = update;
                        jQuery('.' + key).append('<span class="updated">SAVED</span>');
                        if (key == 'name') {
                            var getToken = _this.httpClient.getTokenSplitted();
                            var pw = getToken[1];
                            _this.httpClient.changeUserNameInToken(value, pw);
                            _this._router.navigate(['Profile', { name: value }]);
                        }
                        else if (key == 'password') {
                            //here send sinnlos get request!
                            _this._authenticationService.resetUser()
                                .subscribe(function (result) {
                                var getToken = _this.httpClient.getTokenSplitted();
                                var user = getToken[0];
                                _this.httpClient.changePasswordInToken(user, value);
                            });
                        }
                        else {
                            _this.details[0][key] = value;
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                EditBarComponent.prototype.publishStory = function (key, value) {
                    var _this = this;
                    this._editBarService.publishStory(this.details[0]['id'])
                        .subscribe(function (update) {
                        _this.update = update;
                        jQuery('.' + key).append('<span class="updated">SAVED</span>');
                        _this.details[0][key] = value;
                    }, function (error) { return _this.errorMessage = error; });
                };
                EditBarComponent.prototype.unpublishStory = function (key, value) {
                    var _this = this;
                    this._editBarService.unpublishStory(this.details[0]['id'])
                        .subscribe(function (update) {
                        _this.update = update;
                        jQuery('.' + key).append('<span class="updated">SAVED</span>');
                        _this.details[0][key] = value;
                    }, function (error) { return _this.errorMessage = error; });
                };
                EditBarComponent.prototype.changeStoryValues = function (key, value) {
                    var _this = this;
                    this._editBarService.updateStoryValues(key, value, this.details[0]['id'])
                        .subscribe(function (update) {
                        _this.update = update;
                        jQuery('.' + key).append('<span class="updated">SAVED</span>');
                        _this.details[0][key] = value;
                        if (key == 'name') {
                            _this._router.navigate(['About', { name: _this.name, storyName: value, id: _this.storyid }]);
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                EditBarComponent.prototype.openVex = function () {
                    var self = this;
                    vex.open({
                        showCloseButton: true,
                        content: "<div id=\"userEditPage\">\n                            <div class=\"userEditFrameContainer\">\n                                <div class=\"userEditContainer\">\n                                    <div id=\"content\">\n                                        <div class=\"h1bgUserEdit\"><h1>EDIT MY INFO</h1></div>\n                                        \n                                        <form id=\"changeName\" class=\"change\" name=\"changeName\" class=\"handledAjaxForm\">\n                                                <label class=\"name\">NAME</label><br>\n                                                <input id=\"name\" class=\"inputField saveData name\" type=\"text\" name=\"userName\" required=\"\">\n                                                <!--<div class=\"buttonFrameContainer\"><input id=\"name\" class=\"button\" type=\"button\" value=\"CHANGE NAME\"></div>-->\n                                        </form>\n                                        \n                                        <form id=\"changeEmail\" class=\"change\" name=\"changeEmail\" class=\"handledAjaxForm\">\n                                                <label class=\"email\">EMAIL</label><br>\n                                                <input id=\"email\" class=\"inputField saveData email\" type=\"email\" name=\"userMail\" required=\"\">\n                                                 <!--<div class=\"buttonFrameContainer\"><input id=\"email\" class=\"button\" type=\"button\" value=\"CHANGE E-MAIL\"></div>-->\n                                        </form>\n                                        \n                                        <form id=\"changePassword\" class=\"change\" name=\"changePassword\" class=\"handledAjaxForm\">\n                                                <p>\n                                                <label class=\"password\">PASSWORD</label><br>\n                                                <input id=\"password\" class=\"inputField\" type=\"password\" placeholder=\"Enter new password\" name=\"userPassword\" required=\"\"><br>\n                                                </p>  \n                                                <br>\n                                                <label class=\"confirm\">CONFIRM PASSWORD</label><br>\n                                                <input id=\"password\" class=\"inputField saveData\" type=\"password\" placeholder=\"Repeat new password\" name=\"userPasswordAgain\" required=\"\"> \n                                                 <!--<div class=\"buttonFrameContainer\"><input id=\"password\" class=\"button\" type=\"button\" value=\"CHANGE PASSWORD\"></div>-->\n                                        </form>\n                                        \n                                         <form id=\"changeAboutMe\" class=\"change\" name=\"changeAboutMe\" class=\"handledAjaxForm\">\n                                                <label class=\"aboutMe\">ABOUT ME</label><br>\n                                                <textarea id=\"aboutMe\" class=\"inputField saveData\" type=\"text\" name=\"userAboutme\" required=\"\" ></textarea>\n                                                 <!--<div class=\"buttonFrameContainer\"><input id=\"aboutMe\" class=\"button\" type=\"button\" value=\"CHANGE ABOUT ME\"></div>-->\n                                         </form>\n                                         \n                                         <form id=\"changeMyInspiration\" class=\"change\" name=\"changeMyInpiration\" class=\"handledAjaxForm\">\n                                                <label class=\"myInspiration\">MY INSPIRATION</label><br>\n                                                <textarea id=\"myInspiration\" class=\"inputField saveData\" type=\"text\" name=\"userMyInspiration\" required=\"\"></textarea>\n                                                 <!--<div class=\"buttonFrameContainer\"><input id=\"myInspiration\" class=\"button\" type=\"button\" value=\"CHANGE MY INSPIRATION\"></div>-->\n                                         </form>\n                                        \n                                        <div class=\"currPicDiv preview-md\"><img src=\"\" alt=\"CurrentPicture\" id=\"currentPicture\" class=\"currentUserPicture\"></div>\n                                        <div class=\"buttonFrameContainer\" id=\"pictureHandling\">\n                                        <input class=\"button ajaxFormTrigger userPicture\" type=\"button\" id=\"changePictureButton\" value=\"CHANGE PICTURE\"><br>\n                                        \n                                        </div>  \n       \n                                        <div class=\"closeFancyBox\"><input onclick=\"vex.close();\"  class=\"button\" type=\"button\" value=\"CLOSE\"></div>\n                                        \n                                    </div>\n                                </div>\n                            </div>\n                        </div>"
                    });
                    jQuery('#changeName input:text').attr("value", self.details[0]['name']);
                    jQuery('#changeEmail .inputField').attr("value", self.details[0]['email']);
                    jQuery('#changeAboutMe textarea').text(self.details[0]['aboutMe']);
                    jQuery('#changeMyInspiration textarea').text(self.details[0]['myInspiration']);
                    if (self.details[0]['setUserImage'] != undefined) {
                        jQuery('#currentPicture').attr('src', '/attachmentUI/getImage/' + self.details[0]['setUserImage']['path'] + '/small');
                    }
                    else {
                        jQuery('#currentPicture').attr('src', 'app/assets/files/dummyProfile.jpg');
                    }
                    jQuery('#changePictureButton').click(function () {
                        if (jQuery('#pictureHandling').find('#image').length == 0) {
                            var oldPic = jQuery('#currentPicture').attr('src');
                            jQuery('#pictureHandling').append('<div><input id="upload" type="file"><img id="image" src=""><div class="close inline">X </div> <div class="crop inline"> CROP</div></div>');
                            jQuery('#image').css('max-width', '100%');
                            jQuery('.currPicDiv').css('overflow', 'hidden');
                            jQuery("#upload").change(function () {
                                self.readURL(this);
                                jQuery("#upload").addClass('hidden');
                            });
                            jQuery('.close').click(function () {
                                jQuery('#upload').parent().remove();
                                jQuery('.currPicDiv img').remove();
                                jQuery('.currPicDiv').removeAttr('style');
                                jQuery('.currPicDiv').append('<img src="" alt="CurrentPicture" id="currentPicture" class="currentUserPicture">');
                                jQuery('#currentPicture').attr('src', oldPic);
                            });
                        }
                    });
                    jQuery('.saveData').on('focus', function (event) {
                        jQuery('.updated').remove();
                    });
                    jQuery('.saveData').on('focusout', function (event) {
                        var id = jQuery(this).attr('id');
                        var value;
                        if (id == 'password') {
                            var field1 = jQuery(this).parent().find('.inputField').first().val();
                            var field2 = jQuery(this).parent().find('.inputField').last().val();
                            if (field1 != field2) {
                                if (!this.notTheSamePW) {
                                    jQuery('.confirm').append('<div class="errorPW">Passwords are not equal</div>');
                                    this.notTheSamePW = true;
                                }
                            }
                            else {
                                jQuery('.errorPW').remove();
                                this.notTheSamePW = false;
                                value = field1;
                                self.changeUserValues(id, value);
                            }
                        }
                        else {
                            value = jQuery(this).parent().find('.inputField').val();
                            if (value != self.details[0][id]) {
                                self.changeUserValues(id, value);
                            }
                        }
                    });
                };
                EditBarComponent.prototype.readURL = function (input) {
                    var self = this;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        var f = input.files[0];
                        reader.onload = function (e) {
                            var image = document.getElementById('image');
                            if (jQuery('#image').attr('src') != "") {
                            }
                            var Cropper = window.Cropper;
                            jQuery('#image').attr('src', e.target.result);
                            //cropperImage.cropper('destroy').removeAttr('src');
                            console.log(image);
                            var cropper = new Cropper(image, {
                                aspectRatio: 1 / 1,
                                preview: '.currPicDiv',
                                build: function (e) {
                                    console.log(e.type);
                                },
                                built: function (e) {
                                    console.log(e.type);
                                },
                                cropstart: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                cropmove: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                cropend: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                crop: function (e) {
                                    var data = e.detail;
                                    console.log(e.type);
                                },
                                zoom: function (e) {
                                    console.log(e.type, e.detail.ratio);
                                }
                            });
                            jQuery('.crop').click(function () {
                                /*  cropper.getCroppedCanvas();
              
                                  cropper.getCroppedCanvas({
                                    width: 160,
                                    height: 90
                                  });*/
                                // Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`
                                cropper.getCroppedCanvas().toBlob(function (blob) {
                                    console.log(blob);
                                    var formData = new FormData();
                                    formData.append('uploadfile', blob);
                                    var name = f.name.split(".")[0];
                                    formData.append('name', name);
                                    var ajax = new XMLHttpRequest();
                                    if (ajax != null) {
                                        var string = localStorage.getItem("auth_token");
                                        var url = "/attachmentUI/addUserImage";
                                        ajax.open('POST', url, true);
                                        ajax.setRequestHeader("enctype", "multipart/form-data");
                                        ajax.setRequestHeader('Authorization', string);
                                        ajax.onreadystatechange = function () {
                                            if (this.readyState == 4) {
                                                if (this.status == 200) {
                                                    // jQuery('#image').cropper('destroy');
                                                    jQuery('#upload').parent().remove();
                                                    var myArr = JSON.parse(ajax.responseText);
                                                    console.log(myArr);
                                                    self._editBarService.setPic(myArr['data']['img_id'])
                                                        .subscribe(function (done) {
                                                    }, function (error) { return self.errorMessage = error; });
                                                    jQuery('.currPicDiv img').remove();
                                                    jQuery('.currPicDiv').removeAttr('style');
                                                    jQuery('.currPicDiv').append('<img src="" alt="CurrentPicture" id="currentPicture" class="currentUserPicture">');
                                                    jQuery('#currentPicture').attr('src', '/attachmentUI/getImage/' + myArr['data']['img_path'] + '/small');
                                                    var img = [];
                                                    img['path'] = myArr['data']['img_path'];
                                                    self.details[0]['setUserImage'] = img;
                                                    console.log(self.details[0]['setUserImage']);
                                                }
                                                else {
                                                    console.log(this.statusText);
                                                }
                                            }
                                        };
                                        ajax.send(formData);
                                    }
                                    else {
                                        alert("Ihr Browser unterstützt kein Ajax!");
                                    }
                                    // self._editBarService.uploadFile(formData);
                                });
                            });
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                };
                EditBarComponent.prototype.openStoryEditor = function () {
                    var self = this;
                    vex.open({
                        showCloseButton: true,
                        content: "<div id=\"userEditPage\">\n                            <div class=\"userEditFrameContainer\">\n                                <div class=\"userEditContainer\">\n                                    <div id=\"content\">\n                                        <div class=\"h1bgUserEdit\"><h1>EDIT STORY</h1></div>\n                                        \n                                        <form id=\"changeTitle\" class=\"change\" name=\"changeTitle\" class=\"handledAjaxForm\">\n                                                <label class=\"name\">TITLE</label><br>\n                                                <input id=\"name\" class=\"inputField saveData\" type=\"text\" name=\"title\" required=\"\">\n                                                <!--<div class=\"buttonFrameContainer\"><input id=\"title\" class=\"button\" type=\"button\" value=\"CHANGE TITLE\"></div>-->\n                                        </form>\n                                        \n                                        <form id=\"changeAuthor\" class=\"change\" name=\"changeAuthor\" class=\"handledAjaxForm\">\n                                                <label class=\"authorName\">AUTHOR</label><br>\n                                                <input id=\"authorName\" class=\"inputField saveData\" type=\"text\" name=\"author\" required=\"\">\n                                                <!--<div class=\"buttonFrameContainer\"><input id=\"author\" class=\"button\" type=\"button\" value=\"CHANGE AUTHOR\"></div>-->\n                                        </form>\n\n                                        <form id=\"changeCoAuthor\" class=\"change\" name=\"changeCoAuthor\" class=\"handledAjaxForm\">\n                                                <label class=\"coAuthorName\">CO-AUTHOR</label><br>\n                                                <input id=\"coAuthorName\" class=\"inputField saveData\" type=\"text\" name=\"coAuthor\" required=\"\">\n                                                <!--<div class=\"buttonFrameContainer\"><input id=\"coAuthor\" class=\"button\" type=\"button\" value=\"CHANGE CO-AUTHOR\"></div>-->\n                                        </form>\n\n                                         <form id=\"changeDescription\" class=\"change\" name=\"changeDescription\" class=\"handledAjaxForm\">\n                                                <label class=\"description\">SHORT DESCRIPTION</label><br>\n                                                <textarea id=\"description\" class=\"inputField saveData\" type=\"text\" name=\"description\" required=\"\" ></textarea>\n                                                <!--<div class=\"buttonFrameContainer\"><input id=\"description\" class=\"button\" type=\"button\" value=\"CHANGE DESCRIPTION\"></div>-->\n                                         </form>\n\n                                         <form id=\"changePublished\" class=\"change\" name=\"changePublished\" class=\"handledAjaxForm\">\n                                                <label class=\"published\">PUBLISHED</label>\n                                                <input class=\"saveData\" id=\"published\" name=\"isPublished\" type=\"checkbox\">\n                                         </form>\n\n                                        <div class=\"currPicDiv preview-md\"><img src=\"\" alt=\"CurrentPicture\" id=\"currentPicture\" class=\"currentStoryPicture\"></div>\n                                         <div class=\"buttonFrameContainer\" id=\"pictureHandling\">\n                                         <input class=\"button ajaxFormTrigger userStoryPicture\" type=\"button\" id=\"changeStoryPictureButton\" value=\"CHANGE PICTURE\"><br>                                       \n                                       \n                                </div>         \n                                        <div class=\"closeFancyBox\"><input onclick=\"vex.close();\"  class=\"button\" type=\"button\" value=\"CLOSE\"></div>\n                                        \n                                    </div>\n                                </div>\n                            </div>\n                        </div>"
                    });
                    jQuery('#userEditPage .userEditFrameContainer').css('background-color', '#D3E2D8');
                    jQuery('#userEditPage .h1bgUserEdit').css('background-color', '#D3E2D8');
                    jQuery('#userEditPage .userEditContainer').css('background-color', '#D3E2D8');
                    jQuery('#userEditPage .buttonFrameContainer').css('background', '#879D8E');
                    jQuery('#userEditPage input.button').css('background', '#879D8E');
                    jQuery('#changeTitle .inputField').attr("value", self.details[0]['name']);
                    jQuery('#changeAuthor .inputField').attr("value", self.details[0]['authorName']);
                    jQuery('#changeCoAuthor .inputField').attr("value", self.details[0]['coAuthorName']);
                    jQuery('#changeDescription textarea').text(self.details[0]['description']);
                    jQuery('#changePublished #published').prop("checked", self.details[0]['published']);
                    if (self.details[0]['setStoryImage'] != undefined) {
                        jQuery('#currentPicture').attr('src', '/attachmentUI/getImage/' + self.details[0]['setStoryImage']['path'] + '/small');
                    }
                    else {
                        jQuery('#currentPicture').attr('src', 'app/assets/files/dummyStory.jpg');
                    }
                    jQuery('#changeStoryPictureButton').click(function () {
                        if (jQuery('#pictureHandling').find('#image').length == 0) {
                            var oldPic = jQuery('#currentPicture').attr('src');
                            jQuery('#pictureHandling').append('<div><input id="upload" type="file"><img id="image" src=""><div class="close inline">X </div> <div class="crop inline"> CROP</div></div>');
                            jQuery('#image').css('max-width', '100%');
                            jQuery('.currPicDiv').css('overflow', 'hidden');
                            jQuery("#upload").change(function () {
                                self.readStoryPicURL(this);
                                jQuery("#upload").addClass('hidden');
                            });
                            jQuery('.close').click(function () {
                                jQuery('#upload').parent().remove();
                                jQuery('.currPicDiv img').remove();
                                jQuery('.currPicDiv').removeAttr('style');
                                jQuery('.currPicDiv').append('<img src="" alt="CurrentPicture" id="currentPicture" class="currentStoryPicture">');
                                jQuery('#currentPicture').attr('src', oldPic);
                            });
                        }
                    });
                    jQuery('.saveData').on('focus', function (event) {
                        jQuery('.updated').remove();
                    });
                    jQuery('.saveData').on('focusout', function (event) {
                        var id = jQuery(this).attr('id');
                        var value;
                        value = jQuery(this).parent().find('.inputField').val();
                        if (id == "published") {
                            value = jQuery(this).is(':checked');
                            if (value) {
                                self.publishStory(id, value);
                            }
                            else {
                                self.unpublishStory(id, value);
                            }
                        }
                        else {
                            if (value != self.details[0][id]) {
                                self.changeStoryValues(id, value);
                            }
                        }
                    });
                };
                EditBarComponent.prototype.readStoryPicURL = function (input) {
                    var self = this;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        var f = input.files[0];
                        reader.onload = function (e) {
                            var image = document.getElementById('image');
                            jQuery('#image').attr('src', e.target.result);
                            var Cropper = window.Cropper;
                            var cropper = new Cropper(image, {
                                aspectRatio: 1 / 1,
                                preview: '.currPicDiv',
                                build: function (e) {
                                    console.log(e.type);
                                },
                                built: function (e) {
                                    console.log(e.type);
                                },
                                cropstart: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                cropmove: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                cropend: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                crop: function (e) {
                                    var data = e.detail;
                                    console.log(e.type);
                                },
                                zoom: function (e) {
                                    console.log(e.type, e.detail.ratio);
                                }
                            });
                            jQuery('.crop').click(function () {
                                /*  cropper.getCroppedCanvas();
              
                                  cropper.getCroppedCanvas({
                                    width: 160,
                                    height: 90
                                  });*/
                                // Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`
                                cropper.getCroppedCanvas().toBlob(function (blob) {
                                    console.log(blob);
                                    var formData = new FormData();
                                    formData.append('uploadfile', blob);
                                    var name = f.name.split(".")[0];
                                    formData.append('name', name);
                                    var ajax = new XMLHttpRequest();
                                    if (ajax != null) {
                                        var string = localStorage.getItem("auth_token");
                                        var url = "/attachmentUI/addStoryImage/" + self.storyid;
                                        console.log(url);
                                        ajax.open('POST', url, true);
                                        ajax.setRequestHeader("enctype", "multipart/form-data");
                                        ajax.setRequestHeader('Authorization', string);
                                        ajax.onreadystatechange = function () {
                                            if (this.readyState == 4) {
                                                console.log(url);
                                                if (this.status == 200) {
                                                    jQuery('#upload').parent().remove();
                                                    var myArr = JSON.parse(ajax.responseText);
                                                    self._editBarService.setStoryPic(self.storyid, myArr['data']['img_id'])
                                                        .subscribe(function (done) {
                                                    }, function (error) { return self.errorMessage = error; });
                                                    jQuery('.currPicDiv img').remove();
                                                    jQuery('.currPicDiv').removeAttr('style');
                                                    jQuery('.currPicDiv').append('<img src="" alt="CurrentPicture" id="currentPicture" class="currentStoryPicture">');
                                                    jQuery('#currentPicture').attr('src', '/attachmentUI/getImage/' + myArr['data']['img_path'] + '/small');
                                                    var img = [];
                                                    img['path'] = myArr['data']['img_path'];
                                                    self.details[0]['setStoryImage'] = img;
                                                    console.log(self.details[0]['setStoryImage']);
                                                }
                                                else {
                                                    console.log(this.statusText);
                                                }
                                            }
                                        };
                                        ajax.send(formData);
                                    }
                                    else {
                                        alert("Your browser doesn't support AJAX!");
                                    }
                                    // self._editBarService.uploadFile(formData);
                                });
                            });
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                };
                EditBarComponent.prototype.readPagePicURL = function (input, parentDiv) {
                    var self = this;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        var f = input.files[0];
                        reader.onload = function (e) {
                            var id = parentDiv.find('.img').attr('id');
                            var image = document.getElementById(id);
                            parentDiv.find('.img').attr('src', e.target.result);
                            var Cropper = window.Cropper;
                            var cropper = new Cropper(image, {
                                aspectRatio: NaN,
                                preview: '#' + parentDiv.find('.currPicDiv').attr('id'),
                                build: function (e) {
                                    console.log(e.type);
                                },
                                built: function (e) {
                                    console.log(e.type);
                                },
                                cropstart: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                cropmove: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                cropend: function (e) {
                                    console.log(e.type, e.detail.action);
                                },
                                crop: function (e) {
                                    var data = e.detail;
                                    console.log(e.type);
                                },
                                zoom: function (e) {
                                    console.log(e.type, e.detail.ratio);
                                }
                            });
                            jQuery('.crop').click(function () {
                                /*  cropper.getCroppedCanvas();
              
                                  cropper.getCroppedCanvas({
                                    width: 160,
                                    height: 90
                                  });*/
                                // Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`
                                cropper.getCroppedCanvas().toBlob(function (blob) {
                                    console.log(blob);
                                    var formData = new FormData();
                                    formData.append('uploadfile', blob);
                                    var name = f.name.split(".")[0];
                                    formData.append('name', name);
                                    var ajax = new XMLHttpRequest();
                                    if (ajax != null) {
                                        var string = localStorage.getItem("auth_token");
                                        var url = "/attachmentUI/addPageImage/" + self.actualPage['id'];
                                        ajax.open('POST', url, true);
                                        ajax.setRequestHeader("enctype", "multipart/form-data");
                                        ajax.setRequestHeader('Authorization', string);
                                        ajax.onreadystatechange = function () {
                                            if (this.readyState == 4) {
                                                if (this.status == 200) {
                                                    parentDiv.find('.upload').parent().remove();
                                                    var myArr = JSON.parse(ajax.responseText);
                                                    console.log(parentDiv.parent());
                                                    parentDiv.parent().find('.savedPic').removeClass('hidden');
                                                    parentDiv.parent().find('.savedPic').attr('src', '/attachmentUI/getImage/' + myArr['data']['img_path'] + '/small');
                                                }
                                                else {
                                                    console.log(this.statusText);
                                                }
                                            }
                                        };
                                        console.log("JJJJJJJ");
                                        ajax.send(formData);
                                    }
                                    else {
                                        alert("Your browser doesn't support AJAX!");
                                    }
                                    // self._editBarService.uploadFile(formData);
                                });
                            });
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                };
                EditBarComponent.prototype.openPageEditor = function (editing) {
                    var _this = this;
                    this.onEditing.emit(editing);
                    this._editBarService.getPageById(this.actualPage['id'])
                        .subscribe(function (actualPage) {
                        _this.actualPage = actualPage;
                        _this.savePage = actualPage;
                        var self = _this;
                        vex.open({
                            showCloseButton: true,
                            content: "<div class=\"pageEditorFrameContainer\"><div class=\"h1bgPageEditor\"><h1>PAGE-EDITOR</h1></div></div>\n                          <div id=\"links\">\n                            <div class=\"center\" id=\"editBar\">\n                             <div id=\"edit\" class=\"buttonFrameContainerUserStoryContentModule\"><div class=\"buttonSizeDelete\"><a class=\"buttonLookLink\"  >EDIT</a></div></div>\n                             <div id=\"floatUp\" class=\"disableButton buttonFrameContainerUserStoryContentModule\"><div class=\"buttonSizeDelete\"><a class=\"buttonLookLink\" >FLOAT UP</a></div></div>\n                             <div id=\"reset\" class=\"disableButton buttonFrameContainerUserStoryContentModule\"><div class=\"buttonSizeDelete\"><a class=\"buttonLookLink\" >RESET</a></div></div>\n                            </div>          \n                          </div>\n                            <!--<textarea id=\"saved-data\" cols=\"100\" rows=\"20\" readonly=\"readonly\"></textarea>-->\n                        \n                            <div class=\"sidebar\">\n                                <div>\n                                    <div class=\"widgets\" id=\"imageWidget\">\n                                        <div class=\"image grid-stack-item\"><button class=\"delete hidden\">X</button><div class=\"grid-stack-item-content\"><img class=\"savedPic hidden\" src=\"app/assets/files/not-available.png\"><span>ADD IMAGE</span><div/></div></div>\n                                    </div>\n                                    <div class=\"widgets\" id=\"textWidget\">\n                                        <div class=\"text grid-stack-item\"><button class=\"delete hidden\">X</button>\n                                         <div class=\"fontsize\"><button class=\"font hidden\"></button>\n\n                                            <select class=\"hidden size\" name=\"size\" size=\"5\"> \n                                            <option selected disabled>Font Size</option>\n                                            <option>12</option> \n                                            <option>18</option> \n                                            <option>20</option> \n                                            <option>25</option> \n                                            <option>30</option>\n                                            <option>50</option> \n                                            <option>70</option> \n                                            <option>90</option> \n                                            <option>110</option>\n                                            <option>130</option> \n                                            <option>150</option> \n                                            <option>170</option> \n                                            <option>190</option> \n                                            <option>210</option>  \n                                            </select> \n                        \n                                         </div>\n                                        <div style=\"font-size:18px;\" class=\"grid-stack-item-content\">ADD TEXT</div></div>\n                                    </div>\n                                    <div class=\"widgets\" id=\"linkWidget\">\n                                        <div class=\"link grid-stack-item disableButton\"><button class=\"delete hidden\">X</button><div class=\"grid-stack-item-content\"><div><a href=\"#\">EXTERN LINK</a></div></div></div>\n                                    </div>\n                                        <!--<div class=\"trash\"><div>DELETE</div></div>-->\n                                </div>\n                            </div>       \n                           <div id=\"outer\">\n                                        <div class=\"grid-stack\" id=\"inner\">\n                                        </div>\n                        </div>\n                        \n                        </div>",
                            afterClose: function () {
                                self.onEditing.emit(false);
                                self.actualPage = self.savePage;
                            }
                        });
                        _this.loadPageEditor();
                        jQuery('.vex.vex-theme-os .vex-content').css('width', '100%');
                        jQuery('.vex.vex-theme-os .vex-content').css('padding', '10px');
                        jQuery('.vex.vex-theme-os .vex-content').css('background', 'white');
                        jQuery('.vex.vex-theme-os .vex-content').css('box-shadow', 'unset');
                    }, function (error) { return _this.errorMessage = error; });
                };
                EditBarComponent.prototype.loadPageEditor = function () {
                    var self = this;
                    var options = {
                        float: false,
                        staticGrid: true,
                        removable: '.trash',
                        removeTimeout: 100,
                        acceptWidgets: '.grid-stack-item'
                    };
                    var gridStack = jQuery('.grid-stack');
                    var makeEditable;
                    gridStack.gridstack(options);
                    var editing = false;
                    new function () {
                        this.texts = [];
                        this.images = [];
                        this.links = [];
                        this.externLinks = [];
                        var self2 = this;
                        var grid = jQuery('#inner').data('gridstack');
                        var editButton = jQuery('#edit');
                        var resetButton = jQuery('#reset');
                        var floatUp = jQuery('#floatUp');
                        this.newImageWidget = function () {
                            var el = '<div class="image grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content"><img class="savedPic hidden" src="app/assets/files/not-available.png">ADD IMAGE<div/></div></div>';
                            grid.locked(el, true);
                            jQuery('#imageWidget').append(el);
                            jQuery('#imageWidget .image').draggable({
                                revert: 'invalid',
                                locked: true,
                                handle: '.grid-stack-item-content',
                                scroll: false,
                                appendTo: '#inner'
                            });
                            jQuery('#imageWidget .image').on('remove', this.newImageWidget);
                        }.bind(this);
                        this.newTextWidget = function () {
                            var el = "<div class=\"text grid-stack-item\"><button class=\"delete hidden\">X</button>\n             <div class=\"fontsize\"><button class=\"font hidden\"></button>\n\n                    <select class=\"hidden size\" name=\"size\" size=\"5\"> \n                    <option selected disabled>Font Size</option>\n                    <option>12</option> \n                    <option>18</option> \n                    <option>20</option> \n                    <option>25</option> \n                    <option>30</option>\n                    <option>50</option> \n                    <option>70</option> \n                    <option>90</option> \n                    <option>110</option>  \n                    <option>130</option> \n                    <option>150</option> \n                    <option>170</option> \n                    <option>190</option> \n                    <option>210</option> \n                    </select> \n\n            </div>\n            <div style=\"font-size:18px;\" class=\"grid-stack-item-content\">ADD TEXT</div></div>";
                            grid.locked(el, true);
                            jQuery('#textWidget').append(el);
                            jQuery('#textWidget .text').draggable({
                                revert: 'invalid',
                                handle: '.grid-stack-item-content',
                                scroll: false,
                                locked: true,
                                appendTo: '#inner'
                            });
                            jQuery('#textWidget .text').on('remove', this.newTextWidget);
                        }.bind(this);
                        this.newLinkWidget = function () {
                            var el = '<div class="link grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">ADD LINK</a></div></div></div>';
                            grid.locked(el, true);
                            jQuery('#linkWidget').append(el);
                            jQuery('#linkWidget .link').draggable({
                                revert: 'invalid',
                                handle: '.grid-stack-item-content',
                                scroll: false,
                                locked: true,
                                appendTo: '#inner'
                            });
                            jQuery('#linkWidget .link').on('remove', this.newLinkWidget);
                        }.bind(this);
                        makeEditable = function () {
                            jQuery('.grid-stack .grid-stack-item-content').addClass('editingMode');
                            jQuery('.grid-stack .delete').on('click', this.deleteWidget);
                            jQuery('.grid-stack .font').off('click').on('click', function () {
                                var fontDiv = jQuery(this);
                                if (jQuery(this).attr('data-selecting') == 'false' || !jQuery(this).attr('data-selecting')) {
                                    fontDiv.parent().find('.size').removeClass('hidden');
                                    fontDiv.parent().find('option').each(function () {
                                        jQuery(this).off('click').on('click', function () {
                                            fontDiv.parent().parent().find('.grid-stack-item-content textarea').attr('style', 'font-size:' + jQuery(this).val() + 'px;');
                                            fontDiv.parent().parent().find('.grid-stack-item-content').attr('style', 'font-size:' + jQuery(this).val() + 'px;');
                                        });
                                    });
                                    jQuery(this).attr('data-selecting', 'true');
                                }
                                else {
                                    fontDiv.parent().find('.size').addClass('hidden');
                                    jQuery(this).attr('data-selecting', 'false');
                                }
                                console.log(jQuery(this).attr('data-selecting'));
                            });
                            jQuery('.grid-stack .grid-stack-item').mouseover(function (e) {
                                if (jQuery(this).find('.delete').hasClass('hidden') && editing) {
                                    jQuery(this).find('.delete').removeClass('hidden');
                                }
                                if (jQuery(this).find('.font').hasClass('hidden') && editing) {
                                    jQuery(this).find('.font').removeClass('hidden');
                                    if (jQuery(this).find('.font').attr('data-selecting') == 'true') {
                                        jQuery(this).find('.size').removeClass('hidden');
                                    }
                                }
                            });
                            jQuery('.grid-stack .grid-stack-item').mouseleave(function (e) {
                                if (!jQuery(this).find('.delete').hasClass('hidden') && editing) {
                                    jQuery(this).find('.delete').addClass('hidden');
                                }
                                if (!jQuery(this).find('.font').hasClass('hidden') && editing) {
                                    jQuery(this).find('.font').addClass('hidden');
                                    jQuery(this).find('.size').addClass('hidden');
                                }
                            });
                            jQuery('.grid-stack .text .grid-stack-item-content').each(function () {
                                if (jQuery(this).find('textarea').length == 0) {
                                    var fontsize = jQuery(this).attr('style');
                                    var t = jQuery(this).text();
                                    jQuery(this).text('');
                                    jQuery(this).append('<textarea style="' + fontsize + '">' + t + '</textarea>');
                                }
                            });
                            jQuery('.grid-stack .image .grid-stack-item-content').each(function () {
                                jQuery(this).find('span').text('');
                                if (!jQuery(this).find('.savedPic').hasClass('hidden')) {
                                    jQuery(this).find('.savedPic').addClass('hidden');
                                }
                                if (jQuery(this).find('.changePageImage').length == 0) {
                                    var src = jQuery(this).find('.savedPic').attr('src');
                                    jQuery(this).append("\n                                <div class=\"changePageImage\"><div class=\"currPicDiv preview-md\" id=\"preview" + jQuery('#inner').find('.image').length + "\"><img src=\"" + src + "\" alt=\"CurrentPicture\"  class=\"currentPagePicture\"></div>\n                                <div class=\"buttonFrameContainer pictureHandling\">\n                                <input class=\"button ajaxFormTrigger userPicture changePagePictureButton\" type=\"button\" value=\"CHANGE PICTURE\"></div></div><br>\n                    ");
                                }
                            });
                            jQuery('.changePagePictureButton').click(function () {
                                var parentDiv = jQuery(this).parent().parent();
                                if (parentDiv.find('.img').length == 0) {
                                    var oldPic = parentDiv.find('.currentPagePicture').attr('src');
                                    parentDiv.find('.pictureHandling').append('<div><input class="upload" type="file"><img class="img" id="image' + jQuery('#inner').find('.image').length + '" src=""><div style="cursor:pointer;" class="close inline">X </div> <div style="cursor:pointer;" class="crop inline"> CROP</div></div>');
                                    parentDiv.find('.img').css('max-width', '100%');
                                    parentDiv.find('.currPicDiv > img').css('max-width', '100%');
                                    parentDiv.find('.currPicDiv').css('overflow', 'hidden');
                                    parentDiv.find(".upload").change(function () {
                                        console.log("click");
                                        self.readPagePicURL(this, parentDiv);
                                        parentDiv.find(".upload").addClass('hidden');
                                    });
                                    parentDiv.find(".close").click(function () {
                                        parentDiv.find(".upload").parent().remove();
                                        parentDiv.find('.currPicDiv img').remove();
                                        parentDiv.find('.currPicDiv').removeAttr('style');
                                        parentDiv.find('.currPicDiv').append('<img src="" alt="CurrentPicture"  class="currentPagePicture">');
                                        parentDiv.find('.currPicDiv').attr('src', oldPic);
                                    });
                                }
                            });
                            jQuery('.grid-stack .link .grid-stack-item-content div:first-of-type').each(function () {
                                if (jQuery(this).find('input').length == 0) {
                                    var l = jQuery(this).find('a').text();
                                    jQuery(this).find('a').addClass('hidden');
                                    jQuery(this).append('<input type="text" value="' + l + '">');
                                }
                            });
                        }.bind(this);
                        this.setUpArrays = function () {
                            this.images = [
                                { x: 3, y: 1, width: 6, height: 6, src: 'app/assets/files/not-available.png' }
                            ];
                            this.texts = [
                                { x: 3, y: 0, width: 6, height: 1, content: "defaultTitle" },
                                { x: 3, y: 7, width: 6, height: 2, content: "defaultText" }
                            ];
                            this.links = [];
                            this.externLinks = [];
                        };
                        this.edit = function () {
                            jQuery('.sidebar').slideToggle('fast');
                            if (editButton.text() == 'EDIT') {
                                editing = true;
                                makeEditable();
                                jQuery('#inner').data('gridstack').setStatic(false);
                                resetButton.removeClass('disableButton');
                                floatUp.removeClass('disableButton');
                                jQuery('.grid-stack-item-content').css('cursor', 'move');
                                jQuery('#edit .buttonLookLink').text('SAVE');
                                jQuery("#outer").animate({ backgroundColor: "#eeeeee" }, 'slow');
                            }
                            else if (editButton.text() == 'SAVE') {
                                editing = false;
                                jQuery('.grid-stack .delete').addClass('hidden');
                                jQuery('.grid-stack-item-content').css('cursor', 'default');
                                resetButton.addClass('disableButton');
                                floatUp.addClass('disableButton');
                                jQuery('.grid-stack .grid-stack-item-content').removeClass('editingMode');
                                jQuery('.grid-stack .text .grid-stack-item-content textarea').each(function () {
                                    var t = jQuery(this).val();
                                    jQuery(this).parent().text(t);
                                    jQuery(this).remove();
                                });
                                jQuery('.grid-stack .image .grid-stack-item-content').each(function () {
                                    /*var t = jQuery(this).val();
                                    jQuery(this).parent().text(t);*/
                                    jQuery(this).find('.savedPic').removeClass('hidden');
                                    jQuery('.changePageImage').remove();
                                });
                                jQuery('.grid-stack .link .grid-stack-item-content input').each(function () {
                                    var l = jQuery(this).val();
                                    jQuery(this).parent().find('a').text(l);
                                    jQuery(this).parent().find('a').removeClass('hidden');
                                    jQuery(this).remove();
                                });
                                this.saveGrid();
                                jQuery('#inner').data('gridstack').setStatic(true);
                                jQuery('#edit .buttonLookLink').text('EDIT');
                                jQuery("#outer").animate({ backgroundColor: "white" }, 'slow');
                            }
                            return false;
                        }.bind(this);
                        this.deleteWidget = function (e) {
                            grid.removeWidget(e.currentTarget.offsetParent);
                        }.bind(this);
                        this.loadGrid = function () {
                            this.loadData();
                            this.clearGrid();
                            this.loadText();
                            this.loadImages();
                            this.loadLinks();
                            jQuery('.link').on('click', function () {
                                if (!editing) {
                                    self2.loadNextPage(jQuery(this).find('span').text());
                                }
                            });
                            return false;
                        }.bind(this);
                        this.reloadGrid = function () {
                            this.loadData();
                            this.clearGrid();
                            this.loadText();
                            this.loadImages();
                            this.loadLinks();
                            makeEditable();
                            return false;
                        }.bind(this);
                        this.loadData = function () {
                            if (self.actualPage['serializedContent'] != '') {
                                self.actualPage['outgoingInternLinks'].sort(function (a, b) {
                                    return parseFloat(a.id) - parseFloat(b.id);
                                });
                                var deserializedContent = atob(self.actualPage['serializedContent']);
                                var object = JSON.parse(deserializedContent);
                                this.images = object['images'];
                                this.texts = object['texts'];
                                this.links = object['links'];
                                //if new link was added
                                if (this.links.length < self.actualPage['outgoingInternLinks'].length) {
                                    if (this.links.length == 0) {
                                        this.setUpLinks();
                                    }
                                    else if (this.links.length == 1) {
                                        if (self.actualPage['outgoingInternLinks'].length >= 2) {
                                            this.links.push({ x: 6, y: 9, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][1]['nextPage'] });
                                        }
                                        if (self.actualPage['outgoingInternLinks'].length >= 3) {
                                            this.links.push({ x: 2, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][2]['nextPage'] });
                                        }
                                        if (self.actualPage['outgoingInternLinks'].length == 4) {
                                            this.links.push({ x: 6, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage'] });
                                        }
                                    }
                                    else if (this.links.length == 2) {
                                        if (self.actualPage['outgoingInternLinks'].length >= 3) {
                                            this.links.push({ x: 2, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][2]['nextPage'] });
                                        }
                                        if (self.actualPage['outgoingInternLinks'].length == 4) {
                                            this.links.push({ x: 6, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage'] });
                                        }
                                    }
                                    else if (this.links.length == 3) {
                                        if (self.actualPage['outgoingInternLinks'].length == 4) {
                                            this.links.push({ x: 6, y: 10, width: 4, height: 1, content: 'default', id: self.actualPage['outgoingInternLinks'][3]['nextPage'] });
                                        }
                                    }
                                }
                                else if (this.links.length > self.actualPage['outgoingInternLinks'].length) {
                                    if (self.actualPage['outgoingInternLinks'].length == 0) {
                                        this.links = [];
                                    }
                                    else {
                                        for (var i = 0; i < this.links.length; i++) {
                                            if (!this.contained(this.links[i]['id'])) {
                                                this.links.splice(i, 1);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                this.setUpArrays();
                                this.setUpLinks();
                            }
                        }.bind(this);
                        this.contained = function (id) {
                            var found = false;
                            for (var i = 0; i < self.actualPage['outgoingInternLinks'].length; i++) {
                                if (id == self.actualPage['outgoingInternLinks'][i]['nextPage']) {
                                    found = true;
                                }
                            }
                            return found;
                        }.bind(this);
                        this.loadNextPage = function (id) {
                            self._editBarService.getPageById(id)
                                .subscribe(function (actualPage) {
                                self.actualPage = actualPage;
                                self2.loadGrid();
                            }, function (error) { return self.errorMessage = error; });
                        }.bind(this);
                        this.setUpLinks = function () {
                            if (self.actualPage['outgoingInternLinks'].length == 4) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][1]['nextPage'] },
                                    { x: 2, y: 10, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][2]['nextPage'] },
                                    { x: 6, y: 10, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][3]['nextPage'] }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 3) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][1]['nextPage'] },
                                    { x: 2, y: 10, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][2]['nextPage'] }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 2) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][1]['nextPage'] }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 1) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default", id: self.actualPage['outgoingInternLinks'][0]['nextPage'] }
                                ];
                            }
                            else {
                                this.links = [];
                            }
                        }.bind(this);
                        this.saveGrid = function () {
                            this.saveImages();
                            this.saveTexts();
                            this.saveLinks();
                            this.save();
                            return false;
                        }.bind(this);
                        this.save = function () {
                            self._editBarService.saveData(this.images, this.texts, this.links, self.actualPage)
                                .subscribe(function (update) {
                            }, function (error) { return self.errorMessage = error; });
                        }.bind(this);
                        this.loadImages = function () {
                            var images = GridStackUI.Utils.sort(this.images);
                            _.each(images, function (node) {
                                var el = grid.addWidget(jQuery('<div class="image"><button class="delete hidden">X</button><div class="grid-stack-item-content"><img class="savedPic" src="' + node.src + '"><div/><div/>'), node.x, node.y, node.width, node.height);
                                grid.locked(el, true);
                                grid.move(el, node.x, node.y);
                            }, this);
                            return false;
                        }.bind(this);
                        this.loadText = function () {
                            var texts = GridStackUI.Utils.sort(this.texts);
                            var i = 0;
                            _.each(texts, function (node) {
                                if (i == 0) {
                                    var el = grid.addWidget(jQuery("\n                    <div class=\"text\"> \n                    <div class=\"fontsize\"><button class=\"font fontTitle hidden\"></button>\n\n                    <select class=\"hidden size sizeTitle\" name=\"size\" size=\"5\"> \n                    <option selected disabled>Font Size</option>\n                    <option>12</option> \n                    <option>18</option> \n                    <option>20</option> \n                    <option>25</option> \n                    <option>30</option>\n                    <option>50</option> \n                    <option>70</option> \n                    <option>90</option> \n                    <option>110</option>\n                    <option>130</option> \n                    <option>150</option> \n                    <option>170</option> \n                    <option>190</option> \n                    <option>210</option>  \n                    </select> \n\n                   </div><div style=\"" + node.fontsize + "\" class=\"grid-stack-item-content\">" + node.content + "<div/><div/>"), node.x, node.y, node.width, node.height);
                                    grid.locked(el, true);
                                    grid.move(el, node.x, node.y);
                                }
                                else if (node.content != "") {
                                    var el = grid.addWidget(jQuery("<div class=\"text\">\n                     <button class=\"delete hidden\">X</button>\n                     <div class=\"fontsize\"><button class=\"font hidden\"></button>\n                \n                    <select class=\"hidden size\" name=\"size\" size=\"5\"> \n                    <option selected disabled>Font Size</option>\n                    <option>12</option> \n                    <option>18</option> \n                    <option>20</option> \n                    <option>25</option> \n                    <option>30</option>\n                    <option>50</option> \n                    <option>70</option> \n                    <option>90</option> \n                    <option>110</option>\n                    <option>130</option> \n                    <option>150</option> \n                    <option>170</option> \n                    <option>190</option> \n                    <option>210</option>  \n                    </select> \n\n                    </div>\n                    <div style=\"" + node.fontsize + "\" class=\"grid-stack-item-content\">" + node.content + "<div/><div/>"), node.x, node.y, node.width, node.height);
                                    grid.locked(el, true);
                                    grid.move(el, node.x, node.y);
                                }
                                i++;
                            }, this);
                            return false;
                        }.bind(this);
                        this.loadLinks = function () {
                            var links = GridStackUI.Utils.sort(this.links);
                            _.each(links, function (node) {
                                var el = grid.addWidget(jQuery('<div class="link"><!--<button class="delete hidden">X</button>--><div class="grid-stack-item-content"><div><span style="display:none; visibility:hidden;">' + node.id + '</span><a>' + node.content + '</a></div><div/><div/>'), node.x, node.y, node.width, node.height);
                                grid.locked(el, true);
                                grid.move(el, node.x, node.y);
                            }, this);
                            return false;
                        }.bind(this);
                        this.saveImages = function () {
                            this.images = _.map(jQuery('.grid-stack > .image:visible'), function (el) {
                                el = jQuery(el);
                                var node = el.data('_gridstack_node');
                                return {
                                    x: node.x,
                                    y: node.y,
                                    width: node.width,
                                    height: node.height,
                                    src: el.find('.grid-stack-item-content img').attr('src')
                                };
                            }, this);
                            jQuery('#saved-data').val(JSON.stringify(this.images, null, '    '));
                            return false;
                        }.bind(this);
                        this.saveTexts = function () {
                            this.texts = _.map(jQuery('.grid-stack > .text:visible'), function (el) {
                                el = jQuery(el);
                                var node = el.data('_gridstack_node');
                                return {
                                    x: node.x,
                                    y: node.y,
                                    width: node.width,
                                    height: node.height,
                                    content: el.find('.grid-stack-item-content').text(),
                                    fontsize: el.find('.grid-stack-item-content').attr('style')
                                };
                            }, this);
                            jQuery('#saved-data').val(jQuery('#saved-data').val() + JSON.stringify(this.texts, null, '    '));
                            return false;
                        }.bind(this);
                        this.saveLinks = function () {
                            this.links = _.map(jQuery('.grid-stack > .link:visible'), function (el) {
                                el = jQuery(el);
                                var node = el.data('_gridstack_node');
                                return {
                                    x: node.x,
                                    y: node.y,
                                    width: node.width,
                                    height: node.height,
                                    content: el.find('a').text(),
                                    id: el.find('span').text()
                                };
                            }, this);
                            jQuery('#saved-data').val(jQuery('#saved-data').val() + JSON.stringify(this.links, null, '    '));
                            return false;
                        }.bind(this);
                        this.clearGrid = function () {
                            grid.removeAll();
                            return false;
                        }.bind(this);
                        this.floatUp = function () {
                            jQuery('.grid-stack-item').each(function () {
                                grid.locked((this), false);
                                grid.move((this), jQuery(this).attr('data-gs-x'), jQuery(this).attr('data-gs-y') - 1);
                            });
                        }.bind(this);
                        jQuery('#save-grid').click(this.saveGrid);
                        jQuery('#reset').click(this.reloadGrid);
                        jQuery('#clear-grid').click(this.clearGrid);
                        jQuery('#floatUp').click(this.floatUp);
                        //this.loadNextPage(jQuery(this).find('span').text())
                        editButton.click(this.edit);
                        jQuery('#textWidget .text').on('remove', this.newTextWidget);
                        jQuery('#imageWidget .image').on('remove', this.newImageWidget);
                        jQuery('#linkWidget .link').on('remove', this.newLinkWidget);
                        this.loadGrid();
                        jQuery('.sidebar .grid-stack-item').draggable({
                            revert: 'invalid',
                            handle: '.grid-stack-item-content',
                            scroll: false,
                            appendTo: '#inner'
                        });
                    };
                    //ausschaltn wenns nur geladen wird
                    gridStack.on('change', function () {
                        if (jQuery('#edit').text() == 'SAVE') {
                            makeEditable();
                        }
                    });
                };
                EditBarComponent.prototype.ngOnInit = function () {
                    if (document.getElementById("profilePage")) {
                        this.profilePage = true;
                    }
                    if (document.getElementById("userStoryPage")) {
                        this.aboutPage = true;
                        if (jQuery(window).width() <= 900) {
                            this.mobile = true;
                        }
                    }
                    if (document.getElementById("commentsStoryPage")) {
                        this.commentsStoryPage = true;
                    }
                    if (document.getElementById("nodeEditorPage")) {
                        this.nodeEditorPage = true;
                        this.addAllowed = this.details[0];
                        this.deleteAllowed = this.details[1];
                        this.moveAllowed = this.details[2];
                        this.actualPage = this.details[3];
                        var self_1 = this;
                        document.getElementById("wrapper").addEventListener('click', function (event) {
                            self_1.addAllowed = self_1.details[0];
                            self_1.deleteAllowed = self_1.details[1];
                            self_1.moveAllowed = self_1.details[2];
                            self_1.actualPage = self_1.details[3];
                        });
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditBarComponent.prototype, "onAdded", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditBarComponent.prototype, "onAppend", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditBarComponent.prototype, "onDeleted", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditBarComponent.prototype, "onDeleteBranch", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditBarComponent.prototype, "onSwapNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditBarComponent.prototype, "onSwapBranch", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EditBarComponent.prototype, "onEditing", void 0);
                EditBarComponent = __decorate([
                    core_1.Component({
                        selector: 'editBar',
                        inputs: ['details'],
                        templateUrl: "app/html/editBar/editBar.html",
                        directives: [hover_1.Hover],
                        styles: ['a {cursor: pointer}'],
                        providers: [editBar_service_1.EditBarService, authentication_service_1.AuthenticationService, profile_service_1.ProfileService, headerfct_1.HttpClient]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, headerfct_1.HttpClient, router_2.Router, router_1.RouteParams, authentication_service_1.AuthenticationService, editBar_service_1.EditBarService])
                ], EditBarComponent);
                return EditBarComponent;
            }());
            exports_1("EditBarComponent", EditBarComponent);
        }
    }
});
//# sourceMappingURL=editBar.component.js.map