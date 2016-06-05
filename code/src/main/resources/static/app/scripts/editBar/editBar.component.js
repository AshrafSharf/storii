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
                    this.onAdded = new core_1.EventEmitter();
                    this.onAppend = new core_1.EventEmitter();
                    this.onDeleted = new core_1.EventEmitter();
                    this.onDeleteBranch = new core_1.EventEmitter();
                    this.onSwapNode = new core_1.EventEmitter();
                    this.onSwapBranch = new core_1.EventEmitter();
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
                    this.storyid = this._routeParams.get('id');
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
                EditBarComponent.prototype.changeValues = function (key, value) {
                    var _this = this;
                    this._editBarService.updateValues(key, value, this.details[0]['id'])
                        .subscribe(function (update) {
                        _this.update = update;
                        vex.close();
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
                EditBarComponent.prototype.openVex = function () {
                    var self = this;
                    vex.open({
                        showCloseButton: true,
                        content: "<div id=\"userEditPage\">\n                            <div class=\"userEditFrameContainer\">\n                                <div class=\"userEditContainer\">\n                                    <div id=\"content\">\n                                        <div class=\"h1bgUserEdit\"><h1>EDIT MY INFO</h1></div>\n                                        \n                                        <form id=\"changeName\" class=\"change\" name=\"changeName\" class=\"handledAjaxForm\">\n                                                <label>NAME</label><br>\n                                                <input class=\"inputField loadData name\" type=\"text\" name=\"userName\" required=\"\">\n                                                <div class=\"buttonFrameContainer\"><input id=\"name\" class=\"button\" type=\"button\" value=\"CHANGE NAME\"></div>\n                                        </form>\n                                        \n                                        <form id=\"changeEmail\" class=\"change\" name=\"changeEmail\" class=\"handledAjaxForm\">\n                                                <label>EMAIL</label><br>\n                                                <input class=\"inputField loadData email\" type=\"email\" name=\"userMail\" required=\"\">\n                                                <div class=\"buttonFrameContainer\"><input id=\"email\" class=\"button\" type=\"button\" value=\"CHANGE E-MAIL\"></div>\n                                        </form>\n                                        \n                                        <form id=\"changePassword\" class=\"change\" name=\"changePassword\" class=\"handledAjaxForm\">\n                                                <p>\n                                                <label>PASSWORD</label><br>\n                                                <input class=\"inputField\" type=\"password\" placeholder=\"Enter new password\" name=\"userPassword\" required=\"\"><br>\n                                                </p>  \n                                                <br>\n                                                <label class=\"confirm\">CONFIRM PASSWORD</label><br>\n                                                <input class=\"inputField\" type=\"password\" placeholder=\"Repeat new password\" name=\"userPasswordAgain\" required=\"\"> \n                                                <div class=\"buttonFrameContainer\"><input id=\"password\" class=\"button\" type=\"button\" value=\"CHANGE PASSWORD\"></div>\n                                        </form>\n                                        \n                                         <form id=\"changeAboutMe\" class=\"change\" name=\"changeAboutMe\" class=\"handledAjaxForm\">\n                                                <label>ABOUT ME</label><br>\n                                                <textarea class=\"inputField loadData\" type=\"text\" name=\"userAboutme\" required=\"\" ></textarea>\n                                                <div class=\"buttonFrameContainer\"><input id=\"aboutMe\" class=\"button\" type=\"button\" value=\"CHANGE ABOUT ME\"></div>\n                                         </form>\n                                         \n                                         <form id=\"changeMyInspiration\" class=\"change\" name=\"changeMyInpiration\" class=\"handledAjaxForm\">\n                                                <label>MY INSPIRATION</label><br>\n                                                <textarea class=\"inputField loadData\" type=\"text\" name=\"userMyInspiration\" required=\"\"></textarea>\n                                                <div class=\"buttonFrameContainer\"><input id=\"myInspiration\" class=\"button\" type=\"button\" value=\"CHANGE MY INSPIRATION\"></div>\n                                         </form>\n                                        \n                                        <div class=\"currPicDiv\"><img src=\"\" alt=\"CurrentPicture\" id=\"currentPicture\" class=\"currentUserPicture\"></div>\n                                        <div class=\"buttonFrameContainer\" id=\"pictureHandling\">\n                                        <input class=\"button ajaxFormTrigger userPicture\" type=\"button\" id=\"changePictureButton\" value=\"CHANGE PICTURE\"><br>\n                                </div>         \n                                        <div class=\"closeFancyBox\"><input onclick=\"vex.close();\"  class=\"button\" type=\"button\" value=\"CLOSE\"></div>\n                                        \n                                    </div>\n                                </div>\n                            </div>\n                        </div>"
                    });
                    jQuery('#changeName input:text').attr("value", self.details[0]['name']);
                    jQuery('#changeEmail .inputField').attr("value", self.details[0]['email']);
                    jQuery('#changeAboutMe textarea').text(self.details[0]['aboutMe']);
                    jQuery('#changeMyInspiration textarea').text(self.details[0]['myInspiration']);
                    jQuery('.change input:button').on('click', function (event) {
                        var id = jQuery(this).attr('id');
                        var value;
                        if (id == 'password') {
                            var field1 = jQuery(this).parent().parent().find('.inputField').first().val();
                            var field2 = jQuery(this).parent().parent().find('.inputField').last().val();
                            console.log(field1);
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
                                self.changeValues(id, value);
                            }
                        }
                        else {
                            value = jQuery(this).parent().parent().find('.inputField').val();
                            if (value != self.details[0][id]) {
                                self.changeValues(id, value);
                            }
                        }
                    });
                };
                EditBarComponent.prototype.openPageEditor = function () {
                    var _this = this;
                    this._editBarService.getPageById(this.actualPage['id'])
                        .subscribe(function (actualPage) {
                        _this.actualPage = actualPage;
                        var self = _this;
                        vex.open({
                            showCloseButton: true,
                            content: "<div class=\"pageEditorFrameContainer\"><div class=\"h1bgPageEditor\"><h1>PAGE-EDITOR</h1></div></div>\n                          <div id=\"links\">\n                             <a id=\"edit\" >EDIT</a>\n                             <a id=\"reset\" class=\"disableButton\">RESET</a>           \n                            </div>\n                            <!--<textarea id=\"saved-data\" cols=\"100\" rows=\"20\" readonly=\"readonly\"></textarea>-->\n                        \n                            <div class=\"sidebar\">\n                                <div>\n                                    <div class=\"widgets\" id=\"imageWidget\">\n                                        <div class=\"image grid-stack-item\"><button class=\"delete hidden\">X</button><div class=\"grid-stack-item-content\">ADD IMAGE</div></div>\n                                    </div>\n                                    <div class=\"widgets\" id=\"textWidget\">\n                                        <div class=\"text grid-stack-item\"><button class=\"delete hidden\">X</button><div class=\"grid-stack-item-content\">ADD TEXT</div></div>\n                                    </div>\n                                    <div class=\"widgets\" id=\"linkWidget\">\n                                        <div class=\"link grid-stack-item\"><button class=\"delete hidden\">X</button><div class=\"grid-stack-item-content\"><div><a href=\"#\">ADD LINK</a></div></div></div>\n                                    </div>\n                                        <div class=\"trash\"><div>DELETE</div></div>\n                                </div>\n                            </div>       \n                           <div id=\"outer\">\n                                        <div class=\"grid-stack\" id=\"inner\">\n                                        </div>\n                        </div>\n                        \n                        </div>"
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
                        float: true,
                        staticGrid: true,
                        removable: '.trash',
                        removeTimeout: 100,
                        acceptWidgets: '.grid-stack-item'
                    };
                    var gridStack = jQuery('.grid-stack');
                    var makeEditable;
                    gridStack.gridstack(options);
                    new function () {
                        this.images = [
                            { x: 3, y: 1, width: 6, height: 6 }
                        ];
                        this.texts = [
                            { x: 3, y: 0, width: 6, height: 1, content: "defaultTitle" },
                            { x: 3, y: 7, width: 6, height: 2, content: "defaultText" }
                        ];
                        this.links = [];
                        /*this.links = [
                            {x: 2, y: 9, width: 4, height: 1, content:"default"},
                            {x: 6, y: 9, width: 4, height: 1, content:"default"},
                            {x: 2, y: 10, width: 4, height: 1, content:"default"},
                            {x: 6, y: 10, width: 4, height: 1, content:"default"}
                        ];*/
                        var grid = jQuery('#inner').data('gridstack');
                        var editButton = jQuery('#edit');
                        var resetButton = jQuery('#reset');
                        this.newTextWidget = function () {
                            var el = '<div class="text grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content">ADD TEXT</div></div>';
                            jQuery('#textWidget').append(el);
                            jQuery('#textWidget .text').draggable({
                                revert: 'invalid',
                                handle: '.grid-stack-item-content',
                                scroll: false,
                                appendTo: '#inner'
                            });
                            jQuery('#textWidget .text').on('remove', this.newTextWidget);
                        }.bind(this);
                        this.newLinkWidget = function () {
                            var el = '<div class="link grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">ADD LINK</a></div></div></div>';
                            jQuery('#linkWidget').append(el);
                            jQuery('#linkWidget .link').draggable({
                                revert: 'invalid',
                                handle: '.grid-stack-item-content',
                                scroll: false,
                                appendTo: '#inner'
                            });
                            jQuery('#linkWidget .link').on('remove', this.newLinkWidget);
                        }.bind(this);
                        makeEditable = function () {
                            jQuery('.grid-stack .delete').on('click', this.deleteWidget);
                            jQuery('.grid-stack .delete').each(function () {
                                if (jQuery('.grid-stack .delete').hasClass('hidden')) {
                                    jQuery(this).removeClass('hidden');
                                }
                            });
                            jQuery('.grid-stack .text .grid-stack-item-content').each(function () {
                                if (jQuery(this).find('textarea').length == 0) {
                                    var t = jQuery(this).text();
                                    jQuery(this).text('');
                                    jQuery(this).append('<textarea>' + t + '</textarea>');
                                }
                            });
                            jQuery('.grid-stack .link .grid-stack-item-content div:first-of-type').each(function () {
                                if (jQuery(this).find('input').length == 0) {
                                    var l = jQuery(this).text();
                                    jQuery(this).find('a').addClass('hidden');
                                    jQuery(this).append('<input type="text" value="' + l + '">');
                                }
                            });
                        }.bind(this);
                        this.edit = function () {
                            jQuery('.sidebar').slideToggle('fast');
                            if (editButton.text() == 'EDIT') {
                                makeEditable();
                                jQuery('#inner').data('gridstack').setStatic(false);
                                resetButton.removeClass('disableButton');
                                editButton.text('SAVE');
                            }
                            else if (editButton.text() == 'SAVE') {
                                jQuery('.grid-stack .delete').addClass('hidden');
                                resetButton.addClass('disableButton');
                                jQuery('.grid-stack .text .grid-stack-item-content textarea').each(function () {
                                    var t = jQuery(this).val();
                                    jQuery(this).parent().text(t);
                                    jQuery(this).remove();
                                });
                                jQuery('.grid-stack .link .grid-stack-item-content input').each(function () {
                                    var l = jQuery(this).val();
                                    jQuery(this).parent().find('a').text(l);
                                    jQuery(this).parent().find('a').removeClass('hidden');
                                    jQuery(this).remove();
                                });
                                this.saveGrid();
                                jQuery('#inner').data('gridstack').setStatic(true);
                                editButton.text('EDIT');
                            }
                            return false;
                        }.bind(this);
                        this.deleteWidget = function (e) {
                            grid.remove_widget(e.currentTarget.offsetParent);
                        }.bind(this);
                        this.loadGrid = function () {
                            this.loadData();
                            this.clearGrid();
                            this.loadText();
                            this.loadImages();
                            this.loadLinks();
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
                                var deserializedContent = atob(self.actualPage['serializedContent']);
                                var object = JSON.parse(deserializedContent);
                                console.log(object);
                                this.images = object['images'];
                                this.texts = object['texts'];
                                this.links = object['links'];
                                this.setUpLinks();
                            }
                            else {
                                this.setUpLinks();
                            }
                        }.bind(this);
                        this.setUpLinks = function () {
                            if (self.actualPage['outgoingInternLinks'].length == 4) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default" },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default" },
                                    { x: 2, y: 10, width: 4, height: 1, content: "default" },
                                    { x: 6, y: 10, width: 4, height: 1, content: "default" }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 3) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default" },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default" },
                                    { x: 2, y: 10, width: 4, height: 1, content: "default" }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 2) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default" },
                                    { x: 6, y: 9, width: 4, height: 1, content: "default" }
                                ];
                            }
                            else if (self.actualPage['outgoingInternLinks'].length == 1) {
                                this.links = [
                                    { x: 2, y: 9, width: 4, height: 1, content: "default" }
                                ];
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
                            self._editBarService.saveData(this.images, this.texts, this.links, self.actualPage['id'])
                                .subscribe(function (update) {
                                console.log("saved");
                            }, function (error) { return self.errorMessage = error; });
                        }.bind(this);
                        this.loadImages = function () {
                            var images = GridStackUI.Utils.sort(this.images);
                            _.each(images, function (node) {
                                grid.addWidget(jQuery('<div class="image"><button class="delete hidden">X</button><div class="grid-stack-item-content"><img src=""><div/><div/>'), node.x, node.y, node.width, node.height);
                            }, this);
                            return false;
                        }.bind(this);
                        this.loadText = function () {
                            var texts = GridStackUI.Utils.sort(this.texts);
                            _.each(texts, function (node) {
                                grid.addWidget(jQuery('<div class="text"><button class="delete hidden">X</button><div class="grid-stack-item-content">' + node.content + '<div/><div/>'), node.x, node.y, node.width, node.height);
                            }, this);
                            return false;
                        }.bind(this);
                        this.loadLinks = function () {
                            var links = GridStackUI.Utils.sort(this.links);
                            _.each(links, function (node) {
                                grid.addWidget(jQuery('<div class="link"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">' + node.content + '</a></div><div/><div/>'), node.x, node.y, node.width, node.height);
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
                                    height: node.height
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
                                    content: el.find('.grid-stack-item-content').text()
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
                                    content: el.find('a').text()
                                };
                            }, this);
                            jQuery('#saved-data').val(jQuery('#saved-data').val() + JSON.stringify(this.links, null, '    '));
                            return false;
                        }.bind(this);
                        this.clearGrid = function () {
                            grid.removeAll();
                            return false;
                        }.bind(this);
                        jQuery('#save-grid').click(this.saveGrid);
                        jQuery('#reset').click(this.reloadGrid);
                        jQuery('#clear-grid').click(this.clearGrid);
                        editButton.click(this.edit);
                        jQuery('#textWidget .text').on('remove', this.newTextWidget);
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