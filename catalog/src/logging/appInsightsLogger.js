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
exports.LogService = void 0;
const applicationinsights_js_1 = require("applicationinsights-js");
class LogService {
    constructor(instrumentationKey) {
        this.instrumentationKey = instrumentationKey;
        if (this.instrumentationKey && location.hostname.endsWith(".net")) {
            applicationinsights_js_1.AppInsights.downloadAndSetup({ instrumentationKey: this.instrumentationKey });
        }
        else {
            console.warn("AppInsights instrumentation key wasn't specified or cannot be used in current environment.");
        }
        this.trackSession();
    }
    trackSession(properties) {
        return __awaiter(this, void 0, void 0, function* () {
            this.trackEvent(`Session started`);
        });
    }
    trackEvent(eventName, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            applicationinsights_js_1.AppInsights.trackEvent(eventName, properties);
        });
    }
    trackError(error, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            applicationinsights_js_1.AppInsights.trackException(error);
        });
    }
    trackView(viewName, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            applicationinsights_js_1.AppInsights.trackPageView(name);
        });
    }
    trackMetric(metricName, properties) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    trackDependency(name, properties) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.LogService = LogService;
//# sourceMappingURL=appInsightsLogger.js.map