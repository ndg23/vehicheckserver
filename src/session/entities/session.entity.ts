import { ReportEntry } from "src/report/entities/report.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_total: string
    @Column()
    date: Date;
    @Column()
    isActive: boolean
    @Column({
        type: "date",
        default: Date
    })
    startedAt: Date;

    @Column({
        type: "date",
        default: Date
    })
    stopAt: Date;

    @OneToMany(()=>ReportEntry,(rep)=>rep.session)
    reportEntry:ReportEntry[]
}
