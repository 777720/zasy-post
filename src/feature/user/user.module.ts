import { forwardRef, Module } from "@nestjs/common";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthModule } from "../../core/auth/auth.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { CommonModle } from '../../common/common.modle'
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([ User ]),
        forwardRef(() => AuthModule),
        CommonModle
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserService
    ]
})
export class UserModule {

}
