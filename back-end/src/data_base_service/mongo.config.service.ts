import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: process.env.MONGO_URL,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
            dbName: process.env.MONGO_DBNAME,
        };
    }
}

export default MongooseConfigService;