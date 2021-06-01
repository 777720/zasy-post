import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IThing } from "../../common/interfaces/thing.interface";


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

    @Column()
    things: IThing[];


    @Column({
        default: 'regular'
    })
    role: string;

}
