import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<UserMongoModel>;

@Schema()
export class UserMongoModel {
    @Prop({ required: true })
    username: string;
        
    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoModel);