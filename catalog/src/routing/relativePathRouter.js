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
exports.RelativePathRouter = void 0;
const routing_1 = require("@paperbits/common/routing");
class RelativePathRouter {
    constructor(eventManager, routeGuards) {
        this.eventManager = eventManager;
        this.routeGuards = routeGuards;
        this.notifyListeners = true;
        this.basePath = "/admin";
        this.currentRoute = this.getRouteFromLocation();
    }
    getRouteFromLocation() {
        const path = "/" + location.pathname.substr(this.basePath.length + 1);
        const hash = location.hash.startsWith("#") ? location.hash.slice(1) : location.hash;
        const url = location.pathname + hash;
        const route = {
            url: url,
            path: path,
            metadata: {},
            hash: hash,
            previous: null
        };
        return route;
    }
    addRouteChangeListener(eventHandler) {
        this.eventManager.addEventListener(routing_1.RouterEvents.onRouteChange, eventHandler);
    }
    removeRouteChangeListener(eventHandler) {
        this.eventManager.removeEventListener(routing_1.RouterEvents.onRouteChange, eventHandler);
    }
    navigateTo(url, title = null, metadata = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!url) {
                return;
            }
            const isFullUrl = url && (url.startsWith("http://") || url.startsWith("https://"));
            const isLocalUrl = url.startsWith(location.origin);
            if (isFullUrl && !isLocalUrl) {
                window.open(url, "_blank");
                return;
            }
            url = isFullUrl
                ? url.substring(location.origin.length)
                : url;
            const parts = url.split("#");
            const route = {
                url: this.appendBasePath(url),
                path: parts.length > 1 ? parts[0] || location.pathname : parts[0],
                title: title,
                metadata: metadata,
                hash: parts.length > 1 ? parts[1] : "",
                previous: this.currentRoute
            };
            const canActivate = yield this.canActivate(route);
            if (canActivate) {
                this.currentRoute = route;
                if (this.notifyListeners) {
                    this.eventManager.dispatchEvent(routing_1.RouterEvents.onRouteChange, route);
                }
            }
        });
    }
    canActivate(route) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const routeGuard of this.routeGuards) {
                try {
                    const canActivate = yield routeGuard.canActivate(route);
                    if (!canActivate) {
                        return false;
                    }
                }
                catch (error) {
                    throw new Error(`Unable to invoke route a guard: ${error}`);
                    return false;
                }
            }
            return true;
        });
    }
    getCurrentUrl() {
        let permalink = this.currentRoute.path;
        const hash = this.getHash();
        if (this.currentRoute.hash) {
            permalink += "#" + hash;
        }
        return permalink;
    }
    getCurrentUrlMetadata() {
        return this.currentRoute.metadata;
    }
    getPath() {
        return this.currentRoute.path;
    }
    getHash() {
        return this.currentRoute.hash;
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    appendBasePath(url) {
        return url.startsWith("/") ? this.basePath + url : this.basePath + "/" + url;
    }
    addHistoryUpdateListener(eventHandler) {
    }
    removeHistoryUpdateListener(eventHandler) {
    }
    updateHistory(url, title) {
    }
}
exports.RelativePathRouter = RelativePathRouter;
//# sourceMappingURL=relativePathRouter.js.map