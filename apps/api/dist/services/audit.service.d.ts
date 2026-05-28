export type AuditLog = {
    id: string;
    actorId: string;
    action: string;
    entity: string;
    entityId: string;
    details: Record<string, unknown>;
    hash: string;
    timestamp: string;
};
export declare class AuditService {
    private readonly logs;
    record(entry: Omit<AuditLog, "id" | "hash" | "timestamp">): AuditLog;
    list(): AuditLog[];
}
