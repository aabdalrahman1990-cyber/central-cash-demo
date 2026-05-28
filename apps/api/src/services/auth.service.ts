import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DataStoreService } from "./data-store.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly store: DataStoreService
  ) {}

  login(dto: { email: string; password: string; otp?: string }) {
    const user = this.store.findUserByEmail(dto.email);

    if (!user || dto.password !== "Prototype@123") {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      bankId: user.bankId,
      branchId: user.branchId,
      scopes: user.scopes
    });

    return {
      accessToken: token,
      tokenType: "Bearer",
      mfaRequired: user.mfaRequired,
      user
    };
  }
}
