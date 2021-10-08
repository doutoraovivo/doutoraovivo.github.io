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
exports.OperationListModelBinder = void 0;
const operationListModel_1 = require("./operationListModel");
class OperationListModelBinder {
    constructor(permalinkResolver) {
        this.permalinkResolver = permalinkResolver;
    }
    canHandleContract(contract) {
        return contract.type === "operationList";
    }
    canHandleModel(model) {
        return model instanceof operationListModel_1.OperationListModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new operationListModel_1.OperationListModel();
            model.allowSelection = contract.allowSelection;
            model.wrapText = contract.wrapText;
            model.showToggleUrlPath = contract.showToggleUrlPath;
            model.defaultShowUrlPath = contract.defaultShowUrlPath;
            model.defaultGroupByTagToEnabled = contract.defaultGroupByTagToEnabled === true;
            if (contract.detailsPageHyperlink) {
                model.detailsPageHyperlink = yield this.permalinkResolver.getHyperlinkFromContract(contract.detailsPageHyperlink);
            }
            return model;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "operationList",
            allowSelection: model.allowSelection,
            wrapText: model.wrapText,
            showToggleUrlPath: model.showToggleUrlPath,
            defaultShowUrlPath: model.defaultShowUrlPath,
            defaultGroupByTagToEnabled: model.defaultGroupByTagToEnabled,
            detailsPageHyperlink: model.detailsPageHyperlink
                ? {
                    target: model.detailsPageHyperlink.target,
                    targetKey: model.detailsPageHyperlink.targetKey
                }
                : null
        };
        return contract;
    }
}
exports.OperationListModelBinder = OperationListModelBinder;
//# sourceMappingURL=operationListModelBinder.js.map