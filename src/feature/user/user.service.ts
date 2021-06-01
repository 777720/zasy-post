import { HttpException, Inject, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { ObjectID } from 'mongodb';
import { User } from "./user.entity";
import { CryptoUtil } from "../../common/utils/crypto.util";


@Injectable()
export class UserService implements OnModuleInit{
    constructor(
        @InjectRepository(User) private readonly userRepo: MongoRepository<User>,
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil
    ) {}

    onModuleInit(): any {
    }

    /**
     * 用户登录
     *
     * @param account 登录账号
     * @param password 登录密码
     */
    async login(account: string, password: string): Promise<void> {
        let userTemp : User | undefined = undefined;
        const user = await this.findOneByAccount(account)
        if (user.length > 0) {
            userTemp = user[0]
        }
        if (!user) {
            throw new HttpException('登陆账号有误！', 406);
        }
        if (this.cryptoUtil.checkPassword(password, userTemp.password)) {
            throw new HttpException('登录密码有误', 406);
        }

    }

    /**
     * 用户注册
     *
     * @param user 用户信息
     */
    async register(user: User): Promise<void> {
        const existing = await this.findOneByAccount(user.account);
        if (existing) {
            throw new HttpException('账号已存在', 409);
        }
        user.password = this.cryptoUtil.encryptPassword(user.password)
        await this.userRepo.save(this.userRepo.create(user));

    }

    /**
     * 删除用户
     *
     * @param id 用户ID
     */
    async remove(id: number): Promise<void> {
        const existing = await this.userRepo.findOne(id);
        if (existing) {
            throw new HttpException(`删除失败，ID 为 '${id}' 的用户不存在`, 404)
        }
        await this.userRepo.remove(existing);
    }


    /**
     * 更新用户
     *
     * @param id 用户ID
     * @param updateInput updateInput
     */
    async update(id: number, updateInput: User): Promise<void> {
        const existing = await this.userRepo.findOne(id);
        if (!existing) throw new HttpException(`更新失败，ID 为 '${id}' 的用户不存在`, 404);
        if (updateInput.account) existing.account = updateInput.account;
        if (updateInput.password) existing.password = this.cryptoUtil.encryptPassword(updateInput.password);
        if (updateInput.name) existing.name = updateInput.name;
        await this.userRepo.save(existing);
    }

    /**
     * 通过登录账号查询用户
     *
     * @param account 登录账号
     */
    async findOneByAccount(account: string): Promise<User[]> {
        return await this.userRepo.find({ account: account });
    }

    /**
     * 通过登录账号id查询用户
     *
     * @param id
     */
    async findOneById(id: string): Promise<User> {
        const user = ObjectID.isValid(id) &&  await this.userRepo.findOne(id)
        if (!user) {
            throw new NotFoundException();
        };
        return user;
    }




    /**
     * 查询用户及其帖子的信息
     *
     * @param id 用户ID
     */
    async findOneWithPostsById(id: string): Promise<void> {

    }

    /**
     * 查询所有用户
     */
    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }
}

