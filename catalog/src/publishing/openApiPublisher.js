"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiPublisher = void 0;
const Utils = require("@paperbits/common/utils");
const openApiIndexBuilder_1 = require("../services/openApiIndexBuilder");
class OpenApiPublisher {
    constructor(specsBlobStorage, outputBlobStorage, logger) {
        this.specsBlobStorage = specsBlobStorage;
        this.outputBlobStorage = outputBlobStorage;
        this.logger = logger;
    }
    publish() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const openApiIndexBuilder = new openApiIndexBuilder_1.OpenApiIndexBuilder();
                const downloadKeys = yield this.specsBlobStorage.listBlobs();
                for (const blobKey of downloadKeys) {
                    const specKey = blobKey.startsWith("/") ? blobKey.substr(1) : blobKey;
                    const specContent = yield this.specsBlobStorage.downloadBlob(specKey);
                    const openApiSpec = JSON.parse(Utils.uint8ArrayToString(specContent));
                    openApiIndexBuilder.appendSpec(specKey, openApiSpec);
                    yield this.outputBlobStorage.uploadBlob(`/specs/${specKey}`, specContent, "application/json");
                    this.logger.trackEvent("Publishing", { message: `Publishing OpenAPI spec ${openApiSpec.info.title}...` });
                }
                const index = openApiIndexBuilder.buildIndex();
                const indexFile = Utils.stringToUnit8Array(JSON.stringify(index));
                yield this.outputBlobStorage.uploadBlob(`/specs/index.json`, indexFile, "application/json");
            }
            catch (error) {
                throw new Error(`Unable to complete OpenAPI specifications publishing. ${error.stack || error.message}`);
            }
        });
    }
}
exports.OpenApiPublisher = OpenApiPublisher;
//# sourceMappingURL=openApiPublisher.js.map