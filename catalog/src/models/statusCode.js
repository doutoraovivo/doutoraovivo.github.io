"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = void 0;
const knownStatusCodes_1 = require("../models/knownStatusCodes");
class StatusCode {
    constructor(code) {
        this.code = code;
        const knownStatusCode = knownStatusCodes_1.KnownStatusCodes.find(x => x.code.toString() === code.toString());
        if (knownStatusCode) {
            this.description = knownStatusCode.description;
        }
    }
    toString() {
        if (!this.description) {
            return `${this.code} User defined status code`;
        }
        return `${this.code} ${this.description}`;
    }
}
exports.StatusCode = StatusCode;
//# sourceMappingURL=statusCode.js.map