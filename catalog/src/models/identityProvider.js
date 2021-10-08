"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityProvider = void 0;
class IdentityProvider {
    constructor(contract) {
        if (!contract) {
            return;
        }
        this.clientId = contract.properties.clientId;
        this.clientSecret = contract.properties.clientSecret;
        this.authority = contract.properties.authority;
        this.type = contract.properties.type;
        this.allowedTenants = contract.properties.allowedTenants;
        this.signinTenant = contract.properties.signinTenant;
        this.signinPolicyName = contract.properties.signinPolicyName;
        this.signupPolicyName = contract.properties.signupPolicyName;
        this.passwordResetPolicyName = contract.properties.passwordResetPolicyName;
    }
}
exports.IdentityProvider = IdentityProvider;
//# sourceMappingURL=identityProvider.js.map