import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ErrorsInterceptor } from "./core/interceptor/errors.interceptor";
import * as Path from "path";
import { UserModule } from "./feature/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'zasy',
            entities: [Path.join(__dirname, '**/**.entity{.ts,.js}')],
            synchronize: true,
        }),
        UserModule
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor
    }]
})
export class AppModule {
}
