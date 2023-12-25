import { ReportEntry } from "src/report/entities/report.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_total: string
    @Column()
    date: Date;
    @Column()
    isActive: boolean
    @Column()
    startedAt: Date;

    @Column()
    stopAt: Date;

    @OneToMany(()=>ReportEntry,(rep)=>rep.session)
    reportEntry:ReportEntry[]
}
