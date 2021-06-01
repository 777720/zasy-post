import { Body, Controller, Inject, Post } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { Thing } from "./thing.entity";

@Controller('thing')
export class thingController {
    constructor(
        @Inject(UserService) private readonly userService: UserService,
    ) {}

    @Post('thing')
    async createOneThing(@Body('thing') thing: Thing ) {
        return { code: 200, message: '创建任务成功' };
    }
}
