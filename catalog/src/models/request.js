"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const parameter_1 = require("./parameter");
const representation_1 = require("./representation");
class Request {
    constructor(contract) {
        this.queryParameters = [];
        this.headers = [];
        this.representations = [];
        if (contract) {
            this.description = contract.description;
            this.queryParameters = contract.queryParameters
                ? contract.queryParameters.map(x => new parameter_1.Parameter("query", x))
                : [];
            this.headers = contract.headers
                ? contract.headers.map(x => new parameter_1.Parameter("header", x))
                : [];
            this.representations = contract.representations
                ? contract.representations.map(x => new representation_1.Representation(x))
                : [];
        }
    }
    isMeaningful() {
        return !!this.description || this.representations.some(x => !!x.typeName);
    }
    isFormData() {
        return this.representations.some(x => x.typeName === "formData");
    }
    meaningfulRepresentations() {
        return this.representations.filter(x => !!x.typeName || !!x.example);
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map