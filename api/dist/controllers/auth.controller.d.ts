import { AuthService } from "../services/auth.service";
declare class LoginDto {
    email: string;
    password: string;
    otp?: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): {
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
export {};
