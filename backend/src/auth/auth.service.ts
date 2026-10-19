import { ConflictException, UnauthorizedException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto.js';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';
import { UpdateProfileInfo } from './dto/update-profile.dto.js';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async signIn(signUpDto: SignUpDto) {
        const { name, email, phoneNumber, password } = signUpDto;
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already Registered');
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = await this.userService.createUser({
            name: signUpDto.name,
            email: signUpDto.email,
            phoneNumber: signUpDto.phoneNumber,
            hashedPassword: hasedPassword
        }
        );

        const payload = {
            sub: user._id,
            email: user.email,
            name: user.name
        };


        const accessToken = this.jwtService.sign(payload);

        return {
            message: 'User Registered Successfully',
            accessToken: accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };
    }


    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload = {
            sub: user._id,
            email: user.email,
            name: user.name
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            message: "login SuccessFully",
            accessToken: accessToken,
            user: {
                name: user.name,
                email: user.email,
            }
        };
    }

    async updateProfile(userId: string, dto: UpdateProfileInfo) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new UnauthorizedException("User not Found");
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Incorrect Password");
        }

        if (dto.email && dto.email !== user.email) {
            const emailInUse = await this.userService.findByEmail(dto.email);
            if (emailInUse) {
                throw new ConflictException("Email is already in use.");
            }
            user.email = dto.email;
        }

        if (dto.name) {
            user.name = dto.name;
        }

        if (dto.phoneNumber && dto.phoneNumber !== user.phoneNumber) {
            const phoneNumberInUse = await this.userService.findByPhoneNumber(dto.phoneNumber);
            if (phoneNumberInUse) {
                throw new ConflictException("Phone Number is already in use");
            }

            user.phoneNumber = dto.phoneNumber;

            await user.save();

            return {
                message: 'Profile updated Successfully.',
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                }
            };
        }
    }

    private async generateToken(userId: string, email: string, name: string): Promise<string> {
        const payload: JwtPayload = { sub: userId, email, name };
        return this.jwtService.sign(payload);
    }
}

