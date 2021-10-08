"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["copyToClipboard"] = {
    init: (element, valueAccessor) => {
        const copyToClipboard = () => {
            const placeholder = document.createElement("textarea");
            placeholder.innerText = ko.unwrap(valueAccessor());
            document.body.appendChild(placeholder);
            const range = document.createRange();
            range.selectNode(placeholder);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
            selection.removeAllRanges();
            document.body.removeChild(placeholder);
        };
        ko.applyBindingsToNode(element, { click: copyToClipboard }, null);
    }
};
//# sourceMappingURL=copyToClipboard.js.map