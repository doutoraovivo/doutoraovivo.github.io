"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_1 = require("@paperbits/common/injection");
const core_runtime_module_1 = require("@paperbits/core/core.runtime.module");
const styles_runtime_module_1 = require("@paperbits/styles/styles.runtime.module");
const main_runtime_module_1 = require("./main.runtime.module");
const injector = new injection_1.InversifyInjector();
injector.bindModule(new core_runtime_module_1.CoreRuntimeModule());
injector.bindModule(new styles_runtime_module_1.StyleRuntimeModule());
injector.bindModule(new main_runtime_module_1.MainRuntimeModule());
document.addEventListener("DOMContentLoaded", () => {
    injector.resolve("autostart");
});
//# sourceMappingURL=startup.runtime.js.map