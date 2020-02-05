import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Question } from './Question'
@Entity()
export class Visit {
    @PrimaryColumn('varchar', { length: 150 })
    visitID!: string

    @Column('varchar', { length: 50 })
    visitType!: string

    @Column('varchar', { length: 75 })
    clientID!: string

    @Column('datetime')
    visitDate!: string

    @Column('varchar', { length: 75 })
    visitOs!: string

    @Column('varchar', { length: 150 })
    clientFullName!: string

    @Column()
    familyID!: number

    @Column()
    legacyClientID!: number

    @OneToMany(
        () => Question,
        question => question.visit,
        { cascade: true }
    )
    questions!: Question[]

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: number

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: number
}
