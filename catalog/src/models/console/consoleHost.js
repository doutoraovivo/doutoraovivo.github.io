"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleHost = void 0;
const ko = require("knockout");
class ConsoleHost {
    constructor() {
        this.hostname = ko.observable();
        this.wildcard = ko.observable();
    }
}
exports.ConsoleHost = ConsoleHost;
//# sourceMappingURL=consoleHost.js.map