import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class User {
    @ObjectIdColumn()
    id: string;

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
