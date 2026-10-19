import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Seller, SellerSchema } from './schema/seller.schema.js';
import { SellerService } from './seller.service.js';
import { SellerController } from './seller.controller.js';
import { SellerJwtStrategy } from './seller-jwt.strategy.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'shopsphere_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SellerController],
  providers: [SellerService, SellerJwtStrategy],
  exports: [SellerService],
})
export class SellerModule { }
