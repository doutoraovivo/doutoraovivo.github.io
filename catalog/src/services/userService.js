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
exports.StaticUserService = void 0;
const user_1 = require("@paperbits/common/user");
class StaticUserService {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    getUserName() {
        return __awaiter(this, void 0, void 0, function* () {
            return "";
        });
    }
    getUserPhotoUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return "";
        });
    }
    getUserRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticated = yield this.authenticator.isAuthenticated();
            if (authenticated) {
                return [user_1.BuiltInRoles.authenticated.key];
            }
            else {
                return [user_1.BuiltInRoles.anonymous.key];
            }
        });
    }
    setUserRoles(roles) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
}
exports.StaticUserService = StaticUserService;
//# sourceMappingURL=userService.js.map