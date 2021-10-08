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
exports.ValidationSummary = void 0;
const ko = require("knockout");
const validation_summary_html_1 = require("./validation-summary.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
let ValidationSummary = class ValidationSummary {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.errorMsgs = ko.observableArray([]);
        this.hasErrors = ko.observable(false);
        this.errorGroups = {};
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.eventManager.addEventListener("onValidationErrors", this.showValidationSummary.bind(this));
        });
    }
    showValidationSummary(event) {
        this.errorGroups[event.source] = event.errors;
        var errSum = [];
        Object.values(this.errorGroups).forEach(function (curGroup) {
            curGroup.forEach(x => {
                errSum.push(x);
            });
        });
        this.errorMsgs(errSum);
        if (this.errorMsgs().length > 0) {
            this.hasErrors(true);
        }
        else {
            this.hasErrors(false);
        }
    }
};
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ValidationSummary.prototype, "initialize", null);
ValidationSummary = __decorate([
    (0, decorators_1.RuntimeComponent)({
        selector: "validation-summary"
    }),
    (0, decorators_1.Component)({
        selector: "validation-summary",
        template: validation_summary_html_1.default
    }),
    __metadata("design:paramtypes", [Object])
], ValidationSummary);
exports.ValidationSummary = ValidationSummary;
//# sourceMappingURL=validation-summary.js.map