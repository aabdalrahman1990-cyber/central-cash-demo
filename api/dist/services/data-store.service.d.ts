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
    denominations: {
        label: string;
        units: number;
        value: number;
    }[];
    timeline: {
        at: string;
        status: string;
        actorId: string;
        note: string;
    }[];
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
export declare class DataStoreService {
    private readonly auditService;
    private readonly users;
    private readonly bags;
    private readonly discrepancies;
    constructor(auditService: AuditService);
    findUserByEmail(email: string): User | undefined;
    getUser(id: string): User;
    listBags(): CashBag[];
    createBag(payload: Omit<CashBag, "timeline">): void;
    getBag(id: string): CashBag;
    addTimeline(bag: CashBag, actorId: string, status: string, note: string): void;
    ensureUniqueTag(tagCode: string): void;
    ensureUniqueSeal(sealNumber: string): void;
    createDiscrepancy(bagId: string, bankName: string, variance: number): Discrepancy;
    listDiscrepancies(): Discrepancy[];
    resolveDiscrepancy(id: string, resolution: string): Discrepancy;
    getDashboardSummary(): {
        totalCashReceivedToday: number;
        bagsReceivedToday: number;
        bagsInTransit: number;
        bagsPendingApproval: number;
        matchedBags: number;
        discrepancyBags: number;
        rejectedBags: number;
        averageProcessingTimeHours: number;
    };
}
export {};
