import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  health() {
    return {
      status: "ok",
      service: "central-cash-api",
      timestamp: new Date().toISOString()
    };
  }
}
