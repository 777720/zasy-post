import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthStrategy } from "./auth.strategy";
import { UserModule } from "../../feature/user/user.module";

@Module({
    imports: [
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600
            }
        }),
        forwardRef(() => UserModule)
    ],
    providers: [ AuthService, AuthStrategy ],
    exports: [ AuthService ]

})
export class AuthModule {}
