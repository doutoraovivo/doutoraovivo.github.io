"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const spinner_html_1 = require("./spinner.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let Spinner = class Spinner {
};
Spinner = __decorate([
    (0, decorators_1.Component)({
        selector: "spinner",
        template: spinner_html_1.default
    })
], Spinner);
exports.Spinner = Spinner;
//# sourceMappingURL=spinner.js.map