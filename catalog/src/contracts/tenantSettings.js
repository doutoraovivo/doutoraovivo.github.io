"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationParameters = exports.DelegationAction = exports.DelegationActionPath = void 0;
var DelegationActionPath;
(function (DelegationActionPath) {
    DelegationActionPath["signIn"] = "signin";
    DelegationActionPath["signUp"] = "signup";
    DelegationActionPath["subscribe"] = "delegation-subscribe";
    DelegationActionPath["unsubscribe"] = "delegation-unsubscribe";
    DelegationActionPath["renew"] = "delegation-renew";
    DelegationActionPath["changeProfile"] = "delegation-changeProfile";
    DelegationActionPath["changePassword"] = "change-password";
    DelegationActionPath["closeAccount"] = "delegation-closeAccount";
    DelegationActionPath["signOut"] = "signout";
})(DelegationActionPath = exports.DelegationActionPath || (exports.DelegationActionPath = {}));
var DelegationAction;
(function (DelegationAction) {
    DelegationAction["signIn"] = "SignIn";
    DelegationAction["signUp"] = "SignUp";
    DelegationAction["signOut"] = "SignOut";
})(DelegationAction = exports.DelegationAction || (exports.DelegationAction = {}));
var DelegationParameters;
(function (DelegationParameters) {
    DelegationParameters["ReturnUrl"] = "returnUrl";
    DelegationParameters["ProductId"] = "productId";
    DelegationParameters["Operation"] = "operation";
    DelegationParameters["Signature"] = "sig";
    DelegationParameters["UserId"] = "userId";
    DelegationParameters["SubscriptionId"] = "subscriptionId";
    DelegationParameters["Salt"] = "salt";
})(DelegationParameters = exports.DelegationParameters || (exports.DelegationParameters = {}));
//# sourceMappingURL=tenantSettings.js.map