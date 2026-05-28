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
exports.DataStoreService = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("./audit.service");
let DataStoreService = class DataStoreService {
    constructor(auditService) {
        this.auditService = auditService;
        this.users = [
            { id: "USR-CBI-01", email: "cbi.manager@cbi.iq", name: "CBI Manager", role: "CBI_MANAGER", bankId: "CBI", branchId: "HQ", scopes: ["read:all", "approve:all", "count:all"], mfaRequired: true },
            { id: "USR-BANK-01", email: "sara.alwan@rafidain.iq", name: "Sara Alwan", role: "BANK_CASH_OFFICER", bankId: "BNK-001", branchId: "BR-001", scopes: ["create:bag", "view:branch"], mfaRequired: true },
            { id: "USR-BRANCH-01", email: "manager.karrada@rafidain.iq", name: "Karrada Branch Manager", role: "BRANCH_MANAGER", bankId: "BNK-001", branchId: "BR-001", scopes: ["approve:branch", "view:branch"], mfaRequired: true }
        ];
        this.bags = [
            {
                id: "BAG-2026-00482",
                requestId: "DR-2026-00091",
                bankId: "BNK-001",
                bankName: "Rafidain Bank",
                branchId: "BR-001",
                branchName: "Karrada",
                createdBy: "USR-BANK-01",
                status: "Approved by Branch",
                declaredAmount: 18000000,
                tagCode: "RFID-90883",
                sealNumber: "SL-55490",
                denominations: [{ label: "25,000", units: 720, value: 18000000 }],
                timeline: [{ at: new Date().toISOString(), status: "Approved by Branch", actorId: "USR-BRANCH-01", note: "Branch approved the bag." }]
            }
        ];
        this.discrepancies = [
            { id: "DIS-2201", bagId: "BAG-2026-00485", bankName: "Trade Bank of Iraq", variance: 250000, status: "Pending Bank Response" }
        ];
    }
    findUserByEmail(email) {
        return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    }
    getUser(id) {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    listBags() {
        return this.bags;
    }
    createBag(payload) {
        this.bags.unshift({
            ...payload,
            timeline: [
                {
                    at: new Date().toISOString(),
                    status: payload.status,
                    actorId: payload.createdBy,
                    note: "Cash bag created."
                }
            ]
        });
    }
    getBag(id) {
        const bag = this.bags.find((item) => item.id === id);
        if (!bag) {
            throw new common_1.NotFoundException("Bag not found");
        }
        return bag;
    }
    addTimeline(bag, actorId, status, note) {
        bag.status = status;
        bag.timeline.unshift({
            at: new Date().toISOString(),
            status,
            actorId,
            note
        });
    }
    ensureUniqueTag(tagCode) {
        if (this.bags.some((bag) => bag.tagCode === tagCode)) {
            throw new common_1.BadRequestException("Duplicate RFID/QR tag is not allowed");
        }
    }
    ensureUniqueSeal(sealNumber) {
        if (this.bags.some((bag) => bag.sealNumber === sealNumber)) {
            throw new common_1.BadRequestException("Duplicate seal number is not allowed");
        }
    }
    createDiscrepancy(bagId, bankName, variance) {
        const discrepancy = {
            id: `DIS-${String(this.discrepancies.length + 2201).padStart(4, "0")}`,
            bagId,
            bankName,
            variance,
            status: "Pending Bank Response"
        };
        this.discrepancies.unshift(discrepancy);
        return discrepancy;
    }
    listDiscrepancies() {
        return this.discrepancies;
    }
    resolveDiscrepancy(id, resolution) {
        const caseItem = this.discrepancies.find((item) => item.id === id);
        if (!caseItem) {
            throw new common_1.NotFoundException("Discrepancy case not found");
        }
        caseItem.status = "Resolved";
        caseItem.resolution = resolution;
        this.auditService.record({
            actorId: "SYSTEM",
            action: "DISCREPANCY_RESOLVED",
            entity: "DiscrepancyCase",
            entityId: id,
            details: { resolution }
        });
        return caseItem;
    }
    getDashboardSummary() {
        return {
            totalCashReceivedToday: 3780000000,
            bagsReceivedToday: 148,
            bagsInTransit: 52,
            bagsPendingApproval: 19,
            matchedBags: 131,
            discrepancyBags: 7,
            rejectedBags: 4,
            averageProcessingTimeHours: 3.8
        };
    }
};
exports.DataStoreService = DataStoreService;
exports.DataStoreService = DataStoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [audit_service_1.AuditService])
], DataStoreService);
//# sourceMappingURL=data-store.service.js.map