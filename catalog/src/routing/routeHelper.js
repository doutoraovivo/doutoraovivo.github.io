"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteHelper = void 0;
const Constants = require("../constants");
class RouteHelper {
    constructor(router) {
        this.router = router;
    }
    getHashParameter(name) {
        const route = this.router.getCurrentRoute();
        const params = new URLSearchParams(`?${route.hash}`);
        return params.get(name);
    }
    getApiName() {
        return this.getHashParameter("api");
    }
    getOperationName() {
        return this.getHashParameter("operation");
    }
    getProductName() {
        return this.getHashParameter("product");
    }
    getApiReferenceUrl(apiName, detailsPageUrl = "") {
        if (!apiName) {
            throw new Error(`Parameter "apiName" not specified.`);
        }
        let path = "";
        const currentPath = this.router.getPath();
        if (currentPath !== detailsPageUrl) {
            path = detailsPageUrl;
        }
        return `${path}#api=${apiName}`;
    }
    getOperationReferenceUrl(apiName, operationName, detailsPageUrl = "") {
        if (!apiName) {
            throw new Error(`Parameter "apiName" not specified.`);
        }
        if (!operationName) {
            throw new Error(`Parameter "operationName" not specified.`);
        }
        let path = "";
        const currentPath = this.router.getPath();
        if (currentPath !== detailsPageUrl) {
            path = detailsPageUrl;
        }
        return `${path}#api=${apiName}&operation=${operationName}`;
    }
    getDefinitionReferenceId(apiName, operationName, definitionName) {
        if (!apiName) {
            throw new Error(`Parameter "apiName" not specified.`);
        }
        if (!operationName) {
            throw new Error(`Parameter "operationName" not specified.`);
        }
        if (!definitionName) {
            throw new Error(`Parameter "definitionName" not specified.`);
        }
        return `api=${apiName}&operation=${operationName}&definition=${definitionName}`;
    }
    getDefinitionAnchor(apiName, operationName, definitionName) {
        if (!apiName) {
            throw new Error(`Parameter "apiName" not specified.`);
        }
        if (!operationName) {
            throw new Error(`Parameter "operationName" not specified.`);
        }
        if (!definitionName) {
            throw new Error(`Parameter "definitionName" not specified.`);
        }
        return `#api=${apiName}&operation=${operationName}&definition=${definitionName}`;
    }
    getProductReferenceUrl(productName, detailsPageUrl = "") {
        if (!productName) {
            throw new Error(`Parameter "productName" not specified.`);
        }
        let path = "";
        const currentPath = this.router.getPath();
        if (currentPath !== detailsPageUrl) {
            path = detailsPageUrl;
        }
        return `${path}#product=${productName}`;
    }
    getIdTokenReferenceUrl(provider, idToken) {
        if (!provider) {
            throw new Error(`Parameter "provider" not specified.`);
        }
        if (!idToken) {
            throw new Error(`Parameter "idToken" not specified.`);
        }
        let path = "";
        const currentPath = this.router.getPath();
        if (currentPath !== Constants.pageUrlSignUpOAuth) {
            path = Constants.pageUrlSignUpOAuth;
        }
        return `${path}#provider=${provider}&token=${idToken}`;
    }
    getIdToken() {
        return this.getHashParameter("token");
    }
    getIdTokenProvider() {
        return this.getHashParameter("provider");
    }
    getQueryParameter(name) {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get(name);
    }
}
exports.RouteHelper = RouteHelper;
//# sourceMappingURL=routeHelper.js.map