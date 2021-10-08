"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const versionSet_1 = require("./versionSet");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
class Api {
    constructor(contract) {
        if (contract.id) {
            this.id = utils_1.Utils.getResourceName("apis", contract.id, "shortId");
        }
        this.name = contract.name;
        this.displayName = contract.properties.displayName;
        this.thumbnail = contract.properties.thumbnail;
        this.versionedDisplayName = contract.properties.displayName;
        this.serviceUrl = contract.properties.serviceUrl;
        this.protocols = contract.properties.protocols;
        this.description = contract.properties.description;
        this.path = contract.properties.path || "";
        this.versionedPath = this.path;
        this.apiVersion = contract.properties.apiVersion;
        this.apiRevision = contract.properties.apiRevision;
        this.subscriptionKeyParameterNames = contract.properties.subscriptionKeyParameterNames;
        this.type = contract.properties.type;
        this.authenticationSettings = contract.properties.authenticationSettings;
        this.subscriptionRequired = contract.properties.subscriptionRequired;
        if (contract.properties.type) {
            switch (contract.properties.type) {
                case constants_1.TypeOfApi.soap:
                    this.typeName = "SOAP";
                    break;
                case constants_1.TypeOfApi.webSocket:
                    this.typeName = "WebSocket";
                    break;
                default:
                    this.typeName = "REST";
                    break;
            }
        }
        else {
            this.typeName = "REST";
        }
        if (contract.properties.apiVersionSet) {
            const nestedVersionSet = contract.properties.apiVersionSet;
            const versionSet = new versionSet_1.VersionSet(contract.properties.apiVersionSetId);
            versionSet.name = nestedVersionSet.name;
            versionSet.description = nestedVersionSet.description;
            versionSet.versionHeaderName = nestedVersionSet.versionHeaderName;
            versionSet.versionQueryName = nestedVersionSet.versionQueryName;
            versionSet.versioningScheme = nestedVersionSet.versioningScheme;
            this.apiVersionSet = versionSet;
            if (nestedVersionSet && this.apiVersion && versionSet.versioningScheme === "Segment") {
                this.versionedPath = `${this.path}/${this.apiVersion}`;
            }
            if (this.apiVersion) {
                this.versionedDisplayName = `${this.displayName} - ${this.apiVersion}`;
            }
        }
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map