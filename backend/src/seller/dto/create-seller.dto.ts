import { IsEmail, isNotEmpty, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateSellerDto {

    @IsNotEmpty()
    @IsString()
    shopName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{0,14}$/, {
        message: 'Phone number must include country code (e.g. +911234567890)'
    })
    phoneNumber: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'password must be at least 6 characters' })
    password: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @Matches(/^[1-9][0-9]{5}$/, {
        message: 'PIN code must be a valid 6-digit Indian PIN code'
    })
    pincode: string;
}

export class SellerLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}