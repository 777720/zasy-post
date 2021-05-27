import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ErrorsInterceptor } from "./core/interceptor/errors.interceptor";

@Module({
    imports: [
        TypeOrmModule.forRoot()
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor
    }]
})
export class AppModule {
}