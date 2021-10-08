"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templates = void 0;
const curl = require("./curl.liquid");
const csharp = require("./csharp.liquid");
const http = require("./http.liquid");
const java = require("./java.liquid");
const javascript = require("./javascript.liquid");
const php = require("./php.liquid");
const objc = require("./objc.liquid");
const python = require("./python.liquid");
const ruby = require("./ruby.liquid");
const ws_wscat = require("./ws_wscat.liquid");
const ws_csharp = require("./ws_csharp.liquid");
const ws_javascript = require("./ws_javascript.liquid");
exports.templates = {
    curl: curl.default,
    csharp: csharp.default,
    http: http.default,
    java: java.default,
    javascript: javascript.default,
    php: php.default,
    objc: objc.default,
    python: python.default,
    ruby: ruby.default,
    ws_wscat: ws_wscat.default,
    ws_csharp: ws_csharp.default,
    ws_javascript: ws_javascript.default,
};
//# sourceMappingURL=templates.js.map