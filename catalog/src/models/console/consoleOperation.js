"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleOperation = void 0;
const ko = require("knockout");
const consoleParameter_1 = require("./consoleParameter");
const consoleRequest_1 = require("./consoleRequest");
const consoleResponse_1 = require("./consoleResponse");
const consoleHost_1 = require("./consoleHost");
const utils_1 = require("../../utils");
const consoleHeader_1 = require("./consoleHeader");
class ConsoleOperation {
    constructor(api, operation) {
        this.api = api;
        this.name = operation.displayName;
        this.method = operation.method.toUpperCase();
        this.host = new consoleHost_1.ConsoleHost();
        this.urlTemplate = operation.urlTemplate;
        this.request = new consoleRequest_1.ConsoleRequest(operation.request);
        this.templateParameters = ko.observableArray(operation.templateParameters.map(parameterContract => new consoleParameter_1.ConsoleParameter(parameterContract)));
        this.hasBody = !["GET", "HEAD", "TRACE"].includes(this.method);
        if (operation.responses) {
            this.responses = operation.responses.map(x => new consoleResponse_1.ConsoleResponse(x));
        }
        else {
            this.responses = [];
        }
        this.requestUrl = ko.computed(() => {
            const protocol = this.api.protocols.indexOf("https") !== -1 ? "https" : "http";
            const urlTemplate = this.getRequestPath();
            const result = `${protocol}://${this.host.hostname()}${utils_1.Utils.ensureLeadingSlash(urlTemplate)}`;
            return result;
        });
        this.wsUrl = ko.computed(() => {
            const protocol = this.api.protocols.indexOf("wss") !== -1 ? "wss" : "wss";
            const urlTemplate = this.getRequestPath();
            const result = `${protocol}://${this.host.hostname()}${utils_1.Utils.ensureLeadingSlash(urlTemplate)}`;
            return result;
        });
    }
    addParam(uri, name, value) {
        const separator = uri.indexOf("?") >= 0 ? "&" : "?";
        const paramString = !value || value === "" ? name : name + "=" + value;
        return uri + separator + paramString;
    }
    setHeader(name, value, type = "string", description) {
        const header = this.createHeader(name, value, type, description);
        this.request.headers.push(header);
        return header;
    }
    createHeader(name, value, type, description) {
        const header = new consoleHeader_1.ConsoleHeader();
        header.name(name);
        header.value(value);
        header.type = type;
        header.description = description;
        return header;
    }
    getRequestPath() {
        let versionPath = "";
        if (this.api.apiVersionSet && this.api.apiVersion && this.api.apiVersionSet.versioningScheme === "Segment") {
            versionPath = `/${this.api.apiVersion}`;
        }
        let requestUrl = this.urlTemplate;
        const parameters = this.templateParameters().concat(this.request.queryParameters());
        parameters.forEach(parameter => {
            if (parameter.value()) {
                const parameterPlaceholder = parameter.name() !== "*" ? `{${parameter.name()}}` : "*";
                if (requestUrl.indexOf(parameterPlaceholder) > -1) {
                    requestUrl = requestUrl.replace(parameterPlaceholder, encodeURIComponent(parameter.value()));
                }
                else {
                    requestUrl = this.addParam(requestUrl, encodeURIComponent(parameter.name()), encodeURIComponent(parameter.value()));
                }
            }
        });
        if (this.api.apiVersionSet && this.api.apiVersionSet.versioningScheme === "Query") {
            requestUrl = this.addParam(requestUrl, this.api.apiVersionSet.versionQueryName, this.api.apiVersion);
        }
        return `${this.api.path}${versionPath}${requestUrl}`;
    }
}
exports.ConsoleOperation = ConsoleOperation;
//# sourceMappingURL=consoleOperation.js.map