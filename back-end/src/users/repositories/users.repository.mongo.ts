import { HydratedDocument, Model } from "mongoose";
import { UserMongoModel } from "../schemas/user.schema";
import { UsersRepository } from "./users.repository";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../domain/user.domain";

export class UsersRepositoryMongo extends UsersRepository {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserMongoModel>,
    ) {
        super();
    }

    private toUserDomain(userMongo: HydratedDocument<UserMongoModel>): User {
        if (userMongo) {
            const user = new User({
                id: userMongo._id.toString(),
                username: userMongo.username,
                password: userMongo.password,
                telefono: userMongo.telefono,
                ciudad: userMongo.ciudad,
                pais: userMongo.pais,
                role: userMongo.role,
            });

            return user;
        }
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

    async get(id: string): Promise<User> {
        const userMongo = await this.userModel.findById(id).exec();
        return this.toUserDomain(userMongo);
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

    async getByName(name: string): Promise<User> {
        const userMongo = await this.userModel.findOne({ username: name }).exec();
        return this.toUserDomain(userMongo);
    }

}