"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
class Parameter {
    constructor(placement, contract) {
        this.name = contract.name;
        this.description = contract.description;
        this.type = contract.type;
        this.defaultValue = contract.defaultValue;
        this.values = contract.values;
        this.required = !!contract.required;
        this.in = placement;
    }
}
exports.Parameter = Parameter;
//# sourceMappingURL=parameter.js.map