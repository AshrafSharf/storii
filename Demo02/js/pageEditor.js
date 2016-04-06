$(function () {
    var options = {
        float:false,
        staticGrid:true,
        removable: '.trash',
        removeTimeout: 100,
        acceptWidgets: '.grid-stack-item'
    };
    $('.grid-stack').gridstack(options);

    new function () {
        this.images = [
            {x: 3, y: 1, width: 6, height: 6}
        ];
        this.texts = [
            {x: 3, y: 0, width: 6, height: 1},
            {x: 3, y: 7, width: 6, height: 2}
        ];
        this.links = [
            {x: 2, y: 9, width: 4, height: 1},
            {x: 6, y: 9, width: 4, height: 1},
            {x: 2, y: 10, width: 4, height: 1},
            {x: 6, y: 10, width: 4, height: 1}
        ];
        this.items = [
            {x: 0, y: 0, width: 2, height: 2},
            {x: 3, y: 1, width: 1, height: 2},
            {x: 4, y: 1, width: 1, height: 1},
            {x: 2, y: 3, width: 3, height: 1},
            {x: 2, y: 5, width: 1, height: 1}
        ];

        var grid = $('#inner').data('gridstack');


        this.edit = function(){

            if($('#edit').text() == 'Edit'){
                $('.grid-stack-item-content').addClass('grid-border');
                $('.delete').on('click',this.deleteWidget);
                $('.delete').removeClass('hidden');
                $('.text .grid-stack-item-content').each(function() {
                    var t = $(this).text();
                    $(this).text('');
                    $(this).append('<textarea>'+t+'</textarea>');
                });
                $('.link .grid-stack-item-content div:first-of-type').each(function() {
                    var l = $(this).text();
                    $(this).find('a').addClass('hidden');
                    $(this).append('<input type="text" value="'+l+'">');
                });

                    $('#inner').data('gridstack').setStatic(false);

                $('#edit').text('Save');
            }else if($('#edit').text() == 'Save'){
                $('.grid-stack-item-content').removeClass('grid-border');
                $('.delete').addClass('hidden');
                $('.text .grid-stack-item-content textarea').each(function() {
                    var t = $(this).val();
                    $(this).parent().text(t);
                    $(this).remove();
                });
                $('.link .grid-stack-item-content input').each(function() {
                    var l = $(this).val();
                    $(this).parent().find('a').text(l);
                    $(this).parent().find('a').removeClass('hidden');
                    $(this).remove();
                });
                this.saveGrid();

                    $('#inner').data('gridstack').setStatic(true);

                $('#edit').text('Edit');
            }
            return false;
        }.bind(this);

        this.addNewWidget = function () {
            var node = this.items.pop() || {
                    x: 12 * Math.random(),
                    y: 5 * Math.random(),
                    width: 1 + 3 * Math.random(),
                    height: 1 + 3 * Math.random()
                };
            grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                node.x, node.y, node.width, node.height);
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
                grid.addWidget($('<div class="text"><button class="delete hidden">X</button><div class="grid-stack-item-content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy ' +
                        'eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea ' +
                        'rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing ' +
                        'elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam' +
                        ' et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est ' +
                        'Lorem ipsum dolor sit amet.<div/><div/>'),
                    node.x, node.y, node.width, node.height);
            }, this);
            return false;
        }.bind(this);

        this.loadLinks = function () {
            var links = GridStackUI.Utils.sort(this.links);
            _.each(links, function (node) {
                grid.addWidget($('<div class="link"><button class="delete hidden">X</button><div class="grid-stack-item-content"><div><a href="#">LINK</a></div><div/><div/>'),
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
                    height: node.height
                };
            }, this);
            $('#saved-data').val(JSON.stringify(this.texts, null, '    '));
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
                    height: node.height
                };
            }, this);
            $('#saved-data').val(JSON.stringify(this.links, null, '    '));
            return false;
        }.bind(this);


        this.clearGrid = function () {
            grid.removeAll();
            return false;
        }.bind(this);

        $('#save-grid').click(this.saveGrid);
        $('#load-grid').click(this.loadGrid);
        $('#clear-grid').click(this.clearGrid);
        $('#edit').click(this.edit);
        $('#add-new-widget').click(this.addNewWidget);

        this.loadGrid();

        $('.sidebar .grid-stack-item').draggable({
            revert: 'invalid',
            handle: '.grid-stack-item-content',
            scroll: false,
            appendTo: '#inner'
        });

    };
});
