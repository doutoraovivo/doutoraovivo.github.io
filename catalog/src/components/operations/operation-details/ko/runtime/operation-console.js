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
exports.OperationConsole = void 0;
const ko = require("knockout");
const validation = require("knockout.validation");
const decorators_1 = require("@paperbits/common/ko/decorators");
const constants_1 = require("../../../../../constants");
const unauthorizedError_1 = require("../../../../../errors/unauthorizedError");
const consoleHeader_1 = require("../../../../../models/console/consoleHeader");
const consoleOperation_1 = require("../../../../../models/console/consoleOperation");
const consoleParameter_1 = require("../../../../../models/console/consoleParameter");
const knownHttpHeaders_1 = require("../../../../../models/knownHttpHeaders");
const knownStatusCodes_1 = require("../../../../../models/knownStatusCodes");
const routeHelper_1 = require("../../../../../routing/routeHelper");
const apiService_1 = require("../../../../../services/apiService");
const oauthService_1 = require("../../../../../services/oauthService");
const templatingService_1 = require("../../../../../services/templatingService");
const utils_1 = require("../../../../../utils");
const constants_2 = require("./../../../../../constants");
const operation_console_html_1 = require("./operation-console.html");
const templates_1 = require("./templates/templates");
const websocketClient_1 = require("./websocketClient");
const oauthSessionKey = "oauthSession";
let OperationConsole = class OperationConsole {
    constructor(apiService, httpClient, routeHelper, oauthService, sessionManager, settingsProvider) {
        this.apiService = apiService;
        this.httpClient = httpClient;
        this.routeHelper = routeHelper;
        this.oauthService = oauthService;
        this.sessionManager = sessionManager;
        this.settingsProvider = settingsProvider;
        this.templates = templates_1.templates;
        this.requestError = ko.observable();
        this.responseStatusCode = ko.observable();
        this.responseStatusText = ko.observable();
        this.responseHeadersString = ko.observable();
        this.responseBody = ko.observable();
        this.selectedLanguage = ko.observable("http");
        this.api = ko.observable();
        this.revision = ko.observable();
        this.operation = ko.observable();
        this.hostnames = ko.observable();
        this.consoleOperation = ko.observable();
        this.secretsRevealed = ko.observable();
        this.selectedSubscriptionKey = ko.observable();
        this.subscriptionKeyRequired = ko.observable();
        this.working = ko.observable(true);
        this.sendingRequest = ko.observable(false);
        this.codeSample = ko.observable();
        this.onFileSelect = this.onFileSelect.bind(this);
        this.selectedHostname = ko.observable("");
        this.hostnameSelectionEnabled = ko.observable();
        this.isHostnameWildcarded = ko.computed(() => this.selectedHostname().includes("*"));
        this.selectedGrantType = ko.observable();
        this.authorizationServer = ko.observable();
        this.username = ko.observable();
        this.password = ko.observable();
        this.authorizationError = ko.observable();
        this.authenticated = ko.observable(false);
        this.useCorsProxy = ko.observable(false);
        this.wildcardSegment = ko.observable();
        this.wsConnected = ko.observable(false);
        this.wsConnecting = ko.observable(false);
        this.wsStatus = ko.observable("Connect");
        this.wsSendStatus = ko.observable("Send");
        this.wsSending = ko.observable(false);
        this.wsPayload = ko.observable();
        this.wsDataFormat = ko.observable("raw");
        this.wsLogItems = ko.observableArray([]);
        validation.rules["maxFileSize"] = {
            validator: (file, maxSize) => !file || file.size < maxSize,
            message: (size) => `The file size cannot exceed ${utils_1.Utils.formatBytes(size)}.`
        };
        validation.registerExtenders();
        validation.init({
            insertMessages: false,
            errorElementClass: "is-invalid",
            decorateInputElement: true
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.resetConsole();
            this.selectedHostname.subscribe(this.setHostname);
            this.wildcardSegment.subscribe((wildcardSegment) => {
                const hostname = wildcardSegment
                    ? this.selectedHostname().replace("*", wildcardSegment)
                    : this.selectedHostname();
                this.setHostname(hostname);
            });
            this.selectedSubscriptionKey.subscribe(this.applySubscriptionKey.bind(this));
            this.api.subscribe(this.resetConsole);
            this.operation.subscribe(this.resetConsole);
            this.selectedLanguage.subscribe(this.updateRequestSummary);
            this.selectedGrantType.subscribe(this.onGrantTypeChange);
        });
    }
    resetConsole() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const selectedOperation = this.operation();
            const selectedApi = this.api();
            if (!selectedApi || !selectedOperation) {
                return;
            }
            this.working(true);
            this.sendingRequest(false);
            this.wsConnected(false);
            this.consoleOperation(null);
            this.secretsRevealed(false);
            this.responseStatusCode(null);
            this.responseStatusText(null);
            this.responseBody(null);
            this.selectedSubscriptionKey(null);
            this.subscriptionKeyRequired(!!selectedApi.subscriptionRequired);
            const operation = yield this.apiService.getOperation(selectedApi.name, selectedOperation.name);
            const consoleOperation = new consoleOperation_1.ConsoleOperation(selectedApi, operation);
            this.consoleOperation(consoleOperation);
            const hostnames = this.hostnames();
            this.hostnameSelectionEnabled(((_a = this.hostnames()) === null || _a === void 0 ? void 0 : _a.length) > 1);
            const hostname = hostnames[0];
            this.selectedHostname(hostname);
            this.hostnameSelectionEnabled(((_b = this.hostnames()) === null || _b === void 0 ? void 0 : _b.length) > 1);
            consoleOperation.host.hostname(hostname);
            if (this.api().type === constants_1.TypeOfApi.soap) {
                this.setSoapHeaders();
            }
            if (this.api().type === constants_1.TypeOfApi.webSocket) {
                this.selectedLanguage("ws_wscat");
            }
            if (!this.isConsumptionMode && this.api().type !== constants_1.TypeOfApi.webSocket) {
                this.setNoCacheHeader();
            }
            if (this.api().apiVersionSet && this.api().apiVersionSet.versioningScheme === "Header") {
                this.setVersionHeader();
            }
            yield this.setupOAuth();
            this.updateRequestSummary();
            this.working(false);
        });
    }
    setSoapHeaders() {
        const consoleOperation = this.consoleOperation();
        const representation = consoleOperation.request.representations[0];
        if (representation) {
            if (representation.contentType.toLowerCase() === "text/xml".toLowerCase()) {
                consoleOperation.setHeader(knownHttpHeaders_1.KnownHttpHeaders.SoapAction, `"${consoleOperation.urlTemplate.split("=")[1]}"`);
            }
            if (representation.contentType.toLowerCase() === "application/soap+xml".toLowerCase()) {
                const contentHeader = consoleOperation.request.headers()
                    .find(header => header.name().toLowerCase() === knownHttpHeaders_1.KnownHttpHeaders.ContentType.toLowerCase());
                if (contentHeader) {
                    const contentType = `${contentHeader.value()};action="${consoleOperation.urlTemplate.split("=")[1]}"`;
                    contentHeader.value(contentType);
                }
            }
        }
        else {
            consoleOperation.setHeader(knownHttpHeaders_1.KnownHttpHeaders.SoapAction, "\"" + consoleOperation.urlTemplate.split("=")[1] + "\"");
        }
        consoleOperation.urlTemplate = "";
    }
    setHostname(hostname) {
        this.consoleOperation().host.hostname(hostname);
        this.updateRequestSummary();
    }
    addHeader() {
        this.consoleOperation().request.headers.push(new consoleHeader_1.ConsoleHeader());
        this.updateRequestSummary();
    }
    removeHeader(header) {
        this.consoleOperation().request.headers.remove(header);
        this.updateRequestSummary();
    }
    findHeader(name) {
        const searchName = name.toLocaleLowerCase();
        return this.consoleOperation().request
            .headers()
            .find(x => { var _a; return ((_a = x.name()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === searchName; });
    }
    addQueryParameter() {
        this.consoleOperation().request.queryParameters.push(new consoleParameter_1.ConsoleParameter());
        this.updateRequestSummary();
    }
    removeQueryParameter(parameter) {
        this.consoleOperation().request.queryParameters.remove(parameter);
        this.updateRequestSummary();
    }
    applySubscriptionKey(subscriptionKey) {
        if (!this.consoleOperation()) {
            return;
        }
        if (this.api().type === constants_1.TypeOfApi.webSocket) {
            this.setSubscriptionKeyParameter(subscriptionKey);
        }
        else {
            this.setSubscriptionKeyHeader(subscriptionKey);
        }
        this.updateRequestSummary();
    }
    setNoCacheHeader() {
        this.consoleOperation().setHeader(knownHttpHeaders_1.KnownHttpHeaders.CacheControl, "no-cache", "string", "Disable caching.");
    }
    setVersionHeader() {
        this.consoleOperation().setHeader(this.api().apiVersionSet.versionHeaderName, this.api().apiVersion, "string", "API version");
    }
    getSubscriptionKeyHeaderName() {
        let subscriptionKeyHeaderName = knownHttpHeaders_1.KnownHttpHeaders.OcpApimSubscriptionKey;
        if (this.api().subscriptionKeyParameterNames && this.api().subscriptionKeyParameterNames.header) {
            subscriptionKeyHeaderName = this.api().subscriptionKeyParameterNames.header;
        }
        return subscriptionKeyHeaderName;
    }
    getSubscriptionKeyParamName() {
        let subscriptionKeyParamName = "subscription-key";
        if (this.api().subscriptionKeyParameterNames && this.api().subscriptionKeyParameterNames.query) {
            subscriptionKeyParamName = this.api().subscriptionKeyParameterNames.query;
        }
        return subscriptionKeyParamName;
    }
    getSubscriptionKeyParam() {
        const subscriptionKeyParamName = this.getSubscriptionKeyParamName();
        const searchName = subscriptionKeyParamName.toLocaleLowerCase();
        return this.consoleOperation().request.queryParameters().find(x => { var _a; return ((_a = x.name()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === searchName; });
    }
    setSubscriptionKeyParameter(subscriptionKey) {
        const subscriptionKeyParam = this.getSubscriptionKeyParam();
        this.removeQueryParameter(subscriptionKeyParam);
        if (!subscriptionKey) {
            return;
        }
        const subscriptionKeyParamName = this.getSubscriptionKeyParamName();
        const keyParameter = new consoleParameter_1.ConsoleParameter();
        keyParameter.name(subscriptionKeyParamName);
        keyParameter.value(subscriptionKey);
        keyParameter.secret = true;
        keyParameter.type = "string";
        keyParameter.canRename = false;
        keyParameter.required = true;
        this.consoleOperation().request.queryParameters.push(keyParameter);
        this.updateRequestSummary();
    }
    getSubscriptionKeyHeader() {
        const subscriptionKeyHeaderName = this.getSubscriptionKeyHeaderName();
        return this.findHeader(subscriptionKeyHeaderName);
    }
    setSubscriptionKeyHeader(subscriptionKey) {
        this.removeSubscriptionKeyHeader();
        if (!subscriptionKey) {
            return;
        }
        const subscriptionKeyHeaderName = this.getSubscriptionKeyHeaderName();
        const keyHeader = new consoleHeader_1.ConsoleHeader();
        keyHeader.name(subscriptionKeyHeaderName);
        keyHeader.value(subscriptionKey);
        keyHeader.description = "Subscription key.";
        keyHeader.secret = true;
        keyHeader.inputTypeValue = "password";
        keyHeader.type = "string";
        keyHeader.required = true;
        this.consoleOperation().request.headers.push(keyHeader);
        this.updateRequestSummary();
    }
    removeAuthorizationHeader() {
        const authorizationHeader = this.findHeader(knownHttpHeaders_1.KnownHttpHeaders.Authorization);
        this.removeHeader(authorizationHeader);
        this.authenticated(false);
    }
    setAuthorizationHeader(accessToken) {
        this.removeAuthorizationHeader();
        const keyHeader = new consoleHeader_1.ConsoleHeader();
        keyHeader.name(knownHttpHeaders_1.KnownHttpHeaders.Authorization);
        keyHeader.value(accessToken);
        keyHeader.description = "Subscription key.";
        keyHeader.secret = true;
        keyHeader.inputTypeValue = "password";
        keyHeader.type = "string";
        keyHeader.required = true;
        this.consoleOperation().request.headers.push(keyHeader);
        this.updateRequestSummary();
        this.authenticated(true);
    }
    removeSubscriptionKeyHeader() {
        const subscriptionKeyHeader = this.getSubscriptionKeyHeader();
        this.removeHeader(subscriptionKeyHeader);
    }
    updateRequestSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const template = templates_1.templates[this.selectedLanguage()];
            const codeSample = yield templatingService_1.TemplatingService.render(template, ko.toJS(this.consoleOperation));
            this.codeSample(codeSample);
        });
    }
    onFileSelect(file) {
        this.consoleOperation().request.binary(file);
        this.updateRequestSummary();
    }
    validateAndSendRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = this.consoleOperation();
            const templateParameters = operation.templateParameters();
            const queryParameters = operation.request.queryParameters();
            const headers = operation.request.headers();
            const binary = operation.request.binary;
            const parameters = [].concat(templateParameters, queryParameters, headers);
            const validationGroup = validation.group(parameters.map(x => x.value).concat(binary), { live: true });
            const clientErrors = validationGroup();
            if (clientErrors.length > 0) {
                validationGroup.showAllMessages();
                return;
            }
            this.sendRequest();
        });
    }
    sendFromBrowser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient.send(request);
            return response;
        });
    }
    sendFromProxy(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.body) {
                request.body = Buffer.from(request.body);
            }
            const formData = new FormData();
            const requestPackage = new Blob([JSON.stringify(request)], { type: "application/json" });
            formData.append("requestPackage", requestPackage);
            const baseProxyUrl = this.backendUrl || "";
            const apiName = this.api().name;
            const proxiedRequest = {
                url: `${baseProxyUrl}/send`,
                method: "POST",
                headers: [{ name: "X-Ms-Api-Name", value: apiName }],
                body: formData
            };
            const proxiedResponse = yield this.httpClient.send(proxiedRequest);
            const responsePackage = proxiedResponse.toObject();
            const responseBodyBuffer = responsePackage.body
                ? Buffer.from(responsePackage.body.data)
                : null;
            const response = {
                headers: responsePackage.headers,
                statusCode: responsePackage.statusCode,
                statusText: responsePackage.statusMessage,
                body: responseBodyBuffer,
                toText: () => responseBodyBuffer.toString("utf8")
            };
            return response;
        });
    }
    sendRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            this.requestError(null);
            this.sendingRequest(true);
            this.responseStatusCode(null);
            const consoleOperation = this.consoleOperation();
            const request = consoleOperation.request;
            const url = consoleOperation.requestUrl();
            const method = consoleOperation.method;
            const headers = [...request.headers()];
            let payload;
            switch (consoleOperation.request.bodyFormat()) {
                case constants_1.RequestBodyType.raw:
                    payload = request.body();
                    break;
                case constants_1.RequestBodyType.binary:
                    payload = yield utils_1.Utils.readFileAsByteArray(request.binary());
                    break;
                case constants_1.RequestBodyType.form:
                    payload = request.getFormDataPayload();
                    break;
                default:
                    throw new Error("Unknown body format.");
            }
            try {
                const request = {
                    url: url,
                    method: method,
                    headers: headers
                        .map(x => { var _a; return { name: x.name(), value: (_a = x.value()) !== null && _a !== void 0 ? _a : "" }; })
                        .filter(x => !!x.name && !!x.value),
                    body: payload
                };
                const response = this.useCorsProxy()
                    ? yield this.sendFromProxy(request)
                    : yield this.sendFromBrowser(request);
                this.responseHeadersString(response.headers.map(x => `${x.name}: ${x.value}`).join("\n"));
                const knownStatusCode = knownStatusCodes_1.KnownStatusCodes.find(x => x.code === response.statusCode);
                const responseStatusText = knownStatusCode
                    ? knownStatusCode.description
                    : "Unknown";
                this.responseStatusCode(response.statusCode.toString());
                this.responseStatusText(responseStatusText);
                this.responseBody(response.toText());
                const responseHeaders = response.headers.map(x => {
                    const consoleHeader = new consoleHeader_1.ConsoleHeader();
                    consoleHeader.name(x.name);
                    consoleHeader.value(x.value);
                    return consoleHeader;
                });
                const contentTypeHeader = responseHeaders.find((header) => header.name().toLowerCase() === knownHttpHeaders_1.KnownHttpHeaders.ContentType.toLowerCase());
                if (contentTypeHeader) {
                    if (contentTypeHeader.value().toLowerCase().indexOf("json") >= 0) {
                        this.responseBody(utils_1.Utils.formatJson(this.responseBody()));
                    }
                    if (contentTypeHeader.value().toLowerCase().indexOf("xml") >= 0) {
                        this.responseBody(utils_1.Utils.formatXml(this.responseBody()));
                    }
                }
            }
            catch (error) {
                if (error.code && error.code === "RequestError") {
                    this.requestError(`Since the browser initiates the request, it requires Cross-Origin Resource Sharing (CORS) enabled on the server. <a href="https://aka.ms/AA4e482" target="_blank">Learn more</a>`);
                }
            }
            finally {
                this.sendingRequest(false);
            }
        });
    }
    wsConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const operation = this.consoleOperation();
            const templateParameters = operation.templateParameters();
            const queryParameters = operation.request.queryParameters();
            const headers = operation.request.headers();
            const binary = operation.request.binary;
            const parameters = [].concat(templateParameters, queryParameters, headers);
            const validationGroup = validation.group(parameters.map(x => x.value).concat(binary), { live: true });
            const clientErrors = validationGroup();
            if (clientErrors.length > 0) {
                validationGroup.showAllMessages();
                return;
            }
            this.sendWsConnect();
        });
    }
    clearLogs() {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.clearLogs();
    }
    wsDisconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ws) {
                this.ws.disconnect();
            }
        });
    }
    wsSendData() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = this.wsPayload();
            if (this.wsDataFormat() === "binary") {
                data = this.consoleOperation().request.binary();
            }
            if (this.ws && data) {
                this.wsSending(true);
                this.wsSendStatus("Sending...");
                this.ws.send(data);
                this.wsSendStatus("Send");
            }
        });
    }
    initWebSocket() {
        if (!this.ws) {
            this.ws = new websocketClient_1.WebsocketClient();
            this.ws.onOpen = () => {
                this.wsConnecting(false);
                this.wsConnected(true);
                this.wsStatus("Connected");
            };
            this.ws.onClose = () => {
                this.wsSending(false);
                this.wsConnecting(false);
                this.wsConnected(false);
                this.wsStatus("Connect");
            };
            this.ws.onError = (error) => {
                this.wsSending(false);
                this.requestError(error);
            };
            this.ws.onMessage = (message) => {
                this.wsSending(false);
                this.responseBody(message.data);
            };
            this.ws.onLogItem = (data) => {
                this.wsLogItems(this.ws.logItems);
            };
        }
    }
    sendWsConnect() {
        var _a;
        if ((_a = this.ws) === null || _a === void 0 ? void 0 : _a.isConnected) {
            return;
        }
        this.requestError(null);
        this.wsConnecting(true);
        this.wsConnected(false);
        this.responseStatusCode(null);
        const consoleOperation = this.consoleOperation();
        const url = consoleOperation.wsUrl();
        this.initWebSocket();
        this.wsStatus("Connecting...");
        this.ws.connect(url);
    }
    toggleRequestSummarySecrets() {
        this.secretsRevealed(!this.secretsRevealed());
    }
    getApiReferenceUrl() {
        return this.routeHelper.getApiReferenceUrl(this.api().name);
    }
    getSessionRecordKey(authorizationServerName, scopeOverride) {
        let recordKey = authorizationServerName;
        if (scopeOverride) {
            recordKey += `-${scopeOverride}`;
        }
        return recordKey;
    }
    setupOAuth() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationServer = this.authorizationServer();
            if (!authorizationServer) {
                this.selectedGrantType(null);
                return;
            }
            const api = this.api();
            const scopeOverride = (_b = (_a = api.authenticationSettings) === null || _a === void 0 ? void 0 : _a.oAuth2) === null || _b === void 0 ? void 0 : _b.scope;
            const storedCredentials = yield this.getStoredCredentials(authorizationServer.name, scopeOverride);
            if (storedCredentials) {
                this.selectedGrantType(storedCredentials.grantType);
                this.setAuthorizationHeader(storedCredentials.accessToken);
            }
        });
    }
    getStoredCredentials(serverName, scopeOverride) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauthSession = yield this.sessionManager.getItem(oauthSessionKey);
            const recordKey = this.getSessionRecordKey(serverName, scopeOverride);
            const storedCredentials = oauthSession === null || oauthSession === void 0 ? void 0 : oauthSession[recordKey];
            try {
                const jwtToken = utils_1.Utils.parseJwt(storedCredentials.accessToken.replace(/^bearer /i, ""));
                const now = new Date();
                if (now > jwtToken.exp) {
                    yield this.clearStoredCredentials();
                    return null;
                }
            }
            catch (error) {
            }
            return storedCredentials;
        });
    }
    setStoredCredentials(serverName, scopeOverride, grantType, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauthSession = (yield this.sessionManager.getItem(oauthSessionKey)) || {};
            const recordKey = this.getSessionRecordKey(serverName, scopeOverride);
            oauthSession[recordKey] = {
                grantType: grantType,
                accessToken: accessToken
            };
            yield this.sessionManager.setItem(oauthSessionKey, oauthSession);
        });
    }
    clearStoredCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sessionManager.removeItem(oauthSessionKey);
            this.removeAuthorizationHeader();
        });
    }
    authenticateOAuthWithPassword() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.authorizationError(null);
                const api = this.api();
                const authorizationServer = this.authorizationServer();
                const scopeOverride = (_b = (_a = api.authenticationSettings) === null || _a === void 0 ? void 0 : _a.oAuth2) === null || _b === void 0 ? void 0 : _b.scope;
                const serverName = authorizationServer.name;
                if (scopeOverride) {
                    authorizationServer.scopes = [scopeOverride];
                }
                const accessToken = yield this.oauthService.authenticatePassword(this.username(), this.password(), authorizationServer);
                yield this.setStoredCredentials(serverName, scopeOverride, constants_2.GrantTypes.password, accessToken);
                this.setAuthorizationHeader(accessToken);
            }
            catch (error) {
                if (error instanceof unauthorizedError_1.UnauthorizedError) {
                    this.authorizationError(error.message);
                    return;
                }
                this.authorizationError("Oops, something went wrong. Try again later.");
            }
        });
    }
    onGrantTypeChange(grantType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clearStoredCredentials();
            if (!grantType || grantType === constants_2.GrantTypes.password) {
                return;
            }
            yield this.authenticateOAuth(grantType);
        });
    }
    authenticateOAuth(grantType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const api = this.api();
            const authorizationServer = this.authorizationServer();
            const scopeOverride = (_b = (_a = api.authenticationSettings) === null || _a === void 0 ? void 0 : _a.oAuth2) === null || _b === void 0 ? void 0 : _b.scope;
            const serverName = authorizationServer.name;
            if (scopeOverride) {
                authorizationServer.scopes = [scopeOverride];
            }
            const accessToken = yield this.oauthService.authenticate(grantType, authorizationServer);
            yield this.setStoredCredentials(serverName, scopeOverride, grantType, accessToken);
            this.setAuthorizationHeader(accessToken);
        });
    }
};
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationConsole.prototype, "api", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationConsole.prototype, "operation", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationConsole.prototype, "revision", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationConsole.prototype, "hostnames", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationConsole.prototype, "authorizationServer", void 0);
__decorate([
    (0, decorators_1.Param)(),
    __metadata("design:type", Function)
], OperationConsole.prototype, "useCorsProxy", void 0);
__decorate([
    (0, decorators_1.OnMounted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperationConsole.prototype, "initialize", null);
OperationConsole = __decorate([
    (0, decorators_1.Component)({
        selector: "operation-console",
        template: operation_console_html_1.default
    }),
    __metadata("design:paramtypes", [apiService_1.ApiService, Object, routeHelper_1.RouteHelper,
        oauthService_1.OAuthService, Object, Object])
], OperationConsole);
exports.OperationConsole = OperationConsole;
//# sourceMappingURL=operation-console.js.map