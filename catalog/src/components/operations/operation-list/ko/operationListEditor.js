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
exports.OperationListEditor = void 0;
const ko = require("knockout");
const operationListEditor_html_1 = require("./operationListEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const operationListModel_1 = require("../operationListModel");
let OperationListEditor = class OperationListEditor {
    constructor() {
        this.allowSelection = ko.observable(false);
        this.wrapText = ko.observable(true);
        this.showToggleUrlPath = ko.observable();
        this.defaultShowUrlPath = ko.observable();
        this.defaultGroupByTagToEnabled = ko.observable(false);
        this.hyperlink = ko.observable();
        this.hyperlinkTitle = ko.computed(() => this.hyperlink() ? this.hyperlink().title : "Add a link...");
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.allowSelection(this.model.allowSelection);
            this.wrapText(this.model.wrapText);
            this.showToggleUrlPath(this.model.showToggleUrlPath);
            this.defaultShowUrlPath(this.model.defaultShowUrlPath);
            this.defaultGroupByTagToEnabled(this.model.defaultGroupByTagToEnabled);
            this.hyperlink(this.model.detailsPageHyperlink);
            this.allowSelection.subscribe(this.applyChanges);
            this.wrapText.subscribe(this.applyChanges);
            this.showToggleUrlPath.subscribe(this.applyChanges);
            this.defaultShowUrlPath.subscribe(this.applyChanges);
            this.defaultGroupByTagToEnabled.subscribe(this.applyChanges);
        });
    }
    applyChanges() {
        this.model.allowSelection = this.allowSelection();
        this.model.wrapText = this.wrapText();
        this.model.showToggleUrlPath = this.showToggleUrlPath();
        this.model.defaultShowUrlPath = this.defaultShowUrlPath();
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
    __metadata("design:type", operationListModel_1.OperationListModel)
], OperationListEditor.prototype, "model", void 0);
__decorate([
    (0, decorators_1.Event)(),
    __metadata("design:type", Function)
], OperationListEditor.prototype, "onChange", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperationListEditor.prototype, "initialize", null);
OperationListEditor = __decorate([
    (0, decorators_1.Component)({
        selector: "operation-list-editor",
        template: operationListEditor_html_1.default
    }),
    __metadata("design:paramtypes", [])
], OperationListEditor);
exports.OperationListEditor = OperationListEditor;
//# sourceMappingURL=operationListEditor.js.map