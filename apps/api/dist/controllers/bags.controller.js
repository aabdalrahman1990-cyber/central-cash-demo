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
exports.BagsController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const bags_service_1 = require("../services/bags.service");
const jwt_auth_guard_1 = require("../security/jwt-auth.guard");
class DenominationDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DenominationDto.prototype, "label", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DenominationDto.prototype, "units", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DenominationDto.prototype, "value", void 0);
class CreateBagDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBagDto.prototype, "requestId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBagDto.prototype, "bankId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBagDto.prototype, "branchId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBagDto.prototype, "declaredAmount", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DenominationDto),
    __metadata("design:type", Array)
], CreateBagDto.prototype, "denominations", void 0);
class ApprovalDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApprovalDto.prototype, "decision", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApprovalDto.prototype, "reason", void 0);
class BindTagDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BindTagDto.prototype, "tagCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BindTagDto.prototype, "sealNumber", void 0);
class CountBagDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CountBagDto.prototype, "actualAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CountBagDto.prototype, "note", void 0);
let BagsController = class BagsController {
    constructor(bagsService) {
        this.bagsService = bagsService;
    }
    list() {
        return this.bagsService.list();
    }
    create(req, dto) {
        return this.bagsService.create(req.user.sub, dto);
    }
    approve(req, id, dto) {
        return this.bagsService.approve(req.user.sub, id, dto.decision, dto.reason);
    }
    bindTag(req, id, dto) {
        return this.bagsService.bindTag(req.user.sub, id, dto.tagCode, dto.sealNumber);
    }
    handoverCit(req, id) {
        return this.bagsService.transition(req.user.sub, id, "Assigned to CIT");
    }
    receiveGate(req, id) {
        return this.bagsService.transition(req.user.sub, id, "Arrived at CBI Gate");
    }
    receiveDesk(req, id) {
        return this.bagsService.transition(req.user.sub, id, "Received by CBI Cash Desk");
    }
    count(req, id, dto) {
        return this.bagsService.count(req.user.sub, id, dto.actualAmount, dto.note);
    }
};
exports.BagsController = BagsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateBagDto]),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id/approve"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, ApprovalDto]),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(":id/bind-tag"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, BindTagDto]),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "bindTag", null);
__decorate([
    (0, common_1.Patch)(":id/handover-cit"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "handoverCit", null);
__decorate([
    (0, common_1.Patch)(":id/receive-gate"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "receiveGate", null);
__decorate([
    (0, common_1.Patch)(":id/receive-desk"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "receiveDesk", null);
__decorate([
    (0, common_1.Patch)(":id/count"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, CountBagDto]),
    __metadata("design:returntype", void 0)
], BagsController.prototype, "count", null);
exports.BagsController = BagsController = __decorate([
    (0, common_1.Controller)("bags"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [bags_service_1.BagsService])
], BagsController);
//# sourceMappingURL=bags.controller.js.map