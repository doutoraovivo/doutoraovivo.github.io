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
exports.ListOfApisModelBinder = void 0;
const listOfApisModel_1 = require("./listOfApisModel");
class ListOfApisModelBinder {
    constructor(permalinkResolver) {
        this.permalinkResolver = permalinkResolver;
    }
    canHandleModel(model) {
        return model instanceof listOfApisModel_1.ListOfApisModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new listOfApisModel_1.ListOfApisModel();
            model.layout = contract.itemStyleView;
            model.allowSelection = contract.allowSelection;
            model.showApiType = contract.showApiType === undefined ? true : contract.showApiType;
            model.defaultGroupByTagToEnabled = contract.defaultGroupByTagToEnabled === true;
            if (contract.detailsPageHyperlink) {
                model.detailsPageHyperlink = yield this.permalinkResolver.getHyperlinkFromContract(contract.detailsPageHyperlink);
            }
            return model;
        });
    }
    canHandleContract(contract) {
        return contract.type === "listOfApis";
    }
    modelToContract(model) {
        const contract = {
            type: "listOfApis",
            itemStyleView: model.layout,
            allowSelection: model.allowSelection,
            showApiType: model.showApiType,
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
exports.ListOfApisModelBinder = ListOfApisModelBinder;
//# sourceMappingURL=listOfApisModelBinder.js.map