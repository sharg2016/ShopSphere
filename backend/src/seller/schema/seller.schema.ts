import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type SellerDocument = HydratedDocument<Seller>;

@Schema({ timestamps: true })
export class Seller {

    @Prop({
        required: true,
        unique: true,
        trim: true,
        type: String
    })
    shopName: string;


    @Prop({
        required: true,
        unique: true,
        trim: true,
        type: String
    })
    email: string;

    @Prop({
        required: true,
        type: String,
        unique: true,
        trim: true,
        match: (/^\+[1-9]\d{0,14}$/)
    })
    phoneNumber: string;



    @Prop({
        type: String,
        required: true
    })
    hashedPassword: string;


    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    address: string;

    @Prop({
        required: true,
        type: String,
        trim: true,

    })
    city: string;


    @Prop({
        required: true,
        type: String,
        trim: true,

    })
    state: string;


    @Prop({
        required: true,
        type: String,
        trim: true,
        match: (/^[1-9][0-9]{5}$/)

    })
    pincode: string;


}


export const SellerSchema = SchemaFactory.createForClass(Seller);
