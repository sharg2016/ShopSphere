import { IsNotEmpty, IsString, IsEmail, Matches, MinLength } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, { message: 'phone number must be 10 digit' })
    phoneNumber: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 character' })
    password: string;

}

