"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ContentController = void 0;
const express = require("express");
const fs = require("fs");
const path = require("path");
const constants_1 = require("../constants");
const routing_controllers_1 = require("routing-controllers");
const openApiIndexBuilder_1 = require("../services/openApiIndexBuilder");
let ContentController = class ContentController {
    constructor(settingsProvider) {
        this.settingsProvider = settingsProvider;
    }
    getData(fileKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = yield this.settingsProvider.getSetting(constants_1.dataPathSettingName);
            if (!constants_1.dataPathSettingName) {
                throw new Error(`Setting "${constants_1.dataPathSettingName}" not specified.`);
            }
            try {
                const contentFilePath = path.resolve(__dirname, dataPath, fileKey);
                return JSON.parse(yield fs.promises.readFile(contentFilePath, constants_1.defaultFileEncoding));
            }
            catch (error) {
                throw new Error(`Unable to load content from storage. ${error.stack}`);
            }
        });
    }
    setData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = yield this.settingsProvider.getSetting(constants_1.dataPathSettingName);
            if (!constants_1.dataPathSettingName) {
                throw new Error(`Setting "${constants_1.dataPathSettingName}" not specified.`);
            }
            try {
                const contentFilePath = path.resolve(__dirname, dataPath, constants_1.websiteContentFileName);
                yield fs.promises.writeFile(contentFilePath, JSON.stringify(data));
                return "OK";
            }
            catch (error) {
                throw new Error(`Unable to save content to storage. ${error.stack}`);
            }
        });
    }
    getBlob(response, blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mediaPath = yield this.settingsProvider.getSetting(constants_1.mediaPathSettingName);
                const filePath = path.resolve(__dirname, mediaPath, blobKey);
                if (!fs.existsSync(filePath)) {
                    throw new routing_controllers_1.NotFoundError();
                }
                const metadataFile = yield fs.promises.readFile(filePath + constants_1.metadataFileExt, constants_1.defaultFileEncoding);
                const metadata = JSON.parse(metadataFile);
                response.contentType(metadata.mimetype);
                const media = yield fs.promises.readFile(filePath, { encoding: "binary" });
                return Buffer.from(media, "binary");
            }
            catch (error) {
                throw new Error(`Unable to download media from storage. ${error.stack}`);
            }
        });
    }
    uploadBlob(blobKey, media) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mediaPath = yield this.settingsProvider.getSetting(constants_1.mediaPathSettingName);
                const mediaFolder = path.resolve(__dirname, mediaPath);
                const filePath = path.resolve(mediaFolder, blobKey);
                yield fs.promises.mkdir(mediaFolder, { recursive: true });
                yield fs.promises.writeFile(filePath, media.buffer);
                yield fs.promises.writeFile(filePath + constants_1.metadataFileExt, JSON.stringify({ mimetype: media.mimetype }));
                return "OK";
            }
            catch (error) {
                throw new Error(`Unable to upload media to storage. ${error.stack}`);
            }
        });
    }
    deleteBlob(blobKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mediaPath = yield this.settingsProvider.getSetting(constants_1.mediaPathSettingName);
                const mediaFolder = path.resolve(__dirname, mediaPath);
                const filePath = path.resolve(mediaFolder, blobKey);
                if (!fs.existsSync(filePath)) {
                    return "OK";
                }
                yield fs.promises.unlink(filePath);
                yield fs.promises.unlink(filePath + ".metacontent.json");
                return "OK";
            }
            catch (error) {
                throw new Error(`Unable to delete media from storage. ${error.stack}`);
            }
        });
    }
    getSpecsIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basePath = path.dirname(__filename);
                const openapiSpecsFolder = yield this.settingsProvider.getSetting(constants_1.openapiSpecsPathSettingName);
                const specsFolderPath = path.resolve(basePath, openapiSpecsFolder);
                const fileNames = yield fs.promises.readdir(specsFolderPath);
                const openApiIndexBuilder = new openApiIndexBuilder_1.OpenApiIndexBuilder();
                for (const fileName of fileNames) {
                    const specKey = fileName.startsWith("/") ? fileName.substr(1) : fileName;
                    const filePath = path.resolve(specsFolderPath, fileName);
                    const spec = JSON.parse(yield fs.promises.readFile(filePath, constants_1.defaultFileEncoding));
                    openApiIndexBuilder.appendSpec(specKey, spec);
                }
                const searchIndex = openApiIndexBuilder.buildIndex();
                return JSON.parse(JSON.stringify(searchIndex));
            }
            catch (error) {
                throw new Error(`Unable to build spec index. ${error.stack}`);
            }
        });
    }
    getSpecs(specKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const basePath = path.dirname(__filename);
            const openapiSpecsFolder = yield this.settingsProvider.getSetting(constants_1.openapiSpecsPathSettingName);
            const specsFilePath = path.resolve(basePath, openapiSpecsFolder, specKey);
            const spec = JSON.parse(yield fs.promises.readFile(specsFilePath, constants_1.defaultFileEncoding));
            return spec;
        });
    }
};
__decorate([
    (0, routing_controllers_1.HttpCode)(200),
    (0, routing_controllers_1.ContentType)("application/json"),
    (0, routing_controllers_1.Get)("/data/:fileKey"),
    __param(0, (0, routing_controllers_1.Param)("fileKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getData", null);
__decorate([
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_1.ContentType)("application/json"),
    (0, routing_controllers_1.Put)("/data/content.json"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "setData", null);
__decorate([
    (0, routing_controllers_1.HttpCode)(200),
    (0, routing_controllers_1.Get)("/_media/:blobKey"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Param)("blobKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getBlob", null);
__decorate([
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_1.Put)("/_media/:blobKey"),
    __param(0, (0, routing_controllers_1.Param)("blobKey")),
    __param(1, (0, routing_controllers_1.UploadedFile)("media")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "uploadBlob", null);
__decorate([
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_1.Put)("/_media/:blobKey"),
    __param(0, (0, routing_controllers_1.Param)("blobKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteBlob", null);
__decorate([
    (0, routing_controllers_1.HttpCode)(200),
    (0, routing_controllers_1.ContentType)("application/json"),
    (0, routing_controllers_1.Get)("/specs/index.json"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getSpecsIndex", null);
__decorate([
    (0, routing_controllers_1.HttpCode)(200),
    (0, routing_controllers_1.ContentType)("application/json"),
    (0, routing_controllers_1.Get)("/specs/:specKey"),
    __param(0, (0, routing_controllers_1.Param)("specKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getSpecs", null);
ContentController = __decorate([
    (0, routing_controllers_1.Controller)(),
    __metadata("design:paramtypes", [Object])
], ContentController);
exports.ContentController = ContentController;
//# sourceMappingURL=contentController.js.map