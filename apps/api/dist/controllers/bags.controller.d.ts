import { BagsService } from "../services/bags.service";
declare class DenominationDto {
    label: string;
    units: number;
    value: number;
}
declare class CreateBagDto {
    requestId: string;
    bankId: string;
    branchId: string;
    declaredAmount: number;
    denominations: DenominationDto[];
}
declare class ApprovalDto {
    decision: "approve" | "return";
    reason?: string;
}
declare class BindTagDto {
    tagCode: string;
    sealNumber: string;
}
declare class CountBagDto {
    actualAmount: number;
    note?: string;
}
export declare class BagsController {
    private readonly bagsService;
    constructor(bagsService: BagsService);
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
    create(req: {
        user: {
            sub: string;
        };
    }, dto: CreateBagDto): {
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
    approve(req: {
        user: {
            sub: string;
        };
    }, id: string, dto: ApprovalDto): {
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
    bindTag(req: {
        user: {
            sub: string;
        };
    }, id: string, dto: BindTagDto): {
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
    handoverCit(req: {
        user: {
            sub: string;
        };
    }, id: string): {
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
    receiveGate(req: {
        user: {
            sub: string;
        };
    }, id: string): {
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
    receiveDesk(req: {
        user: {
            sub: string;
        };
    }, id: string): {
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
    count(req: {
        user: {
            sub: string;
        };
    }, id: string, dto: CountBagDto): {
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
export {};
