"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const xsdSchemaConverter_1 = require("./xsdSchemaConverter");
const schema_1 = require("../contracts/schema");
const typeDefinition_1 = require("./typeDefinition");
class Schema {
    constructor(contract) {
        var _a, _b, _c, _d, _e;
        this.definitions = [];
        if (!contract) {
            return;
        }
        const definitionType = (_a = contract.properties) === null || _a === void 0 ? void 0 : _a.contentType;
        let definitions = {};
        switch (definitionType) {
            case schema_1.SchemaType.swagger:
                const swaggerDoc = (_b = contract.properties) === null || _b === void 0 ? void 0 : _b.document;
                definitions = (swaggerDoc === null || swaggerDoc === void 0 ? void 0 : swaggerDoc.definitions) || {};
                break;
            case schema_1.SchemaType.openapi:
                const openApiDoc = (_c = contract.properties) === null || _c === void 0 ? void 0 : _c.document;
                definitions = ((_d = openApiDoc === null || openApiDoc === void 0 ? void 0 : openApiDoc.components) === null || _d === void 0 ? void 0 : _d.schemas) || {};
                break;
            case schema_1.SchemaType.xsd:
                const xsdDoc = (_e = contract.properties) === null || _e === void 0 ? void 0 : _e.document;
                try {
                    definitions = new xsdSchemaConverter_1.XsdSchemaConverter().convertXsdSchema(xsdDoc.value);
                }
                catch (error) {
                    console.warn(`Unable to parse XSD schema document. Skipping type definition setup.`);
                }
                break;
            default:
                console.warn(`Unsupported schema type: ${definitionType}`);
        }
        this.definitions = Object.keys(definitions)
            .map(definitionName => {
            return new typeDefinition_1.TypeDefinition(definitionName, definitions[definitionName]);
        });
    }
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map