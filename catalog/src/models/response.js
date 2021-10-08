"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const statusCode_1 = require("./statusCode");
const parameter_1 = require("./parameter");
const representation_1 = require("./representation");
const utils_1 = require("../utils");
class Response {
    constructor(contract) {
        this.identifier = utils_1.Utils.getBsonObjectId();
        this.statusCode = new statusCode_1.StatusCode(contract.statusCode);
        this.description = contract.description;
        this.headers = contract.headers
            ? contract.headers.map(header => new parameter_1.Parameter("header", header))
            : [];
        this.representations = contract.representations
            ? contract.representations
                .map(representation => new representation_1.Representation(representation))
            : [];
    }
    isMeaningful() {
        return !!this.description || this.representations.some(x => !!x.typeName || !!x.example);
    }
    meaningfulRepresentations() {
        return this.representations.filter(x => !!x.typeName || !!x.example);
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map