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
exports.StaticSettingsProvider = void 0;
class StaticSettingsProvider {
    constructor(configuration) {
        this.configuration = configuration;
    }
    getSetting(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.configuration[name];
        });
    }
    setSetting(name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.configuration[name] = value;
        });
    }
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.configuration;
        });
    }
}
exports.StaticSettingsProvider = StaticSettingsProvider;
//# sourceMappingURL=staticSettingsProvider.js.map