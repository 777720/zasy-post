import { Module } from "@nestjs/common";
import { DatabaseProviders } from "./databse.providers";

@Module({
    providers: [...DatabaseProviders],
    exports: [...DatabaseProviders]
})
export class DatabaseModule {}
