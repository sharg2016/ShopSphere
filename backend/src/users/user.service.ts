import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema.js";
import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userRepo: Model<UserDocument>
    ) { }

    async findByEmail(email: string) {
        return this.userRepo.findOne({ email }).exec();
    }

    async createUser(user: Partial<User>) {
        const newUser = new this.userRepo(user);
        return newUser.save();
    }

    async findById(id: string) {
        return this.userRepo.findById(id).exec();
    }

    async findByPhoneNumber(phoneNumber: string) {
        return this.userRepo.findOne({ phoneNumber }).exec();
    }

}