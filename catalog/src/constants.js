"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portalHeaderName = exports.developerPortalType = exports.managementApiVersion = exports.GrantTypes = exports.SettingNames = exports.AppType = exports.defaultInputDelayMs = exports.defaultPageSize = exports.reservedPermalinks = exports.pageUrlReference = exports.pageUrlResetPassword = exports.pageUrlConfirmPassword = exports.pageUrlChangePassword = exports.pageUrl500 = exports.pageUrl404 = exports.pageUrlHome = exports.pageUrlProfile = exports.pageUrlSignUpOAuth = exports.pageUrlSignUp = exports.pageUrlSignInSso = exports.pageUrlSignIn = exports.hashSignOut = exports.closeAccount = exports.AadEndpoints = exports.IdentityProviders = exports.RequestBodyType = exports.TypeOfApi = exports.ServiceSkuName = exports.openapiSpecsPathSettingName = exports.mediaPathSettingName = exports.dataPathSettingName = exports.metadataFileExt = exports.websiteContentFileName = exports.defaultFileEncoding = void 0;
exports.defaultFileEncoding = "utf8";
exports.websiteContentFileName = "content.json";
exports.metadataFileExt = ".metadata.json";
exports.dataPathSettingName = "dataFilesPath";
exports.mediaPathSettingName = "dataFilesPath";
exports.openapiSpecsPathSettingName = "openapiSpecsPath";
var ServiceSkuName;
(function (ServiceSkuName) {
    ServiceSkuName["Developer"] = "Developer";
    ServiceSkuName["Basic"] = "Basic";
    ServiceSkuName["Standard"] = "Standard";
    ServiceSkuName["Premium"] = "Premium";
    ServiceSkuName["Consumption"] = "Consumption";
})(ServiceSkuName = exports.ServiceSkuName || (exports.ServiceSkuName = {}));
var TypeOfApi;
(function (TypeOfApi) {
    TypeOfApi["webSocket"] = "websocket";
    TypeOfApi["soap"] = "soap";
    TypeOfApi["http"] = "http";
})(TypeOfApi = exports.TypeOfApi || (exports.TypeOfApi = {}));
var RequestBodyType;
(function (RequestBodyType) {
    RequestBodyType["raw"] = "raw";
    RequestBodyType["string"] = "string";
    RequestBodyType["binary"] = "binary";
    RequestBodyType["form"] = "form";
})(RequestBodyType = exports.RequestBodyType || (exports.RequestBodyType = {}));
var IdentityProviders;
(function (IdentityProviders) {
    IdentityProviders["basic"] = "Basic";
    IdentityProviders["aad"] = "Aad";
    IdentityProviders["aadB2C"] = "AadB2C";
})(IdentityProviders = exports.IdentityProviders || (exports.IdentityProviders = {}));
var AadEndpoints;
(function (AadEndpoints) {
    AadEndpoints["primary"] = "login.microsoftonline.com";
    AadEndpoints["legacy"] = "login.windows.net";
})(AadEndpoints = exports.AadEndpoints || (exports.AadEndpoints = {}));
exports.closeAccount = "close-account";
exports.hashSignOut = "signout";
exports.pageUrlSignIn = "/signin";
exports.pageUrlSignInSso = "/signinsso";
exports.pageUrlSignUp = "/signup";
exports.pageUrlSignUpOAuth = "/signup-oauth";
exports.pageUrlProfile = "/profile";
exports.pageUrlHome = "/";
exports.pageUrl404 = "/404";
exports.pageUrl500 = "/500";
exports.pageUrlChangePassword = "/change-password";
exports.pageUrlConfirmPassword = "/confirm-password";
exports.pageUrlResetPassword = "/reset-password";
exports.pageUrlReference = "/api-details";
exports.reservedPermalinks = [
    exports.pageUrlHome,
    exports.pageUrl404,
    exports.pageUrl500,
    exports.pageUrlSignIn,
    exports.pageUrlSignInSso,
    exports.pageUrlSignUp,
    exports.pageUrlSignUpOAuth,
    exports.pageUrlProfile,
    exports.pageUrlChangePassword,
    exports.pageUrlConfirmPassword,
    exports.hashSignOut,
    "/confirm-v2/identities/basic/signup",
    "/confirm/invitation",
    "/confirm-v2/password",
    "/captcha"
];
exports.defaultPageSize = 50;
exports.defaultInputDelayMs = 600;
exports.AppType = "developerPortal";
var SettingNames;
(function (SettingNames) {
    SettingNames["backendUrl"] = "backendUrl";
    SettingNames["managementApiUrl"] = "managementApiUrl";
    SettingNames["managementApiAccessToken"] = "managementApiAccessToken";
    SettingNames["aadClientConfig"] = "aad";
    SettingNames["aadB2CClientConfig"] = "aadB2C";
})(SettingNames = exports.SettingNames || (exports.SettingNames = {}));
var GrantTypes;
(function (GrantTypes) {
    GrantTypes["implicit"] = "implicit";
    GrantTypes["authorizationCode"] = "authorization_code";
    GrantTypes["clientCredentials"] = "client_credentials";
    GrantTypes["password"] = "password";
})(GrantTypes = exports.GrantTypes || (exports.GrantTypes = {}));
exports.managementApiVersion = "2021-01-01-preview";
exports.developerPortalType = "self-hosted-portal";
exports.portalHeaderName = "x-ms-apim-client";
//# sourceMappingURL=constants.js.map