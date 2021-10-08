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
exports.DefaultAuthenticator = void 0;
const authentication_1 = require("./../authentication");
class DefaultAuthenticator {
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = sessionStorage.getItem("accessToken");
            if (!accessToken && window.location.pathname.startsWith("/signin-sso")) {
                const url = new URL(location.href);
                const queryParams = new URLSearchParams(url.search);
                const tokenValue = queryParams.get("token");
                const token = authentication_1.AccessToken.parse(`SharedAccessSignature ${tokenValue}`);
                yield this.setAccessToken(token);
                const returnUrl = queryParams.get("returnUrl") || "/";
                window.location.assign(returnUrl);
            }
            return accessToken;
        });
    }
    setAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (accessToken.isExpired()) {
                console.warn(`Cannot set expired access token.`);
                return;
            }
            sessionStorage.setItem("accessToken", accessToken.toString());
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
        sessionStorage.removeItem("accessToken");
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            if (!accessToken) {
                return false;
            }
            const parsedToken = authentication_1.AccessToken.parse(accessToken);
            if (!parsedToken) {
                return false;
            }
            return !parsedToken.isExpired();
        });
    }
}
exports.DefaultAuthenticator = DefaultAuthenticator;
//# sourceMappingURL=defaultAuthenticator.js.map