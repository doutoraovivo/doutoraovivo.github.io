"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationListModule = void 0;
const operationListModelBinder_1 = require("../operationListModelBinder");
const operationListViewModelBinder_1 = require("./operationListViewModelBinder");
class OperationListModule {
    register(injector) {
        injector.bindToCollection("modelBinders", operationListModelBinder_1.OperationListModelBinder);
        injector.bindToCollection("viewModelBinders", operationListViewModelBinder_1.OperationListViewModelBinder);
    }
}
exports.OperationListModule = OperationListModule;
//# sourceMappingURL=operationList.module.js.map