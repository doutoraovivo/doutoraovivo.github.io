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
exports.StaticContentMiddleware = void 0;
const express = require("express");
const mime = require("mime");
const routing_controllers_1 = require("routing-controllers");
let StaticContentMiddleware = class StaticContentMiddleware {
    constructor(websiteStorage, designerStorage, logger) {
        this.websiteStorage = websiteStorage;
        this.designerStorage = designerStorage;
        this.logger = logger;
        this.use = this.use.bind(this);
    }
    isFile(path) {
        return !!path.match(/\.\w*$/gm);
    }
    isDesignerResource(request) {
        var _a, _b, _c, _d;
        if (request.path.startsWith("/specs/")) {
            return false;
        }
        const referrer = ((_a = request.headers) === null || _a === void 0 ? void 0 : _a.referer)
            ? new URL((_b = request.headers) === null || _b === void 0 ? void 0 : _b.referer)
            : null;
        return request.path.startsWith("/admin")
            || request.path.startsWith("/editors")
            || ((_d = (_c = request.headers) === null || _c === void 0 ? void 0 : _c.referer) === null || _d === void 0 ? void 0 : _d.endsWith("?designtime=true"))
            || (referrer === null || referrer === void 0 ? void 0 : referrer.pathname.startsWith("/admin"));
    }
    render(basePath, path, response, sourceStorage) {
        return __awaiter(this, void 0, void 0, function* () {
            path = basePath + path;
            const requestingFile = this.isFile(path);
            if (!requestingFile) {
                path += (path.endsWith("/") ? "" : "/") + "index.html";
            }
            const blob = yield sourceStorage.downloadBlob(path);
            if (blob) {
                const fileName = path.split("/").pop();
                const contentType = mime.getType(fileName) || "application/octet-stream";
                response
                    .header("Content-Type", contentType)
                    .end(Buffer.from(blob), "binary");
                return;
            }
            const blob404 = yield sourceStorage.downloadBlob(`/${basePath}/404/index.html`);
            if (blob404) {
                response
                    .status(404)
                    .header("Content-Type", "text/html")
                    .end(Buffer.from(blob), "binary");
                return;
            }
            response
                .status(404)
                .header("Content-Type", "text/plain")
                .end("Resource not found");
        });
    }
    processRequest(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let storage;
            let basePath;
            try {
                let path = decodeURIComponent(request.path);
                const requestingFile = this.isFile(path);
                if (this.isDesignerResource(request)) {
                    storage = this.designerStorage;
                    basePath = ``;
                    if (!requestingFile) {
                        path = "/";
                    }
                    yield this.render(basePath, path, response, storage);
                    return;
                }
                storage = this.websiteStorage;
                basePath = ``;
                yield this.render(basePath, path, response, storage);
            }
            catch (error) {
                console.log(error);
                response
                    .status(500)
                    .header("Content-Type", "text/html")
                    .send("Oops. Something went wrong. Please try again later.");
            }
        });
    }
    use(request, response, next) {
        this.processRequest(request, response)
            .then(() => next())
            .catch(error => next(error));
    }
};
__decorate([
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], StaticContentMiddleware.prototype, "isDesignerResource", null);
__decorate([
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StaticContentMiddleware.prototype, "processRequest", null);
__decorate([
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Object)
], StaticContentMiddleware.prototype, "use", null);
StaticContentMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "after" }),
    __metadata("design:paramtypes", [Object, Object, Object])
], StaticContentMiddleware);
exports.StaticContentMiddleware = StaticContentMiddleware;
//# sourceMappingURL=staticContentMiddleware.js.map