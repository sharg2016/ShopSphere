import { Body, Controller, createParamDecorator, ExecutionContext, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from "@nestjs/common";
import { SellerService } from "./seller.service.js";
import { CreateSellerDto, SellerLoginDto } from "./dto/create-seller.dto.js";
import { AuthGuard } from "@nestjs/passport";
import { UpdateSellerDto } from "./dto/update-seller-dto.js";
import { LoginDto } from "../auth/dto/login.dto.js";


export const CurrentSeller = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    }
);

@Controller('seller')
export class SellerController {

    constructor(
        private readonly sellerService: SellerService
    ) { }

    @Post('register')
    async registerSeller(@Body() dto: CreateSellerDto) {
        return this.sellerService.registerSeller(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginSeller(@Body() body: { dto: LoginDto }) {
        return this.sellerService.loginSeller(body.dto);
    }



}
