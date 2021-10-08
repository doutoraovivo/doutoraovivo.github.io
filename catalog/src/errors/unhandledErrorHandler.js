"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnhandledErrorHandler = void 0;
class UnhandledErrorHandler {
    constructor(logger) {
        this.logger = logger;
        window.addEventListener("error", this.handlerError.bind(this), true);
        window.addEventListener("unhandledrejection", this.handlerPromiseRejection.bind(this), true);
    }
    handlerError(event) {
        this.logger.trackError(event.error);
    }
    handlerPromiseRejection(event) {
        this.logger.trackError(event.reason);
    }
}
exports.UnhandledErrorHandler = UnhandledErrorHandler;
//# sourceMappingURL=unhandledErrorHandler.js.map