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
exports.OperationDetailsModelBinder = void 0;
const operationDetailsModel_1 = require("./operationDetailsModel");
class OperationDetailsModelBinder {
    constructor(oauthService) {
        this.oauthService = oauthService;
    }
    canHandleContract(contract) {
        return contract.type === "operationDetails";
    }
    canHandleModel(model) {
        return model instanceof operationDetailsModel_1.OperationDetailsModel;
    }
    contractToModel(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new operationDetailsModel_1.OperationDetailsModel();
            model.enableConsole = contract.enableConsole === true || contract.enableConsole === undefined;
            model.enableScrollTo = contract.enableScrollTo !== undefined && contract.enableScrollTo === true;
            model.defaultSchemaView = contract.defaultSchemaView || "table";
            model.authorizationServers = [];
            model.useCorsProxy = contract.useCorsProxy;
            return model;
        });
    }
    modelToContract(model) {
        const contract = {
            type: "operationDetails",
            enableConsole: model.enableConsole,
            enableScrollTo: model.enableScrollTo,
            defaultSchemaView: model.defaultSchemaView,
            useCorsProxy: model.useCorsProxy
        };
        return contract;
    }
}
exports.OperationDetailsModelBinder = OperationDetailsModelBinder;
//# sourceMappingURL=operationDetailsModelBinder.js.map