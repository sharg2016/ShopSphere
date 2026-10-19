import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SellerService } from "./seller.service.js";

@Injectable()
export class SellerJwtStrategy extends PassportStrategy(Strategy, 'seller-jwt') {

    constructor(private sellerService: SellerService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'shopsphere_secret_key',
        });
    }

    async validate(payload: { sub: string; email: string }) {
        const seller = await this.sellerService.findByEmail(payload.email);
        if (!seller) {
            throw new UnauthorizedException('Seller Not Found');
        }

        return {
            id: seller._id.toString(),
            email: seller.email,
            shopName: seller.shopName
        };
    }
}