"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExpirationErrorHandler = void 0;
class SessionExpirationErrorHandler {
    constructor(viewManager, eventManager) {
        this.viewManager = viewManager;
        eventManager.addEventListener("error", this.handlerError.bind(this));
        window.addEventListener("unhandledrejection", this.handlerPromiseRejection.bind(this), true);
    }
    handleSessionExpiration(error) {
        var _a;
        if (!((_a = error.message) === null || _a === void 0 ? void 0 : _a.includes("Unauthorized request."))) {
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        this.viewManager.hideToolboxes();
        this.viewManager.addToast("Session expired", `Please re-authenticate through Azure portal.`);
        this.viewManager.setShutter();
        return;
    }
    handlerError(event) {
        this.handleSessionExpiration(event.error);
    }
    handlerPromiseRejection(event) {
        this.handleSessionExpiration(event.reason);
    }
}
exports.SessionExpirationErrorHandler = SessionExpirationErrorHandler;
//# sourceMappingURL=sessionExpirationErrorHandler.js.map