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
exports.TemplatingService = void 0;
const liquidjs_1 = require("liquidjs");
class TemplatingService {
    static render(template, model) {
        return __awaiter(this, void 0, void 0, function* () {
            const engine = new liquidjs_1.Liquid();
            const result = yield engine.parseAndRender(template, model, null);
            return result;
        });
    }
}
exports.TemplatingService = TemplatingService;
//# sourceMappingURL=templatingService.js.map