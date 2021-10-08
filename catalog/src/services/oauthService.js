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
exports.OAuthService = void 0;
const unauthorizedError_1 = require("./../errors/unauthorizedError");
const ClientOAuth2 = require("client-oauth2");
const Utils = require("@paperbits/common");
const http_1 = require("@paperbits/common/http");
const constants_1 = require("./../constants");
const mapiClient_1 = require("./mapiClient");
const authorizationServer_1 = require("../models/authorizationServer");
const openIdConnectProvider_1 = require("./../models/openIdConnectProvider");
class OAuthService {
    constructor(mapiClient, httpClient, settingsProvider) {
        this.mapiClient = mapiClient;
        this.httpClient = httpClient;
        this.settingsProvider = settingsProvider;
    }
    getOAuthServers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationServers = [];
                const pageOfOAuthServers = yield this.mapiClient.get("/authorizationServers", [mapiClient_1.MapiClient.getPortalHeader("getAuthorizationServers")]);
                const oauthServers = pageOfOAuthServers.value.map(authServer => new authorizationServer_1.AuthorizationServer(authServer));
                authorizationServers.push(...oauthServers);
                const pageOfOicdServers = yield this.mapiClient.get("/openidConnectProviders", [mapiClient_1.MapiClient.getPortalHeader("getOpenidConnectProviders")]);
                const oicdServers = pageOfOicdServers.value.map(authServer => new openIdConnectProvider_1.OpenIdConnectProvider(authServer));
                for (const provider of oicdServers) {
                    try {
                        const authServer = yield this.discoverOAuthServer(provider.metadataEndpoint);
                        authServer.name = provider.name;
                        authServer.clientId = provider.clientId;
                        authServer.displayName = provider.displayName;
                        authServer.description = provider.description;
                        authorizationServers.push(authServer);
                    }
                    catch (error) {
                    }
                }
                return authorizationServers;
            }
            catch (error) {
                throw new Error(`Unable to fetch configured authorization servers. ${error.stack}`);
            }
        });
    }
    authenticate(grantType, authorizationServer) {
        return __awaiter(this, void 0, void 0, function* () {
            const backendUrl = (yield this.settingsProvider.getSetting("backendUrl")) || `https://${location.hostname}`;
            let accessToken;
            switch (grantType) {
                case constants_1.GrantTypes.implicit:
                    accessToken = yield this.authenticateImplicit(backendUrl, authorizationServer);
                    break;
                case constants_1.GrantTypes.authorizationCode:
                    accessToken = yield this.authenticateCode(backendUrl, authorizationServer);
                    break;
                case constants_1.GrantTypes.clientCredentials:
                    accessToken = yield this.authenticateClientCredentials(backendUrl, authorizationServer);
                    break;
                default:
                    throw new Error(`Unsupported grant type: ${grantType}`);
            }
            return accessToken;
        });
    }
    authenticateImplicit(backendUrl, authorizationServer) {
        const redirectUri = `${backendUrl}/signin-oauth/implicit/callback`;
        const query = {
            state: Utils.guid()
        };
        if (authorizationServer.scopes.includes("openid")) {
            query["nonce"] = Utils.guid();
            query["response_type"] = "id_token";
        }
        const oauthClient = new ClientOAuth2({
            clientId: authorizationServer.clientId,
            accessTokenUri: authorizationServer.tokenEndpoint,
            authorizationUri: authorizationServer.authorizationEndpoint,
            redirectUri: redirectUri,
            scopes: authorizationServer.scopes,
            query: query
        });
        return new Promise((resolve, reject) => {
            try {
                window.open(oauthClient.token.getUri(), "_blank", "width=400,height=500");
                const receiveMessage = (event) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const tokenHash = event.data["uri"];
                    if (!tokenHash) {
                        return;
                    }
                    const oauthToken = yield oauthClient.token.getToken(redirectUri + tokenHash);
                    if (oauthToken.accessToken) {
                        resolve(`${oauthToken.tokenType} ${oauthToken.accessToken}`);
                    }
                    else if ((_a = oauthToken.data) === null || _a === void 0 ? void 0 : _a.id_token) {
                        resolve(`Bearer ${oauthToken.data.id_token}`);
                    }
                });
                window.addEventListener("message", receiveMessage, false);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    authenticateCode(backendUrl, authorizationServer) {
        return __awaiter(this, void 0, void 0, function* () {
            const redirectUri = `${backendUrl}/signin-oauth/code/callback/${authorizationServer.name}`;
            const query = {
                state: Utils.guid()
            };
            const oauthClient = new ClientOAuth2({
                clientId: authorizationServer.clientId,
                accessTokenUri: authorizationServer.tokenEndpoint,
                authorizationUri: authorizationServer.authorizationEndpoint,
                redirectUri: redirectUri,
                scopes: authorizationServer.scopes,
                query: query
            });
            return new Promise((resolve, reject) => {
                try {
                    window.open(oauthClient.code.getUri(), "_blank", "width=400,height=500");
                    const receiveMessage = (event) => __awaiter(this, void 0, void 0, function* () {
                        if (!event.data["accessToken"]) {
                            return;
                        }
                        const accessToken = event.data["accessToken"];
                        const accessTokenType = event.data["accessTokenType"];
                        resolve(`${accessTokenType} ${accessToken}`);
                    });
                    window.addEventListener("message", receiveMessage, false);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    authenticateClientCredentials(backendUrl, authorizationServer) {
        return __awaiter(this, void 0, void 0, function* () {
            let uri = `${backendUrl}/signin-oauth/credentials/${authorizationServer.name}`;
            if (authorizationServer.scopes) {
                const scopesString = authorizationServer.scopes.join(" ");
                uri += `?scopes=${encodeURIComponent(scopesString)}`;
            }
            return new Promise((resolve, reject) => {
                try {
                    window.open(uri, "_blank", "width=400,height=500");
                    const receiveMessage = (event) => __awaiter(this, void 0, void 0, function* () {
                        if (!event.data["accessToken"]) {
                            return;
                        }
                        const accessToken = event.data["accessToken"];
                        const accessTokenType = event.data["accessTokenType"];
                        resolve(`${accessTokenType} ${accessToken}`);
                    });
                    window.addEventListener("message", receiveMessage, false);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    authenticatePassword(username, password, authorizationServer) {
        return __awaiter(this, void 0, void 0, function* () {
            const backendUrl = (yield this.settingsProvider.getSetting("backendUrl")) || `https://${location.hostname}`;
            let uri = `${backendUrl}/signin-oauth/password/${authorizationServer.name}`;
            if (authorizationServer.scopes) {
                const scopesString = authorizationServer.scopes.join(" ");
                uri += `?scopes=${encodeURIComponent(scopesString)}`;
            }
            const response = yield this.httpClient.send({
                method: http_1.HttpMethod.post,
                url: uri,
                body: JSON.stringify({ username: username, password: password })
            });
            if (response.statusCode === 401) {
                throw new unauthorizedError_1.UnauthorizedError("Unable to authenticate. Verify the credentials you entered are correct.");
            }
            const tokenInfo = response.toObject();
            return `${tokenInfo.accessTokenType} ${tokenInfo.accessToken}`;
        });
    }
    discoverOAuthServer(metadataEndpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.send({ url: metadataEndpoint });
            const metadata = response.toObject();
            const server = new authorizationServer_1.AuthorizationServer();
            server.authorizationEndpoint = metadata.authorization_endpoint;
            server.tokenEndpoint = metadata.token_endpoint;
            server.scopes = ["openid"];
            const supportedGrantTypes = [constants_1.GrantTypes.implicit.toString(), constants_1.GrantTypes.authorizationCode.toString()];
            server.grantTypes = metadata.grant_types_supported
                ? metadata.grant_types_supported.filter(grantType => supportedGrantTypes.includes(grantType))
                : [constants_1.GrantTypes.implicit, constants_1.GrantTypes.authorizationCode];
            return server;
        });
    }
}
exports.OAuthService = OAuthService;
//# sourceMappingURL=oauthService.js.map