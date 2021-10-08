"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, innerError) {
        super();
        this.message = message;
        this.innerError = innerError;
        Object.setPrototypeOf(this, AppError.prototype);
    }
    toString() {
        return `${this.stack} `;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map