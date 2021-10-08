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
exports.OperationListViewModelBinder = void 0;
const operationListViewModel_1 = require("./operationListViewModel");
const operationListModel_1 = require("../operationListModel");
class OperationListViewModelBinder {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }
    modelToViewModel(model, viewModel, bindingContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!viewModel) {
                viewModel = new operationListViewModel_1.OperationListViewModel();
            }
            viewModel.runtimeConfig(JSON.stringify({
                allowSelection: model.allowSelection,
                wrapText: model.wrapText,
                showToggleUrlPath: model.showToggleUrlPath,
                defaultShowUrlPath: model.defaultShowUrlPath,
                defaultGroupByTagToEnabled: model.defaultGroupByTagToEnabled,
                detailsPageUrl: model.detailsPageHyperlink
                    ? model.detailsPageHyperlink.href
                    : undefined
            }));
            viewModel["widgetBinding"] = {
                displayName: "List of operations",
                model: model,
                draggable: true,
                flow: "block",
                editor: "operation-list-editor",
                applyChanges: (updatedModel) => __awaiter(this, void 0, void 0, function* () {
                    yield this.modelToViewModel(updatedModel, viewModel, bindingContext);
                    this.eventManager.dispatchEvent("onContentUpdate");
                })
            };
            return viewModel;
        });
    }
    canHandleModel(model) {
        return model instanceof operationListModel_1.OperationListModel;
    }
}
exports.OperationListViewModelBinder = OperationListViewModelBinder;
//# sourceMappingURL=operationListViewModelBinder.js.map