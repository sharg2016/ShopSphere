import { IsIn, IsNotEmpty, IsNumber, IsString, IsUrl, Min } from "class-validator";
import type { ProductCategory } from "../schema/product.schema.js";

export class createProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsIn(['Camera', 'Laptop', 'SmartPhone', 'TV', 'Speaker', 'Tablet', 'Washing-Machine'])
    category: ProductCategory;

    @IsNotEmpty()
    @IsString()
    brandName: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsUrl()
    image: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}