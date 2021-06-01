import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { IResult } from "../../common/interfaces/result.interface";
import { UserService } from "./user.service";
import { AuthService } from "../../core/auth/auth.service";
import { User } from "./user.entity";



@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
        @Inject(AuthService) private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Body() body: { account: string, password: string }):Promise<IResult> {
        await this.userService.login(body.account, body.password);
        const acessToken = await this.authService.createToken({ account: body.account });
        return { code: 200, message: '登陆成功', data: acessToken };
    }
    @Post('register')
    async register(@Body() user: User): Promise<IResult> {
        await this.userService.register(user);
        return { code: 200, message: '注册成功' }
    }

    @Delete(':id')
    async remove(@Param() id: number): Promise<IResult> {
        await this.userService.remove(id);
        return { code: 200, message: '删除成功' }
    }

    @Put(":id")
    async update(@Body() id: number, @Body() inputData: User): Promise<IResult> {
        await this.userService.update(id, inputData);
        return { code: 200, message: '更新成功' }
    }

    @Get(':id')
    async  fineOne(@Param('id') id: string): Promise<IResult> {
        const data = await this.userService.findOneById(id);
        console.log('data', data)
        return { code: 200, message: '查询用户成功', data }
    }
    @Get('/account/:account')
    async  findByAccount(@Param('account') account: string): Promise<IResult> {
        console.log(account)
        const data = await this.userService.findOneByAccount(account);
        return { code: 200, message: '查询用户账号成功', data }
    }

    @Get()
    async findAll(): Promise<IResult> {
        const data = await this.userService.findAll();
        return { code: 200, message: '查询所有用户成功', data }
    }

}
