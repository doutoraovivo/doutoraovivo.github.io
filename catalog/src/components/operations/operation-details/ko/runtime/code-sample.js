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
exports.CodeSampleViewModel = void 0;
const ko = require("knockout");
const code_sample_html_1 = require("./code-sample.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let CodeSampleViewModel = class CodeSampleViewModel {
    constructor() {
        this.content = ko.observable();
        this.language = ko.observable();
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], CodeSampleViewModel.prototype, "content", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], CodeSampleViewModel.prototype, "language", void 0);
CodeSampleViewModel = __decorate([
    (0, decorators_1.Component)({
        selector: "code-sample",
        template: code_sample_html_1.default
    }),
    __metadata("design:paramtypes", [])
], CodeSampleViewModel);
exports.CodeSampleViewModel = CodeSampleViewModel;
//# sourceMappingURL=code-sample.js.map