import { Model } from "mongoose";
import { UserMongoModel } from "../schemas/user.schema";
import { UsersRepository } from "./users.repository";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../users.service";

export class UsersRepositoryMongo extends UsersRepository {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserMongoModel>,
    ) {
        super();
    }

    getByName(name: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async create(item: User): Promise<User> {
        const createdUserMongo = await this.userModel.create(item); // modelo mongo

        const newUser = new User({
            ...item,
            id: createdUserMongo._id.toString(), // obtenido tras la inserción
        });
        // se factoriza para las siguientes operaciones

        return newUser;
    }

    get(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

}