import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./domain/user.domain";
import { IUserService } from "./interfaces/user.service.interface";
import { Public } from "src/decorators/public.decorator";
import { CreateUserDto } from "./dto/create-user.dto";

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly userService: IUserService) { }

    @Public()
    @Mutation(returns => User)
    async createUser(
        @Args('username') username: string,
        @Args('password') password: string,
        @Args('nombre') nombre: string,
        @Args('telefono') telefono: string,
        @Args('ciudad') ciudad: string,
        @Args('pais') pais: string,
    ) {
        return await this.userService.create({ username, password, nombre, telefono, ciudad, pais, role: '' });
    }

    @Public()
    @Mutation(returns => User)
    async createUserDto(
        @Args('createUserDto') createUserDto: CreateUserDto,
    ) {
        return await this.userService.create(createUserDto);
    }

    @Public()
    @Query((returns) => [User], { name: 'allUsers' })
    async findAll() {
        return await this.userService.findAll();
    }

    @Public()
    @Query((returns) => User, { name: 'user' })
    async findOne(@Args('id') id: string) {
        return await this.userService.findOne(id);
    }

    @Public()
    @Query((returns) => User, { name: 'userByUsername' })
    async findByUsername(@Args('username') username: string) {
        return await this.userService.getByName(username);
    }
}