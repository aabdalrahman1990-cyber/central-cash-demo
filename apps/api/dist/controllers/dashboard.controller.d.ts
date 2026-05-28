import { DataStoreService } from "../services/data-store.service";
export declare class DashboardController {
    private readonly store;
    constructor(store: DataStoreService);
    summary(): {
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
