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
exports.FileSystemObjectStorage = void 0;
const fs = require("fs");
const Objects = require("@paperbits/common/objects");
const memoryObjectStorage_1 = require("./memoryObjectStorage");
function loadFileAsString(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, "utf8", (error, content) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(content);
            });
        });
    });
}
class FileSystemObjectStorage extends memoryObjectStorage_1.MemoryObjectStorage {
    constructor(dataPath) {
        super(null);
        this.dataPath = dataPath;
    }
    getDataObject() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.storageDataObject) {
                this.storageDataObject = JSON.parse(yield loadFileAsString(this.dataPath));
                Objects.deepFreeze(this.storageDataObject);
            }
            return this.storageDataObject;
        });
    }
}
exports.FileSystemObjectStorage = FileSystemObjectStorage;
//# sourceMappingURL=fileSystemObjectStorage.js.map