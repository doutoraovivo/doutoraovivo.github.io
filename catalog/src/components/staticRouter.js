"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticRouter = void 0;
class StaticRouter {
    constructor() {
        this.currentUrl = "/";
        this.navigateTo = this.navigateTo.bind(this);
        this.getCurrentUrl = this.getCurrentUrl.bind(this);
        this.getCurrentUrlMetadata = this.getCurrentUrlMetadata.bind(this);
        this.callbacks = [];
    }
    addRouteChangeListener(callback) {
    }
    removeRouteChangeListener(callback) {
    }
    addHistoryUpdateListener(eventHandler) {
    }
    removeHistoryUpdateListener(eventHandler) {
    }
    updateHistory(url, title) {
    }
    navigateTo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentUrl = url;
            this.callbacks.forEach(callback => {
                callback();
            });
        });
    }
    getCurrentUrl() {
        return this.currentUrl;
    }
    getPath() {
        return this.currentUrl;
    }
    getHash() {
        return "";
    }
    getCurrentUrlMetadata() {
        return this.metadata;
    }
    getCurrentRoute() {
        return { path: this.currentUrl };
    }
}
exports.StaticRouter = StaticRouter;
//# sourceMappingURL=staticRouter.js.map