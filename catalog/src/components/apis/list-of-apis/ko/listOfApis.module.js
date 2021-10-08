"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOfApisModule = void 0;
const listOfApisModelBinder_1 = require("../listOfApisModelBinder");
const listOfApisViewModelBinder_1 = require("./listOfApisViewModelBinder");
class ListOfApisModule {
    register(injector) {
        injector.bindToCollection("modelBinders", listOfApisModelBinder_1.ListOfApisModelBinder);
        injector.bindToCollection("viewModelBinders", listOfApisViewModelBinder_1.ListOfApisViewModelBinder);
    }
}
exports.ListOfApisModule = ListOfApisModule;
//# sourceMappingURL=listOfApis.module.js.map