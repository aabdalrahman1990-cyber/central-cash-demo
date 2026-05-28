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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscrepanciesController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const data_store_service_1 = require("../services/data-store.service");
const jwt_auth_guard_1 = require("../security/jwt-auth.guard");
class ResolveDiscrepancyDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], ResolveDiscrepancyDto.prototype, "resolution", void 0);
let DiscrepanciesController = class DiscrepanciesController {
    constructor(store) {
        this.store = store;
    }
    list() {
        return this.store.listDiscrepancies();
    }
    resolve(id, dto) {
        return this.store.resolveDiscrepancy(id, dto.resolution);
    }
};
exports.DiscrepanciesController = DiscrepanciesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscrepanciesController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(":id/resolve"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ResolveDiscrepancyDto]),
    __metadata("design:returntype", void 0)
], DiscrepanciesController.prototype, "resolve", null);
exports.DiscrepanciesController = DiscrepanciesController = __decorate([
    (0, common_1.Controller)("discrepancies"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [data_store_service_1.DataStoreService])
], DiscrepanciesController);
//# sourceMappingURL=discrepancies.controller.js.map