"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XsdSchemaConverter = void 0;
const jObject_1 = require("./jObject");
class XsdSchemaConverter {
    isPrimitiveType(type) {
        return [
            "anySimpleType",
            "anyType",
            "string",
            "normalizedString",
            "token",
            "language",
            "Name",
            "NCName",
            "ID",
            "IDREF",
            "IDREFS",
            "ENTITY",
            "ENTITIES",
            "NMTOKEN",
            "NMTOKENS",
            "boolean",
            "base64Binary",
            "hexBinary",
            "float",
            "decimal",
            "integer",
            "nonPositiveInteger",
            "negativeInteger",
            "long",
            "int",
            "short",
            "byte",
            "nonNegativeInteger",
            "unsignedLong",
            "unsignedInt",
            "unsignedShort",
            "unsignedByte",
            "positiveInteger",
            "double",
            "anyURI",
            "QName",
            "duration",
            "dateTime",
            "date",
            "time",
            "anySimpleType",
            "anyType",
            "string",
            "normalizedString",
            "token",
            "language",
            "Name",
            "NCName",
            "ID",
            "IDREF",
            "IDREFS",
            "ENTITY",
            "ENTITIES",
            "NMTOKEN",
            "NMTOKENS",
            "boolean",
            "base64Binary",
            "hexBinary",
            "float",
            "decimal",
            "integer",
            "nonPositiveInteger",
            "negativeInteger",
            "long",
            "int",
            "short",
            "byte",
            "nonNegativeInteger",
            "unsignedLong",
            "unsignedInt",
            "unsignedShort",
            "unsignedByte",
            "positiveInteger",
            "double",
            "anyURI",
            "QName",
            "duration",
            "dateTime",
            "date",
            "time",
        ].includes(type);
    }
    convertElement(jObject) {
        const name = jObject.getAttribute("name");
        const originalType = jObject.getAttribute("type");
        const isPrimitive = this.isPrimitiveType(originalType);
        let type;
        let $ref;
        if (isPrimitive) {
            type = originalType;
            $ref = undefined;
        }
        else {
            type = "object";
            $ref = originalType === null || originalType === void 0 ? void 0 : originalType.split(":").pop();
        }
        const definition = {
            type: type,
            properties: undefined,
            $ref: $ref,
            rawSchema: jObject.toXml().trim(),
            rawSchemaFormat: "xml"
        };
        jObject.children.forEach(child => {
            switch (child.name) {
                case "simpleType":
                    definition.properties = definition.properties || {};
                    const simpleTypeNode = this.convertSimpleType(child);
                    definition.properties[simpleTypeNode.name] = simpleTypeNode.definition;
                    break;
                case "complexType":
                    const complexTypeNode = this.convertComplexType(child);
                    if (complexTypeNode.name) {
                        definition.properties = definition.properties || {};
                        definition.properties[complexTypeNode.name] = complexTypeNode.definition;
                    }
                    else {
                        Object.assign(definition, complexTypeNode.definition);
                    }
                    break;
                case "element":
                    const elementNode = this.convertElement(child);
                    definition.properties = definition.properties || {};
                    definition.properties[elementNode.name] = elementNode.definition;
                    break;
                default:
                    console.warn(`Element "${child.name}" by XSD schema converter.`);
                    break;
            }
        });
        const resultNode = {
            name: name,
            definition: definition
        };
        return resultNode;
    }
    convertSimpleType(jObject) {
        const restriction = jObject.children[0];
        const type = restriction.getAttribute("base").split(":").pop();
        const definition = {
            type: type,
            rawSchema: jObject.toXml().trim(),
            rawSchemaFormat: "xml"
        };
        const resultNode = {
            name: jObject.getAttribute("name"),
            definition: definition
        };
        return resultNode;
    }
    convertComplexType(jObject) {
        const name = jObject.getAttribute("name");
        const definition = {
            type: "object"
        };
        const collection = jObject.children.find(x => x.name === "sequence" || x.name === "all");
        collection === null || collection === void 0 ? void 0 : collection.children.forEach(x => {
            const elementNode = this.convertElement(x);
            definition.properties = definition.properties || {};
            definition.properties[elementNode.name] = elementNode.definition;
        });
        const resultNode = {
            name: name,
            definition: definition
        };
        return resultNode;
    }
    convertXsdSchema(xsdDocument) {
        const documentJObject = jObject_1.JObject.fromXml(xsdDocument);
        const schemaJObject = documentJObject.children.find(x => x.name === "schema");
        if (!schemaJObject) {
            throw new Error(`Element "schema" not found in the document.`);
        }
        const schemaNode = this.convertElement(schemaJObject);
        return schemaNode.definition.properties;
    }
}
exports.XsdSchemaConverter = XsdSchemaConverter;
//# sourceMappingURL=xsdSchemaConverter.js.map