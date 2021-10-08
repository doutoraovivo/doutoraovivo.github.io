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
exports.OperationDetailsHandlers = void 0;
const operationDetailsModel_1 = require("./operationDetailsModel");
class OperationDetailsHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "operationDetails",
                category: "Operations",
                displayName: "Operation: Details",
                iconClass: "widget-icon widget-icon-api-management",
                requires: ["html"],
                createModel: () => __awaiter(this, void 0, void 0, function* () { return new operationDetailsModel_1.OperationDetailsModel(); })
            };
            return widgetOrder;
        });
    }
}
exports.OperationDetailsHandlers = OperationDetailsHandlers;
//# sourceMappingURL=operationDetailsHandlers.js.map