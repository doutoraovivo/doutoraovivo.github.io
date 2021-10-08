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
exports.ApiListDropdown = void 0;
const ko = require("knockout");
const Constants = require("../../../../../constants");
const api_list_dropdown_html_1 = require("./api-list-dropdown.html");
const decorators_1 = require("@paperbits/common/ko/decorators");
const routeHelper_1 = require("../../../../../routing/routeHelper");
const apiService_1 = require("../../../../../services/apiService");
let ApiListDropdown = class ApiListDropdown {
    constructor(apiService, router, routeHelper) {
        this.apiService = apiService;
        this.router = router;
        this.routeHelper = routeHelper;
        this.detailsPageUrl = ko.observable();
        this.allowSelection = ko.observable(false);
        this.working = ko.observable();
        this.selectedApi = ko.observable();
        this.selectedApiName = ko.observable();
        this.pattern = ko.observable();
        this.tags = ko.observable([]);
        this.page = ko.observable(1);
        this.hasPrevPage = ko.observable();
        this.hasNextPage = ko.observable();
        this.hasPager = ko.computed(() => this.hasPrevPage() || this.hasNextPage());
        this.apiGroups = ko.observableArray();
        this.selection = ko.computed(() => {
            const api = ko.unwrap(this.selectedApi);
            return api ? api.versionedDisplayName : "Select API";
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resetSearch();
            yield this.checkSelection();
            this.pattern
                .extend({ rateLimit: { timeout: Constants.defaultInputDelayMs, method: "notifyWhenChangesStop" } })
                .subscribe(this.resetSearch);
            this.tags
                .subscribe(this.resetSearch);
            this.router.addRouteChangeListener(this.onRouteChange);
        });
    }
    resetSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.page(1);
            this.loadPageOfApis();
        });
    }
    onRouteChange() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiName = this.routeHelper.getApiName();
            if (apiName === this.selectedApiName()) {
                return;
            }
            yield this.checkSelection();
        });
    }
    loadPageOfApis() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.working(true);
                const pageNumber = this.page() - 1;
                const query = {
                    pattern: this.pattern(),
                    tags: this.tags(),
                    skip: pageNumber * Constants.defaultPageSize,
                    take: Constants.defaultPageSize
                };
                const pageOfTagResources = yield this.apiService.getApisByTags(query);
                const apiGroups = pageOfTagResources.value;
                this.apiGroups(apiGroups);
                const nextLink = pageOfTagResources.nextLink;
                this.hasPrevPage(pageNumber > 0);
                this.hasNextPage(!!nextLink);
            }
            catch (error) {
                throw new Error(`Unable to load APIs. ${error.message}`);
            }
            finally {
                this.working(false);
            }
        });
    }
    checkSelection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.allowSelection()) {
                return;
            }
            const apiName = this.routeHelper.getApiName();
            if (!apiName) {
                return;
            }
            const api = yield this.apiService.getApi(`apis/${apiName}`);
            if (!api) {
                return;
            }
            this.selectedApi(api);
            this.selectedApiName(apiName);
        });
    }
    prevPage() {
        this.page(this.page() - 1);
        this.loadPageOfApis();
    }
    nextPage() {
        this.page(this.page() + 1);
        this.loadPageOfApis();
    }
    getReferenceUrl(api) {
        return this.routeHelper.getApiReferenceUrl(api.name, this.detailsPageUrl());
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
], ApiListDropdown.prototype, "allowSelection", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], ApiListDropdown.prototype, "detailsPageUrl", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiListDropdown.prototype, "initialize", null);
__decorate([
    (0, decorators_1.OnDestroyed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiListDropdown.prototype, "dispose", null);
ApiListDropdown = __decorate([
    (0, decorators_1.RuntimeComponent)({
        selector: "api-list-dropdown"
    }),
    (0, decorators_1.Component)({
        selector: "api-list-dropdown",
        template: api_list_dropdown_html_1.default
    }),
    __metadata("design:paramtypes", [apiService_1.ApiService, Object, routeHelper_1.RouteHelper])
], ApiListDropdown);
exports.ApiListDropdown = ApiListDropdown;
//# sourceMappingURL=api-list-dropdown.js.map