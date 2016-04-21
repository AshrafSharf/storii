System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Search;
    return {
        setters:[],
        execute: function() {
            Search = (function () {
                function Search(page_id, author_name, co_author_name, is_published, name, first_page_id, parent_user) {
                    this.page_id = page_id;
                    this.author_name = author_name;
                    this.co_author_name = co_author_name;
                    this.is_published = is_published;
                    this.name = name;
                    this.first_page_id = first_page_id;
                    this.parent_user = parent_user;
                }
                return Search;
            }());
            exports_1("Search", Search);
        }
    }
});
//# sourceMappingURL=search.js.map