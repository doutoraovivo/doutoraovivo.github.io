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
exports.BackendService = void 0;
const http_1 = require("@paperbits/common/http");
const constants_1 = require("../constants");
class BackendService {
    constructor(settingsProvider, httpClient, authenticator) {
        this.settingsProvider = settingsProvider;
        this.httpClient = httpClient;
        this.authenticator = authenticator;
    }
    getCaptchaParams() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            const httpRequest = {
                method: http_1.HttpMethod.get,
                url: yield this.getUrl("/captcha")
            };
            try {
                response = yield this.httpClient.send(httpRequest);
            }
            catch (error) {
                throw new Error(`Unable to complete request. Error: ${error.message}`);
            }
            return this.handleResponse(response);
        });
    }
    sendSignupRequest(signupRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.send({
                url: yield this.getUrl("/signup"),
                method: http_1.HttpMethod.post,
                headers: [{ name: "Content-Type", value: "application/json" }],
                body: JSON.stringify(signupRequest)
            });
            if (response.statusCode !== 200) {
                if (response.statusCode === 400) {
                    const responseObj = response.toObject();
                    throw responseObj.error;
                }
                else {
                    throw Error(response.toText());
                }
            }
        });
    }
    sendResetRequest(resetRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.send({
                url: yield this.getUrl("/reset-password-request"),
                method: http_1.HttpMethod.post,
                headers: [{ name: "Content-Type", value: "application/json" }],
                body: JSON.stringify(resetRequest)
            });
            if (response.statusCode !== 200) {
                if (response.statusCode === 400) {
                    const responseObj = response.toObject();
                    throw responseObj.error;
                }
                else {
                    throw Error(response.toText());
                }
            }
        });
    }
    sendChangePassword(changePasswordRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = yield this.authenticator.getAccessToken();
            if (!authToken) {
                throw Error("Auth token not found");
            }
            const response = yield this.httpClient.send({
                url: yield this.getUrl("/change-password"),
                method: http_1.HttpMethod.post,
                headers: [{ name: "Authorization", value: authToken }, { name: "Content-Type", value: "application/json" }],
                body: JSON.stringify(changePasswordRequest)
            });
            if (response.statusCode !== 200) {
                if (response.statusCode === 400) {
                    const responseObj = response.toObject();
                    throw responseObj.error;
                }
                else {
                    throw Error(response.toText());
                }
            }
        });
    }
    getDelegationUrl(action, delegationParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = yield this.authenticator.getAccessToken();
            if (!authToken) {
                throw Error("Auth token not found");
            }
            const payload = {
                delegationAction: action,
                delegationParameters: delegationParameters
            };
            const response = yield this.httpClient.send({
                url: yield this.getUrl("/delegation-url"),
                method: http_1.HttpMethod.post,
                headers: [{ name: "Authorization", value: authToken }, { name: "Content-Type", value: "application/json" }],
                body: JSON.stringify(payload)
            });
            if (response.statusCode === 200) {
                const result = response.toObject();
                return result["url"];
            }
            else {
                throw Error(response.toText());
            }
        });
    }
    getUrl(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.portalUrl) {
                this.portalUrl = (yield this.settingsProvider.getSetting(constants_1.SettingNames.backendUrl)) || "";
            }
            return `${this.portalUrl}${path}`;
        });
    }
    handleResponse(response) {
        if (response.statusCode === 200) {
            return response.toObject();
        }
        else {
            throw new Error("Unable to handle Captcha response. Check captcha endpoint on server.");
        }
    }
}
exports.BackendService = BackendService;
//# sourceMappingURL=backendService.js.map