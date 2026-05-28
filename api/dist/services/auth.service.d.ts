import { JwtService } from "@nestjs/jwt";
import { DataStoreService } from "./data-store.service";
export declare class AuthService {
    private readonly jwtService;
    private readonly store;
    constructor(jwtService: JwtService, store: DataStoreService);
    login(dto: {
        email: string;
        password: string;
        otp?: string;
    }): {
        accessToken: string;
        tokenType: string;
        mfaRequired: boolean;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            bankId: string;
            branchId: string;
            scopes: string[];
            mfaRequired: boolean;
        };
    };
}
