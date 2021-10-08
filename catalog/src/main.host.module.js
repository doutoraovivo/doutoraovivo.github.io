"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainHostModule = void 0;
const fs = require("fs");
const path = require("path");
const staticSettingsProvider_1 = require("./components/staticSettingsProvider");
const contentController_1 = require("./controller/contentController");
const fileSystemBlobStorage_1 = require("./components/fileSystemBlobStorage");
const http_1 = require("@paperbits/common/http");
const unhandledErrorMiddleware_1 = require("./middlewares/unhandledErrorMiddleware");
const staticContentMiddleware_1 = require("./middlewares/staticContentMiddleware");
const logging_1 = require("@paperbits/common/logging");
class MainHostModule {
    register(injector) {
        injector.bindSingleton("logger", logging_1.ConsoleLogger);
        injector.bindSingleton("httpClient", http_1.XmlHttpRequestClient);
        injector.bind("errorHandler", unhandledErrorMiddleware_1.UnhandledErrorMiddleware);
        injector.bindSingleton("staticContentMiddleware", staticContentMiddleware_1.StaticContentMiddleware);
        injector.bindSingleton("dataController", contentController_1.ContentController);
        const configPath = path.resolve(__dirname, "config.json");
        const configRaw = fs.readFileSync(configPath, "utf8");
        const config = JSON.parse(configRaw);
        const settingsProvider = new staticSettingsProvider_1.StaticSettingsProvider(config);
        injector.bindInstance("settingsProvider", settingsProvider);
        const designerStorage = new fileSystemBlobStorage_1.FileSystemBlobStorage(path.resolve(__dirname, "../designer"));
        const websiteStorage = new fileSystemBlobStorage_1.FileSystemBlobStorage(path.resolve(__dirname, "../website"));
        injector.bindInstance("websiteStorage", websiteStorage);
        injector.bindInstance("designerStorage", designerStorage);
    }
}
exports.MainHostModule = MainHostModule;
//# sourceMappingURL=main.host.module.js.map