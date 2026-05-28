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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const data_store_service_1 = require("./data-store.service");
let AuthService = class AuthService {
    constructor(jwtService, store) {
        this.jwtService = jwtService;
        this.store = store;
    }
    login(dto) {
        const user = this.store.findUserByEmail(dto.email);
        if (!user || dto.password !== "Prototype@123") {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            bankId: user.bankId,
            branchId: user.branchId,
            scopes: user.scopes
        });
        return {
            accessToken: token,
            tokenType: "Bearer",
            mfaRequired: user.mfaRequired,
            user
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        data_store_service_1.DataStoreService])
], AuthService);
//# sourceMappingURL=auth.service.js.map