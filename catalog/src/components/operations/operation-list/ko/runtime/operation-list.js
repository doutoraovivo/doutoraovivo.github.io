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
exports.OperationList = void 0;
const ko = require("knockout");
const Constants = require("../../../../../constants");
const operation_list_html_1 = require("./operation-list.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const apiService_1 = require("../../../../../services/apiService");
const routeHelper_1 = require("../../../../../routing/routeHelper");
let OperationList = class OperationList {
    constructor(apiService, router, routeHelper) {
        this.apiService = apiService;
        this.router = router;
        this.routeHelper = routeHelper;
        this.detailsPageUrl = ko.observable();
        this.allowSelection = ko.observable(false);
        this.wrapText = ko.observable();
        this.showUrlPath = ko.observable();
        this.defaultShowUrlPath = ko.observable();
        this.showToggleUrlPath = ko.observable();
        this.operations = ko.observableArray();
        this.operationGroups = ko.observableArray();
        this.selectedApiName = ko.observable();
        this.selectedOperationName = ko.observable().extend({ acceptChange: this.allowSelection });
        this.working = ko.observable(false);
        this.groupByTag = ko.observable(false);
        this.defaultGroupByTagToEnabled = ko.observable(false);
        this.pattern = ko.observable();
        this.tags = ko.observable([]);
        this.pageNumber = ko.observable(1);
        this.hasNextPage = ko.observable();
        this.hasPrevPage = ko.observable();
        this.hasPager = ko.computed(() => this.hasPrevPage() || this.hasNextPage());
        this.tagScope = ko.computed(() => this.selectedApiName() ? `apis/${this.selectedApiName()}` : "");
        this.apiType = ko.observable();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.routeHelper.getApiName();
            const operationName = this.routeHelper.getOperationName();
            this.selectedApiName(apiName);
            this.selectedOperationName(operationName);
            this.groupByTag(this.defaultGroupByTagToEnabled());
            this.tags.subscribe(this.resetSearch);
            this.showUrlPath(this.defaultShowUrlPath());
            if (this.selectedApiName()) {
                yield this.loadOperations();
            }
            this.pattern
                .extend({ rateLimit: { timeout: Constants.defaultInputDelayMs, method: "notifyWhenChangesStop" } })
                .subscribe(this.resetSearch);
            this.groupByTag
                .subscribe(this.loadOperations);
            this.router.addRouteChangeListener(this.onRouteChange);
        });
    }
    onRouteChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.routeHelper.getApiName();
            const operationName = this.routeHelper.getOperationName();
            if (apiName !== this.selectedApiName()) {
                this.selectedApiName(apiName);
                this.selectedOperationName(null);
                yield this.resetSearch();
                return;
            }
            if (operationName !== this.selectedOperationName()) {
                this.selectedOperationName(operationName);
            }
        });
    }
    loadOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.groupByTag()) {
                this.operationGroups([]);
                this.searchRequest = { pattern: this.pattern(), tags: this.tags(), grouping: "tag" };
            }
            else {
                this.operations([]);
                this.searchRequest = { pattern: this.pattern(), tags: this.tags(), grouping: "none" };
            }
            this.searchRequest.propertyName = this.showUrlPath() ? 'urlTemplate' : undefined;
            try {
                this.working(true);
                const apiType = yield this.getApiType();
                if (apiType === "websocket") {
                    yield this.loadPageOfOperations();
                    this.selectFirstOperation();
                }
                else {
                    if (this.groupByTag()) {
                        yield this.loadOfOperationsByTag();
                    }
                    else {
                        yield this.loadPageOfOperations();
                    }
                    if (this.allowSelection() && !this.selectedOperationName()) {
                        this.selectFirstOperation();
                    }
                }
            }
            catch (error) {
                throw new Error(`Unable to load operations: Error: ${error.message}`);
            }
            finally {
                this.working(false);
            }
        });
    }
    getApiType() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.selectedApiName();
            if (!apiName) {
                return;
            }
            const api = yield this.apiService.getApi(`apis/${apiName}`);
            this.apiType(api === null || api === void 0 ? void 0 : api.type);
            return api === null || api === void 0 ? void 0 : api.type;
        });
    }
    loadOfOperationsByTag() {
        return __awaiter(this, void 0, void 0, function* () {
            this.searchRequest.skip = (this.pageNumber() - 1) * Constants.defaultPageSize;
            const pageOfOperationsByTag = yield this.apiService.getOperationsByTags(this.selectedApiName(), this.searchRequest);
            const operationGroups = pageOfOperationsByTag.value;
            this.operationGroups(operationGroups);
            this.hasPrevPage(this.pageNumber() > 1);
            this.hasNextPage(!!pageOfOperationsByTag.nextLink);
        });
    }
    loadPageOfOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.selectedApiName();
            if (!apiName) {
                return;
            }
            this.searchRequest.skip = (this.pageNumber() - 1) * Constants.defaultPageSize;
            const pageOfOperations = yield this.apiService.getOperations(`apis/${apiName}`, this.searchRequest);
            this.operations(pageOfOperations.value);
            this.hasPrevPage(this.pageNumber() > 1);
            this.hasNextPage(!!pageOfOperations.nextLink);
        });
    }
    selectFirstOperation() {
        let operationName;
        if (this.groupByTag()) {
            const groups = this.operationGroups();
            if (groups.length < 1 || groups[0].items.length < 1) {
                return;
            }
            operationName = groups[0].items[0].name;
        }
        else {
            const operations = this.operations();
            if (operations.length < 1) {
                return;
            }
            operationName = operations[0].name;
        }
        this.selectedOperationName(operationName);
        const operationUrl = this.routeHelper.getOperationReferenceUrl(this.selectedApiName(), operationName, this.detailsPageUrl());
        this.router.navigateTo(operationUrl);
    }
    getReferenceUrl(operation) {
        const apiName = this.routeHelper.getApiName();
        return this.routeHelper.getOperationReferenceUrl(apiName, operation.name, this.detailsPageUrl());
    }
    resetSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pageNumber(1);
            this.loadOperations();
        });
    }
    prevPage() {
        this.pageNumber(this.pageNumber() - 1);
        if (this.groupByTag()) {
            this.loadOfOperationsByTag();
        }
        else {
            this.loadPageOfOperations();
        }
    }
    nextPage() {
        this.pageNumber(this.pageNumber() + 1);
        if (this.groupByTag()) {
            this.loadOfOperationsByTag();
        }
        else {
            this.loadPageOfOperations();
        }
    }
    onTagsChange(tags) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tags(tags);
        });
    }
    dispose() {
        this.router.removeRouteChangeListener(this.onRouteChange);
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationList.prototype, "allowSelection", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationList.prototype, "wrapText", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationList.prototype, "defaultShowUrlPath", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationList.prototype, "showToggleUrlPath", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationList.prototype, "defaultGroupByTagToEnabled", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationList.prototype, "detailsPageUrl", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperationList.prototype, "initialize", null);
__decorate([
    (0, decorators_1.OnDestroyed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OperationList.prototype, "dispose", null);
OperationList = __decorate([
    (0, decorators_1.RuntimeComponent)({
        selector: "operation-list"
    }),
    (0, decorators_1.Component)({
        selector: "operation-list",
        template: operation_list_html_1.default
    }),
    __metadata("design:paramtypes", [apiService_1.ApiService, Object, routeHelper_1.RouteHelper])
], OperationList);
exports.OperationList = OperationList;
//# sourceMappingURL=operation-list.js.map