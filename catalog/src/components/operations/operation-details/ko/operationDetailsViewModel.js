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
exports.OperationDetailsViewModel = void 0;
const ko = require("knockout");
const operationDetails_html_1 = require("./operationDetails.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let OperationDetailsViewModel = class OperationDetailsViewModel {
    constructor() {
        this.config = ko.observable();
    }
};
OperationDetailsViewModel = __decorate([
    (0, decorators_1.Component)({
        selector: "operationDetails",
        template: operationDetails_html_1.default
    }),
    __metadata("design:paramtypes", [])
], OperationDetailsViewModel);
exports.OperationDetailsViewModel = OperationDetailsViewModel;
//# sourceMappingURL=operationDetailsViewModel.js.map