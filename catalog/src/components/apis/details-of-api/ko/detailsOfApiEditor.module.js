"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsOfApiEditorModule = void 0;
const detailsOfApiHandlers_1 = require("../detailsOfApiHandlers");
const detailsOfApiEditor_1 = require("./detailsOfApiEditor");
class DetailsOfApiEditorModule {
    register(injector) {
        injector.bind("detailsOfApiEditor", detailsOfApiEditor_1.DetailsOfApiEditor);
        injector.bindToCollection("widgetHandlers", detailsOfApiHandlers_1.DetailsOfApiHandlers, "detailsOfApiHandlers");
    }
}
exports.DetailsOfApiEditorModule = DetailsOfApiEditorModule;
//# sourceMappingURL=detailsOfApiEditor.module.js.map