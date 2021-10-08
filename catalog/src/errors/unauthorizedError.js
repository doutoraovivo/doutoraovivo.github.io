"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
class UnauthorizedError extends Error {
    constructor(message, innerError) {
        super();
        this.message = message;
        this.innerError = innerError;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    toString() {
        return `${this.stack} `;
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorizedError.js.map