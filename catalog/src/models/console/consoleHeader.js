"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleHeader = void 0;
const ko = require("knockout");
class ConsoleHeader {
    constructor(contract) {
        this.name = ko.observable();
        this.value = ko.observable();
        this.inputTypeValue = "text";
        this.revealed = false;
        this.options = [];
        this.required = false;
        this.readonly = false;
        this.custom = true;
        this.type = "string";
        this.description = "Additional header.";
        if (!contract) {
            return;
        }
        this.custom = false;
        this.name(contract.name);
        this.value(contract.defaultValue);
        this.required = contract.required;
        this.options = contract.values;
        this.description = contract.description ? contract.description : "";
        this.type = contract.type;
        this.secret = false;
        this.inputTypeValue = this.secret && !this.revealed ? "password" : "text";
        this.name.extend({ required: { message: `Name is required.` } });
        if (this.required) {
            this.value.extend({ required: { message: `Value is required.` } });
        }
    }
    toggleRevealed() {
        this.revealed = !this.revealed;
        this.inputTypeValue = this.secret && !this.revealed ? "password" : "text";
    }
    canRename() {
        return !this.required && this.custom;
    }
    toggleSecret() {
        this.revealed = !this.revealed;
        this.inputTypeValue = this.secret && !this.revealed ? "password" : "text";
    }
}
exports.ConsoleHeader = ConsoleHeader;
//# sourceMappingURL=consoleHeader.js.map