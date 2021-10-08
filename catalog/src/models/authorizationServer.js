"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationServer = void 0;
class AuthorizationServer {
    constructor(contract) {
        if (!contract) {
            return;
        }
        this.name = contract.name;
        this.displayName = contract.properties.displayName;
        this.description = contract.properties.description;
        this.clientId = contract.properties.clientId;
        this.authorizationEndpoint = contract.properties.authorizationEndpoint;
        this.tokenEndpoint = contract.properties.tokenEndpoint;
        this.scopes = !!contract.properties.defaultScope
            ? contract.properties.defaultScope.split(" ")
            : [];
        if (!contract.properties.grantTypes) {
            return;
        }
        this.grantTypes = contract.properties.grantTypes
            .map(grantType => {
            switch (grantType) {
                case "authorizationCode":
                    return "authorization_code";
                case "implicit":
                    return "implicit";
                case "clientCredentials":
                    return "client_credentials";
                case "resourceOwnerPassword":
                    return "password";
                default:
                    console.log(`Unsupported grant type ${grantType}`);
                    return null;
            }
        })
            .filter(grantType => !!grantType);
    }
}
exports.AuthorizationServer = AuthorizationServer;
//# sourceMappingURL=authorizationServer.js.map