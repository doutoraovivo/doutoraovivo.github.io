"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSummaryDesignModule = void 0;
const validationSummaryHandlers_1 = require("./validationSummaryHandlers");
const validationSummaryEditor_1 = require("./ko/validationSummaryEditor");
class ValidationSummaryDesignModule {
    register(injector) {
        injector.bind("validationSummaryEditor", validationSummaryEditor_1.ValidationSummaryEditor);
        injector.bindToCollection("widgetHandlers", validationSummaryHandlers_1.ValidationSummaryHandlers, "validationSummaryHandlers");
    }
}
exports.ValidationSummaryDesignModule = ValidationSummaryDesignModule;
//# sourceMappingURL=validationSummary.design.module.js.map