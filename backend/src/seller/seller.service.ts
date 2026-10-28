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
import { Product, ProductDocument } from '../products/schema/product.schema.js';
import { Order, OrderDocument } from '../orders/schema/orders.schems.js';

@Injectable()
export class SellerService {
    constructor(
        @InjectModel(Seller.name) private sellerModel: Model<SellerDocument>,
        private jwtService: JwtService,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>
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

    async getDashBoardAnalytics(sellerId: string) {

        const products = await this.productModel.find({ sellerId }).exec();

        const totalProducts = products.length;
        const productIds = products.map(p => p.productId);

        const lowStockCount = products.filter((p: any) =>
            p.isAvailable === false || (p.stock !== undefined && p.stock < 5)
        ).length;


        if (productIds.length === 0) {
            return {
                kpi: {
                    totalsales: 0,
                    totalOrders: 0,
                    totalProducts: 0,
                    lowStockCount: 0,
                },
                revenueTrend: [],
                topProducts: [],
                recentOrders: []
            };
        }

        const orders = await this.orderModel
            .find({ 'items.productId': { $in: productIds } })
            .sort({ createdAt: -1 })
            .exec();

        const totalOrders = orders.length;

        let totalSales = 0;
        const productSalesCount: Record<string, { name: string; sales: number; revenue: number }> = {};

        orders.forEach((order) => {
            order.items.forEach((item) => {
                if (productIds.includes(item.productId)) {
                    const itemTotal = Number(item.price) * Number(item.quantity);
                    totalSales += itemTotal;


                    if (!productSalesCount[item.productId]) {
                        productSalesCount[item.productId] = {
                            name: item.name,
                            sales: 0,
                            revenue: 0
                        };
                    }

                    productSalesCount[item.productId].sales += Number(item.quantity);
                    productSalesCount[item.productId].revenue += Number(itemTotal);
                }
            });
        });

        const topProducts = Object.entries(productSalesCount)
            .map(([productId, data]) =>
            ({
                name: data.name,
                sales: data.sales,
                revenue: data.revenue
            }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);

        const last7days: { day: string; date: string; revenue: number; orders: number }[] = [];
        const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - 1);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = dayOfWeek[d.getDay()];

            const dayOrders = orders.filter((o: any) => {
                if (!o.createdAt) return false;
                return new Date(o.createdAt).toISOString().split('T')[0] === dateStr;
            });

            let dayRevenue = 0;
            dayOrders.forEach((o) => {
                o.items.forEach((item) => {
                    if (productIds.includes(item.productId)) {
                        dayRevenue += Number(item.price) * Number(item.quantity);
                    }
                });
            });

            last7days.push({
                day: dayName,
                date: dateStr,
                revenue: dayRevenue,
                orders: dayOrders.length
            });
        }


        const recentOrders = orders.slice(0, 5).map((order) => ({
            id: order.orderId,
            customer: order.shippingAddress?.fullName || 'customer',
            date: new Date(order as any['createdAt']).toLocaleDateString('en-IN',
                {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
            itemsCount: order.items.filter((i: any) => productIds.includes(i.productId)).length,
            amount: order.items.filter((i: any) => productIds.includes(i.productId))
                .reduce((sum: any, i: any) => sum + Number(i.price) * Number(i.quantity), 0),
            status: order.status || 'Processing'
        }));

        return {
            kpi: {
                totalSales,
                totalOrders,
                totalProducts,
                lowStockCount,
            },
            revenueTrend: last7days,
            topProducts,
            recentOrders,
        };
    }
}
