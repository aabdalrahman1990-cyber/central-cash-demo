import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuditService } from "./audit.service";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  bankId: string;
  branchId: string;
  scopes: string[];
  mfaRequired: boolean;
};

type CashBag = {
  id: string;
  requestId: string;
  bankId: string;
  bankName: string;
  branchId: string;
  branchName: string;
  createdBy: string;
  status: string;
  declaredAmount: number;
  actualAmount?: number;
  tagCode?: string;
  sealNumber?: string;
  denominations: { label: string; units: number; value: number }[];
  timeline: { at: string; status: string; actorId: string; note: string }[];
};

type Discrepancy = {
  id: string;
  bagId: string;
  bankName: string;
  variance: number;
  status: string;
  bankResponse?: string;
  resolution?: string;
};

@Injectable()
export class DataStoreService {
  private readonly users: User[] = [
    { id: "USR-CBI-01", email: "cbi.manager@cbi.iq", name: "CBI Manager", role: "CBI_MANAGER", bankId: "CBI", branchId: "HQ", scopes: ["read:all", "approve:all", "count:all"], mfaRequired: true },
    { id: "USR-BANK-01", email: "sara.alwan@rafidain.iq", name: "Sara Alwan", role: "BANK_CASH_OFFICER", bankId: "BNK-001", branchId: "BR-001", scopes: ["create:bag", "view:branch"], mfaRequired: true },
    { id: "USR-BRANCH-01", email: "manager.karrada@rafidain.iq", name: "Karrada Branch Manager", role: "BRANCH_MANAGER", bankId: "BNK-001", branchId: "BR-001", scopes: ["approve:branch", "view:branch"], mfaRequired: true }
  ];

  private readonly bags: CashBag[] = [
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

  private readonly discrepancies: Discrepancy[] = [
    { id: "DIS-2201", bagId: "BAG-2026-00485", bankName: "Trade Bank of Iraq", variance: 250000, status: "Pending Bank Response" }
  ];

  constructor(private readonly auditService: AuditService) {}

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  getUser(id: string) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  listBags() {
    return this.bags;
  }

  createBag(payload: Omit<CashBag, "timeline">) {
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

  getBag(id: string) {
    const bag = this.bags.find((item) => item.id === id);
    if (!bag) {
      throw new NotFoundException("Bag not found");
    }
    return bag;
  }

  addTimeline(bag: CashBag, actorId: string, status: string, note: string) {
    bag.status = status;
    bag.timeline.unshift({
      at: new Date().toISOString(),
      status,
      actorId,
      note
    });
  }

  ensureUniqueTag(tagCode: string) {
    if (this.bags.some((bag) => bag.tagCode === tagCode)) {
      throw new BadRequestException("Duplicate RFID/QR tag is not allowed");
    }
  }

  ensureUniqueSeal(sealNumber: string) {
    if (this.bags.some((bag) => bag.sealNumber === sealNumber)) {
      throw new BadRequestException("Duplicate seal number is not allowed");
    }
  }

  createDiscrepancy(bagId: string, bankName: string, variance: number) {
    const discrepancy: Discrepancy = {
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

  resolveDiscrepancy(id: string, resolution: string) {
    const caseItem = this.discrepancies.find((item) => item.id === id);
    if (!caseItem) {
      throw new NotFoundException("Discrepancy case not found");
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
}
