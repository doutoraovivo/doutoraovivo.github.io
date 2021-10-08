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
exports.RemoteBlobStorage = void 0;
const http_1 = require("@paperbits/common/http");
class RemoteBlobStorage {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    uploadBlob(blobKey, content, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const media = new Blob([content], { type: contentType });
                const formData = new FormData();
                formData.append("media", media);
                yield this.httpClient.send({
                    url: `/_media/${blobKey}`,
                    method: http_1.HttpMethod.put,
                    body: formData
                });
            }
            catch (error) {
                throw new Error(`Could not upload '${blobKey}'. Error: ${error}`);
            }
        });
    }
    getDownloadUrl(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const downloadUrl = `/_media/${blobKey}`;
                return downloadUrl;
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.code) === "ResourceNotFound") {
                    return null;
                }
                else {
                    console.error(error);
                    throw new Error(`Could not get download url '${blobKey}'.`);
                }
            }
        });
    }
    deleteBlob(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = [];
                headers.push({ name: "If-Match", value: "*" });
                yield this.httpClient.send({
                    url: `/_media/${blobKey}`,
                    method: http_1.HttpMethod.delete
                });
            }
            catch (error) {
                throw new Error(`Could not delete file '${blobKey}'. Error: ${error}`);
            }
        });
    }
    downloadBlob(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataObject = yield this.httpClient.send({
                    url: `/files/${blobKey}`,
                    headers: []
                });
                return dataObject.toByteArray();
            }
            catch (error) {
                throw new Error(`Could not delete file '${blobKey}'. Error: ${error}`);
            }
        });
    }
}
exports.RemoteBlobStorage = RemoteBlobStorage;
//# sourceMappingURL=remoteBlobStorage.js.map