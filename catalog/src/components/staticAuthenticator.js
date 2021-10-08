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
exports.StaticAuthenticator = void 0;
const authentication_1 = require("../authentication");
class StaticAuthenticator {
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accessToken;
        });
    }
    setAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.accessToken = accessToken.toString();
        });
    }
    refreshAccessTokenFromHeader(responseHeaders = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenHeader = responseHeaders.find(x => x.name.toLowerCase() === "ocp-apim-sas-token");
            if (accessTokenHeader === null || accessTokenHeader === void 0 ? void 0 : accessTokenHeader.value) {
                const accessToken = authentication_1.AccessToken.parse(accessTokenHeader.value);
                const accessTokenString = accessToken.toString();
                const current = sessionStorage.getItem("accessToken");
                if (current !== accessTokenString) {
                    sessionStorage.setItem("accessToken", accessTokenString);
                    return accessTokenString;
                }
            }
            return undefined;
        });
    }
    clearAccessToken() {
        this.accessToken = undefined;
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            return !!accessToken;
        });
    }
}
exports.StaticAuthenticator = StaticAuthenticator;
//# sourceMappingURL=staticAuthenticator.js.map