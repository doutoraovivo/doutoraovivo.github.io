"use strict";
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
exports.ApiService = void 0;
const lunr = require("lunr");
const api_1 = require("../models/api");
const page_1 = require("../models/page");
const operation_1 = require("../models/operation");
const utils_1 = require("../utils");
const tagGroup_1 = require("../models/tagGroup");
const openApiConverter_1 = require("./openApiConverter");
class ApiService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    fetchSpecs(searchPattern = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.send({ url: "/specs/index.json" });
            const indexData = response.toObject();
            const index = lunr.Index.load(indexData);
            const searchRawResults = index.search(`*${searchPattern}*`);
            const promises = searchRawResults
                .map(result => this.httpClient.send({ url: `/specs/${result.ref}` }));
            const results = yield Promise.all(promises);
            return results.map(response => response.toObject());
        });
    }
    getApis(searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const specs = yield this.fetchSpecs(searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.pattern);
            const converter = new openApiConverter_1.OpenApiConverter();
            const apis = specs.map(spec => converter.getApi(spec));
            const page = new page_1.Page();
            page.value = apis.map(apiContract => new api_1.Api(apiContract));
            return page;
        });
    }
    getOperationsByTags(apiId, searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getApisByTags(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagGroup = new tagGroup_1.TagGroup();
            const apis = yield this.getApis(searchRequest);
            tagGroup.items = apis.value;
            tagGroup.tag = "Untagged";
            const page = new page_1.Page();
            page.value = [tagGroup];
            page.nextLink = null;
            return page;
        });
    }
    getOperationTags(operationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    getApi(apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!apiId) {
                throw new Error(`Parameter "apiId" not specified.`);
            }
            const specs = yield this.fetchSpecs();
            const converter = new openApiConverter_1.OpenApiConverter();
            const spec = specs.find(spec => spec.info.title === apiId.replace("apis/", ""));
            const apiContract = converter.getApi(spec);
            if (!apiContract) {
                return null;
            }
            if (apiContract.properties.apiVersionSetId && !apiContract.properties.apiVersionSet) {
                const setId = utils_1.Utils.getResourceName("apiVersionSets", apiContract.properties.apiVersionSetId, "shortId");
                const apiVersionSetContract = yield this.getApiVersionSet(setId);
                apiContract.properties.apiVersionSet = apiVersionSetContract;
            }
            return new api_1.Api(apiContract);
        });
    }
    exportApi(apiId, format) {
        return null;
    }
    getApiVersionSet(versionSetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getOperation(apiName, operationName) {
        return __awaiter(this, void 0, void 0, function* () {
            const specs = yield this.fetchSpecs();
            const converter = new openApiConverter_1.OpenApiConverter();
            const spec = specs.find(spec => spec.info.title === apiName);
            const operations = converter.getOperations(spec);
            const operation = new operation_1.Operation(operations.find(x => x.name === operationName));
            return operation;
        });
    }
    getOperations(apiId, searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!apiId) {
                throw new Error(`Parameter "apiId" not specified.`);
            }
            const specs = yield this.fetchSpecs();
            const converter = new openApiConverter_1.OpenApiConverter();
            const spec = specs.find(spec => spec.info.title === apiId.replace("apis/", ""));
            const operations = converter.getOperations(spec);
            const page = new page_1.Page();
            page.value = operations.map(x => new operation_1.Operation(x));
            return page;
        });
    }
    getApiSchema(apiName) {
        return __awaiter(this, void 0, void 0, function* () {
            const specs = yield this.fetchSpecs();
            const converter = new openApiConverter_1.OpenApiConverter();
            const spec = specs.find(spec => spec.info.title === apiName);
            const schema = converter.getSchema(spec);
            return schema;
        });
    }
    getApiHostnames(apiName) {
        return __awaiter(this, void 0, void 0, function* () {
            const specs = yield this.fetchSpecs();
            const converter = new openApiConverter_1.OpenApiConverter();
            const spec = specs.find(spec => spec.info.title === apiName);
            return converter.getHostnames(spec);
        });
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=apiService.js.map