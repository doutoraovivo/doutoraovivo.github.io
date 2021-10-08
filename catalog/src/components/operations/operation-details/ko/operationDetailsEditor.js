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
exports.OperationDetailsEditor = void 0;
const ko = require("knockout");
const operationDetailsEditor_html_1 = require("./operationDetailsEditor.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const operationDetailsModel_1 = require("../operationDetailsModel");
let OperationDetailsEditor = class OperationDetailsEditor {
    constructor() {
        this.enableConsole = ko.observable();
        this.enableScrollTo = ko.observable();
        this.defaultSchemaView = ko.observable();
        this.useCorsProxy = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.enableConsole(this.model.enableConsole);
            this.useCorsProxy(this.model.useCorsProxy);
            this.enableScrollTo(this.model.enableScrollTo);
            this.defaultSchemaView(this.model.defaultSchemaView || "table");
            this.enableConsole.subscribe(this.applyChanges);
            this.useCorsProxy.subscribe(this.applyChanges);
            this.enableScrollTo.subscribe(this.applyChanges);
            this.defaultSchemaView.subscribe(this.applyChanges);
        });
    }
    applyChanges() {
        this.model.enableConsole = this.enableConsole();
        this.model.useCorsProxy = this.useCorsProxy();
        this.model.enableScrollTo = this.enableScrollTo();
        this.model.defaultSchemaView = this.defaultSchemaView();
        this.onChange(this.model);
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", operationDetailsModel_1.OperationDetailsModel)
], OperationDetailsEditor.prototype, "model", void 0);
__decorate([
    (0, decorators_1.Event)(),
    __metadata("design:type", Function)
], OperationDetailsEditor.prototype, "onChange", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperationDetailsEditor.prototype, "initialize", null);
OperationDetailsEditor = __decorate([
    (0, decorators_1.Component)({
        selector: "operation-details-editor",
        template: operationDetailsEditor_html_1.default
    }),
    __metadata("design:paramtypes", [])
], OperationDetailsEditor);
exports.OperationDetailsEditor = OperationDetailsEditor;
//# sourceMappingURL=operationDetailsEditor.js.map