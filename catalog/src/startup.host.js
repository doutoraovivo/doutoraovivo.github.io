"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const injection_1 = require("@paperbits/common/injection");
const routing_controllers_1 = require("routing-controllers");
const middlewares_1 = require("./middlewares");
const main_host_module_1 = require("./main.host.module");
const inversifyAdapter_1 = require("./injection/inversifyAdapter");
const contentController_1 = require("./controller/contentController");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const injector = new injection_1.InversifyInjector();
injector.bindModule(new main_host_module_1.MainHostModule());
const adapter = new inversifyAdapter_1.InversifyAdapter(injector);
(0, routing_controllers_1.useContainer)(adapter);
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
(0, routing_controllers_1.useExpressServer)(app, {
    defaultErrorHandler: false,
    middlewares: [
        middlewares_1.UnhandledErrorMiddleware,
        middlewares_1.StaticContentMiddleware
    ],
    controllers: [
        contentController_1.ContentController
    ]
});
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Website proxy started. Listening port ${port}...`);
//# sourceMappingURL=startup.host.js.map