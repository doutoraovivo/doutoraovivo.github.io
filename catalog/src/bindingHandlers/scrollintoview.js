"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers["scrollintoview"] = {
    init: (element) => {
        element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
};
//# sourceMappingURL=scrollintoview.js.map