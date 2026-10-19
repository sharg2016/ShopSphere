import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schema/orders.schems.js";
import { OrderController } from "./order.controller.js";
import { OrderService } from "./order.service.js";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Order.name,
            schema: OrderSchema
        }])
    ],
    controllers: [OrderController],
    providers: [OrderService]
})

export class OrderModule { }