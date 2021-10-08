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
exports.ListOfApisViewModelBinder = void 0;
const listOfApisViewModel_1 = require("./listOfApisViewModel");
const listOfApisModel_1 = require("../listOfApisModel");
class ListOfApisViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new listOfApisViewModel_1.ListOfApisViewModel();
            }
            viewModel.layout(model.layout);
            viewModel.runtimeConfig(JSON.stringify({
                allowSelection: model.allowSelection,
                showApiType: model.showApiType,
                defaultGroupByTagToEnabled: model.defaultGroupByTagToEnabled,
                detailsPageUrl: model.detailsPageHyperlink
                    ? model.detailsPageHyperlink.href
                    : undefined
            }));
            viewModel["widgetBinding"] = {
                displayName: "List of APIs" + (model.layout === "list" ? "" : ` (${model.layout})`),
                model: model,
                draggable: true,
                flow: "block",
                editor: "list-of-apis-editor",
                applyChanges: (updatedModel) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(updatedModel, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof listOfApisModel_1.ListOfApisModel;
    }
}
exports.ListOfApisViewModelBinder = ListOfApisViewModelBinder;
//# sourceMappingURL=listOfApisViewModelBinder.js.map