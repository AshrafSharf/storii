System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isLoggedin() {
        return !!localStorage.getItem('token');
    }
    exports_1("isLoggedin", isLoggedin);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=is-loggedin.js.map