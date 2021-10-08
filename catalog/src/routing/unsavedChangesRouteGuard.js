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
exports.UnsavedChangesRouteGuard = void 0;
class UnsavedChangesRouteGuard {
    constructor(offlineObjectStorage, viewManager, pageService) {
        this.offlineObjectStorage = offlineObjectStorage;
        this.viewManager = viewManager;
        this.pageService = pageService;
    }
    canActivate(route) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const hasUnsavedChanges = yield this.offlineObjectStorage.hasUnsavedChanges();
            if (!hasUnsavedChanges) {
                resolve(true);
            }
            const path = route.path;
            const pathNotChanged = route.previous && route.previous.path === path;
            if (pathNotChanged) {
                const page = yield this.pageService.getPageByPermalink(path);
                if (!page || !page.contentKey) {
                    resolve(true);
                }
                const hasUnsavedChanges = yield this.offlineObjectStorage.hasUnsavedChangesAt(page.contentKey);
                if (hasUnsavedChanges) {
                    const toast = this.viewManager.addToast("Unsaved changes", `You have unsaved changes. Do you want to save or discard them?`, [
                        {
                            title: "Save",
                            iconClass: "paperbits-check-2",
                            action: () => __awaiter(this, void 0, void 0, function* () {
                                yield this.offlineObjectStorage.saveChanges();
                                this.viewManager.removeToast(toast);
                                resolve(true);
                            })
                        },
                        {
                            title: "Discard",
                            iconClass: "paperbits-simple-remove",
                            action: () => __awaiter(this, void 0, void 0, function* () {
                                yield this.offlineObjectStorage.discardChanges();
                                this.viewManager.removeToast(toast);
                                resolve(true);
                            })
                        }
                    ]);
                }
            }
            else {
                resolve(true);
            }
        }));
    }
}
exports.UnsavedChangesRouteGuard = UnsavedChangesRouteGuard;
//# sourceMappingURL=unsavedChangesRouteGuard.js.map