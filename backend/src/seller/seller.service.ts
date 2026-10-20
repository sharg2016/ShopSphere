import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Seller, SellerDocument } from './schema/seller.schema.js';
import { CreateSellerDto } from './dto/create-seller.dto.js';
import { UpdateSellerDto } from './dto/update-seller-dto.js';
import { LoginDto } from '../auth/dto/login.dto.js';

@Injectable()
export class SellerService {
    constructor(
        @InjectModel(Seller.name) private sellerModel: Model<SellerDocument>,
        private jwtService: JwtService,
    ) { }

    // Register a new seller
    async registerSeller(dto: CreateSellerDto) {
        const { shopName, email, phoneNumber, password, address, city, state, pincode } = dto;

        const existingEmail = await this.sellerModel.findOne({ email }).exec();
        if (existingEmail) {
            throw new ConflictException('Email already registered as a seller');
        }

        const existingShopName = await this.sellerModel.findOne({ shopName }).exec();
        if (existingShopName) {
            throw new ConflictException('Shop is already registered with this ShopName, use a different Shop Name');
        }

        const existingPhoneNumber = await this.sellerModel.findOne({ phoneNumber }).exec();
        if (existingPhoneNumber) {
            throw new ConflictException('Phone number is already registered as seller, use different phone number');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const seller = await this.sellerModel.create({
            shopName,
            email,
            phoneNumber,
            hashedPassword,
            address,
            city,
            state,
            pincode,
        });

        const token = this.generateToken(seller);

        return {
            message: 'Seller Registered Successfully',
            accessToken: token,
            seller: this.sanitize(seller),
            role: 'seller',
        };
    }
    // Login seller
    async loginSeller(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const seller = await this.sellerModel.findOne({ email }).exec();
        if (!seller) {
            throw new UnauthorizedException('Invalid credentials (Email not registered)');
        }

        const isPasswordMatched = await bcrypt.compare(password, seller.hashedPassword);
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid credentials (Invalid Password!!!!)');
        }

        const token = this.generateToken(seller);

        return {
            message: 'Login successful',
            accessToken: token,
            seller: this.sanitize(seller),
            role: 'seller',
        };
    }

    // Get seller profile by email (used by controller @Get('profile'))
    async getProfile(email: string) {
        const seller = await this.findByEmail(email);
        if (!seller) {
            throw new NotFoundException('Seller not found');
        }
        return this.sanitize(seller);
    }

    // Update seller profile (used by controller updateSeller)
    async updateProfile(id: string, dto: UpdateSellerDto) {
        const seller = await this.findById(id);
        if (!seller) {
            throw new NotFoundException('Seller not found');
        }

        const isMatch = await bcrypt.compare(dto.password, seller.hashedPassword);
        if (!isMatch) {
            throw new UnauthorizedException('Incorrect password');
        }

        if (dto.shopName && dto.shopName !== seller.shopName) {
            const taken = await this.sellerModel.findOne({ shopName: dto.shopName }).exec();
            if (taken) {
                throw new ConflictException('Shop name is already taken');
            }
            seller.shopName = dto.shopName;
        }

        if (dto.phoneNumber && dto.phoneNumber !== seller.phoneNumber) {
            const taken = await this.sellerModel.findOne({ phoneNumber: dto.phoneNumber }).exec();
            if (taken) {
                throw new ConflictException('Phone number is already in use');
            }
            seller.phoneNumber = dto.phoneNumber;
        }

        if (dto.address) seller.address = dto.address;
        if (dto.city) seller.city = dto.city;
        if (dto.state) seller.state = dto.state;
        if (dto.pincode) seller.pincode = dto.pincode;

        await seller.save();

        return {
            message: 'Profile updated successfully',
            seller: this.sanitize(seller),
        };
    }

    // Find seller by email (used by SellerJwtStrategy)
    async findByEmail(email: string) {
        return this.sellerModel.findOne({ email }).exec();
    }

    // Find seller by ID
    async findById(id: string) {
        const seller = await this.sellerModel.findById(id).exec();
        if (!seller) {
            throw new NotFoundException('Seller not found');
        }
        return seller;
    }

    // Helper: generate JWT token
    private generateToken(seller: SellerDocument) {
        return this.jwtService.sign({
            sub: seller._id,
            email: seller.email,
            shopName: seller.shopName,
            role: 'seller',
        });
    }

    // Helper: strip sensitive fields
    private sanitize(seller: SellerDocument) {
        return {
            id: seller._id.toString(),
            shopName: seller.shopName,
            email: seller.email,
            phoneNumber: seller.phoneNumber,
            address: seller.address,
            city: seller.city,
            state: seller.state,
            pincode: seller.pincode,
            role: 'seller',
        };
    }
}
