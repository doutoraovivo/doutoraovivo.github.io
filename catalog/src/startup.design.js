"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
const ko = require("knockout");
const injection_1 = require("@paperbits/common/injection");
const core_design_module_1 = require("@paperbits/core/core.design.module");
const styles_design_module_1 = require("@paperbits/styles/styles.design.module");
const prosemirror_module_1 = require("@paperbits/prosemirror/prosemirror.module");
const offline_module_1 = require("@paperbits/common/persistence/offline.module");
const sessionExpirationErrorHandler_1 = require("./errors/sessionExpirationErrorHandler");
const main_design_module_1 = require("./main.design.module");
const injector = new injection_1.InversifyInjector();
injector.bindToCollection("autostart", sessionExpirationErrorHandler_1.SessionExpirationErrorHandler);
injector.bindModule(new core_design_module_1.CoreDesignModule());
injector.bindModule(new styles_design_module_1.StylesDesignModule());
injector.bindModule(new prosemirror_module_1.ProseMirrorModule());
injector.bindModule(new main_design_module_1.MainDesignModule());
injector.bindModule(new offline_module_1.OfflineModule({ autosave: false }));
injector.resolve("autostart");
document.addEventListener("DOMContentLoaded", () => {
    setImmediate(() => ko.applyBindings(undefined, document.body));
});
//# sourceMappingURL=startup.design.js.map