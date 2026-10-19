import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "./schema/orders.schems.js";
import { CreateOrderDto } from "./dto/create-order.dto.js";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";


@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderRepo: Model<OrderDocument>) { }

    async createOrder(dto: CreateOrderDto & { userId: string }) {
        const newOrder = new this.orderRepo(dto);
        return newOrder.save();
    }

    async getOrderByUserId(userId: string) {
        return this.orderRepo.find({ userId }).sort({ createdAt: -1 }).exec();
    }
}