import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Exclude } from "class-transformer";
@ObjectType()
export class User {
    @Field(type => ID)
    readonly id?: string;

    @Field()
    readonly username: string;

    @Field()
    @Exclude()
    password: string;

    @Field()
    readonly nombre: string;

    @Field()
    readonly telefono: string;

    @Field()
    readonly ciudad: string;

    @Field()
    readonly pais: string;

    @Field()
    readonly role: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}