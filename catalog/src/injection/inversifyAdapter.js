"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InversifyAdapter = void 0;
class InversifyAdapter {
    constructor(injector) {
        this.injector = injector;
    }
    get(classConstructor, action) {
        return this.injector["container"].resolve(classConstructor);
    }
}
exports.InversifyAdapter = InversifyAdapter;
//# sourceMappingURL=inversifyAdapter.js.map