"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.extenders.acceptChange = (target, condition) => {
    const result = ko.pureComputed({
        read: target,
        write: (newValue) => {
            if (!ko.unwrap(condition)) {
                return;
            }
            target(newValue);
        }
    });
    result(target());
    return result;
};
//# sourceMappingURL=acceptChange.js.map