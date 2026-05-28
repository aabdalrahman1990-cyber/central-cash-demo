import { Controller, Get, UseGuards } from "@nestjs/common";
import { DataStoreService } from "../services/data-store.service";
import { JwtAuthGuard } from "../security/jwt-auth.guard";

@Controller("dashboard")
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly store: DataStoreService) {}

  @Get("summary")
  summary() {
    return this.store.getDashboardSummary();
  }
}
