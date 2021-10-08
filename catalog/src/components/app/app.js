"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.App = void 0;
const app_html_1 = require("./app.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const startupError = `Unable to start the portal`;
let App = class App {
    constructor(settingsProvider, authenticator, viewManager, siteService) {
        this.settingsProvider = settingsProvider;
        this.authenticator = authenticator;
        this.viewManager = viewManager;
        this.siteService = siteService;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.viewManager.setHost({ name: "page-host" });
                this.viewManager.showToolboxes();
            }
            catch (error) {
                this.viewManager.addToast(startupError, `Check if the settings specified in the configuration file <i>config.design.json</i> are correct or refer to the <a href="http://aka.ms/apimdocs/portal#faq" target="_blank">frequently asked questions</a>.`);
            }
        });
    }
};
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], App.prototype, "initialize", null);
App = __decorate([
    (0, decorators_1.Component)({
        selector: "app",
        template: app_html_1.default
    }),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], App);
exports.App = App;
//# sourceMappingURL=app.js.map