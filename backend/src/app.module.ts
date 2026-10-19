import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './users/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProductModule } from './products/product.module.js';
import { OrderModule } from './orders/order.module.js';

import { SellerModule } from './seller/seller.module.js';

const observeModule = createObserveModule();
export const ObserveModule = observeModule.ObserveModule;
export const ObserveInstrument = observeModule.ObserveInstrument;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsphere',
      }),
    }),
    UserModule,
    AuthModule,
    SellerModule,
    ProductModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
