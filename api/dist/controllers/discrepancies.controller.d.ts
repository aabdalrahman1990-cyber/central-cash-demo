import { DataStoreService } from "../services/data-store.service";
declare class ResolveDiscrepancyDto {
    resolution: string;
}
export declare class DiscrepanciesController {
    private readonly store;
    constructor(store: DataStoreService);
    list(): {
        id: string;
        bagId: string;
        bankName: string;
        variance: number;
        status: string;
        bankResponse?: string;
        resolution?: string;
    }[];
    resolve(id: string, dto: ResolveDiscrepancyDto): {
        id: string;
        bagId: string;
        bankName: string;
        variance: number;
        status: string;
        bankResponse?: string;
        resolution?: string;
    };
}
export {};
