"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handle = {
    onError: function (page) {
        page.on('error', function (err) {
            console.log(err);
        });
    }
};
exports.default = Handle;
