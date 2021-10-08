"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenIdConnectProvider = void 0;
class OpenIdConnectProvider {
    constructor(contract) {
        this.name = contract.name;
        this.displayName = contract.properties.displayName;
        this.description = contract.properties.description;
        this.clientId = contract.properties.clientId;
        this.metadataEndpoint = contract.properties.metadataEndpoint;
    }
}
exports.OpenIdConnectProvider = OpenIdConnectProvider;
//# sourceMappingURL=openIdConnectProvider.js.map