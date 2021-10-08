"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const utils_1 = require("../utils");
class Product {
    constructor(contract) {
        this.id = utils_1.Utils.getResourceName("products", contract.id, "shortId");
        this.name = contract.name;
        this.displayName = contract.properties.displayName;
        this.description = contract.properties.description;
        this.approvalRequired = contract.properties.approvalRequired;
        this.state = contract.properties.state;
        this.subscriptionRequired = contract.properties.subscriptionRequired;
        this.subscriptionsLimit = contract.properties.subscriptionsLimit;
        this.terms = contract.properties.terms;
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map