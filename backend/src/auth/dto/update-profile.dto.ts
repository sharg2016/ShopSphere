import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class UpdateProfileInfo {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @Matches(/^[0-9]{10}$/, { message: 'phone number must be 10 digits' })
    phoneNumber: string;

    @IsOptional()
    @IsEmail({}, { message: 'email must be valid' })
    email: string;

    @IsNotEmpty({ message: 'password is required to confirm profile changes' })
    @IsString()
    password: string;
}