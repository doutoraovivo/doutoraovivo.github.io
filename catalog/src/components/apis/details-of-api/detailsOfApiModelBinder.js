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
exports.DetailsOfApiModelBinder = void 0;
const detailsOfApiModel_1 = require("./detailsOfApiModel");
class DetailsOfApiModelBinder {
    constructor(permalinkResolver) {
        this.permalinkResolver = permalinkResolver;
    }
    canHandleModel(model) {
        return model instanceof detailsOfApiModel_1.DetailsOfApiModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new detailsOfApiModel_1.DetailsOfApiModel();
            if (contract.changeLogPageHyperlink) {
                model.changeLogPageHyperlink = yield this.permalinkResolver.getHyperlinkFromContract(contract.changeLogPageHyperlink);
            }
            return model;
        });
    }
    canHandleContract(contract) {
        return contract.type === "detailsOfApi";
    }
    modelToContract(model) {
        const searchResultConfig = {
            type: "detailsOfApi",
            changeLogPageHyperlink: model.changeLogPageHyperlink
                ? {
                    target: model.changeLogPageHyperlink.target,
                    targetKey: model.changeLogPageHyperlink.targetKey
                } : null
        };
        return searchResultConfig;
    }
}
exports.DetailsOfApiModelBinder = DetailsOfApiModelBinder;
//# sourceMappingURL=detailsOfApiModelBinder.js.map