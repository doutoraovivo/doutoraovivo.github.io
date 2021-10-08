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
exports.OldContentRouteGuard = void 0;
class OldContentRouteGuard {
    constructor(viewManager) {
        this.viewManager = viewManager;
    }
    canActivate(route) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sessionStorage.getItem("OldContent") || this.toast) {
                return true;
            }
            const editorHost = window.document.querySelector("iframe.host");
            if (editorHost) {
                const deprecatedNavbar = editorHost.contentDocument.body.querySelector("nav .navbar-brand");
                if (deprecatedNavbar) {
                    this.toast = this.viewManager.addToast("Deprecated content detected", `Your developer portal's content is based off the pre-production version of default content. <a href="https://aka.ms/apimdocs/portal#preview-to-ga" target="_blank">Learn about the problems it may cause and how to switch to the production version of content</a>.`);
                    setTimeout(() => {
                        this.viewManager.removeToast(this.toast);
                        sessionStorage.setItem("OldContent", "shown");
                    }, 15000);
                }
            }
            return true;
        });
    }
}
exports.OldContentRouteGuard = OldContentRouteGuard;
//# sourceMappingURL=oldContentRouteGuard.js.map