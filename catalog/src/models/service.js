"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDescription = void 0;
class ServiceDescription {
    constructor(contract) {
        this.name = contract.name;
        this.sku = contract.sku;
        this.gatewayUrl = contract.properties.gatewayUrl;
        this.hostnameConfigurations = contract.properties.hostnameConfigurations;
    }
}
exports.ServiceDescription = ServiceDescription;
//# sourceMappingURL=service.js.map