//VS_CODE_TEST
import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: "ok",
      service: "pos-api",
      version: "0.1.0",
      timestamp: new Date().toISOString()
    };
  }
}
