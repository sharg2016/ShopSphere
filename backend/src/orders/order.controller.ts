import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/auth.controller.js";
import type { AuthenticatedUser } from "../auth/interfaces/jwt-payload.interface.js";
import { OrderService } from "./order.service.js";
import { CreateOrderDto } from "./dto/create-order.dto.js";
import { AuthGuard } from "@nestjs/passport";


@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrderController {

    constructor(private orderService: OrderService) { }

    @Post()
    async createOrder(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateOrderDto) {
        return this.orderService.createOrder({ ...dto, userId: user.id });
    }

    @Get('my-orders')
    getMyOrders(@CurrentUser() user: AuthenticatedUser) {
        return this.orderService.getOrderByUserId(user.id);
    }
}