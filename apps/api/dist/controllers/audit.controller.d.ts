import { AuditService } from "../services/audit.service";
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    list(): import("../services/audit.service").AuditLog[];
}
