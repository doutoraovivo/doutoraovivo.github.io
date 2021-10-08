"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleRequest = void 0;
const ko = require("knockout");
const consoleParameter_1 = require("./consoleParameter");
const consoleHeader_1 = require("./consoleHeader");
const consoleRepresentation_1 = require("./consoleRepresentation");
const constants_1 = require("../../constants");
const formDataItem_1 = require("./formDataItem");
class ConsoleRequest {
    constructor(request) {
        var _a;
        this.description = request.description;
        this.representations = request.representations.map(representation => new consoleRepresentation_1.ConsoleRepresentation(representation));
        this.queryParameters = ko.observableArray(request.queryParameters.map(parameter => new consoleParameter_1.ConsoleParameter(parameter)));
        this.headers = ko.observableArray(request.headers.map(header => new consoleHeader_1.ConsoleHeader(header)));
        this.meaningfulHeaders = ko.computed(() => this.headers().filter(x => !!x.value()));
        this.body = ko.observable();
        this.binary = ko.observable();
        this.binary.extend({ maxFileSize: 3 * 1024 * 1024 });
        this.bodyFormat = ko.observable(constants_1.RequestBodyType.raw);
        this.bodyDataItems = ko.observableArray([]);
        if (((_a = this.representations) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return;
        }
        const representation = this.representations[0];
        this.body(representation.sample);
        this.representationContentType = representation.contentType;
        const bodyRepresentation = this.representationContentType === "multipart/form-data" && request.representations.find(r => { var _a; return ((_a = r.formParameters) === null || _a === void 0 ? void 0 : _a.length) > 0; });
        if (bodyRepresentation) {
            this.hasBody = true;
            this.readonlyBodyFormat = true;
            this.bodyFormat(constants_1.RequestBodyType.form);
            const dataItems = bodyRepresentation.formParameters.map(p => {
                const item = new formDataItem_1.FormDataItem();
                item.name(p.name);
                item.type(p.type);
                item.description(p.description);
                item.required(p.required);
                return item;
            });
            this.bodyDataItems(dataItems);
        }
        else {
            if (this.representationContentType && this.headers().find(h => h.name() === "Content-Type") === undefined) {
                const consoleHeader = new consoleHeader_1.ConsoleHeader();
                consoleHeader.name("Content-Type");
                consoleHeader.value(this.representationContentType);
                this.headers.push(consoleHeader);
            }
        }
    }
    getFormDataPayload() {
        const formData = new FormData();
        const items = this.bodyDataItems();
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.bodyFormat() === constants_1.RequestBodyType.binary) {
                const file = item.binary();
                if (file) {
                    formData.append(item.name(), file, file.name);
                }
                else {
                    formData.append(item.name(), "");
                }
            }
            else {
                formData.append(item.name(), item.body() || "");
            }
        }
        return formData;
    }
    requestHeaders() {
        return this.headers().filter(header => !header.readonly);
    }
}
exports.ConsoleRequest = ConsoleRequest;
//# sourceMappingURL=consoleRequest.js.map