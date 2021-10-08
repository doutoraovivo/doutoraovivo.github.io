"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupType = exports.UserState = exports.UserGroup = exports.User = void 0;
const utils_1 = require("../utils");
class User {
    constructor(contract) {
        var _a;
        this.id = utils_1.Utils.getResourceName("users", contract.id, "shortId");
        this.firstName = contract.properties.firstName;
        this.lastName = contract.properties.lastName;
        this.email = contract.properties.email;
        this.state = contract.properties.state;
        this.registrationDate = contract.properties.registrationDate;
        this.note = contract.properties.note;
        this.groups = contract.properties.groups;
        this.identities = contract.properties.identities;
        this.isBasicAccount = ((_a = this.identities[0]) === null || _a === void 0 ? void 0 : _a.provider) === "Basic";
    }
}
exports.User = User;
class UserGroup {
}
exports.UserGroup = UserGroup;
var UserState;
(function (UserState) {
    UserState["active"] = "active";
    UserState["blocked"] = "blocked";
    UserState["pending"] = "pending";
    UserState["deleted"] = "deleted";
})(UserState = exports.UserState || (exports.UserState = {}));
var UserGroupType;
(function (UserGroupType) {
    UserGroupType[UserGroupType["custom"] = 0] = "custom";
    UserGroupType[UserGroupType["system"] = 1] = "system";
    UserGroupType[UserGroupType["external"] = 2] = "external";
})(UserGroupType = exports.UserGroupType || (exports.UserGroupType = {}));
//# sourceMappingURL=user.js.map