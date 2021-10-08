"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Revision = void 0;
class Revision {
    constructor(contract) {
        this.apiId = contract.apiId;
        this.apiRevision = contract.apiRevision;
        this.createdDateTime = contract.createdDateTime;
        this.updatedDateTime = contract.updatedDateTime;
        this.description = contract.description;
        this.privateUrl = contract.privateUrl;
        this.isOnline = contract.isOnline;
        this.isCurrent = contract.isCurrent;
    }
}
exports.Revision = Revision;
//# sourceMappingURL=revision.js.map