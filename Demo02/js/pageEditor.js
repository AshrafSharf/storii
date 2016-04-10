$(function () {
    var options = {
        float:true,
        staticGrid:true,
        removable: '.trash',
        removeTimeout: 100,
        acceptWidgets: '.grid-stack-item'
    };
    var gridStack =   $('.grid-stack');
    var makeEditable;
    gridStack.gridstack(options);


    new function () {
        this.images = [
            {x: 3, y: 1, width: 6, height: 6}
        ];
        this.texts = [
            {x: 3, y: 0, width: 6, height: 1, content:"Enter your text"},
            {x: 3, y: 7, width: 6, height: 2, content:"Enter your text"}
        ];
        this.links = [
            {x: 2, y: 9, width: 4, height: 1, content:"Enter your link-text"},
            {x: 6, y: 9, width: 4, height: 1, content:"Enter your link-text"},
            {x: 2, y: 10, width: 4, height: 1, content:"Enter your link-text"},
            {x: 6, y: 10, width: 4, height: 1, content:"Enter your link-text"}
        ];

        var grid = $('#inner').data('gridstack');
        var editButton = $('#edit');

        this.newTextWidget = function(){
            var el = '<div class="text grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content">ADD TEXT</div></div>';
            $('#textWidget').append(el);
            $('#textWidget .text').draggable({
                revert: 'invalid',
                handle: '.grid-stack-item-content',
                scroll: false,
                appendTo: '#inner'
            });
            $('#textWidget .text').on('remove',this.newTextWidget);
        }.bind(this);

        this.newLinkWidget = function(){
            var el = '<div class="link grid-stack-item"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">ADD LINK</a></div></div></div>';
            $('#linkWidget').append(el);
            $('#linkWidget .link').draggable({
                revert: 'invalid',
                handle: '.grid-stack-item-content',
                scroll: false,
                appendTo: '#inner'
            });
            $('#linkWidget .link').on('remove',this.newLinkWidget);
        }.bind(this);

         makeEditable = function(){
             $('.grid-stack .delete').on('click',this.deleteWidget);
            $('.grid-stack .delete').each(function(){
                if($('.grid-stack .delete').hasClass('hidden')){

                    $(this).removeClass('hidden');
                }
            });
            $('.grid-stack .text .grid-stack-item-content').each(function() {
                if($(this).find('textarea').length == 0){
                    var t = $(this).text();
                    $(this).text('');
                    $(this).append('<textarea>'+t+'</textarea>');
                }
            });
            $('.grid-stack .link .grid-stack-item-content div:first-of-type').each(function() {
                if($(this).find('input').length == 0){
                    var l = $(this).text();
                    $(this).find('a').addClass('hidden');
                    $(this).append('<input type="text" value="'+l+'">');
                }
            });
        }.bind(this);


        this.edit = function(){
            $('.sidebar').slideToggle('fast');
            if(editButton.text() == 'Edit'){
                makeEditable();
                $('#inner').data('gridstack').setStatic(false);
                editButton.text('Save');
            }else if(editButton.text() == 'Save'){
                $('.grid-stack .delete').addClass('hidden');
                $('.grid-stack .text .grid-stack-item-content textarea').each(function() {
                    var t = $(this).val();
                    $(this).parent().text(t);
                    $(this).remove();
                });
                $('.grid-stack .link .grid-stack-item-content input').each(function() {
                    var l = $(this).val();
                    $(this).parent().find('a').text(l);
                    $(this).parent().find('a').removeClass('hidden');
                    $(this).remove();
                });
                this.saveGrid();

                    $('#inner').data('gridstack').setStatic(true);

                editButton.text('Edit');
            }
            return false;
        }.bind(this);


        this.deleteWidget = function (e) {
            grid.remove_widget(e.currentTarget.offsetParent);
        }.bind(this);



        this.loadGrid = function () {
            this.clearGrid();
            this.loadText();
            this.loadImages();
            this.loadLinks();
            return false;
        }.bind(this);

        this.loadImages = function () {
            var images = GridStackUI.Utils.sort(this.images);
            _.each(images, function (node) {
                grid.addWidget($('<div class="image"><button class="delete hidden">X</button><div class="grid-stack-item-content"><img src="Tulips.jpg"><div/><div/>'),
                    node.x, node.y, node.width, node.height);
            }, this);
            return false;
        }.bind(this);

        this.loadText = function () {
            var texts = GridStackUI.Utils.sort(this.texts);
            _.each(texts, function (node) {
                grid.addWidget($('<div class="text"><button class="delete hidden">X</button><div class="grid-stack-item-content">'+node.content+'<div/><div/>'),
                    node.x, node.y, node.width, node.height);
            }, this);
            return false;
        }.bind(this);

        this.loadLinks = function () {
            var links = GridStackUI.Utils.sort(this.links);
            _.each(links, function (node) {
                grid.addWidget($('<div class="link"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">'+node.content+'</a></div><div/><div/>'),
                    node.x, node.y, node.width, node.height);
            }, this);
            return false;
        }.bind(this);



        this.saveGrid = function () {
            this.saveImages();
            this.saveTexts();
            this.saveLinks();
            return false;
        }.bind(this);

        this.saveImages= function () {
            this.images = _.map($('.grid-stack > .image:visible'), function (el) {
                el = $(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height
                };
            }, this);
            $('#saved-data').val(JSON.stringify(this.images, null, '    '));
            return false;
        }.bind(this);

        this.saveTexts = function () {
            this.texts = _.map($('.grid-stack > .text:visible'), function (el) {
                el = $(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    content: el.find('.grid-stack-item-content').text()
                };
            }, this);
            $('#saved-data').val($('#saved-data').val()+JSON.stringify(this.texts, null, '    '));
            return false;
        }.bind(this);

        this.saveLinks = function () {
            this.links = _.map($('.grid-stack > .link:visible'), function (el) {
                el = $(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    content: el.find('a').text()
                };
            }, this);
            $('#saved-data').val( $('#saved-data').val()+JSON.stringify(this.links, null, '    '));
            return false;
        }.bind(this);


        this.clearGrid = function () {
            grid.removeAll();
            return false;
        }.bind(this);


        $('#save-grid').click(this.saveGrid);
        $('#load-grid').click(this.loadGrid);
        $('#clear-grid').click(this.clearGrid);
        editButton.click(this.edit);
        $('#textWidget .text').on('remove',this.newTextWidget);
        $('#linkWidget .link').on('remove',this.newLinkWidget);


            this.loadGrid();

            $('.sidebar .grid-stack-item').draggable({
                revert: 'invalid',
                handle: '.grid-stack-item-content',
                scroll: false,
                appendTo: '#inner'
            });


    };

    //ausschaltn wenns nur geladen wird

    gridStack.on('change',function(){
        if($('#edit').text() == 'Save'){
            makeEditable();
        }

    });
});
