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
exports.ListOfApisDropdownHandlers = exports.ListOfApisTilesHandlers = exports.ListOfApisHandlers = void 0;
const listOfApisModel_1 = require("./listOfApisModel");
class ListOfApisHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "listOfApis",
                category: "APIs",
                displayName: "List of APIs",
                iconClass: "widget-icon widget-icon-api-management",
                requires: ["html"],
                createModel: () => __awaiter(this, void 0, void 0, function* () { return new listOfApisModel_1.ListOfApisModel("list"); })
            };
            return widgetOrder;
        });
    }
}
exports.ListOfApisHandlers = ListOfApisHandlers;
class ListOfApisTilesHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "listOfApisTiles",
                category: "APIs",
                displayName: "List of APIs (tiles)",
                iconClass: "widget-icon widget-icon-api-management",
                requires: ["html"],
                createModel: () => __awaiter(this, void 0, void 0, function* () { return new listOfApisModel_1.ListOfApisModel("tiles"); })
            };
            return widgetOrder;
        });
    }
}
exports.ListOfApisTilesHandlers = ListOfApisTilesHandlers;
class ListOfApisDropdownHandlers {
    getWidgetOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const widgetOrder = {
                name: "listOfApisDropdown",
                category: "APIs",
                displayName: "List of APIs (dropdown)",
                iconClass: "widget-icon widget-icon-api-management",
                requires: ["html"],
                createModel: () => __awaiter(this, void 0, void 0, function* () { return new listOfApisModel_1.ListOfApisModel("dropdown"); })
            };
            return widgetOrder;
        });
    }
}
exports.ListOfApisDropdownHandlers = ListOfApisDropdownHandlers;
//# sourceMappingURL=listOfApisHandlers.js.map