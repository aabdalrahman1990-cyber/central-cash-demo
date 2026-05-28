import { BadRequestException, Injectable } from "@nestjs/common";
import { AuditService } from "./audit.service";
import { DataStoreService } from "./data-store.service";

@Injectable()
export class BagsService {
  constructor(
    private readonly store: DataStoreService,
    private readonly auditService: AuditService
  ) {}

  list() {
    return this.store.listBags();
  }

  create(
    actorId: string,
    dto: {
      requestId: string;
      bankId: string;
      branchId: string;
      declaredAmount: number;
      denominations: { label: string; units: number; value: number }[];
    }
  ) {
    const calculatedTotal = dto.denominations.reduce((sum, item) => sum + item.value, 0);
    if (calculatedTotal !== dto.declaredAmount) {
      throw new BadRequestException("Declared amount does not match denomination total");
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

  approve(actorId: string, bagId: string, decision: "approve" | "return", reason?: string) {
    const bag = this.store.getBag(bagId);
    if (bag.createdBy === actorId) {
      throw new BadRequestException("Maker cannot approve the same bag");
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

  bindTag(actorId: string, bagId: string, tagCode: string, sealNumber: string) {
    const bag = this.store.getBag(bagId);
    if (bag.denominations.length === 0) {
      throw new BadRequestException("Bag cannot be sealed without denomination details");
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

  transition(actorId: string, bagId: string, status: string) {
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

  count(actorId: string, bagId: string, actualAmount: number, note?: string) {
    const bag = this.store.getBag(bagId);
    bag.actualAmount = actualAmount;

    if (actualAmount === bag.declaredAmount) {
      this.store.addTimeline(bag, actorId, "Matched", note ?? "Actual amount matched declared amount.");
      this.store.addTimeline(bag, actorId, "Closed", "Bag closed after matched verification.");
    } else {
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
}
