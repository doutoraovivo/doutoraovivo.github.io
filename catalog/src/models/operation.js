"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const parameter_1 = require("./parameter");
const request_1 = require("./request");
const response_1 = require("./response");
class Operation {
    constructor(contract) {
        this.name = contract.name;
        this.displayName = contract.properties.displayName;
        this.description = contract.properties.description;
        this.urlTemplate = contract.properties.urlTemplate;
        this.method = contract.properties.method;
        this.version = contract.properties.version;
        this.templateParameters = contract.properties.templateParameters
            ? contract.properties.templateParameters.map(x => new parameter_1.Parameter("template", x))
            : [];
        this.request = new request_1.Request(contract.properties.request);
        this.parameters = this.templateParameters.concat(this.request.queryParameters);
        this.responses = contract.properties.responses
            ? contract.properties.responses.map(x => new response_1.Response(x))
            : [];
        let connector = this.urlTemplate.includes("?") ? "&" : "?";
        const optionalQueryParameters = this.request.queryParameters
            .map((parameter, index) => {
            if (index > 0) {
                connector = "&";
            }
            return `[${connector}${parameter.name}]`;
        })
            .join("");
        this.displayUrlTemplate = `${this.urlTemplate}${optionalQueryParameters}`;
    }
    getMeaningfulResponses() {
        return this.responses.filter(x => x.isMeaningful());
    }
}
exports.Operation = Operation;
//# sourceMappingURL=operation.js.map