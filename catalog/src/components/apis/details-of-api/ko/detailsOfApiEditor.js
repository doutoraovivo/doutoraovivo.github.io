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
exports.DetailsOfApiEditor = void 0;
const ko = require("knockout");
const detailsOfApiEditor_html_1 = require("./detailsOfApiEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const detailsOfApiModel_1 = require("../detailsOfApiModel");
let DetailsOfApiEditor = class DetailsOfApiEditor {
    constructor() {
        this.hyperlink = ko.observable();
        this.hyperlinkTitle = ko.computed(() => this.hyperlink() ? this.hyperlink().title : "Add a link...");
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hyperlink(this.model.changeLogPageHyperlink);
        });
    }
    applyChanges() {
        this.model.changeLogPageHyperlink = this.hyperlink();
        this.onChange(this.model);
    }
    onHyperlinkChange(hyperlink) {
        this.hyperlink(hyperlink);
        this.applyChanges();
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", detailsOfApiModel_1.DetailsOfApiModel)
], DetailsOfApiEditor.prototype, "model", void 0);
__decorate([
    (0, decorators_1.Event)(),
    __metadata("design:type", Function)
], DetailsOfApiEditor.prototype, "onChange", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DetailsOfApiEditor.prototype, "initialize", null);
DetailsOfApiEditor = __decorate([
    (0, decorators_1.Component)({
        selector: "details-of-api-editor",
        template: detailsOfApiEditor_html_1.default
    }),
    __metadata("design:paramtypes", [])
], DetailsOfApiEditor);
exports.DetailsOfApiEditor = DetailsOfApiEditor;
//# sourceMappingURL=detailsOfApiEditor.js.map