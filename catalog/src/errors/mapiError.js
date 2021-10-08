"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapiError = void 0;
class MapiError extends Error {
    constructor(code, message, details) {
        super();
        this.code = code;
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, MapiError.prototype);
    }
    static fromResponse(response) {
        var _a, _b, _c;
        const responseObject = response.toObject();
        const code = ((_a = responseObject === null || responseObject === void 0 ? void 0 : responseObject.error) === null || _a === void 0 ? void 0 : _a.code) || "Error";
        const message = ((_b = responseObject === null || responseObject === void 0 ? void 0 : responseObject.error) === null || _b === void 0 ? void 0 : _b.message) || "Server error";
        const details = ((_c = responseObject === null || responseObject === void 0 ? void 0 : responseObject.error) === null || _c === void 0 ? void 0 : _c.details) || [];
        return new MapiError(code, message, details);
    }
    toString() {
        return `${this.code}: ${this.message}`;
    }
}
exports.MapiError = MapiError;
//# sourceMappingURL=mapiError.js.map