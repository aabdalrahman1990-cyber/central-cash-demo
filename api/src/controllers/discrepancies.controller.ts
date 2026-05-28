import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { IsString, MinLength } from "class-validator";
import { DataStoreService } from "../services/data-store.service";
import { JwtAuthGuard } from "../security/jwt-auth.guard";

class ResolveDiscrepancyDto {
  @IsString()
  @MinLength(5)
  resolution!: string;
}

@Controller("discrepancies")
@UseGuards(JwtAuthGuard)
export class DiscrepanciesController {
  constructor(private readonly store: DataStoreService) {}

  @Get()
  list() {
    return this.store.listDiscrepancies();
  }

  @Patch(":id/resolve")
  resolve(@Param("id") id: string, @Body() dto: ResolveDiscrepancyDto) {
    return this.store.resolveDiscrepancy(id, dto.resolution);
  }
}
