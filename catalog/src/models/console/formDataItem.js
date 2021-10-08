"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataItem = void 0;
const ko = require("knockout");
const constants_1 = require("../../constants");
class FormDataItem {
    constructor() {
        this.name = ko.observable();
        this.type = ko.observable();
        this.description = ko.observable();
        this.required = ko.observable();
        this.body = ko.observable();
        this.contentType = ko.observable();
        this.binary = ko.observable();
        this.binary.extend({ maxFileSize: 3 * 1024 * 1024 });
        this.bodyFormat = ko.observable(constants_1.RequestBodyType.raw);
        this.onSetValue = this.onSetValue.bind(this);
        this.type.subscribe(this.onSetValue);
    }
    onSetValue(typeValue) {
        switch (typeValue) {
            case "file":
                this.bodyFormat(constants_1.RequestBodyType.binary);
                break;
            case "object":
                this.bodyFormat(constants_1.RequestBodyType.raw);
                break;
            default:
                this.bodyFormat(constants_1.RequestBodyType.string);
        }
    }
}
exports.FormDataItem = FormDataItem;
//# sourceMappingURL=formDataItem.js.map