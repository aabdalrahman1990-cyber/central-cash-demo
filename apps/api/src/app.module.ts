import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./controllers/app.controller";
import { AuthController } from "./controllers/auth.controller";
import { BagsController } from "./controllers/bags.controller";
import { AuditController } from "./controllers/audit.controller";
import { DashboardController } from "./controllers/dashboard.controller";
import { DiscrepanciesController } from "./controllers/discrepancies.controller";
import { AppService } from "./services/app.service";
import { AuditService } from "./services/audit.service";
import { DataStoreService } from "./services/data-store.service";
import { BagsService } from "./services/bags.service";
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard } from "./security/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? "prototype-super-secret",
      signOptions: { expiresIn: "12h" }
    })
  ],
  controllers: [
    AppController,
    AuthController,
    BagsController,
    AuditController,
    DashboardController,
    DiscrepanciesController
  ],
  providers: [AppService, AuditService, DataStoreService, BagsService, AuthService, JwtAuthGuard]
})
export class AppModule {}
