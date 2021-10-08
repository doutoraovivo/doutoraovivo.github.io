"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
class Tag {
    constructor(contract) {
        this.id = contract.id;
        this.name = contract.properties.displayName;
    }
}
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map