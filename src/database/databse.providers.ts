import { createConnection } from "typeorm";

export const DatabaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => {
            await createConnection({
                type: 'mongodb',
                host: 'localhost',
                port: 27017,
                database: 'test',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                useNewUrlParser: true, // 使用新版mongo连接Url解析格式
                synchronize: true, // 自动同步数据库生成entity
            })
        }
    }
]
