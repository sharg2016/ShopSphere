import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop([
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
        }
    ])

    items: { productId: string, name: string, image: string, price: Number, quantity: Number }[];

    @Prop({
        type: String,
        required: true
    })
    orderId: string;

    @Prop({
        type: Number,
        required: true
    })
    totalAmount: number;

    @Prop({
        type: String,
        enum: ['Packed', 'Shipping', 'Out for Delivery', 'Delivered'],
        default: 'Packed'
    })
    status: string;

    @Prop({
        type: Object
    })
    shippingAddress: {
        fullName: string,
        address: string,
        city: string,
        state: string,
        pincode: string
    };

    @Prop({
        type: String,
        required: true
    })
    payment: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);