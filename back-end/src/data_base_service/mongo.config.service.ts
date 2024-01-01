import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: process.env.MONGO_URL,
            dbName: process.env.MONGO_DB_NAME,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
        };
    }
}

export default MongooseConfigService;