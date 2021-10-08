"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const subscription_1 = require("../contracts/subscription");
const utils_1 = require("../utils");
class Subscription {
    constructor(contract) {
        this.id = utils_1.Utils.getResourceName("users", contract.id, "shortId");
        this.name = contract.properties.displayName || "Unnamed";
        this.createdDate = new Date(contract.properties.createdDate);
        this.endDate = (contract.properties.endDate && new Date(contract.properties.endDate)) || undefined;
        this.expirationDate = (contract.properties.expirationDate && new Date(contract.properties.expirationDate)) || undefined;
        this.notificationDate = (contract.properties.notificationDate && new Date(contract.properties.notificationDate)) || undefined;
        this.primaryKey = contract.properties.primaryKey;
        this.scope = contract.properties.scope;
        this.secondaryKey = contract.properties.secondaryKey;
        this.startDate = (contract.properties.startDate && contract.properties.startDate.split("T")[0]) || undefined;
        this.stateComment = contract.properties.stateComment;
        this.userId = utils_1.Utils.getResourceName("users", contract.properties.ownerId, "shortId");
        this.state = subscription_1.SubscriptionState[contract.properties.state];
        this.isExpired = this.state === subscription_1.SubscriptionState.expired;
        this.isAwaitingApproval = this.state === subscription_1.SubscriptionState.submitted;
        this.isRejected = this.state === subscription_1.SubscriptionState.rejected;
    }
    canBeRenewed() {
        if (this.state !== subscription_1.SubscriptionState.active) {
            return false;
        }
        if (!this.notificationDate || !this.expirationDate) {
            return false;
        }
        const current = new Date().getTime();
        return current >= this.notificationDate.getTime() && current < this.expirationDate.getTime();
    }
    canBeCancelled() {
        return this.state === subscription_1.SubscriptionState.active || this.state === subscription_1.SubscriptionState.submitted;
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=subscription.js.map