"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiConverter = void 0;
const schema_1 = require("../models/schema");
const typeDefinition_1 = require("../models/typeDefinition");
const defaultApiServerHost = "api.contoso.com";
class OpenApiConverter {
    convertParameter(openApiParameter) {
        var _a;
        const parameter = {
            name: openApiParameter.name,
            description: openApiParameter.description,
            in: openApiParameter.in,
            type: (_a = openApiParameter.schema) === null || _a === void 0 ? void 0 : _a.type,
            values: [],
            required: openApiParameter.required
        };
        return parameter;
    }
    convertRequest(spec, openApiOperation) {
        const request = {
            description: openApiOperation.description,
        };
        if (openApiOperation.parameters) {
            request.queryParameters = openApiOperation.parameters
                ? openApiOperation.parameters
                    .filter(parameter => parameter.in === "query")
                    .map(parameter => this.convertParameter(parameter))
                : [];
            request.headers = openApiOperation.parameters
                ? openApiOperation.parameters
                    .filter(parameter => parameter.in === "header")
                    .map(parameter => this.convertParameter(parameter))
                : [];
        }
        if (openApiOperation.requestBody) {
            request.representations = this.convertRepresentations(spec, openApiOperation.requestBody.content);
        }
        return request;
    }
    getTypeNameFromRef($ref) {
        return $ref && $ref.split("/").pop();
    }
    convertRepresentation(spec, contentType, mediaType) {
        var _a;
        const representation = {
            contentType: contentType,
            typeName: this.getTypeNameFromRef((_a = mediaType.schema) === null || _a === void 0 ? void 0 : _a.$ref),
            schemaId: `${spec.info.title}`
        };
        return representation;
    }
    convertRepresentations(spec, representationObjects) {
        const mediaTypes = Object.keys(representationObjects);
        const representations = mediaTypes.map(mediaType => this.convertRepresentation(spec, mediaType, representationObjects[mediaType]));
        return representations;
    }
    convertHeaders(headersObject) {
        var _a;
        const parameters = [];
        for (const headerKey of Object.keys(headersObject)) {
            const headerObject = headersObject[headerKey];
            const header = {
                name: headerKey,
                description: headerObject.description,
                in: headerObject.in,
                type: (_a = headerObject.schema) === null || _a === void 0 ? void 0 : _a.type
            };
            parameters.push(header);
        }
        return parameters;
    }
    convertResponse(spec, statusCode, responseObject) {
        const response = {
            statusCode: statusCode,
            description: responseObject.description
        };
        const headersObject = responseObject.headers;
        if (headersObject) {
            response.headers = this.convertHeaders(headersObject);
        }
        const contentObject = responseObject.content;
        if (contentObject) {
            response.representations = this.convertRepresentations(spec, contentObject);
        }
        return response;
    }
    convertPaths(spec) {
        const pathsObject = spec.paths;
        const operations = [];
        for (const pathKey of Object.keys(pathsObject)) {
            const methodsObject = pathsObject[pathKey];
            const methodKeys = Object.keys(methodsObject);
            for (const methodKey of methodKeys) {
                const methodObject = methodsObject[methodKey];
                const operationId = `${methodKey}-${pathKey}`
                    .replace(/\W/g, "-")
                    .replace(/\-{1,}/g, "-")
                    .toLowerCase();
                const operation = {
                    id: operationId,
                    name: operationId,
                    properties: {
                        displayName: methodObject.summary || operationId,
                        description: methodObject.description,
                        urlTemplate: pathKey,
                        templateParameters: methodObject.parameters
                            ? methodObject.parameters
                                .filter(parameter => parameter.in === "template")
                                .map(parameter => this.convertParameter(parameter))
                            : [],
                        method: methodKey.toUpperCase(),
                        version: "",
                        request: this.convertRequest(spec, methodObject)
                    }
                };
                const responsesObject = methodObject.responses;
                if (responsesObject) {
                    const responseContracts = [];
                    for (const responseKey of Object.keys(responsesObject)) {
                        const statusCode = parseInt(responseKey);
                        if (!statusCode) {
                            continue;
                        }
                        const responseContract = this.convertResponse(spec, statusCode, responsesObject[responseKey]);
                        responseContracts.push(responseContract);
                    }
                    operation.properties.responses = responseContracts;
                }
                operations.push(operation);
            }
        }
        return operations;
    }
    getApi(spec) {
        const apiContract = {
            name: spec.info.title,
            properties: {
                displayName: spec.info.title,
                description: spec.info.description,
                subscriptionRequired: false,
                protocols: ["http", "https"],
                thumbnail: spec.info["x:thumbnail"]
            }
        };
        return apiContract;
    }
    getOperations(spec) {
        const operations = this.convertPaths(spec);
        return operations;
    }
    getHostnames(spec) {
        var _a;
        if (!spec.servers || spec.servers.length === 0) {
            return [defaultApiServerHost];
        }
        return (_a = spec.servers) === null || _a === void 0 ? void 0 : _a.map(server => server.url.startsWith("http://") || server.url.startsWith("https://")
            ? new URL(server.url).hostname
            : defaultApiServerHost);
    }
    getSchema(spec) {
        var _a;
        const schemasObject = (_a = spec.components) === null || _a === void 0 ? void 0 : _a.schemas;
        if (!schemasObject) {
            return null;
        }
        const definitions = Object
            .keys(schemasObject)
            .map(definitionName => {
            return new typeDefinition_1.TypeDefinition(definitionName, schemasObject[definitionName]);
        });
        const schema = new schema_1.Schema();
        schema.definitions = definitions;
        return schema;
    }
}
exports.OpenApiConverter = OpenApiConverter;
//# sourceMappingURL=openApiConverter.js.map