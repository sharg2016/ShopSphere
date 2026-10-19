import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

export type ProductCategory = 'Camera' | 'Laptop' | 'SmartPhone' | 'TV' | 'Speaker' | 'Tablet' | 'Washing-Machine';

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: String, required: true, unique: true })
    productId: string;

    @Prop({ type: String, required: true, trim: true })
    name: string;

    @Prop({ type: String, required: true, trim: true, index: true })
    category: ProductCategory;

    @Prop({ type: String, required: true, trim: true })
    brandName: string;

    @Prop({ type: Number, required: true, min: 0 })
    price: number;

    @Prop({ type: Number, required: true, min: 0, max: 5, default: 0, index: true })
    rating: number;

    @Prop({ type: String, required: true })
    image: string;

    @Prop({ type: Boolean, required: true, default: true })
    isAvailable: boolean;

    @Prop({ type: String, required: true })
    description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ category: 1, rating: 1 });