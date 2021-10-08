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
exports.ApiDetails = void 0;
const ko = require("knockout");
const api_details_html_1 = require("./api-details.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const apiService_1 = require("../../../../../services/apiService");
const routeHelper_1 = require("../../../../../routing/routeHelper");
let ApiDetails = class ApiDetails {
    constructor(apiService, routeHelper, router) {
        this.apiService = apiService;
        this.routeHelper = routeHelper;
        this.router = router;
        this.changeLogPageUrl = ko.observable();
        this.api = ko.observable();
        this.selectedApiName = ko.observable();
        this.versionApis = ko.observableArray([]);
        this.working = ko.observable(false);
        this.currentApiVersion = ko.observable();
        this.downloadSelected = ko.observable("");
        this.loadApi = this.loadApi.bind(this);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.routeHelper.getApiName();
            if (!apiName) {
                return;
            }
            this.selectedApiName(apiName);
            yield this.loadApi(apiName);
            this.router.addRouteChangeListener(this.onRouteChange);
            this.currentApiVersion.subscribe(this.onVersionChange);
            this.downloadSelected.subscribe(this.onDownloadChange);
        });
    }
    onRouteChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.routeHelper.getApiName();
            if (!apiName || apiName === this.selectedApiName()) {
                return;
            }
            this.selectedApiName(apiName);
            yield this.loadApi(apiName);
        });
    }
    loadApi(apiName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!apiName) {
                this.api(null);
                return;
            }
            const api = yield this.apiService.getApi(`apis/${apiName}`);
            if (!api) {
                this.api(null);
                return;
            }
            this.working(true);
            this.versionApis([]);
            this.currentApiVersion(api.name);
            this.api(api);
            this.working(false);
        });
    }
    onDownloadChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const definitionType = this.downloadSelected();
            if (!definitionType) {
                return;
            }
            if (this.api() && this.api().id) {
                let exportObject = yield this.apiService.exportApi(this.api().id, definitionType);
                let fileName = this.api().name;
                let fileType = "application/json";
                switch (definitionType) {
                    case "wsdl":
                    case "wadl":
                        fileType = "text/xml";
                        fileName = `${fileName}.${definitionType}.xml`;
                        break;
                    case "openapi":
                        fileName = `${fileName}.yaml`;
                        break;
                    default:
                        fileName = `${fileName}.json`;
                        exportObject = JSON.stringify(exportObject, null, 4);
                        break;
                }
                this.download(exportObject, fileName, fileType);
            }
            setTimeout(() => this.downloadSelected(""), 100);
        });
    }
    download(data, filename, type) {
        const file = new Blob([data], { type: type });
        const a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
    onVersionChange(selectedApiName) {
        const apiName = this.routeHelper.getApiName();
        if (apiName !== selectedApiName) {
            const apiUrl = this.routeHelper.getApiReferenceUrl(selectedApiName);
            this.router.navigateTo(apiUrl);
        }
    }
    getChangeLogUrl() {
        return this.routeHelper.getApiReferenceUrl(this.selectedApiName(), this.changeLogPageUrl());
    }
    dispose() {
        this.router.removeRouteChangeListener(this.onRouteChange);
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], ApiDetails.prototype, "changeLogPageUrl", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiDetails.prototype, "initialize", null);
__decorate([
    (0, decorators_1.OnDestroyed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiDetails.prototype, "dispose", null);
ApiDetails = __decorate([
    (0, decorators_1.RuntimeComponent)({
        selector: "api-details"
    }),
    (0, decorators_1.Component)({
        selector: "api-details",
        template: api_details_html_1.default
    }),
    __metadata("design:paramtypes", [apiService_1.ApiService,
        routeHelper_1.RouteHelper, Object])
], ApiDetails);
exports.ApiDetails = ApiDetails;
//# sourceMappingURL=api-details.js.map