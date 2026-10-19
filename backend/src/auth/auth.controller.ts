import { AuthService } from "./auth.service.js";
import { SignUpDto } from "./dto/signup.dto.js";
import { LoginDto } from "./dto/login.dto.js";
import { Controller, Body, Post, HttpStatus, HttpCode, Get, UseGuards, createParamDecorator, ExecutionContext, Put } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { AuthenticatedUser } from "./interfaces/jwt-payload.interface.js";
import { UpdateProfileInfo } from "./dto/update-profile.dto.js";

// @CurrentUser() decorator — req.user ko cleanly aur type-safely extract karta hai
export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as AuthenticatedUser;
    }
);

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signIn(signUpDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    // Protected route — sirf valid JWT bearer token wale access kar sakte hain
    // JwtStrategy.validate() database se user verify karta hai pehle
    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@CurrentUser() user: AuthenticatedUser) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };
    }

    @Put('profile')
    @UseGuards(AuthGuard('jwt'))
    async updateProfile(@CurrentUser() user: AuthenticatedUser, @Body() dto: UpdateProfileInfo) {
        return this.authService.updateProfile(user.id, dto);
    }
}
