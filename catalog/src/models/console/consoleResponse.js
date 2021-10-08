"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleResponse = void 0;
const consoleHeader_1 = require("./consoleHeader");
const consoleRepresentation_1 = require("./consoleRepresentation");
class ConsoleResponse {
    constructor(response) {
        this.statusCode = response.statusCode;
        this.description = response.description;
        this.headers = response.headers.map(x => new consoleHeader_1.ConsoleHeader(x));
        if (!this.headers) {
            this.headers = [];
        }
        this.representations = response.representations.map(x => new consoleRepresentation_1.ConsoleRepresentation(x));
        if (!this.representations) {
            this.representations = [];
        }
    }
}
exports.ConsoleResponse = ConsoleResponse;
//# sourceMappingURL=consoleResponse.js.map