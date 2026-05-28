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
exports.BagsService = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("./audit.service");
const data_store_service_1 = require("./data-store.service");
let BagsService = class BagsService {
    constructor(store, auditService) {
        this.store = store;
        this.auditService = auditService;
    }
    list() {
        return this.store.listBags();
    }
    create(actorId, dto) {
        const calculatedTotal = dto.denominations.reduce((sum, item) => sum + item.value, 0);
        if (calculatedTotal !== dto.declaredAmount) {
            throw new common_1.BadRequestException("Declared amount does not match denomination total");
        }
        const actor = this.store.getUser(actorId);
        const bagId = `BAG-${new Date().getFullYear()}-${String(this.store.listBags().length + 483).padStart(5, "0")}`;
        this.store.createBag({
            id: bagId,
            requestId: dto.requestId,
            bankId: dto.bankId,
            bankName: actor.bankId === "BNK-001" ? "Rafidain Bank" : "Commercial Bank",
            branchId: dto.branchId,
            branchName: actor.branchId === "BR-001" ? "Karrada" : "Branch",
            createdBy: actorId,
            status: "Prepared",
            declaredAmount: dto.declaredAmount,
            denominations: dto.denominations
        });
        this.auditService.record({
            actorId,
            action: "BAG_CREATED",
            entity: "CashBag",
            entityId: bagId,
            details: dto
        });
        return this.store.getBag(bagId);
    }
    approve(actorId, bagId, decision, reason) {
        const bag = this.store.getBag(bagId);
        if (bag.createdBy === actorId) {
            throw new common_1.BadRequestException("Maker cannot approve the same bag");
        }
        const status = decision === "approve" ? "Approved by Branch" : "Rejected";
        this.store.addTimeline(bag, actorId, status, reason ?? "Approval action completed.");
        this.auditService.record({
            actorId,
            action: decision === "approve" ? "BAG_APPROVED" : "BAG_RETURNED",
            entity: "CashBag",
            entityId: bagId,
            details: { reason }
        });
        return bag;
    }
    bindTag(actorId, bagId, tagCode, sealNumber) {
        const bag = this.store.getBag(bagId);
        if (bag.denominations.length === 0) {
            throw new common_1.BadRequestException("Bag cannot be sealed without denomination details");
        }
        this.store.ensureUniqueTag(tagCode);
        this.store.ensureUniqueSeal(sealNumber);
        bag.tagCode = tagCode;
        bag.sealNumber = sealNumber;
        this.store.addTimeline(bag, actorId, "Sealed", `Tag ${tagCode} bound with seal ${sealNumber}.`);
        this.auditService.record({
            actorId,
            action: "TAG_BOUND",
            entity: "CashBag",
            entityId: bagId,
            details: { tagCode, sealNumber }
        });
        return bag;
    }
    transition(actorId, bagId, status) {
        const bag = this.store.getBag(bagId);
        this.store.addTimeline(bag, actorId, status, `Bag moved to ${status}.`);
        this.auditService.record({
            actorId,
            action: "BAG_STATUS_UPDATED",
            entity: "CashBag",
            entityId: bagId,
            details: { status }
        });
        return bag;
    }
    count(actorId, bagId, actualAmount, note) {
        const bag = this.store.getBag(bagId);
        bag.actualAmount = actualAmount;
        if (actualAmount === bag.declaredAmount) {
            this.store.addTimeline(bag, actorId, "Matched", note ?? "Actual amount matched declared amount.");
            this.store.addTimeline(bag, actorId, "Closed", "Bag closed after matched verification.");
        }
        else {
            const variance = actualAmount - bag.declaredAmount;
            this.store.addTimeline(bag, actorId, "Discrepancy Found", note ?? `Variance detected: ${variance}.`);
            this.store.createDiscrepancy(bag.id, bag.bankName, variance);
            this.store.addTimeline(bag, actorId, "Pending Bank Response", "Discrepancy case created.");
        }
        this.auditService.record({
            actorId,
            action: "BAG_COUNTED",
            entity: "CashBag",
            entityId: bagId,
            details: { actualAmount, declaredAmount: bag.declaredAmount, note }
        });
        return bag;
    }
};
exports.BagsService = BagsService;
exports.BagsService = BagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_store_service_1.DataStoreService,
        audit_service_1.AuditService])
], BagsService);
//# sourceMappingURL=bags.service.js.map