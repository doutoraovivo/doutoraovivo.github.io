"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
class Page {
    constructor() {
        this.value = [];
        this.count = 0;
        this.nextLink = null;
    }
    getSkip() {
        if (!this.nextLink) {
            return undefined;
        }
        const url = new URL(this.nextLink);
        const queryParams = new URLSearchParams(decodeURIComponent(url.search));
        if (queryParams.has("$skip")) {
            return parseInt(queryParams.get("$skip"));
        }
    }
}
exports.Page = Page;
//# sourceMappingURL=page.js.map