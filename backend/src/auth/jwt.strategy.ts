import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../users/user.service.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'shopsphere_secret_key',
        });
    }

    async validate(payload: { sub: string, email: string }) {
        const user = await this.userService.findByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException("user no longer exists")
        }

        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber
        };
    }
}