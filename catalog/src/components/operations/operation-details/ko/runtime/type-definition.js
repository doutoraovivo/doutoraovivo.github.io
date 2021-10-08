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
exports.TypeDefinitionViewModel = void 0;
const ko = require("knockout");
const type_definition_html_1 = require("./type-definition.html");
const type_definition_enum_html_1 = require("./type-definition-enum.html");
const type_definition_indexer_html_1 = require("./type-definition-indexer.html");
const type_definition_object_html_1 = require("./type-definition-object.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const typeDefinition_1 = require("../../../../../models/typeDefinition");
const routeHelper_1 = require("../../../../../routing/routeHelper");
let TypeDefinitionViewModel = class TypeDefinitionViewModel {
    constructor(routeHelper) {
        this.routeHelper = routeHelper;
        this.name = ko.observable();
        this.description = ko.observable();
        this.kind = ko.observable();
        this.example = ko.observable();
        this.exampleFormat = ko.observable();
        this.rawSchema = ko.observable();
        this.rawSchemaFormat = ko.observable();
        this.schemaView = ko.observable();
        this.defaultSchemaView = ko.observable();
    }
    initialize() {
        this.schemaView(this.defaultSchemaView() || "table");
        this.rawSchema(this.definition.rawSchema);
        this.rawSchemaFormat(this.definition.rawSchemaFormat);
        this.name(this.definition.name);
        this.description(this.definition.description);
        this.kind(this.definition.kind);
        if (this.definition.example) {
            this.exampleFormat(this.definition.exampleFormat);
            this.example(this.definition.example);
        }
    }
    getReferenceId(definition) {
        return this.routeHelper.getDefinitionReferenceId(this.apiName, this.operationName, definition.name);
    }
    getReferenceUrl(typeName) {
        return this.routeHelper.getDefinitionAnchor(this.apiName, this.operationName, typeName);
    }
    switchToTable() {
        this.schemaView("table");
    }
    switchToRaw() {
        this.schemaView("raw");
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", typeDefinition_1.TypeDefinition)
], TypeDefinitionViewModel.prototype, "definition", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", String)
], TypeDefinitionViewModel.prototype, "apiName", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", String)
], TypeDefinitionViewModel.prototype, "operationName", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", String)
], TypeDefinitionViewModel.prototype, "anchor", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], TypeDefinitionViewModel.prototype, "defaultSchemaView", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypeDefinitionViewModel.prototype, "initialize", null);
TypeDefinitionViewModel = __decorate([
    (0, decorators_1.Component)({
        selector: "type-definition",
        template: type_definition_html_1.default,
        childTemplates: {
            typeDefinitionEnum: type_definition_enum_html_1.default,
            typeDefinitionIndexer: type_definition_indexer_html_1.default,
            typeDefinitionObject: type_definition_object_html_1.default
        }
    }),
    __metadata("design:paramtypes", [routeHelper_1.RouteHelper])
], TypeDefinitionViewModel);
exports.TypeDefinitionViewModel = TypeDefinitionViewModel;
//# sourceMappingURL=type-definition.js.map