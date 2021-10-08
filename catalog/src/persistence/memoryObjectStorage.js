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
exports.MemoryObjectStorage = void 0;
const _ = require("lodash");
const FileSaver = require("file-saver");
const Objects = require("@paperbits/common/objects");
const persistence_1 = require("@paperbits/common/persistence");
const pageSize = 20;
class MemoryObjectStorage {
    constructor(dataProvider) {
        this.dataProvider = dataProvider;
        this.splitter = "/";
    }
    getDataObject() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.dataProvider.getDataObject();
            return data;
        });
    }
    addObject(path, dataObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const storageDataObject = yield this.getDataObject();
            if (!path) {
                throw new Error(`Parameter "path" not specified.`);
            }
            if (path) {
                const pathParts = path.split(this.splitter);
                const mainNode = pathParts[0];
                if (pathParts.length === 1 || (pathParts.length === 2 && !pathParts[1])) {
                    storageDataObject[mainNode] = dataObject;
                }
                else {
                    if (!_.has(storageDataObject, mainNode)) {
                        storageDataObject[mainNode] = {};
                    }
                    storageDataObject[mainNode][pathParts[1]] = dataObject;
                }
            }
            else {
                Object.keys(dataObject).forEach(prop => {
                    const obj = dataObject[prop];
                    const pathParts = prop.split(this.splitter);
                    const mainNode = pathParts[0];
                    if (pathParts.length === 1 || (pathParts.length === 2 && !pathParts[1])) {
                        storageDataObject[mainNode] = obj;
                    }
                    else {
                        if (!_.has(storageDataObject, mainNode)) {
                            storageDataObject[mainNode] = {};
                        }
                        storageDataObject[mainNode][pathParts[1]] = obj;
                    }
                });
            }
        });
    }
    getObject(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getDataObject();
            const node = Objects.getObjectAt(path, data);
            if (!node) {
                return null;
            }
            return Objects.clone(node);
        });
    }
    deleteObject(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                return;
            }
            const storageDataObject = yield this.getDataObject();
            Objects.deleteNodeAt(path, storageDataObject);
        });
    }
    updateObject(path, dataObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                return;
            }
            const storageDataObject = yield this.getDataObject();
            const clone = Objects.clone(dataObject);
            Objects.setValue(path, storageDataObject, clone);
            Objects.cleanupObject(clone);
        });
    }
    searchObjects(path, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const storageDataObject = Objects.clone(yield this.getDataObject());
            if (!storageDataObject) {
                return { value: [] };
            }
            const searchObj = Objects.getObjectAt(path, storageDataObject);
            if (!searchObj) {
                return { value: [] };
            }
            let collection = Object.values(searchObj);
            if (query) {
                if (query.filters.length > 0) {
                    collection = collection.filter(x => {
                        let meetsCriteria = true;
                        for (const filter of query.filters) {
                            let left = Objects.getObjectAt(filter.left, x);
                            let right = filter.right;
                            if (left === undefined) {
                                meetsCriteria = false;
                                continue;
                            }
                            if (typeof left === "string") {
                                left = left.toUpperCase();
                            }
                            if (typeof right === "string") {
                                right = right.toUpperCase();
                            }
                            const operator = filter.operator;
                            switch (operator) {
                                case persistence_1.Operator.contains:
                                    if (left && !left.includes(right)) {
                                        meetsCriteria = false;
                                    }
                                    break;
                                case persistence_1.Operator.equals:
                                    if (left !== right) {
                                        meetsCriteria = false;
                                    }
                                    break;
                                default:
                                    throw new Error("Cannot translate operator into Firebase Realtime Database query.");
                            }
                        }
                        return meetsCriteria;
                    });
                }
                if (query.orderingBy) {
                    const property = query.orderingBy;
                    collection = collection.sort((x, y) => {
                        const a = Objects.getObjectAt(property, x);
                        const b = Objects.getObjectAt(property, y);
                        const modifier = query.orderDirection === persistence_1.OrderDirection.accending ? 1 : -1;
                        if (a > b) {
                            return modifier;
                        }
                        if (a < b) {
                            return -modifier;
                        }
                        return 0;
                    });
                }
            }
            const value = Objects.clone(collection.slice(0, pageSize));
            return new StaticPage(value, collection, pageSize);
        });
    }
    saveChanges(delta) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Saving changes...");
            const storageDataObject = yield this.getDataObject();
            Objects.mergeDeep(storageDataObject, delta, true);
            const state = JSON.stringify(storageDataObject);
            const stateBlob = new Blob([state], { type: "text/plain;charset=utf-8" });
            FileSaver.saveAs(stateBlob, "demo.json");
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = e => {
                    const target = e.target;
                    const file = target.files[0];
                    if (!file) {
                        resolve(undefined);
                    }
                    const reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = (readerEvent) => __awaiter(this, void 0, void 0, function* () {
                        const contentString = readerEvent.target.result.toString();
                        const dataObject = contentString ? JSON.parse(contentString) : undefined;
                        yield this.dataProvider.setDataObject(dataObject);
                        resolve(dataObject);
                    });
                };
                input.click();
            });
        });
    }
}
exports.MemoryObjectStorage = MemoryObjectStorage;
class StaticPage {
    constructor(value, collection, skip) {
        this.value = value;
        this.collection = collection;
        this.skip = skip;
        if (skip > this.collection.length) {
            this.takeNext = null;
        }
    }
    takePrev() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
        });
    }
    takeNext() {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.collection.slice(this.skip, this.skip + pageSize);
            const skipNext = this.skip + pageSize;
            const nextPage = new StaticPage(value, this.collection, skipNext);
            return nextPage;
        });
    }
}
//# sourceMappingURL=memoryObjectStorage.js.map