import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Question } from './Question'
@Entity()
export class SubQuestion {
    @PrimaryGeneratedColumn()
    subQuestionID!: number
    @Column('varchar', { length: 150 })
    parentQuestionKey!: string

    @Column('varchar', { length: 150 })
    parentVisitVisitID!: string

    @Column('varchar', { length: 150 })
    subQuestionQuestionKey!: string

    @Column('varchar', { length: 150 })
    subQuestionVisitVisitID!: string
    @ManyToOne(
        () => Question,
        question => question.subQuestions,
        { onDelete: 'CASCADE' }
    )
    parent!: Question

    // @OneToOne(() => Question)
    // @JoinColumn()
    // subQuestion!: Question

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: number

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: number
}
