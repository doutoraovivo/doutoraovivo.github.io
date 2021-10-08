"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
const moment = require("moment");
const utils_1 = require("../utils");
class AccessToken {
    constructor(type, value, expires, userId) {
        this.type = type;
        this.value = value;
        this.expires = expires;
        this.userId = userId;
    }
    static parseExtendedSharedAccessSignature(value) {
        const regex = /token=\"(.*==)\"/gm;
        const match = regex.exec(value);
        if (match && match.length >= 2) {
            const tokenValue = match[1];
            return AccessToken.parseSharedAccessSignature(tokenValue);
        }
        throw new Error(`SharedAccessSignature token format is not valid.`);
    }
    static parseSharedAccessSignature(value) {
        const regex = /^[\w\-]*\&(\d*)\&/gm;
        const match = regex.exec(value);
        if (!match || match.length < 2) {
            throw new Error(`SharedAccessSignature token format is not valid.`);
        }
        const dateTime = match[1];
        const dateTimeIso = `${dateTime.substr(0, 8)} ${dateTime.substr(8, 4)}`;
        const expirationDateUtc = moment(dateTimeIso).toDate();
        return new AccessToken("SharedAccessSignature", value, expirationDateUtc);
    }
    static parseBearerToken(value) {
        const decodedToken = utils_1.Utils.parseJwt(value);
        return new AccessToken("Bearer", value, decodedToken.exp);
    }
    static parse(token) {
        if (!token) {
            throw new Error("Access token not specified.");
        }
        if (token.startsWith("Bearer ")) {
            return AccessToken.parseBearerToken(token.replace("Bearer ", ""));
        }
        if (token.startsWith("SharedAccessSignature ")) {
            const value = token.replace("SharedAccessSignature ", "");
            if (value.startsWith("token=")) {
                return AccessToken.parseExtendedSharedAccessSignature(value);
            }
            else {
                return AccessToken.parseSharedAccessSignature(value);
            }
        }
        if (token.startsWith("token=")) {
            return AccessToken.parseExtendedSharedAccessSignature(token);
        }
        const result = AccessToken.parseSharedAccessSignature(token);
        if (result) {
            return result;
        }
        throw new Error(`Access token format is not valid. Please use "Bearer" or "SharedAccessSignature".`);
    }
    isExpired() {
        const utcNow = utils_1.Utils.getUtcDateTime();
        return utcNow > this.expires;
    }
    toString() {
        return `${this.type} token="${this.value}",refresh="true"`;
    }
}
exports.AccessToken = AccessToken;
//# sourceMappingURL=accessToken.js.map