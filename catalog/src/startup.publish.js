"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const injection_1 = require("@paperbits/common/injection");
const core_module_1 = require("@paperbits/core/core.module");
const core_publish_module_1 = require("@paperbits/core/core.publish.module");
const styles_publish_module_1 = require("@paperbits/styles/styles.publish.module");
const prosemirror_module_1 = require("@paperbits/prosemirror/prosemirror.module");
const staticSettingsProvider_1 = require("./components/staticSettingsProvider");
const fileSystemBlobStorage_1 = require("./components/fileSystemBlobStorage");
const main_publish_module_1 = require("./main.publish.module");
const configFile = path.resolve(__dirname, "./config.json");
const configuration = JSON.parse(fs.readFileSync(configFile, "utf8").toString());
const settingsProvider = new staticSettingsProvider_1.StaticSettingsProvider(configuration);
const outputBlobStorage = new fileSystemBlobStorage_1.FileSystemBlobStorage("./dist/website");
const injector = new injection_1.InversifyInjector();
injector.bindModule(new core_module_1.CoreModule());
injector.bindModule(new core_publish_module_1.CorePublishModule());
injector.bindModule(new styles_publish_module_1.StylePublishModule());
injector.bindModule(new prosemirror_module_1.ProseMirrorModule());
injector.bindModule(new main_publish_module_1.MainPublishModule());
injector.bindInstance("settingsProvider", settingsProvider);
injector.bindInstance("outputBlobStorage", outputBlobStorage);
injector.resolve("autostart");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const publisher = injector.resolve("sitePublisher");
publisher.publish()
    .then(() => {
    console.log("DONE.");
    process.exit();
})
    .catch((error) => {
    console.log(error);
    process.exit();
});
//# sourceMappingURL=startup.publish.js.map