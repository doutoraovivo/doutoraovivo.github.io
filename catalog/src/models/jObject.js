"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JText = exports.JComment = exports.JObject = exports.JAttribute = void 0;
const saxen_1 = require("saxen");
class JAttribute {
    constructor(name, value, ns) {
        this.name = name;
        this.value = value;
        this.ns = ns;
    }
}
exports.JAttribute = JAttribute;
class JObject {
    constructor(name, ns) {
        this.type = "element";
        this.name = name;
        this.children = [];
        this.attributes = [];
        this.ns = ns;
    }
    toString() {
        return this.name;
    }
    join(values, separator) {
        return values.filter(x => x && x !== "").join(separator);
    }
    static fromXml(xml, parseCallbacks) {
        const root = new JObject("document");
        root.type = "document";
        const elementStack = [root];
        const parser = new saxen_1.Parser({ proxy: true });
        const pushChild = (element) => {
            const currentElement = elementStack[elementStack.length - 1];
            currentElement.children.push(element);
            elementStack.push(element);
        };
        const popChild = () => {
            elementStack.pop();
        };
        const pushSibling = (element) => {
            const currentElement = elementStack[elementStack.length - 1];
            currentElement.children.push(element);
        };
        parser.on("question", (str, decodeEntities, contextGetter) => {
            const element = new JObject("", "");
            element.type = "question";
            element.value = str;
            pushSibling(element);
        });
        parser.on("openTag", (el, decodeEntities, selfClosing, getContext) => {
            const elementNameParts = el.name.split(":");
            let elementNamespace;
            let elementName;
            if (elementNameParts.length > 1) {
                elementNamespace = elementNameParts[0];
                elementName = elementNameParts[1];
            }
            else {
                elementName = el.name;
            }
            const element = new JObject(elementName, elementNamespace);
            Object.keys(el.attrs).forEach(key => {
                const attributeNameParts = key.split(":");
                let attributeNamespace;
                let attributeName;
                if (attributeNameParts.length > 1) {
                    attributeNamespace = attributeNameParts[0];
                    attributeName = attributeNameParts[1];
                }
                else {
                    attributeName = key;
                }
                const tempValue = XmlUtil.decode(el.attrs[key]);
                const attributeValue = parseCallbacks && parseCallbacks.attribute ? parseCallbacks.attribute(tempValue) : tempValue;
                element.attributes.push(new JAttribute(attributeName, attributeValue, attributeNamespace));
            });
            if (el.attrs["template"] && el.attrs["template"].toUpperCase() === "LIQUID" || el.name === "xsl-transform") {
                element.type = "template";
            }
            pushChild(element);
        });
        parser.on("closeTag", (el, decodeEntities, selfClosing, getContext) => {
            popChild();
        });
        parser.on("error", (err, contextGetter) => {
            throw new Error("Unable to parse XML.");
        });
        parser.on("text", (text, decodeEntities, contextGetter) => {
            text = text.trim();
            if (!text) {
                return;
            }
            const currentElement = elementStack[elementStack.length - 1];
            if (!currentElement.value) {
                currentElement.value = "";
            }
            currentElement.value += parseCallbacks && parseCallbacks.text ? parseCallbacks.text(text) : text;
        });
        parser.on("cdata", (value) => {
            const element = new JObject("", "");
            element.value = parseCallbacks && parseCallbacks.cdata ? parseCallbacks.cdata(value) : value;
            element.type = "cdata";
            pushSibling(element);
        });
        parser.on("comment", (value) => {
            pushSibling(new JComment(parseCallbacks && parseCallbacks.comment ? parseCallbacks.comment(value) : value));
        });
        parser.parse(xml);
        return root;
    }
    toFormattedXml(identation = 0, escapeCallbacks) {
        let result = "";
        const content = this.value;
        let lineBreak = "\n";
        for (let i = 0; i < identation; i++) {
            lineBreak += " ";
        }
        switch (this.type) {
            case "document":
                this.children.forEach(child => {
                    result += child.toFormattedXml(0, escapeCallbacks) + "\n";
                });
                break;
            case "element":
            case "template":
                const tag = this.join([this.ns, this.name], ":");
                result += `${lineBreak}<${tag}`;
                this.attributes.forEach(attribute => {
                    let value = attribute.value.toString();
                    value = escapeCallbacks && escapeCallbacks.attribute && !escapeCallbacks.attribute(value) ? value : XmlUtil.encode(value);
                    result += ` ${this.join([attribute.ns, attribute.name], ":")}="${value}"`;
                });
                if (this.children.length > 0) {
                    result += `>`;
                    this.children.forEach(child => {
                        result += child.toFormattedXml(identation + 4, escapeCallbacks);
                    });
                    result += `${lineBreak}</${tag}>`;
                }
                else if (content) {
                    result += `>${content}</${tag}>`;
                }
                else {
                    result += ` />`;
                }
                break;
            case "question":
                result += this.value;
                break;
            case "comment":
                result += `${lineBreak}<!--${content}-->`;
                break;
            case "cdata":
                result += `<![CDATA[${content}]]>`;
                break;
            case "text":
                if (content) {
                    result += content;
                }
                break;
            default:
                throw new Error(`Unknown element type ${this.type}.`);
        }
        return result;
    }
    toXml(escapeCallbacks) {
        return this.toFormattedXml(0, escapeCallbacks);
    }
    innerXml() {
        return this.children.map(x => x.toFormattedXml()).join();
    }
    getAttribute(attributeName) {
        const attribute = this.attributes.find(x => x.name === attributeName);
        if (attribute && attribute.value) {
            return attribute.value;
        }
        return undefined;
    }
    getAttributeAsNumber(attributeName) {
        const value = this.getAttribute(attributeName);
        const result = +value;
        return isNaN(+value) ? undefined : result;
    }
    setAttribute(attributeName, attributeValue) {
        if (attributeValue) {
            this.attributes.push(new JAttribute(attributeName, attributeValue));
        }
    }
}
exports.JObject = JObject;
class JComment extends JObject {
    constructor(comment) {
        super("", "");
        this.value = comment;
        this.type = "comment";
    }
}
exports.JComment = JComment;
class JText extends JObject {
    constructor(text) {
        super("", "");
        this.value = text;
        this.type = "text";
    }
}
exports.JText = JText;
class XmlUtil {
    static encodeRegex() {
        return new RegExp(XmlUtil.chars.map((e) => e[0]).join("|"), "g");
    }
    static decodeRegex() {
        return new RegExp(XmlUtil.chars.map((e) => e[1]).join("|"), "g");
    }
    static encode(str) {
        return str.replace(XmlUtil.encodeRegex(), (s) => XmlUtil.encodeMap[s]);
    }
    static decode(str) {
        return str.replace(XmlUtil.decodeRegex(), (s) => XmlUtil.decodeMap[s]);
    }
}
XmlUtil.chars = [
    ["\"", "&quot;"],
    ["&", "&amp;"],
    ["'", "&apos;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ["\t", "&#x9;"],
    ["\n", "&#xA;"],
    ["\r", "&#xD;"],
];
XmlUtil.encodeMap = XmlUtil.chars.reduce((i, v) => {
    i[v[0]] = v[1];
    return i;
}, {});
XmlUtil.decodeMap = XmlUtil.chars.reduce((i, v) => {
    i[v[1]] = v[0];
    return i;
}, {});
//# sourceMappingURL=jObject.js.map