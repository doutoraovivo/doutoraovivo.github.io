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
exports.MemoryBlobStorage = void 0;
const Utils = require("@paperbits/common/utils");
class MemoryBlobStorage {
    constructor(dataProvider) {
        this.dataProvider = dataProvider;
    }
    getDataObject() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initPromise) {
                return this.initPromise;
            }
            this.initPromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const dataObject = yield this.dataProvider.getDataObject();
                const blobsDataObject = dataObject["blobs"] || {};
                dataObject["blobs"] = blobsDataObject;
                resolve(blobsDataObject);
            }));
            return this.initPromise;
        });
    }
    uploadBlob(blobKey, content, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataObject = yield this.getDataObject();
            dataObject[blobKey] = {
                contentType: contentType,
                content: `data:${contentType};base64,${Utils.arrayBufferToBase64(content)}`
            };
        });
    }
    getDownloadUrl(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataObject = yield this.getDataObject();
            const blobRecord = dataObject[blobKey];
            if (!blobRecord) {
                return null;
            }
            return blobRecord.content;
        });
    }
    deleteBlob(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataObject = yield this.getDataObject();
            delete dataObject[blobKey];
        });
    }
    downloadBlob(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataObject = yield this.getDataObject();
            const blobRecord = dataObject[blobKey];
            if (blobRecord) {
                const base64 = blobRecord.content.replace("data:font/ttf;base64,", "");
                return Utils.base64ToArrayBuffer(base64);
            }
            else {
                return null;
            }
        });
    }
}
exports.MemoryBlobStorage = MemoryBlobStorage;
//# sourceMappingURL=memoryBlobStorage.js.map