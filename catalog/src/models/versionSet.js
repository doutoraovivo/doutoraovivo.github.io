"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionSet = void 0;
const utils_1 = require("../utils");
class VersionSet {
    constructor(id, contract) {
        this.id = utils_1.Utils.getResourceName("apiVersionSets", id, "shortId");
        if (!contract) {
            return;
        }
        if (contract.properties) {
            this.name = contract.properties.displayName;
            this.description = contract.properties.description;
            this.versioningScheme = contract.properties.versioningScheme;
            this.versionQueryName = contract.properties.versionQueryName;
            this.versionHeaderName = contract.properties.versionHeaderName;
        }
    }
}
exports.VersionSet = VersionSet;
//# sourceMappingURL=versionSet.js.map