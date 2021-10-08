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
exports.ApiList = void 0;
const ko = require("knockout");
const Constants = require("../../../../../constants");
const api_list_html_1 = require("./api-list.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const apiService_1 = require("../../../../../services/apiService");
const routeHelper_1 = require("../../../../../routing/routeHelper");
let ApiList = class ApiList {
    constructor(apiService, routeHelper) {
        this.apiService = apiService;
        this.routeHelper = routeHelper;
        this.detailsPageUrl = ko.observable();
        this.allowSelection = ko.observable(false);
        this.showApiType = ko.observable(true);
        this.apis = ko.observableArray([]);
        this.working = ko.observable();
        this.pattern = ko.observable();
        this.tags = ko.observable([]);
        this.page = ko.observable(1);
        this.hasPrevPage = ko.observable();
        this.hasNextPage = ko.observable();
        this.hasPager = ko.computed(() => this.hasPrevPage() || this.hasNextPage());
        this.apiGroups = ko.observableArray();
        this.groupByTag = ko.observable(false);
        this.defaultGroupByTagToEnabled = ko.observable(false);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.groupByTag(this.defaultGroupByTagToEnabled());
            yield this.resetSearch();
            this.pattern
                .extend({ rateLimit: { timeout: Constants.defaultInputDelayMs, method: "notifyWhenChangesStop" } })
                .subscribe(this.resetSearch);
            this.tags
                .subscribe(this.resetSearch);
            this.groupByTag
                .subscribe(this.resetSearch);
        });
    }
    loadPageOfApis() {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNumber = this.page() - 1;
            const query = {
                pattern: this.pattern(),
                tags: this.tags(),
                skip: pageNumber * Constants.defaultPageSize,
                take: Constants.defaultPageSize
            };
            let nextLink;
            try {
                this.working(true);
                if (this.groupByTag()) {
                    const pageOfTagResources = yield this.apiService.getApisByTags(query);
                    const apiGroups = pageOfTagResources.value;
                    this.apiGroups(apiGroups);
                    nextLink = pageOfTagResources.nextLink;
                }
                else {
                    const pageOfApis = yield this.apiService.getApis(query);
                    const apis = pageOfApis ? pageOfApis.value : [];
                    this.apis(apis);
                    nextLink = pageOfApis.nextLink;
                }
                this.hasPrevPage(pageNumber > 0);
                this.hasNextPage(!!nextLink);
            }
            catch (error) {
                throw new Error(`Unable to load APIs. Error: ${error.message}`);
            }
            finally {
                this.working(false);
            }
        });
    }
    getReferenceUrl(api) {
        return this.routeHelper.getApiReferenceUrl(api.name, this.detailsPageUrl());
    }
    prevPage() {
        this.page(this.page() - 1);
        this.loadPageOfApis();
    }
    nextPage() {
        this.page(this.page() + 1);
        this.loadPageOfApis();
    }
    resetSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.page(1);
            this.loadPageOfApis();
        });
    }
    onTagsChange(tags) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tags(tags);
        });
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], ApiList.prototype, "allowSelection", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], ApiList.prototype, "showApiType", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], ApiList.prototype, "defaultGroupByTagToEnabled", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], ApiList.prototype, "detailsPageUrl", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiList.prototype, "initialize", null);
ApiList = __decorate([
    (0, decorators_1.RuntimeComponent)({
        selector: "api-list"
    }),
    (0, decorators_1.Component)({
        selector: "api-list",
        template: api_list_html_1.default
    }),
    __metadata("design:paramtypes", [apiService_1.ApiService,
        routeHelper_1.RouteHelper])
], ApiList);
exports.ApiList = ApiList;
//# sourceMappingURL=api-list.js.map