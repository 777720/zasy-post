import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        forwardRef(() => UserModule),
    ],
    providers: [

    ],
    controllers: [],
    exports: []
})
export class ThingModule {
}
