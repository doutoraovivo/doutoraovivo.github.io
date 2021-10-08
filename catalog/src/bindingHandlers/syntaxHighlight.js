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
const ko = require("knockout");
const Prism = require("prismjs");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-http");
require("prismjs/components/prism-c");
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-java");
require("prismjs/components/prism-python");
require("prismjs/components/prism-ruby");
require("prismjs/components/prism-markup");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-json");
ko.bindingHandlers["syntaxHighlight"] = {
    update: (element, valueAccessor) => {
        const config = valueAccessor();
        let code = ko.unwrap(config.code);
        const language = ko.unwrap(config.language);
        const render = () => __awaiter(void 0, void 0, void 0, function* () {
            let highlightLanguage;
            switch (language) {
                case "csharp":
                    highlightLanguage = "csharp";
                    break;
                case "curl":
                    highlightLanguage = "bash";
                    break;
                case "http":
                    highlightLanguage = "http";
                    break;
                case "java":
                    highlightLanguage = "java";
                    break;
                case "javascript":
                    highlightLanguage = "js";
                    break;
                case "objc":
                    highlightLanguage = "c";
                    break;
                case "php":
                    highlightLanguage = "ruby";
                    break;
                case "python":
                    highlightLanguage = "python";
                    break;
                case "ruby":
                    highlightLanguage = "ruby";
                    break;
                case "xml":
                    highlightLanguage = "xml";
                    break;
                case "json":
                    highlightLanguage = "json";
                    break;
                default:
                    highlightLanguage = "plain";
            }
            if (highlightLanguage === "plain") {
                const text = code;
                ko.applyBindingsToNode(element, { text: text }, null);
            }
            else {
                code = code.replaceAll("/", "fwdslsh");
                let html = Prism.highlight(code, Prism.languages[highlightLanguage], highlightLanguage);
                html = html.replaceAll("fwdslsh", "/");
                ko.applyBindingsToNode(element, { html: html }, null);
            }
        });
        render();
    }
};
//# sourceMappingURL=syntaxHighlight.js.map