import { Body, Controller, createParamDecorator, ExecutionContext, Get, HttpCode, HttpStatus, Param, Put, Post, UseGuards, Req } from "@nestjs/common";
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
    async loginSeller(@Body() dto: SellerLoginDto) {
        return this.sellerService.loginSeller(dto);
    }


    @Put('update/seller/:id')
    @UseGuards(AuthGuard('seller-jwt'))
    async updateSeller(@Param('id') id: string, @Body() dto: UpdateSellerDto) {
        return this.sellerService.updateProfile(id, dto);
    }


    @Get('dashboard')
    @UseGuards(AuthGuard('seller-jwt'))
    async getDashboardData(@Req() req: any) {
        const sellerId = req.user.id;
        return this.sellerService.getDashBoardAnalytics(sellerId);
    }



}
