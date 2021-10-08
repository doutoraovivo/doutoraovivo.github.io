"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationListEditorModule = void 0;
const operationListHandlers_1 = require("../operationListHandlers");
const operationListEditor_1 = require("./operationListEditor");
class OperationListEditorModule {
    register(injector) {
        injector.bind("operationListEditor", operationListEditor_1.OperationListEditor);
        injector.bindToCollection("widgetHandlers", operationListHandlers_1.OperationListHandlers, "operationListHandlers");
    }
}
exports.OperationListEditorModule = OperationListEditorModule;
//# sourceMappingURL=operationListEditor.module.js.map