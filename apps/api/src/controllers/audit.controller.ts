import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuditService } from "../services/audit.service";
import { JwtAuthGuard } from "../security/jwt-auth.guard";

@Controller("audit-logs")
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  list() {
    return this.auditService.list();
  }
}
