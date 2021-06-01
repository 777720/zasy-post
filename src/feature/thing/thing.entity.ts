import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IThing } from "../../common/interfaces/thing.interface";


@Entity('thing')
export class Thing {
    @ObjectIdColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    createUserId: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    remark: string;

    @Column({ default: false })
    isFinish: Boolean;

    @Column({ default: false })
    todayFinish: Boolean;

    @Column({ default: 'normal' })
    thingType: string;

}
