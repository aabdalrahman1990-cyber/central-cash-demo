"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./controllers/app.controller");
const auth_controller_1 = require("./controllers/auth.controller");
const bags_controller_1 = require("./controllers/bags.controller");
const audit_controller_1 = require("./controllers/audit.controller");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const discrepancies_controller_1 = require("./controllers/discrepancies.controller");
const app_service_1 = require("./services/app.service");
const audit_service_1 = require("./services/audit.service");
const data_store_service_1 = require("./services/data-store.service");
const bags_service_1 = require("./services/bags.service");
const auth_service_1 = require("./services/auth.service");
const jwt_auth_guard_1 = require("./security/jwt-auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET ?? "prototype-super-secret",
                signOptions: { expiresIn: "12h" }
            })
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            bags_controller_1.BagsController,
            audit_controller_1.AuditController,
            dashboard_controller_1.DashboardController,
            discrepancies_controller_1.DiscrepanciesController
        ],
        providers: [app_service_1.AppService, audit_service_1.AuditService, data_store_service_1.DataStoreService, bags_service_1.BagsService, auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map