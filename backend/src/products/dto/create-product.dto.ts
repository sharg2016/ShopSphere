import { IsIn, IsNotEmpty, IsNumber, IsString, IsUrl, Min } from "class-validator";

const CATEGORIES = ['Camera', 'Laptop', 'SmartPhone', 'TV', 'Speaker', 'Tablet', 'Washing-Machine'];

export class createProductDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsIn(CATEGORIES)
    category: string;

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