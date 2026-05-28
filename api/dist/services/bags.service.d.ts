import { AuditService } from "./audit.service";
import { DataStoreService } from "./data-store.service";
export declare class BagsService {
    private readonly store;
    private readonly auditService;
    constructor(store: DataStoreService, auditService: AuditService);
    list(): {
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
    }[];
    create(actorId: string, dto: {
        requestId: string;
        bankId: string;
        branchId: string;
        declaredAmount: number;
        denominations: {
            label: string;
            units: number;
            value: number;
        }[];
    }): {
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
    approve(actorId: string, bagId: string, decision: "approve" | "return", reason?: string): {
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
    bindTag(actorId: string, bagId: string, tagCode: string, sealNumber: string): {
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
    transition(actorId: string, bagId: string, status: string): {
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
    count(actorId: string, bagId: string, actualAmount: number, note?: string): {
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
}
