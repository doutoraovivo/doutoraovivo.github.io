"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiIndexBuilder = void 0;
const lunr = require("lunr");
class OpenApiIndexBuilder {
    constructor() {
        this.documents = [];
    }
    getIndexerConfigFunc(documents) {
        return function () {
            this.ref("key");
            this.field("name");
            this.field("description");
            documents.forEach(document => this.add(document), this);
        };
    }
    appendSpec(key, spec) {
        const searchable = {
            key: key,
            name: spec.info.title,
            description: spec.info.description
        };
        this.documents.push(searchable);
    }
    buildIndex() {
        try {
            const index = lunr(this.getIndexerConfigFunc(this.documents));
            return index;
        }
        catch (error) {
            throw new Error(`Unable to build search index: ${error.stack || error.message}`);
        }
    }
}
exports.OpenApiIndexBuilder = OpenApiIndexBuilder;
//# sourceMappingURL=openApiIndexBuilder.js.map