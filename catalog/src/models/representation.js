"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Representation = void 0;
const utils_1 = require("../utils");
const parameter_1 = require("./parameter");
class Representation {
    constructor(contract) {
        var _a;
        this.contentType = contract.contentType;
        this.example = contract.sample || contract.generatedSample;
        this.schemaId = contract.schemaId;
        this.typeName = contract.typeName;
        if (this.contentType === "multipart/form-data") {
            this.typeName = "formData";
            if (((_a = contract.formParameters) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                this.formParameters = contract.formParameters.map(parameterContract => new parameter_1.Parameter("body", parameterContract));
            }
        }
        if (this.example) {
            if (this.contentType.includes("/xml")) {
                this.example = utils_1.Utils.formatXml(this.example);
                this.exampleFormat = "xml";
            }
            if (this.contentType.includes("/json")) {
                this.example = utils_1.Utils.formatJson(this.example);
                this.exampleFormat = "json";
            }
        }
    }
}
exports.Representation = Representation;
//# sourceMappingURL=representation.js.map