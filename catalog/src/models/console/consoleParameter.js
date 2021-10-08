"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleParameter = void 0;
const ko = require("knockout");
class ConsoleParameter {
    constructor(contract) {
        this.name = ko.observable();
        this.value = ko.observable();
        this.inputType = "text";
        this.required = false;
        this.options = [];
        this.custom = true;
        this.type = "string";
        this.error = ko.observable();
        if (contract) {
            this.custom = false;
            this.name(contract.name);
            this.value(contract.defaultValue);
            this.required = contract.required;
            this.options = contract.values;
            this.type = contract.type;
            this.secret = false;
            this.inputType = this.secret ? "password" : "text";
        }
        this.canRename = !this.required && this.custom;
        this.name.extend({ required: { message: `Name is required.` } });
        if (this.required) {
            this.value.extend({ required: { message: `Value is required.` } });
        }
    }
}
exports.ConsoleParameter = ConsoleParameter;
//# sourceMappingURL=consoleParameter.js.map