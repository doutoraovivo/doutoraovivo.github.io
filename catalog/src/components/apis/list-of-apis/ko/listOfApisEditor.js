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
exports.ListOfApisEditor = void 0;
const ko = require("knockout");
const listOfApisEditor_html_1 = require("./listOfApisEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const listOfApisModel_1 = require("../listOfApisModel");
let ListOfApisEditor = class ListOfApisEditor {
    constructor() {
        this.allowSelection = ko.observable(false);
        this.showApiType = ko.observable(true);
        this.defaultGroupByTagToEnabled = ko.observable(false);
        this.hyperlink = ko.observable();
        this.hyperlinkTitle = ko.computed(() => this.hyperlink()
            ? this.hyperlink().title
            : "Add a link...");
        this.itemStyles = ko.observableArray([
            { name: "List", styleValue: "list" },
            { name: "Tiles", styleValue: "tiles" },
            { name: "Dropdown", styleValue: "dropdown" }
        ]);
        this.itemStyle = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.allowSelection(this.model.allowSelection);
            this.showApiType(this.model.showApiType);
            this.defaultGroupByTagToEnabled(this.model.defaultGroupByTagToEnabled);
            this.hyperlink(this.model.detailsPageHyperlink);
            this.allowSelection.subscribe(this.applyChanges);
            this.showApiType.subscribe(this.applyChanges);
            this.defaultGroupByTagToEnabled.subscribe(this.applyChanges);
        });
    }
    applyChanges() {
        this.model.allowSelection = this.allowSelection();
        this.model.showApiType = this.showApiType();
        this.model.defaultGroupByTagToEnabled = this.defaultGroupByTagToEnabled();
        this.model.detailsPageHyperlink = this.hyperlink();
        this.onChange(this.model);
    }
    onHyperlinkChange(hyperlink) {
        this.hyperlink(hyperlink);
        this.applyChanges();
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", listOfApisModel_1.ListOfApisModel)
], ListOfApisEditor.prototype, "model", void 0);
__decorate([
    (0, decorators_1.Event)(),
    __metadata("design:type", Function)
], ListOfApisEditor.prototype, "onChange", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListOfApisEditor.prototype, "initialize", null);
ListOfApisEditor = __decorate([
    (0, decorators_1.Component)({
        selector: "list-of-apis-editor",
        template: listOfApisEditor_html_1.default
    }),
    __metadata("design:paramtypes", [])
], ListOfApisEditor);
exports.ListOfApisEditor = ListOfApisEditor;
//# sourceMappingURL=listOfApisEditor.js.map