"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationDetailsDesignModule = void 0;
const operationDetailsHandlers_1 = require("./operationDetailsHandlers");
const operationDetailsEditor_1 = require("./ko/operationDetailsEditor");
const operationDetailsModelBinder_1 = require("./operationDetailsModelBinder");
const operationDetailsViewModelBinder_1 = require("./ko/operationDetailsViewModelBinder");
class OperationDetailsDesignModule {
    register(injector) {
        injector.bind("operationDetailsEditor", operationDetailsEditor_1.OperationDetailsEditor);
        injector.bindToCollection("widgetHandlers", operationDetailsHandlers_1.OperationDetailsHandlers, "operationDetailsHandlers");
        injector.bindToCollection("modelBinders", operationDetailsModelBinder_1.OperationDetailsModelBinder);
        injector.bindToCollection("viewModelBinders", operationDetailsViewModelBinder_1.OperationDetailsViewModelBinder);
    }
}
exports.OperationDetailsDesignModule = OperationDetailsDesignModule;
//# sourceMappingURL=operationDetails.design.module.js.map