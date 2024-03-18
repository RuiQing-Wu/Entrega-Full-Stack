import { Field, ID, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class ContribucionAccion {
    @Field(type => ID)
    readonly id?: string;

    @Field()
    readonly idUsuario: string;

    @Field()
    readonly idAccion: string;

    @Field()
    readonly nombre: string;

    @Field()
    readonly email: string;

    @Field()
    readonly contribucion: number;

    constructor(partial: Partial<ContribucionAccion>) {
        Object.assign(this, partial);
    }
}