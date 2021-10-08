"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsOfApiModule = void 0;
const detailsOfApiModelBinder_1 = require("../detailsOfApiModelBinder");
const detailsOfApiViewModelBinder_1 = require("./detailsOfApiViewModelBinder");
class DetailsOfApiModule {
    register(injector) {
        injector.bindToCollection("modelBinders", detailsOfApiModelBinder_1.DetailsOfApiModelBinder);
        injector.bindToCollection("viewModelBinders", detailsOfApiViewModelBinder_1.DetailsOfApiViewModelBinder);
    }
}
exports.DetailsOfApiModule = DetailsOfApiModule;
//# sourceMappingURL=detailsOfApi.module.js.map