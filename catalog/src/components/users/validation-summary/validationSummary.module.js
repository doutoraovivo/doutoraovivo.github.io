"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSummaryModule = void 0;
const validationSummaryModelBinder_1 = require("./validationSummaryModelBinder");
const validationSummaryViewModelBinder_1 = require("./ko/validationSummaryViewModelBinder");
class ValidationSummaryModule {
    register(injector) {
        injector.bindToCollection("modelBinders", validationSummaryModelBinder_1.ValidationSummaryModelBinder);
        injector.bindToCollection("viewModelBinders", validationSummaryViewModelBinder_1.ValidationSummaryViewModelBinder);
    }
}
exports.ValidationSummaryModule = ValidationSummaryModule;
//# sourceMappingURL=validationSummary.module.js.map