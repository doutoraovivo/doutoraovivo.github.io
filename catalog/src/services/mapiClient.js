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
exports.MapiClient = void 0;
const _ = require("lodash");
const Constants = require("./../constants");
const utils_1 = require("../utils");
const ttlCache_1 = require("./ttlCache");
const http_1 = require("@paperbits/common/http");
const mapiError_1 = require("../errors/mapiError");
const authentication_1 = require("../authentication");
const knownHttpHeaders_1 = require("../models/knownHttpHeaders");
const constants_1 = require("./../constants");
class MapiClient {
    constructor(httpClient, authenticator, settingsProvider) {
        this.httpClient = httpClient;
        this.authenticator = authenticator;
        this.settingsProvider = settingsProvider;
        this.requestCache = new ttlCache_1.TtlCache();
    }
    ensureInitialized() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initializePromise) {
                this.initializePromise = this.initialize();
            }
            return this.initializePromise;
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.settingsProvider.getSettings();
            const managementApiUrl = settings[Constants.SettingNames.managementApiUrl];
            if (!managementApiUrl) {
                throw new Error(`Management API URL ("${Constants.SettingNames.managementApiUrl}") setting is missing in configuration file.`);
            }
            this.managementApiUrl = utils_1.Utils.ensureUrlArmified(managementApiUrl);
            const managementApiAccessToken = settings[Constants.SettingNames.managementApiAccessToken];
            if (managementApiAccessToken) {
                const accessToken = authentication_1.AccessToken.parse(managementApiAccessToken);
                yield this.authenticator.setAccessToken(accessToken);
            }
            else if (this.environment === "development") {
                console.warn(`Development mode: Please specify ${Constants.SettingNames.managementApiAccessToken}" in configuration file.`);
                return;
            }
            this.environment = settings["environment"];
        });
    }
    requestInternal(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!httpRequest.url) {
                throw new Error("Request URL cannot be empty.");
            }
            yield this.ensureInitialized();
            httpRequest.headers = httpRequest.headers || [];
            if (httpRequest.body && !httpRequest.headers.some(x => x.name === "Content-Type")) {
                httpRequest.headers.push({ name: "Content-Type", value: "application/json" });
            }
            if (!httpRequest.headers.some(x => x.name === "Accept")) {
                httpRequest.headers.push({ name: "Accept", value: "*/*" });
            }
            if (typeof (httpRequest.body) === "object") {
                httpRequest.body = JSON.stringify(httpRequest.body);
            }
            const call = () => this.makeRequest(httpRequest);
            const requestKey = this.getRequestKey(httpRequest);
            if (requestKey) {
                return this.requestCache.getOrAddAsync(requestKey, call, 1000);
            }
            return call();
        });
    }
    getRequestKey(httpRequest) {
        if (httpRequest.method !== http_1.HttpMethod.get && httpRequest.method !== http_1.HttpMethod.head && httpRequest.method !== "OPTIONS") {
            return null;
        }
        let key = `${httpRequest.method}:${httpRequest.url}`;
        if (httpRequest.headers) {
            key += ":" + httpRequest.headers.sort().map(k => `${k}=${httpRequest.headers.join(",")}`).join("&");
        }
        return key;
    }
    makeRequest(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = httpRequest.headers.find(header => header.name === knownHttpHeaders_1.KnownHttpHeaders.Authorization);
            if (!authHeader || !authHeader.value) {
                const authToken = yield this.authenticator.getAccessToken();
                if (authToken) {
                    httpRequest.headers.push({ name: knownHttpHeaders_1.KnownHttpHeaders.Authorization, value: `${authToken}` });
                }
            }
            const portalHeader = httpRequest.headers.find(header => header.name === constants_1.portalHeaderName);
            if (!portalHeader) {
                httpRequest.headers.push(MapiClient.getPortalHeader());
            }
            httpRequest.url = `${this.managementApiUrl}${utils_1.Utils.ensureLeadingSlash(httpRequest.url)}`;
            httpRequest.url = utils_1.Utils.addQueryParameter(httpRequest.url, `api-version=${Constants.managementApiVersion}`);
            let response;
            try {
                response = yield this.httpClient.send(httpRequest);
            }
            catch (error) {
                throw new Error(`Unable to complete request. Error: ${error.message}`);
            }
            try {
                yield this.authenticator.refreshAccessTokenFromHeader(response.headers);
            }
            catch (error) {
                console.error("Refresh token error: ", error);
            }
            return yield this.handleResponse(response, httpRequest.url);
        });
    }
    handleResponse(response, url) {
        return __awaiter(this, void 0, void 0, function* () {
            let contentType = "";
            if (response.headers) {
                const contentTypeHeader = response.headers.find(h => h.name.toLowerCase() === "content-type");
                contentType = contentTypeHeader ? contentTypeHeader.value.toLowerCase() : "";
            }
            const text = response.toText();
            if (response.statusCode >= 200 && response.statusCode < 300) {
                if (_.includes(contentType, "json") && text.length > 0) {
                    return JSON.parse(text);
                }
                else {
                    return text;
                }
            }
            else {
                yield this.handleError(response, url);
            }
        });
    }
    handleError(errorResponse, requestedUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (errorResponse.statusCode === 429) {
                throw new mapiError_1.MapiError("too_many_logins", "Too many attempts. Please try later.");
            }
            if (errorResponse.statusCode === 401) {
                const authHeader = errorResponse.headers.find(h => h.name.toLowerCase() === "www-authenticate");
                if (authHeader && authHeader.value.indexOf("Basic") !== -1) {
                    if (authHeader.value.indexOf("identity_not_confirmed") !== -1) {
                        throw new mapiError_1.MapiError("identity_not_confirmed", "User status is Pending. Please check confirmation email.");
                    }
                    if (authHeader.value.indexOf("invalid_identity") !== -1) {
                        throw new mapiError_1.MapiError("invalid_identity", "Invalid email or password.");
                    }
                }
            }
            const error = this.createMapiError(errorResponse.statusCode, requestedUrl, () => errorResponse.toObject().error);
            if (error) {
                error.response = errorResponse;
                throw error;
            }
            throw new mapiError_1.MapiError("Unhandled", "Unhandled error");
        });
    }
    createMapiError(statusCode, url, getError) {
        switch (statusCode) {
            case 400:
                return getError();
            case 401:
                this.authenticator.clearAccessToken();
                return new mapiError_1.MapiError("Unauthorized", "Unauthorized request.");
            case 403:
                return new mapiError_1.MapiError("Forbidden", "You're not authorized to perform this operation.");
            case 404:
                return new mapiError_1.MapiError("ResourceNotFound", `Resource not found: ${url}`);
            case 408:
                return new mapiError_1.MapiError("RequestTimeout", "Could not complete the request. Please try again later.");
            case 409:
                return getError();
            case 500:
                return new mapiError_1.MapiError("ServerError", "Internal server error.");
            default:
                return new mapiError_1.MapiError("Unhandled", `Unexpected status code in SMAPI response: ${statusCode}.`);
        }
    }
    get(url, headers) {
        return this.requestInternal({
            method: http_1.HttpMethod.get,
            url: url,
            headers: headers
        });
    }
    post(url, headers, body) {
        return this.requestInternal({
            method: http_1.HttpMethod.post,
            url: url,
            headers: headers,
            body: body
        });
    }
    patch(url, headers, body) {
        return this.requestInternal({
            method: http_1.HttpMethod.patch,
            url: url,
            headers: headers,
            body: body
        });
    }
    put(url, headers, body) {
        return this.requestInternal({
            method: http_1.HttpMethod.put,
            url: url,
            headers: headers,
            body: body
        });
    }
    delete(url, headers) {
        return this.requestInternal({
            method: http_1.HttpMethod.delete,
            url: url,
            headers: headers
        });
    }
    head(url, headers) {
        return this.requestInternal({
            method: http_1.HttpMethod.head,
            url: url,
            headers: headers
        });
    }
    static getPortalHeader(eventName) {
        let host = "";
        try {
            host = window.location.host;
        }
        catch (error) {
            host = "publishing";
        }
        return { name: constants_1.portalHeaderName, value: `${constants_1.developerPortalType}|${host}|${eventName || ""}` };
    }
}
exports.MapiClient = MapiClient;
//# sourceMappingURL=mapiClient.js.map