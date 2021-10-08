"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOfApisEditorModule = void 0;
const listOfApisEditor_1 = require("./listOfApisEditor");
const listOfApisHandlers_1 = require("../listOfApisHandlers");
class ListOfApisEditorModule {
    register(injector) {
        injector.bind("listOfApisEditor", listOfApisEditor_1.ListOfApisEditor);
        injector.bindToCollection("widgetHandlers", listOfApisHandlers_1.ListOfApisHandlers, "listOfApisHandlers");
        injector.bindToCollection("widgetHandlers", listOfApisHandlers_1.ListOfApisTilesHandlers, "listOfApisTilesHandlers");
        injector.bindToCollection("widgetHandlers", listOfApisHandlers_1.ListOfApisDropdownHandlers, "listOfApisDropdownHandlers");
    }
}
exports.ListOfApisEditorModule = ListOfApisEditorModule;
//# sourceMappingURL=listOfApisEditor.module.js.map