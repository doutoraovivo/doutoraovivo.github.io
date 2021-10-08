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
exports.FileInput = void 0;
const ko = require("knockout");
const file_input_html_1 = require("./file-input.html");
const utils_1 = require("../../utils");
const decorators_1 = require("@paperbits/common/ko/decorators");
let FileInput = class FileInput {
    constructor() {
        this.selectedFileInfo = ko.observable();
        this.input = document.createElement("input");
        this.input.type = "file";
        this.input.onchange = this.onChange.bind(this);
    }
    onKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.input.click();
        }
    }
    onClick() {
        this.input.value = "";
        this.input.click();
    }
    onChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.selectedFileInfo(`${file.name} (${utils_1.Utils.formatBytes(file.size)})`);
            this.onSelect(file);
        }
        else {
            this.onSelect(null);
        }
    }
};
__decorate([
    (0, decorators_1.Event)(),
    __metadata("design:type", Function)
], FileInput.prototype, "onSelect", void 0);
FileInput = __decorate([
    (0, decorators_1.Component)({
        selector: "file-input",
        template: file_input_html_1.default
    }),
    __metadata("design:paramtypes", [])
], FileInput);
exports.FileInput = FileInput;
//# sourceMappingURL=file-input.js.map