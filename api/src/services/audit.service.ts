import { Injectable } from "@nestjs/common";
import { createHash } from "crypto";

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

@Injectable()
export class AuditService {
  private readonly logs: AuditLog[] = [];

  record(entry: Omit<AuditLog, "id" | "hash" | "timestamp">) {
    const timestamp = new Date().toISOString();
    const hash = createHash("sha256")
      .update(JSON.stringify({ ...entry, timestamp }))
      .digest("hex");

    const log: AuditLog = {
      id: `AUD-${String(this.logs.length + 1).padStart(5, "0")}`,
      timestamp,
      hash,
      ...entry
    };

    this.logs.unshift(log);
    return log;
  }

  list() {
    return this.logs;
  }
}
