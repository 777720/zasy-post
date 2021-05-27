import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthStrategy {
    constructor(private readonly authService: AuthService) {
    }


    async validate(payload: { account: string }) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }

}
