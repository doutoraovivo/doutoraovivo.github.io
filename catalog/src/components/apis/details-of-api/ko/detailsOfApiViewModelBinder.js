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
exports.DetailsOfApiViewModelBinder = void 0;
const detailsOfApiViewModel_1 = require("./detailsOfApiViewModel");
const detailsOfApiModel_1 = require("../detailsOfApiModel");
class DetailsOfApiViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new detailsOfApiViewModel_1.DetailsOfApiViewModel();
            }
            viewModel.runtimeConfig(JSON.stringify({
                changeLogPageUrl: model.changeLogPageHyperlink
                    ? model.changeLogPageHyperlink.href
                    : undefined
            }));
            viewModel["widgetBinding"] = {
                displayName: "API: Details",
                model: model,
                draggable: true,
                flow: "block",
                editor: "details-of-api-editor",
                applyChanges: (updatedModel) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(updatedModel, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof detailsOfApiModel_1.DetailsOfApiModel;
    }
}
exports.DetailsOfApiViewModelBinder = DetailsOfApiViewModelBinder;
//# sourceMappingURL=detailsOfApiViewModelBinder.js.map