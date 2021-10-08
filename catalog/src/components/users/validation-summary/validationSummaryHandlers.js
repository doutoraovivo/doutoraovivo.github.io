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
exports.ValidationSummaryHandlers = void 0;
const validationSummaryModel_1 = require("../validation-summary/validationSummaryModel");
class ValidationSummaryHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "validation-summary",
                category: "User",
                displayName: "Validation summary",
                iconClass: "widget-icon widget-icon-api-management",
                requires: ["html"],
                createModel: () => __awaiter(this, void 0, void 0, function* () { return new validationSummaryModel_1.ValidationSummaryModel(); })
            };
            return widgetOrder;
        });
    }
}
exports.ValidationSummaryHandlers = ValidationSummaryHandlers;
//# sourceMappingURL=validationSummaryHandlers.js.map