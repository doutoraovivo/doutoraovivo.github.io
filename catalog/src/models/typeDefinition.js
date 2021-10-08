"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDefinition = exports.TypeDefinitionIndexerProperty = exports.TypeDefinitionObjectProperty = exports.TypeDefinitionCombinationProperty = exports.TypeDefinitionEnumerationProperty = exports.TypeDefinitionPrimitiveProperty = exports.TypeDefinitionProperty = exports.TypeDefinitionPropertyTypeCombination = exports.TypeDefinitionPropertyTypeArrayOfReference = exports.TypeDefinitionPropertyTypeArrayOfPrimitive = exports.TypeDefinitionPropertyTypeReference = exports.TypeDefinitionPropertyTypePrimitive = exports.TypeDefinitionPropertyType = void 0;
class TypeDefinitionPropertyType {
    constructor(displayAs) {
        this.displayAs = displayAs;
    }
}
exports.TypeDefinitionPropertyType = TypeDefinitionPropertyType;
class TypeDefinitionPropertyTypePrimitive extends TypeDefinitionPropertyType {
    constructor(name) {
        super("primitive");
        this.name = name;
    }
}
exports.TypeDefinitionPropertyTypePrimitive = TypeDefinitionPropertyTypePrimitive;
class TypeDefinitionPropertyTypeReference extends TypeDefinitionPropertyType {
    constructor(name) {
        super("reference");
        this.name = name;
    }
}
exports.TypeDefinitionPropertyTypeReference = TypeDefinitionPropertyTypeReference;
class TypeDefinitionPropertyTypeArrayOfPrimitive extends TypeDefinitionPropertyType {
    constructor(name) {
        super("arrayOfPrimitive");
        this.name = name;
    }
}
exports.TypeDefinitionPropertyTypeArrayOfPrimitive = TypeDefinitionPropertyTypeArrayOfPrimitive;
class TypeDefinitionPropertyTypeArrayOfReference extends TypeDefinitionPropertyType {
    constructor(name) {
        super("arrayOfReference");
        this.name = name;
    }
}
exports.TypeDefinitionPropertyTypeArrayOfReference = TypeDefinitionPropertyTypeArrayOfReference;
class TypeDefinitionPropertyTypeCombination extends TypeDefinitionPropertyType {
    constructor(combinationType, combination) {
        super("combination");
        this.combinationType = combinationType;
        this.combination = combination;
    }
}
exports.TypeDefinitionPropertyTypeCombination = TypeDefinitionPropertyTypeCombination;
class TypeDefinitionProperty {
    constructor(name, contract, isRequired) {
        this.exampleFormat = "json";
        this.name = contract.title || name;
        this.description = contract.description;
        this.type = new TypeDefinitionPropertyTypePrimitive(contract.format || contract.type || "object");
        this.required = isRequired;
        if (contract.rawSchemaFormat) {
            this.rawSchema = contract.rawSchema;
            this.rawSchemaFormat = contract.rawSchemaFormat;
        }
        else {
            this.rawSchema = JSON.stringify(contract, null, 4);
            this.rawSchemaFormat = "json";
        }
        if (contract.exampleFormat) {
            this.example = contract.example;
            this.exampleFormat = contract.exampleFormat;
        }
        else {
            this.example = typeof contract.example === "object"
                ? JSON.stringify(contract.example, null, 4)
                : contract.example;
            this.exampleFormat = "json";
        }
    }
}
exports.TypeDefinitionProperty = TypeDefinitionProperty;
class TypeDefinitionPrimitiveProperty extends TypeDefinitionProperty {
    constructor(name, contract, isRequired) {
        super(name, contract, isRequired);
        this.kind = "primitive";
    }
}
exports.TypeDefinitionPrimitiveProperty = TypeDefinitionPrimitiveProperty;
class TypeDefinitionEnumerationProperty extends TypeDefinitionProperty {
    constructor(name, contract, isRequired) {
        super(name, contract, isRequired);
        this.kind = "enum";
    }
}
exports.TypeDefinitionEnumerationProperty = TypeDefinitionEnumerationProperty;
class TypeDefinitionCombinationProperty extends TypeDefinitionProperty {
    constructor(name, contract, isRequired) {
        super(name, contract, isRequired);
        let combinationType;
        let combinationArray;
        if (contract.allOf) {
            combinationType = "All of";
            combinationArray = contract.allOf;
        }
        if (contract.anyOf) {
            combinationType = "Any of";
            combinationArray = contract.anyOf;
        }
        if (contract.oneOf) {
            combinationType = "One of";
            combinationArray = contract.oneOf;
        }
        if (contract.not) {
            combinationType = "Not";
            combinationArray = contract.not;
        }
        const combination = combinationArray.map(item => {
            if (item.$ref) {
                return new TypeDefinitionPropertyTypeReference(getTypeNameFromRef(item.$ref));
            }
            return new TypeDefinitionPropertyTypePrimitive(item.type || "object");
        });
        this.type = new TypeDefinitionPropertyTypeCombination(combinationType, combination);
        this.kind = "combination";
    }
}
exports.TypeDefinitionCombinationProperty = TypeDefinitionCombinationProperty;
class TypeDefinitionObjectProperty extends TypeDefinitionProperty {
    constructor(name, contract, isRequired, nested = false) {
        super(name, contract, isRequired);
        this.kind = "object";
        if (contract.$ref) {
            this.type = new TypeDefinitionPropertyTypeReference(getTypeNameFromRef(contract.$ref));
            return;
        }
        if (contract.items) {
            let type = new TypeDefinitionPropertyTypePrimitive("object");
            if (contract.items.type) {
                type = new TypeDefinitionPropertyTypePrimitive(contract.items.type);
            }
            if (contract.items.$ref) {
                type = new TypeDefinitionPropertyTypeReference(getTypeNameFromRef(contract.items.$ref));
            }
            this.properties = [new TypeDefinitionIndexerProperty(type)];
            this.kind = "indexer";
            return;
        }
        if (contract.enum) {
            this.enum = contract.enum;
            this.kind = "enum";
        }
        if (contract.properties) {
            const props = [];
            Object
                .keys(contract.properties)
                .forEach(propertyName => {
                var _a;
                try {
                    const propertySchemaObject = contract.properties[propertyName];
                    if (propertySchemaObject.readOnly) {
                        return;
                    }
                    if (!propertySchemaObject) {
                        return;
                    }
                    const isRequired = ((_a = contract.required) === null || _a === void 0 ? void 0 : _a.includes(propertyName)) || false;
                    if (propertySchemaObject.$ref) {
                        propertySchemaObject.type = "object";
                    }
                    if (propertySchemaObject.items) {
                        propertySchemaObject.type = "array";
                    }
                    if (propertySchemaObject.allOf ||
                        propertySchemaObject.anyOf ||
                        propertySchemaObject.oneOf ||
                        propertySchemaObject.not) {
                        propertySchemaObject.type = "combination";
                    }
                    switch (propertySchemaObject.type) {
                        case "integer":
                        case "number":
                        case "string":
                        case "boolean":
                            if (propertySchemaObject.enum) {
                                props.push(new TypeDefinitionEnumerationProperty(propertyName, propertySchemaObject, isRequired));
                            }
                            else {
                                props.push(new TypeDefinitionPrimitiveProperty(propertyName, propertySchemaObject, isRequired));
                            }
                            break;
                        case "object":
                            const objectProperty = new TypeDefinitionObjectProperty(propertyName, propertySchemaObject, isRequired, true);
                            if (!propertySchemaObject.$ref && propertySchemaObject.properties && !nested) {
                                const flattenObjects = this.flattenNestedObjects(objectProperty, propertyName);
                                props.push(...flattenObjects);
                            }
                            else {
                                props.push(objectProperty);
                            }
                            break;
                        case "array":
                            const arrayProperty = new TypeDefinitionPrimitiveProperty(propertyName, propertySchemaObject, isRequired);
                            if (!propertySchemaObject.items) {
                                return arrayProperty;
                            }
                            if (propertySchemaObject.items.$ref) {
                                arrayProperty.type = new TypeDefinitionPropertyTypeArrayOfReference(getTypeNameFromRef(propertySchemaObject.items.$ref));
                                props.push(arrayProperty);
                            }
                            else if (propertySchemaObject.items.properties) {
                                const objectProperty = new TypeDefinitionObjectProperty(propertyName, propertySchemaObject.items, isRequired, true);
                                const flattenObjects = this.flattenNestedObjects(objectProperty, propertyName + "[]");
                                props.push(...flattenObjects);
                            }
                            else if (propertySchemaObject.items.type) {
                                arrayProperty.type = new TypeDefinitionPropertyTypeArrayOfPrimitive(propertySchemaObject.items.type);
                                props.push(arrayProperty);
                            }
                            else {
                                const objectProperty = new TypeDefinitionObjectProperty(propertyName + "[]", propertySchemaObject.items, isRequired, true);
                                props.push(objectProperty);
                            }
                            break;
                        case "combination":
                            props.push(new TypeDefinitionCombinationProperty(propertyName, propertySchemaObject, isRequired));
                            break;
                        default:
                            console.warn(`Unknown type of schema definition: ${propertySchemaObject.type}`);
                    }
                }
                catch (error) {
                    console.warn(`Unable to process object property ${propertyName}. Error: ${error}`);
                }
            });
            this.properties = props;
        }
    }
    flattenNestedObjects(nested, prefix) {
        const result = [];
        if (!nested.properties) {
            return result;
        }
        nested.properties.forEach(property => {
            if (property instanceof TypeDefinitionObjectProperty) {
                result.push(...this.flattenNestedObjects(property, prefix + "." + property.name));
            }
            else {
                property.name = prefix + "." + property.name;
                result.push(property);
            }
        });
        return result;
    }
}
exports.TypeDefinitionObjectProperty = TypeDefinitionObjectProperty;
function getTypeNameFromRef($ref) {
    return $ref && $ref.split("/").pop();
}
class TypeDefinitionIndexerProperty extends TypeDefinitionObjectProperty {
    constructor(type) {
        super("[]", {}, true);
        this.kind = "indexer";
        this.type = type;
    }
}
exports.TypeDefinitionIndexerProperty = TypeDefinitionIndexerProperty;
class TypeDefinition extends TypeDefinitionObjectProperty {
    constructor(name, contract) {
        super(name, contract, true);
        this.name = name;
    }
    toString() {
        return this.name;
    }
}
exports.TypeDefinition = TypeDefinition;
//# sourceMappingURL=typeDefinition.js.map