"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationDetailsPublishModule = void 0;
const operationDetailsModelBinder_1 = require("./operationDetailsModelBinder");
const operationDetailsViewModelBinder_1 = require("./ko/operationDetailsViewModelBinder");
class OperationDetailsPublishModule {
    register(injector) {
        injector.bindToCollection("modelBinders", operationDetailsModelBinder_1.OperationDetailsModelBinder);
        injector.bindToCollection("viewModelBinders", operationDetailsViewModelBinder_1.OperationDetailsViewModelBinder);
    }
}
exports.OperationDetailsPublishModule = OperationDetailsPublishModule;
//# sourceMappingURL=operationDetails.publish.module.js.map