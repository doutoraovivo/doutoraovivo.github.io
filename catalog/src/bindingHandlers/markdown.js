"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const remark = require("remark");
const html = require("remark-html");
const truncateHtml = require("truncate-html");
ko.bindingHandlers["markdown"] = {
    init: (element, valueAccessor) => {
        const config = ko.unwrap(valueAccessor());
        const htmlObservable = ko.observable();
        let markdown;
        let length;
        if (!config) {
            return;
        }
        if (typeof config === "string") {
            markdown = config;
        }
        else {
            markdown = config.source;
            length = config.truncateAt;
        }
        ko.applyBindingsToNode(element, { html: htmlObservable }, null);
        remark()
            .use(html)
            .process(markdown, (err, html) => {
            html = truncateHtml.default(html, { length: length, reserveLastWord: true });
            htmlObservable(html);
        });
    }
};
//# sourceMappingURL=markdown.js.map