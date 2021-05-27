import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    account: string;

    @Column()
    password: string;

    @Column()
    name: string;


    @Column({
        default: 'regular'
    })
    role: string;

}
