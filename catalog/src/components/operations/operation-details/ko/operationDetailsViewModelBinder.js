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
exports.OperationDetailsViewModelBinder = void 0;
const operationDetailsViewModel_1 = require("./operationDetailsViewModel");
const operationDetailsModel_1 = require("../operationDetailsModel");
class OperationDetailsViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new operationDetailsViewModel_1.OperationDetailsViewModel();
                viewModel["widgetBinding"] = {
                    displayName: "Operation: Details",
                    model: model,
                    draggable: true,
                    flow: "block",
                    editor: "operation-details-editor",
                    applyChanges: (updatedModel) => __awaiter(this, void 0, void 0, function* () {
                        yield this.modelToViewModel(updatedModel, viewModel, bindingContext);
                        this.eventManager.dispatchEvent("onContentUpdate");
                    })
                };
            }
            const runtimeConfig = {
                enableConsole: model.enableConsole,
                enableScrollTo: model.enableScrollTo,
                authorizationServers: model.authorizationServers,
                defaultSchemaView: model.defaultSchemaView,
                useCorsProxy: model.useCorsProxy
            };
            viewModel.config(JSON.stringify(runtimeConfig));
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof operationDetailsModel_1.OperationDetailsModel;
    }
}
exports.OperationDetailsViewModelBinder = OperationDetailsViewModelBinder;
//# sourceMappingURL=operationDetailsViewModelBinder.js.map