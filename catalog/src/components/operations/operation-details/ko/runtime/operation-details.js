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
exports.OperationDetails = void 0;
const ko = require("knockout");
const operation_details_html_1 = require("./operation-details.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const apiService_1 = require("../../../../../services/apiService");
const typeDefinition_1 = require("./../../../../../models/typeDefinition");
const routeHelper_1 = require("../../../../../routing/routeHelper");
const utils_1 = require("../../../../../utils");
const constants_1 = require("../../../../../constants");
const typeDefinition_2 = require("../../../../../models/typeDefinition");
let OperationDetails = class OperationDetails {
    constructor(apiService, router, routeHelper) {
        this.apiService = apiService;
        this.router = router;
        this.routeHelper = routeHelper;
        this.working = ko.observable(false);
        this.sampleHostname = ko.observable();
        this.hostnames = ko.observable();
        this.associatedAuthServer = ko.observable();
        this.api = ko.observable();
        this.schemas = ko.observableArray([]);
        this.tags = ko.observableArray([]);
        this.operation = ko.observable();
        this.selectedApiName = ko.observable();
        this.selectedOperationName = ko.observable();
        this.consoleIsOpen = ko.observable();
        this.definitions = ko.observableArray();
        this.defaultSchemaView = ko.observable("table");
        this.useCorsProxy = ko.observable();
        this.requestUrlSample = ko.computed(() => {
            if (!this.api() || !this.operation()) {
                return null;
            }
            const api = this.api();
            const operation = this.operation();
            const hostname = this.sampleHostname();
            let operationPath = api.versionedPath;
            if (api.type !== constants_1.TypeOfApi.soap) {
                operationPath += operation.displayUrlTemplate;
            }
            if (api.type === constants_1.TypeOfApi.webSocket) {
                return `${hostname}${utils_1.Utils.ensureLeadingSlash(operationPath)}`;
            }
            return `https://${hostname}${utils_1.Utils.ensureLeadingSlash(operationPath)}`;
        });
        this.protocol = ko.computed(() => {
            var _a;
            const api = this.api();
            if (!api) {
                return null;
            }
            return (_a = api.protocols) === null || _a === void 0 ? void 0 : _a.join(", ");
        });
        this.apiType = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.routeHelper.getApiName();
            const operationName = this.routeHelper.getOperationName();
            this.selectedApiName(apiName);
            this.selectedOperationName(operationName);
            this.router.addRouteChangeListener(this.onRouteChange.bind(this));
            if (apiName) {
                yield this.loadApi(apiName);
            }
            if (operationName) {
                yield this.loadOperation(apiName, operationName);
            }
        });
    }
    onRouteChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.routeHelper.getApiName();
            const operationName = this.routeHelper.getOperationName();
            if (apiName && apiName !== this.selectedApiName()) {
                this.selectedApiName(apiName);
                yield this.loadApi(apiName);
            }
            if (apiName === this.selectedApiName() && operationName === this.selectedOperationName()) {
                return;
            }
            if (!operationName) {
                this.selectedOperationName(null);
                this.operation(null);
                return;
            }
            if (apiName && operationName) {
                this.selectedOperationName(operationName);
                yield this.loadOperation(apiName, operationName);
            }
        });
    }
    loadApi(apiName) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!apiName) {
                return;
            }
            const api = yield this.apiService.getApi(`apis/${apiName}`);
            if (!api) {
                return;
            }
            yield this.loadGatewayInfo(apiName);
            this.apiType(api === null || api === void 0 ? void 0 : api.type);
            this.api(api);
            this.closeConsole();
            const associatedServerId = ((_b = (_a = api.authenticationSettings) === null || _a === void 0 ? void 0 : _a.oAuth2) === null || _b === void 0 ? void 0 : _b.authorizationServerId) ||
                ((_d = (_c = api.authenticationSettings) === null || _c === void 0 ? void 0 : _c.openid) === null || _d === void 0 ? void 0 : _d.openidProviderId);
            let associatedAuthServer = null;
            if (this.authorizationServers && associatedServerId) {
                associatedAuthServer = this.authorizationServers
                    .find(x => x.name === associatedServerId);
            }
            this.associatedAuthServer(associatedAuthServer);
        });
    }
    loadOperation(apiName, operationName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.working(true);
            const operation = yield this.apiService.getOperation(apiName, operationName);
            if (operation) {
                yield this.loadDefinitions(operation);
                this.operation(operation);
            }
            else {
                this.cleanSelection();
            }
            const operationTags = yield this.apiService.getOperationTags(`apis/${apiName}/operations/${operationName}`);
            this.tags(operationTags.map(tag => tag.name));
            this.working(false);
            if (this.enableScrollTo) {
                const headerElement = document.querySelector(".operation-header");
                headerElement && headerElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
            }
        });
    }
    loadDefinitions(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaIds = [];
            const apiId = this.selectedApiName();
            const representations = operation.responses
                .map(response => response.representations)
                .concat(operation.request.representations)
                .flat();
            representations
                .map(representation => representation.schemaId)
                .filter(schemaId => !!schemaId)
                .forEach(schemaId => {
                if (!schemaIds.includes(schemaId)) {
                    schemaIds.push(schemaId);
                }
            });
            const typeNames = representations
                .filter(p => !!p.typeName)
                .map(p => p.typeName)
                .filter((item, pos, self) => self.indexOf(item) === pos);
            const schemasPromises = schemaIds.map(schemaId => this.apiService.getApiSchema(this.selectedApiName()));
            const schemas = yield Promise.all(schemasPromises);
            const definitions = schemas.map(x => x.definitions).flat();
            let lookupResult = [...typeNames];
            while (lookupResult.length > 0) {
                const references = definitions.filter(definition => lookupResult.indexOf(definition.name) !== -1);
                lookupResult = references.length === 0
                    ? []
                    : this.lookupReferences(references, typeNames);
                if (lookupResult.length > 0) {
                    typeNames.push(...lookupResult);
                }
            }
            this.definitions(definitions.filter(definition => typeNames.indexOf(definition.name) !== -1));
        });
    }
    lookupReferences(definitions, skipNames) {
        const result = [];
        const objectDefinitions = definitions
            .map(definition => definition.properties)
            .filter(definition => !!definition)
            .flat();
        objectDefinitions.forEach(definition => {
            if (definition.kind === "indexed") {
                result.push(definition.type["name"]);
            }
            if ((definition.type instanceof typeDefinition_2.TypeDefinitionPropertyTypeReference
                || definition.type instanceof typeDefinition_2.TypeDefinitionPropertyTypeArrayOfPrimitive
                || definition.type instanceof typeDefinition_2.TypeDefinitionPropertyTypeArrayOfReference)) {
                result.push(definition.type.name);
            }
            if (definition.type instanceof typeDefinition_1.TypeDefinitionPropertyTypeCombination) {
                result.push(...definition.type.combination.map(x => x["name"]));
            }
        });
        return result.filter(x => !skipNames.includes(x));
    }
    loadGatewayInfo(apiName) {
        return __awaiter(this, void 0, void 0, function* () {
            const hostnames = yield this.apiService.getApiHostnames(apiName);
            if (hostnames.length === 0) {
                throw new Error(`Unable to fetch gateway hostnames.`);
            }
            this.sampleHostname(hostnames[0]);
            this.hostnames(hostnames);
        });
    }
    cleanSelection() {
        this.operation(null);
        this.selectedOperationName(null);
        this.closeConsole();
    }
    openConsole() {
        this.consoleIsOpen(true);
    }
    closeConsole() {
        this.consoleIsOpen(false);
    }
    getDefinitionForRepresentation(representation) {
        let definition = this.definitions().find(x => x.name === representation.typeName);
        if (!definition) {
            return new typeDefinition_2.TypeDefinition(representation.typeName, {});
        }
        definition = utils_1.Utils.clone(definition);
        if (!definition.name) {
            definition.name = representation.typeName;
        }
        if (representation.example) {
            definition.example = representation.example;
            definition.exampleFormat = representation.exampleFormat;
        }
        return definition;
    }
    getDefinitionReferenceUrl(definition) {
        const apiName = this.api().name;
        const operationName = this.operation().name;
        return this.routeHelper.getDefinitionAnchor(apiName, operationName, definition.name);
    }
    dispose() {
        this.router.removeRouteChangeListener(this.onRouteChange);
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Boolean)
], OperationDetails.prototype, "enableConsole", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationDetails.prototype, "useCorsProxy", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Boolean)
], OperationDetails.prototype, "enableScrollTo", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Array)
], OperationDetails.prototype, "authorizationServers", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationDetails.prototype, "defaultSchemaView", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperationDetails.prototype, "initialize", null);
__decorate([
    (0, decorators_1.OnDestroyed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OperationDetails.prototype, "dispose", null);
OperationDetails = __decorate([
    (0, decorators_1.RuntimeComponent)({
        selector: "operation-details"
    }),
    (0, decorators_1.Component)({
        selector: "operation-details",
        template: operation_details_html_1.default
    }),
    __metadata("design:paramtypes", [apiService_1.ApiService, Object, routeHelper_1.RouteHelper])
], OperationDetails);
exports.OperationDetails = OperationDetails;
//# sourceMappingURL=operation-details.js.map