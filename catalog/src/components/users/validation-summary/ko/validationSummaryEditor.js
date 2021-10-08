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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSummaryEditor = void 0;
const validationSummaryEditor_html_1 = require("./validationSummaryEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const validationSummaryModel_1 = require("../../validation-summary/validationSummaryModel");
let ValidationSummaryEditor = class ValidationSummaryEditor {
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", validationSummaryModel_1.ValidationSummaryModel)
], ValidationSummaryEditor.prototype, "model", void 0);
ValidationSummaryEditor = __decorate([
    (0, decorators_1.Component)({
        selector: "validation-summary-editor",
        template: validationSummaryEditor_html_1.default
    })
], ValidationSummaryEditor);
exports.ValidationSummaryEditor = ValidationSummaryEditor;
//# sourceMappingURL=validationSummaryEditor.js.map