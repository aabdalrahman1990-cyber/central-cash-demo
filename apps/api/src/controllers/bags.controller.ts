import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { BagsService } from "../services/bags.service";
import { JwtAuthGuard } from "../security/jwt-auth.guard";

class DenominationDto {
  @IsString()
  label!: string;

  @Type(() => Number)
  @IsNumber()
  units!: number;

  @Type(() => Number)
  @IsNumber()
  value!: number;
}

class CreateBagDto {
  @IsString()
  requestId!: string;

  @IsString()
  bankId!: string;

  @IsString()
  branchId!: string;

  @Type(() => Number)
  @IsNumber()
  declaredAmount!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DenominationDto)
  denominations!: DenominationDto[];
}

class ApprovalDto {
  @IsString()
  decision!: "approve" | "return";

  @IsOptional()
  @IsString()
  reason?: string;
}

class BindTagDto {
  @IsString()
  tagCode!: string;

  @IsString()
  sealNumber!: string;
}

class CountBagDto {
  @Type(() => Number)
  @IsNumber()
  actualAmount!: number;

  @IsOptional()
  @IsString()
  note?: string;
}

@Controller("bags")
@UseGuards(JwtAuthGuard)
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Get()
  list() {
    return this.bagsService.list();
  }

  @Post()
  create(@Req() req: { user: { sub: string } }, @Body() dto: CreateBagDto) {
    return this.bagsService.create(req.user.sub, dto);
  }

  @Patch(":id/approve")
  approve(@Req() req: { user: { sub: string } }, @Param("id") id: string, @Body() dto: ApprovalDto) {
    return this.bagsService.approve(req.user.sub, id, dto.decision, dto.reason);
  }

  @Patch(":id/bind-tag")
  bindTag(@Req() req: { user: { sub: string } }, @Param("id") id: string, @Body() dto: BindTagDto) {
    return this.bagsService.bindTag(req.user.sub, id, dto.tagCode, dto.sealNumber);
  }

  @Patch(":id/handover-cit")
  handoverCit(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.bagsService.transition(req.user.sub, id, "Assigned to CIT");
  }

  @Patch(":id/receive-gate")
  receiveGate(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.bagsService.transition(req.user.sub, id, "Arrived at CBI Gate");
  }

  @Patch(":id/receive-desk")
  receiveDesk(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.bagsService.transition(req.user.sub, id, "Received by CBI Cash Desk");
  }

  @Patch(":id/count")
  count(@Req() req: { user: { sub: string } }, @Param("id") id: string, @Body() dto: CountBagDto) {
    return this.bagsService.count(req.user.sub, id, dto.actualAmount, dto.note);
  }
}
