import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    Unique,
} from 'typeorm'

import { SubQuestion } from './SubQuestion'
import { Visit } from './Visit'

@Entity()
// @Unique('unique_questionkey_visitVisitID', ['questionKey', 'visitVisitID'])
export class Question {
    @PrimaryColumn('varchar', { length: 150, unique: false })
    questionKey!: string

    @PrimaryColumn('varchar', { length: 150, unique: false })
    visitVisitID!: string

    @Column('varchar', { length: 2000, unique: false })
    questionAnswer!: string

    @Column('varchar', { length: 50, unique: false })
    questionType!: string

    @Column('varchar', { length: 2000, unique: false })
    formIndexJSON!: string

    @Column('text')
    questionJSON!: string

    @Column('text')
    inputJSON!: string

    @Column()
    isSubQuestionFlg!: boolean

    @Column()
    hasSubQuestionFlg!: boolean

    @OneToMany(
        () => SubQuestion,
        subQuestion => subQuestion.parent,
        { cascade: true }
    )
    subQuestions!: SubQuestion[]

    @ManyToOne(
        () => Visit,
        visit => visit.questions,
        { onDelete: 'CASCADE' }
    )
    visit!: Question

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: number

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: number
}
